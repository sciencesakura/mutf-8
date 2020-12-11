/**
 * @module mutf-8
 * @copyright 2020 sciencesakura
 * @license MIT
 */

export type MUtf8DecodeSource =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
  | DataView
  | ArrayBuffer;

function toU8Ary(input: MUtf8DecodeSource): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  } else {
    return new Uint8Array("buffer" in input ? input.buffer : input);
  }
}

/**
 * The decoder for Modified UTF-8 (MUTF-8).
 *
 * This API is similar to WHATWG Encoding Standard's `TextDecoder`.
 */
export class MUtf8Decoder {
  private static ERR_PREFIX = "Failed to execute 'decode' on 'MUtf8Decoder': ";

  private static invalidInput() {
    throw new TypeError(`${MUtf8Decoder.ERR_PREFIX}Invalid input.`);
  }

  private static unexpectedEOI() {
    throw new TypeError(`${MUtf8Decoder.ERR_PREFIX}Unexpected end of input.`);
  }

  get encoding(): string {
    return "mutf-8";
  }

  get fatal(): boolean {
    return true;
  }

  get ignoreBOM(): boolean {
    return false;
  }

  /**
   * Decodes the `input` and returns a string.
   *
   * @param input The bytes to be decoded
   * @returns The resultant string
   * @throws {TypeError} If the `input` is not valid as a MUTF-8 sequence
   */
  decode(input: MUtf8DecodeSource): string {
    const buf = toU8Ary(input);
    const length = buf.length;
    const code: number[] = [];
    let p = 0;
    while (p < length) {
      const b1 = buf[p++];
      if (!(b1 & 0x80) && b1 !== 0) {
        // U+0001-007F
        code.push(b1);
      } else if (b1 >>> 5 === 0b110) {
        // U+0000, U+0080-07FF
        if (length <= p) MUtf8Decoder.unexpectedEOI();
        const b2 = buf[p++];
        if (b2 >>> 6 !== 0b10) MUtf8Decoder.invalidInput();
        code.push(((b1 & 0x1f) << 6) | (b2 & 0x3f));
      } else if (b1 >>> 4 === 0b1110) {
        // U+0800-
        if (length <= p + 1) MUtf8Decoder.unexpectedEOI();
        const b2 = buf[p++];
        const b3 = buf[p++];
        if (b2 >>> 6 !== 0b10 || b3 >>> 6 !== 0b10) MUtf8Decoder.invalidInput();
        code.push(((b1 & 0x0f) << 12) | ((b2 & 0x3f) << 6) | (b3 & 0x3f));
      } else {
        MUtf8Decoder.invalidInput();
      }
    }
    return code.map((c) => String.fromCharCode(c)).join("");
  }
}

export interface MUtf8EncoderEncodeIntoResult {
  read: number;
  written: number;
}

/**
 * The encoder for Modified UTF-8 (MUTF-8).
 *
 * This API is similar to WHATWG Encoding Standard's `TextEncoder`.
 */
export class MUtf8Encoder {
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * Encodes the `input` and returns a byte array.
   *
   * @param input The string to be encoded
   * @returns The resultant byte array
   */
  encode(input = ""): Uint8Array {
    const bin: number[] = [];
    for (const c of input) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const code = c.codePointAt(0)!;
      if (0x0001 <= code && code <= 0x007f) {
        bin.push(code);
      } else if (code <= 0x07ff) {
        bin.push(0xc0 | (code >>> 6));
        bin.push(0x80 | (0x3f & code));
      } else if (code <= 0xffff) {
        bin.push(0xe0 | (code >>> 12));
        bin.push(0x80 | (0x3f & (code >>> 6)));
        bin.push(0x80 | (0x3f & code));
      } else {
        bin.push(0xed);
        bin.push(0xa0 | ((code >>> 16) - 1));
        bin.push(0x80 | (0x3f & (code >>> 10)));
        bin.push(0xed);
        bin.push(0xb0 | (0x0f & (code >>> 6)));
        bin.push(0x80 | (0x3f & code));
      }
    }
    return new Uint8Array(bin);
  }

  /**
   * Encodes the `source` and writes the result to the `destination`.
   *
   * @param source      The string to be encoded
   * @param destination The byte array to write the result to
   * @returns The progress
   */
  encodeInto(source: string, destination: Uint8Array): MUtf8EncoderEncodeIntoResult {
    const destLen = destination.length;
    let i = 0;
    let read = 0;
    for (const c of source) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const code = c.codePointAt(0)!;
      if (0x0001 <= code && code <= 0x007f) {
        if (destLen <= i) break;
        destination[i++] = code;
      } else if (code <= 0x07ff) {
        if (destLen <= i + 1) break;
        destination[i++] = 0xc0 | (code >>> 6);
        destination[i++] = 0x80 | (0x3f & code);
      } else if (code <= 0xffff) {
        if (destLen <= i + 2) break;
        destination[i++] = 0xe0 | (code >>> 12);
        destination[i++] = 0x80 | (0x3f & (code >>> 6));
        destination[i++] = 0x80 | (0x3f & code);
      } else {
        if (destLen <= i + 5) break;
        destination[i++] = 0xed;
        destination[i++] = 0xa0 | ((code >>> 16) - 1);
        destination[i++] = 0x80 | (0x3f & (code >>> 10));
        destination[i++] = 0xed;
        destination[i++] = 0xb0 | (0x0f & (code >>> 6));
        destination[i++] = 0x80 | (0x3f & code);
        read++;
      }
      read++;
    }
    return { read, written: i };
  }
}
