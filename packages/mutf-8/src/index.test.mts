// SPDX-License-Identifier: MIT

import { describe, expect, test } from "vitest";
import testdata from "../../../testdata.mjs";
import { MUtf8Decoder, MUtf8Encoder } from "./index.js";

describe("MUtf8Decoder.decode()", () => {
  test("decode an empty byte sequence", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([]);
    expect(decoder.decode(src)).toBe("");
  });

  test.each(testdata)("decode a byte sequence representing the text: $text", ({ text, binary }) => {
    const decoder = new MUtf8Decoder();
    expect(decoder.decode(binary)).toBe(text);
  });

  test("when ignoreBOM is true, the decoder retains the leading U+FEFF", () => {
    const decoder = new MUtf8Decoder("mutf-8", { ignoreBOM: true });
    expect(decoder.ignoreBOM).toBe(true);
    // biome-ignore format:
    const src = new Uint8Array([
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
    ]);
    expect(decoder.decode(src)).toBe("\ufeffHello\ufeffHello");
  });

  test("when ignoreBOM is false, the decoder ignores the leading U+FEFF", () => {
    const decoder = new MUtf8Decoder("mutf-8", { ignoreBOM: false });
    expect(decoder.ignoreBOM).toBe(false);
    // biome-ignore format:
    const src = new Uint8Array([
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
    ]);
    expect(decoder.decode(src)).toBe("Hello\ufeffHello");
  });

  test("when fatal is true, an invalid byte sequence causes a TypeError", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: true });
    expect(decoder.fatal).toBe(true);
    // contains the invalid byte sequence
    expect(() => decoder.decode(new Uint8Array([0x61, 0x80, 0x62]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xc0, 0x40, 0x62]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0, 0x40, 0x80, 0x62]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0, 0x80, 0x40, 0x62]))).toThrow(TypeError);
    // unexpected end of input
    expect(() => decoder.decode(new Uint8Array([0x61, 0xc0]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0, 0x80]))).toThrow(TypeError);
  });

  test("when fatal is false, an invalid byte sequence is replaced by U+FFFD", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: false });
    expect(decoder.fatal).toBe(false);
    // contains the invalid byte sequence
    expect(decoder.decode(new Uint8Array([0x61, 0x80, 0x62]))).toBe("a\ufffdb");
    expect(decoder.decode(new Uint8Array([0x61, 0xc0, 0x40, 0x62]))).toBe("a\ufffd@b");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0, 0x40, 0x80, 0x62]))).toBe("a\ufffd@\ufffdb");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0, 0x80, 0x40, 0x62]))).toBe("a\ufffd\ufffd@b");
    // unexpected end of input
    expect(decoder.decode(new Uint8Array([0x61, 0xc0]))).toBe("a\ufffd");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0]))).toBe("a\ufffd");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0, 0x80]))).toBe("a\ufffd\ufffd");
  });

  test("when stream is true, the decoder retains the remaining bytes", () => {
    const decoder1 = new MUtf8Decoder();
    expect(decoder1.decode(new Uint8Array([0xe3, 0x81, 0x93, 0xe3, 0x82]), { stream: true })).toBe("こ");
    expect(decoder1.decode(new Uint8Array([0x93, 0xe3, 0x81, 0xab, 0xe3]), { stream: true })).toBe("んに");
    expect(decoder1.decode(new Uint8Array([0x81, 0xa1, 0xe3, 0x81, 0xaf]))).toBe("ちは");

    const decoder2 = new MUtf8Decoder();
    expect(decoder2.decode(new Uint8Array([0x54, 0x73, 0x63, 0x68, 0xc3]), { stream: true })).toBe("Tsch");
    expect(decoder2.decode(new Uint8Array([0xbc, 0x73, 0x73]))).toBe("üss");
  });

  test("when stream is false, the decoder treats the leavings as an invalid byte sequence", () => {
    const decoder1 = new MUtf8Decoder();
    expect(decoder1.decode(new Uint8Array([0xe3, 0x81, 0x93, 0xe3, 0x82]), { stream: false })).toBe("こ\ufffd\ufffd");
    expect(decoder1.decode(new Uint8Array([0x93, 0xe3, 0x81, 0xab, 0xe3]), { stream: false })).toBe("\ufffdに\ufffd");
    expect(decoder1.decode(new Uint8Array([0x81, 0xa1, 0xe3, 0x81, 0xaf]))).toBe("\ufffd\ufffdは");

    const decoder2 = new MUtf8Decoder();
    expect(decoder2.decode(new Uint8Array([0x54, 0x73, 0x63, 0x68, 0xc3]), { stream: false })).toBe("Tsch\ufffd");
    expect(decoder2.decode(new Uint8Array([0xbc, 0x73, 0x73]))).toBe("\ufffdss");
  });
});

