/**
 * @module mutf-8
 * @copyright 2020 sciencesakura
 * @license MIT
 */

export type MUtf8BufferSource =
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

const ERR_DECODE_FAILED = "MUtf8Decoder.decode: Decoding failed.";

function toU8Ary(input: MUtf8BufferSource): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  } else {
    return new Uint8Array("buffer" in input ? input.buffer : input);
  }
}

/**
 * The decoder for Modified UTF-8 (MUTF-8).
 *
 * This interface is similar to [WHATWG Encoding](https://encoding.spec.whatwg.org/).
 */
export class MUtf8Decoder {
  /**
   * @returns `"mutf-8"`
   */
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * @returns `true`
   */
  get fatal(): boolean {
    return true;
  }

  /**
   * @returns `false`
   */
  get ignoreBOM(): boolean {
    return false;
  }

  /**
   * @param label   The label of the encoder. This must be `"mutf-8"` or `"mutf8"`.
   * @param options The options. This parameter is ignored.
   * @throws {RangeError} If the `label` is invalid value.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(label = "mutf-8", options: unknown = {}) {
    const normalizedLabel = label?.toLowerCase?.();
    if (normalizedLabel !== "mutf-8" && normalizedLabel !== "mutf8") {
      throw new RangeError(`MUtf8Decoder.constructor: '${label}' is not supported.`);
    }
  }

  /**
   * Decodes the specified bytes.
   *
   * @param input   The bytes to be decoded.
   * @param options The options. This parameter is ignored.
   * @returns The resultant string.
   * @throws {TypeError} If the `input` is invalid bytes.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decode(input: MUtf8BufferSource, options: unknown = {}): string {
    const buf = toU8Ary(input);
    const length = buf.length;
    const chars: string[] = [];
    let p = 0;
    while (p < length) {
      const b1 = buf[p++];
      if (!(b1 & 0x80) && b1 !== 0) {
        // U+0001-007F
        chars.push(String.fromCharCode(b1));
      } else if (b1 >>> 5 === 0b110) {
        // U+0000, U+0080-07FF
        if (length <= p) throw new TypeError(ERR_DECODE_FAILED);
        const b2 = buf[p++];
        if (b2 >>> 6 !== 0b10) throw new TypeError(ERR_DECODE_FAILED);
        chars.push(String.fromCharCode(((b1 & 0x1f) << 6) | (b2 & 0x3f)));
      } else if (b1 >>> 4 === 0b1110) {
        // U+0800-
        if (length <= p + 1) throw new TypeError(ERR_DECODE_FAILED);
        const b2 = buf[p++];
        const b3 = buf[p++];
        if (b2 >>> 6 !== 0b10 || b3 >>> 6 !== 0b10) throw new TypeError(ERR_DECODE_FAILED);
        chars.push(String.fromCharCode(((b1 & 0x0f) << 12) | ((b2 & 0x3f) << 6) | (b3 & 0x3f)));
      } else {
        throw new TypeError(ERR_DECODE_FAILED);
      }
    }
    return chars.join("");
  }
}

export interface MUtf8EncoderEncodeIntoResult {
  read: number;
  written: number;
}

/**
 * The encoder for Modified UTF-8 (MUTF-8).
 *
 * This interface is similar to [WHATWG Encoding](https://encoding.spec.whatwg.org/).
 */
export class MUtf8Encoder {
  /**
   * @returns `"mutf-8"`
   */
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * Encodes the specified string.
   *
   * @param input The string to be encoded.
   * @returns The resultant bytes.
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
   * Encodes the specified string and stores the result to the specified array.
   *
   * @param source      The string to be encoded.
   * @param destination The bytes to be stored the result.
   * @returns The progress.
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
