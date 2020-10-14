export class MUtf8Decoder {
  readonly encoding = "mutf-8";

  readonly fatal = true;

  readonly ignoreBOM = false;

  /**
   * Decodes the `input` and returns a string.
   */
  decode(input: Uint8Array): string {
    const length = input.length;
    const code: number[] = [];
    let p = 0;
    while (p < length) {
      const b1 = input[p++];
      if (!(b1 & 0x80) && b1 !== 0) {
        // U+0001-007F
        code.push(b1);
        continue;
      } else if (!(b1 & 0x20) && p < length) {
        // U+0000, U+0080-07FF
        const b2 = input[p++];
        if (!(b2 & 0x40)) {
          code.push(((b1 & 0x1f) << 6) | (b2 & 0x3f));
          continue;
        }
      } else if (!(b1 & 0x10) && p + 1 < length) {
        // U+0800-FFFF
        const b2 = input[p++];
        const b3 = input[p++];
        if (!(b2 & 0x40) && !(b3 & 0x40)) {
          code.push(((b1 & 0x0f) << 12) | ((b2 & 0x3f) << 6) | (b3 & 0x3f));
          continue;
        }
      } else if (b1 === 0xed && p + 4 < length) {
        // U+10000-
        const b2 = input[p++];
        const b3 = input[p++];
        const b4 = input[p++];
        const b5 = input[p++];
        const b6 = input[p++];
        if (!(b2 & 0x50) && !(b3 & 0x40) && b4 === 0xed && !(b5 & 0x40) && !(b6 & 0x40)) {
          code.push(0x10000 | ((b2 & 0x0f) << 16) | ((b3 & 0x3f) << 10) | ((b5 & 0x0f) << 6) | (b6 & 0x3f));
          continue;
        }
      }
      throw new TypeError("Failed to execute 'decode' on 'TextDecoder': The encoded data was not valid.");
    }
    return code.map((c) => String.fromCodePoint(c)).join("");
  }
}

export interface MUtf8EncoderEncodeIntoResult {
  read: number;
  written: number;
}

/**
 * The encoder for Modified UTF-8.
 *
 * This API is similar to WHATWG Encoding Standard.
 */
export class MUtf8Encoder {
  readonly encoding = "mutf-8";

  /**
   * Encodes the `input` and returns a byte array.
   */
  encode(input: string): Uint8Array {
    const bin: number[] = [];
    for (const c of input) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const code = c.codePointAt(0)!;
      if (0x0001 <= code && code <= 0x007f) {
        bin.push(code);
      } else if ((0x0080 <= code && code <= 0x07ff) || code === 0x0000) {
        bin.push(0xc0 | (code >>> 6));
        bin.push(0x80 | (0x3f & code));
      } else if (0x0800 <= code && code <= 0xffff) {
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
   * Encodes the `source` to the `destination`.
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
      } else if ((0x0080 <= code && code <= 0x07ff) || code === 0x0000) {
        if (destLen <= i + 1) break;
        destination[i++] = 0xc0 | (code >>> 6);
        destination[i++] = 0x80 | (0x3f & code);
      } else if (0x0800 <= code && code <= 0xffff) {
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
