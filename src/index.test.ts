import { endianness } from "os";
import { MUtf8Decoder, MUtf8Encoder } from "./index";

describe("MUtf8Decoder.constructor", () => {
  test("without arguments", () => {
    const decoder = new MUtf8Decoder();
    expect(decoder).toMatchObject({
      encoding: "mutf-8",
      fatal: false,
      ignoreBOM: false,
    });
  });

  test("with arguments", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: true, ignoreBOM: true });
    expect(decoder).toMatchObject({
      encoding: "mutf-8",
      fatal: true,
      ignoreBOM: true,
    });
  });

  test("label: accepts 'mutf-8' or 'mutf8', otherwise throws RangeError", () => {
    expect(() => new MUtf8Decoder("mutf-8")).not.toThrow();
    expect(() => new MUtf8Decoder("MUTF-8")).not.toThrow();
    expect(() => new MUtf8Decoder("mutf8")).not.toThrow();
    expect(() => new MUtf8Decoder("MUTF8")).not.toThrow();
    expect(() => new MUtf8Decoder("utf-8")).toThrow(RangeError);
  });
});

describe("MUtf8Decoder.decode", () => {
  test("decode an empty", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([]);
    expect(decoder.decode(src)).toBe("");
  });

  test("decode a 1-byte character", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([0x41]);
    expect(decoder.decode(src)).toBe("A");
  });

  test("decode a 2-byte character", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([0xc2, 0xa9]);
    expect(decoder.decode(src)).toBe("©");
  });

  test("decode a 3-byte character", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([0xe3, 0x81, 0x82]);
    expect(decoder.decode(src)).toBe("あ");
  });

  test("decode a supplementary character", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([0xed, 0xa1, 0x80, 0xed, 0xb4, 0x94]);
    expect(decoder.decode(src)).toBe("𠄔");
  });

  test("decode the null character", () => {
    const decoder = new MUtf8Decoder();
    const src = new Uint8Array([0xc0, 0x80]);
    expect(decoder.decode(src)).toBe("\u0000");
  });

  test("decode a string", () => {
    const decoder = new MUtf8Decoder();
    // prettier-ignore
    const src = new Uint8Array([
      0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe4, 0xb8,
      0x96, 0xe7, 0x95, 0x8c, 0x21, 0x20, 0x53, 0x61,
      0x6e, 0x74, 0xc3, 0xa9, 0xed, 0xa0, 0xbc, 0xed,
      0xbd, 0xbb,
    ]);
    expect(decoder.decode(src)).toBe("Hello 世界! Santé🍻");
  });

  test("ignoreBOM: decode a string when ignoreBOM is true", () => {
    const decoder = new MUtf8Decoder("mutf-8", { ignoreBOM: true });
    // prettier-ignore
    const src = new Uint8Array([
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
    ]);
    expect(decoder.decode(src)).toBe("\ufeffHello\ufeffHello");
  });

  test("ignoreBOM: decode a string when ignoreBOM is false", () => {
    const decoder = new MUtf8Decoder("mutf-8", { ignoreBOM: false });
    // prettier-ignore
    const src = new Uint8Array([
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
      0xef, 0xbb, 0xbf, 0x48, 0x65, 0x6c, 0x6c, 0x6f,
    ]);
    expect(decoder.decode(src)).toBe("Hello\ufeffHello");
  });

  test("decode Int8Array, Uint8Array and Uint8ClampedArray", () => {
    const decoder = new MUtf8Decoder();
    const src = [0x48, 0x65, 0x6c, 0x6c, 0x6f, 0xe2, 0x98, 0x86];
    const i8 = new Int8Array(src);
    expect(decoder.decode(i8)).toBe("Hello☆");
    expect(decoder.decode(i8.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(i8.buffer))).toBe("Hello☆");
    const u8 = new Uint8Array(src);
    expect(decoder.decode(u8)).toBe("Hello☆");
    expect(decoder.decode(u8.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(u8.buffer))).toBe("Hello☆");
    const c8 = new Uint8ClampedArray(src);
    expect(decoder.decode(c8)).toBe("Hello☆");
    expect(decoder.decode(c8.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(c8.buffer))).toBe("Hello☆");
  });

  test("decode Int16Array and Uint16Array", () => {
    const decoder = new MUtf8Decoder();
    const src = endianness() === "BE" ? [0x4865, 0x6c6c, 0x6fe2, 0x9886] : [0x6548, 0x6c6c, 0xe26f, 0x8698];
    const i16 = new Int16Array(src);
    expect(decoder.decode(i16)).toBe("Hello☆");
    expect(decoder.decode(i16.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(i16.buffer))).toBe("Hello☆");
    const u16 = new Uint16Array(src);
    expect(decoder.decode(u16)).toBe("Hello☆");
    expect(decoder.decode(u16.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(u16.buffer))).toBe("Hello☆");
  });

  test("decode Int32Array and Uint32Array", () => {
    const decoder = new MUtf8Decoder();
    const src = endianness() === "BE" ? [0x48656c6c, 0x6fe29886] : [0x6c6c6548, 0x8698e26f];
    const i32 = new Int32Array(src);
    expect(decoder.decode(i32)).toBe("Hello☆");
    expect(decoder.decode(i32.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(i32.buffer))).toBe("Hello☆");
    const u32 = new Uint32Array(src);
    expect(decoder.decode(u32)).toBe("Hello☆");
    expect(decoder.decode(u32.buffer)).toBe("Hello☆");
    expect(decoder.decode(new DataView(u32.buffer))).toBe("Hello☆");
  });

  test("fatal: detected invalid bytes when fatal is true", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: true });
    expect(() => decoder.decode(new Uint8Array([0x61, 0x80, 0x62]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xc0, 0x40, 0x62]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0, 0x40, 0x80, 0x62]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0, 0x80, 0x40, 0x62]))).toThrow(TypeError);
  });

  test("fatal: detected invalid bytes when fatal is false", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: false });
    expect(decoder.decode(new Uint8Array([0x61, 0x80, 0x62]))).toBe("a\ufffdb");
    expect(decoder.decode(new Uint8Array([0x61, 0xc0, 0x40, 0x62]))).toBe("a\ufffdb");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0, 0x40, 0x80, 0x62]))).toBe("a\ufffdb");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0, 0x80, 0x40, 0x62]))).toBe("a\ufffdb");
  });

  test("fatal: detected unexpected end when fatal is true", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: true });
    expect(() => decoder.decode(new Uint8Array([0x61, 0xc0]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0]))).toThrow(TypeError);
    expect(() => decoder.decode(new Uint8Array([0x61, 0xe0, 0x80]))).toThrow(TypeError);
  });

  test("fatal: detected unexpected end when fatal is false", () => {
    const decoder = new MUtf8Decoder("mutf-8", { fatal: false });
    expect(decoder.decode(new Uint8Array([0x61, 0xc0]))).toBe("a\ufffd");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0]))).toBe("a\ufffd");
    expect(decoder.decode(new Uint8Array([0x61, 0xe0, 0x80]))).toBe("a\ufffd\ufffd");
  });
});