describe("MUtf8Decoder.decode() with different types", () => {
  const decoder = new MUtf8Decoder();
  const encoder = new MUtf8Encoder();

  test("decode an ArrayBuffer", () => {
    const u8Binary = encoder.encode("Hello 世界! Santé🍻");
    const buffer = new ArrayBuffer(u8Binary.byteLength);
    new Uint8Array(buffer).set(u8Binary);
    expect(decoder.decode(buffer)).toBe("Hello 世界! Santé🍻");
  });

  test("decode a SharedArrayBuffer", () => {
    const u8Binary = encoder.encode("Hello 世界! Santé🍻");
    const buffer = new SharedArrayBuffer(u8Binary.byteLength);
    new Uint8Array(buffer).set(u8Binary);
    expect(decoder.decode(buffer)).toBe("Hello 世界! Santé🍻");
  });

  test("decode a DataView", () => {
    const u8Binary = encoder.encode("Hello 世界! Santé🍻");
    const buffer = new ArrayBuffer(u8Binary.byteLength);
    new Uint8Array(buffer).set(u8Binary);
    const view = new DataView(buffer);
    expect(decoder.decode(view)).toBe("Hello 世界! Santé🍻");
  });

  test("decode a Uint16Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Uint16Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode a Uint32Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Uint32Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode a BigUint64Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", BigUint64Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode an Int8Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Int8Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode an Int16Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Int16Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode an Int32Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Int32Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode a BigInt64Array", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", BigInt64Array);
    const expected = `Hello 世界! Santé🍻${padded}`;
    expect(decoder.decode(binary)).toBe(expected);
  });

  test("decode a DataView with an offset", () => {
    const u8Binary = encoder.encode("Hello 世界! Santé🍻");
    const buffer = new ArrayBuffer(u8Binary.byteLength);
    new Uint8Array(buffer).set(u8Binary);
    const view = new DataView(buffer, 3);
    expect(decoder.decode(view)).toBe("lo 世界! Santé🍻");
  });

  test("decode a Uint8Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Uint8Array);
    const offsetBinary = new Uint8Array(binary.buffer, 3);
    const expected = `lo 世界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode a Uint16Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Uint16Array);
    const offsetBinary = new Uint16Array(binary.buffer, 4);
    const expected = `o 世界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode a Uint32Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Uint32Array);
    const offsetBinary = new Uint32Array(binary.buffer, 4);
    const expected = `o 世界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode a BigUint64Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", BigUint64Array);
    const offsetBinary = new BigUint64Array(binary.buffer, 8);
    const expected = `\ufffd界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode an Int8Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Int8Array);
    const offsetBinary = new Int8Array(binary.buffer, 3);
    const expected = `lo 世界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode an Int16Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Int16Array);
    const offsetBinary = new Int16Array(binary.buffer, 4);
    const expected = `o 世界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode an Int32Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", Int32Array);
    const offsetBinary = new Int32Array(binary.buffer, 4);
    const expected = `o 世界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  test("decode a BigInt64Array with an offset", () => {
    const { binary, padded } = arrange("Hello 世界! Santé🍻", BigInt64Array);
    const offsetBinary = new BigInt64Array(binary.buffer, 8);
    const expected = `\ufffd界! Santé🍻${padded}`;
    expect(decoder.decode(offsetBinary)).toBe(expected);
  });

  interface TypedArrayConstructor<T> {
    new (buffer: ArrayBuffer): T;
    readonly BYTES_PER_ELEMENT: number;
  }

  function arrange<T>(
    text: string,
    targetType: TypedArrayConstructor<T>,
  ): {
    binary: T;
    padded: string;
  } {
    const u8Binary = new MUtf8Encoder().encode(text);
    const buffer = new ArrayBuffer(
      Math.ceil(u8Binary.byteLength / targetType.BYTES_PER_ELEMENT) * targetType.BYTES_PER_ELEMENT,
    );
    new Uint8Array(buffer).set(u8Binary);
    const binary = new targetType(buffer);
    let padded: string;
    if (u8Binary.byteLength % targetType.BYTES_PER_ELEMENT) {
      padded = "\ufffd".repeat(targetType.BYTES_PER_ELEMENT - (u8Binary.byteLength % targetType.BYTES_PER_ELEMENT));
    } else {
      padded = "";
    }
    return { binary, padded };
  }
});

describe("MUtf8Encoder.encode()", () => {
  test("encode an empty string", () => {
    const encoder = new MUtf8Encoder();
    expect(encoder.encode("")).toEqual(new Uint8Array(0));
  });

  test.each(testdata)("encode the text: $text", ({ text, binary }) => {
    const encoder = new MUtf8Encoder();
    expect(encoder.encode(text)).toEqual(binary);
  });
});

describe("MUtf8Encoder.encodeInto()", () => {
  test("encode an empty string", () => {
    const dest = new Uint8Array(0);
    const encoder = new MUtf8Encoder();
    expect(encoder.encodeInto("", dest)).toEqual({ read: 0, written: 0 });
    expect(dest).toEqual(new Uint8Array(0));
  });

  test.each(testdata)("encode the text: $text", ({ text, binary }) => {
    const dest = new Uint8Array(binary.length);
    const encoder = new MUtf8Encoder();
    expect(encoder.encodeInto(text, dest)).toEqual({ read: text.length, written: binary.length });
    expect(dest).toEqual(binary);
  });

  test("when the length of the destination is less than the length of the encoded byte sequence", () => {
    const dest = new Uint8Array(5);
    const encoder = new MUtf8Encoder();
    expect(encoder.encodeInto("こんにちは", dest)).toEqual({ read: 1, written: 3 });
    expect(dest).toEqual(new Uint8Array([0xe3, 0x81, 0x93, 0x00, 0x00]));
  });

  test("when the length of the destination is greater than the length of the encoded byte sequence", () => {
    const dest = new Uint8Array(16);
    const encoder = new MUtf8Encoder();
    expect(encoder.encodeInto("こんにちは", dest)).toEqual({ read: 5, written: 15 });
    expect(dest).toEqual(
      new Uint8Array([0xe3, 0x81, 0x93, 0xe3, 0x82, 0x93, 0xe3, 0x81, 0xab, 0xe3, 0x81, 0xa1, 0xe3, 0x81, 0xaf, 0x00]),
    );
  });
});
