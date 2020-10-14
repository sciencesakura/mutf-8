import { MUtf8Decoder, MUtf8Encoder } from "./index";

describe("MUtf8Decoder.decode", () => {
  const sut = new MUtf8Decoder();

  test("decode a 1-byte character", () => {
    const src = new Uint8Array([0x41]);
    expect(sut.decode(src)).toBe("A");
  });

  test("decode a 2-byte character", () => {
    const src = new Uint8Array([0xc2, 0xa9]);
    expect(sut.decode(src)).toBe("©");
  });

  test("decode a 3-byte character", () => {
    const src = new Uint8Array([0xe3, 0x81, 0x82]);
    expect(sut.decode(src)).toBe("あ");
  });

  test("decode a supplementary character", () => {
    const src = new Uint8Array([0xed, 0xa1, 0x80, 0xed, 0xb4, 0x94]);
    expect(sut.decode(src)).toBe("𠄔");
  });

  test("decode the null character", () => {
    const src = new Uint8Array([0xc0, 0x80]);
    expect(sut.decode(src)).toBe("\u0000");
  });

  test("decode a string", () => {
    const src = new Uint8Array([
      0x48,
      0x65,
      0x6c,
      0x6c,
      0x6f,
      0x20,
      0xe4,
      0xb8,
      0x96,
      0xe7,
      0x95,
      0x8c,
      0x21,
      0x20,
      0x53,
      0x61,
      0x6e,
      0x74,
      0xc3,
      0xa9,
      0xed,
      0xa0,
      0xbc,
      0xed,
      0xbd,
      0xbb,
    ]);
    expect(sut.decode(src)).toBe("Hello 世界! Santé🍻");
  });
});

describe("MUtf8Encoder.encode", () => {
  const sut = new MUtf8Encoder();

  test("encode an empty string", () => {
    expect(sut.encode()).toEqual(new Uint8Array(0));
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
    expect(sut.encode("Hello 世界! Santé🍻")).toEqual(
      new Uint8Array([
        0x48,
        0x65,
        0x6c,
        0x6c,
        0x6f,
        0x20,
        0xe4,
        0xb8,
        0x96,
        0xe7,
        0x95,
        0x8c,
        0x21,
        0x20,
        0x53,
        0x61,
        0x6e,
        0x74,
        0xc3,
        0xa9,
        0xed,
        0xa0,
        0xbc,
        0xed,
        0xbd,
        0xbb,
      ])
    );
  });
});

describe("MUtf8Encoder.encodeInto", () => {
  const sut = new MUtf8Encoder();

  test("encode an empty string", () => {
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
    expect(dest).toEqual(
      new Uint8Array([
        0x48,
        0x65,
        0x6c,
        0x6c,
        0x6f,
        0x20,
        0xe4,
        0xb8,
        0x96,
        0xe7,
        0x95,
        0x8c,
        0x21,
        0x20,
        0x53,
        0x61,
        0x6e,
        0x74,
        0xc3,
        0xa9,
        0xed,
        0xa0,
        0xbc,
        0xed,
        0xbd,
        0xbb,
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
      new Uint8Array([0xe3, 0x81, 0x93, 0xe3, 0x82, 0x93, 0xe3, 0x81, 0xab, 0xe3, 0x81, 0xa1, 0xe3, 0x81, 0xaf, 0x00])
    );
  });
});