describe("MUtf8Encoder.encode", () => {
  const sut = new MUtf8Encoder();

  test("encode an empty", () => {
    expect(sut.encode("")).toEqual(new Uint8Array(0));
  });

  test("encode a 1-byte character", () => {
    expect(sut.encode("A")).toEqual(new Uint8Array([0x41]));
  });

  test("encode a 2-byte character", () => {
    expect(sut.encode("©")).toEqual(new Uint8Array([0xc2, 0xa9]));
  });

  test("encode a 3-byte character", () => {
    expect(sut.encode("あ")).toEqual(new Uint8Array([0xe3, 0x81, 0x82]));
  });

  test("encode a supplementary character", () => {
    expect(sut.encode("𠄔")).toEqual(new Uint8Array([0xed, 0xa1, 0x80, 0xed, 0xb4, 0x94]));
  });

  test("encode the null character", () => {
    expect(sut.encode("\u0000")).toEqual(new Uint8Array([0xc0, 0x80]));
  });

  test("encode a string", () => {
    // prettier-ignore
    expect(sut.encode("Hello 世界! Santé🍻")).toEqual(
      new Uint8Array([
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe4, 0xb8,
        0x96, 0xe7, 0x95, 0x8c, 0x21, 0x20, 0x53, 0x61,
        0x6e, 0x74, 0xc3, 0xa9, 0xed, 0xa0, 0xbc, 0xed,
        0xbd, 0xbb,
      ])
    );
  });
});

