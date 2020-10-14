import { MUtf8Decoder, MUtf8Encoder } from "./index";

test("decode a 1-byte character", () => {
  const src = new Uint8Array([0x41]);
  const sut = new MUtf8Decoder();
  expect(sut.decode(src)).toBe("A");
});

test("decode a 2-byte character", () => {
  const src = new Uint8Array([0xc2, 0xa9]);
  const sut = new MUtf8Decoder();
  expect(sut.decode(src)).toBe("©");
});

test("decode a 3-byte character", () => {
  const src = new Uint8Array([0xe3, 0x81, 0x82]);
  const sut = new MUtf8Decoder();
  expect(sut.decode(src)).toBe("あ");
});

test("decode a supplementary character", () => {
  const src = new Uint8Array([0xed, 0xa1, 0x80, 0xed, 0xb4, 0x94]);
  const sut = new MUtf8Decoder();
  expect(sut.decode(src)).toBe("𠄔");
});

test("decode the null character", () => {
  const src = new Uint8Array([0xc0, 0x80]);
  const sut = new MUtf8Decoder();
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
  const sut = new MUtf8Decoder();
  expect(sut.decode(src)).toBe("Hello 世界! Santé🍻");
});

test("encode a 1-byte character", () => {
  const sut = new MUtf8Encoder();
  expect(sut.encode("A")).toEqual(new Uint8Array([0x41]));
});

test("encode a 2-byte character", () => {
  const sut = new MUtf8Encoder();
  expect(sut.encode("©")).toEqual(new Uint8Array([0xc2, 0xa9]));
});

test("encode a 3-byte character", () => {
  const sut = new MUtf8Encoder();
  expect(sut.encode("あ")).toEqual(new Uint8Array([0xe3, 0x81, 0x82]));
});

test("encode a supplementary character", () => {
  const sut = new MUtf8Encoder();
  expect(sut.encode("𠄔")).toEqual(new Uint8Array([0xed, 0xa1, 0x80, 0xed, 0xb4, 0x94]));
});

test("encode the null character", () => {
  const sut = new MUtf8Encoder();
  expect(sut.encode("\u0000")).toEqual(new Uint8Array([0xc0, 0x80]));
});

test("encode a string", () => {
  const sut = new MUtf8Encoder();
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