describe("MUtf8Encoder.encodeInto", () => {
  const sut = new MUtf8Encoder();

  test("encode an empty", () => {
    const dest = new Uint8Array(0);
    expect(sut.encodeInto("", dest)).toEqual({ read: 0, written: 0 });
    expect(dest).toEqual(new Uint8Array(0));
  });

  test("encode a 1-byte character", () => {
    const dest = new Uint8Array(1);
    expect(sut.encodeInto("A", dest)).toEqual({ read: 1, written: 1 });
    expect(dest).toEqual(new Uint8Array([0x41]));
  });

  test("encode a 2-byte character", () => {
    const dest = new Uint8Array(2);
    expect(sut.encodeInto("©", dest)).toEqual({ read: 1, written: 2 });
    expect(dest).toEqual(new Uint8Array([0xc2, 0xa9]));
  });

  test("encode a 3-byte character", () => {
    const dest = new Uint8Array(3);
    expect(sut.encodeInto("あ", dest)).toEqual({ read: 1, written: 3 });
    expect(dest).toEqual(new Uint8Array([0xe3, 0x81, 0x82]));
  });

  test("encode a supplementary character", () => {
    const dest = new Uint8Array(6);
    expect(sut.encodeInto("𠄔", dest)).toEqual({ read: 2, written: 6 });
    expect(dest).toEqual(new Uint8Array([0xed, 0xa1, 0x80, 0xed, 0xb4, 0x94]));
  });

  test("encode the null character", () => {
    const dest = new Uint8Array(2);
    expect(sut.encodeInto("\u0000", dest)).toEqual({ read: 1, written: 2 });
    expect(dest).toEqual(new Uint8Array([0xc0, 0x80]));
  });

  test("encode a string", () => {
    const dest = new Uint8Array(26);
    expect(sut.encodeInto("Hello 世界! Santé🍻", dest)).toEqual({ read: 17, written: 26 });
    // prettier-ignore
    expect(dest).toEqual(
      new Uint8Array([
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe4, 0xb8,
        0x96, 0xe7, 0x95, 0x8c, 0x21, 0x20, 0x53, 0x61,
        0x6e, 0x74, 0xc3, 0xa9, 0xed, 0xa0, 0xbc, 0xed,
        0xbd, 0xbb,
      ])
    );
  });

  test("destination's length is less than encoded source's one", () => {
    const dest = new Uint8Array(5);
    expect(sut.encodeInto("こんにちは", dest)).toEqual({ read: 1, written: 3 });
    expect(dest).toEqual(new Uint8Array([0xe3, 0x81, 0x93, 0x00, 0x00]));
  });

  test("destination's length is greater than encoded source's one", () => {
    const dest = new Uint8Array(16);
    expect(sut.encodeInto("こんにちは", dest)).toEqual({ read: 5, written: 15 });
    expect(dest).toEqual(
      new Uint8Array([0xe3, 0x81, 0x93, 0xe3, 0x82, 0x93, 0xe3, 0x81, 0xab, 0xe3, 0x81, 0xa1, 0xe3, 0x81, 0xaf, 0x00]),
    );
  });
});
