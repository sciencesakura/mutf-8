// SPDX-License-Identifier: MIT

/**
 * The options for the decoder.
 */
export interface TextDecoderOptions {
  /**
   * If `true`, the decoder will throw an error upon encountering invalid bytes.
   *
   * @defaultValue `false`
   */
  fatal?: boolean;

  /**
   * If `true`, the decoder will ignore the Byte Order Mark (BOM).
   *
   * @defaultValue `false`
   */
  ignoreBOM?: boolean;
}

/**
 * The options for decoding.
 */
export interface TextDecodeOptions {
  /**
   * If `true`, the decoder will process the input as a stream, allowing partial decoding.
   *
   * @defaultValue `false`
   */
  stream?: boolean;
}

/**
 * The result of encoding.
 */
export interface TextEncoderEncodeIntoResult {
  /** The number of converted code units of the source. */
  read: number;

  /** The number of bytes modified in the destination. */
  written: number;
}

/**
 * The type of buffer source that can be used in the decoder.
 */
export type AllowSharedBufferSource = ArrayBuffer | SharedArrayBuffer | ArrayBufferView;

/**
 * The decoder for Modified UTF-8.
 *
 * @example
 * ```ts
 * const src = new Uint8Array([
 *   0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe4, 0xb8,
 *   0x96, 0xe7, 0x95, 0x8c, 0x21,
 * ]);
 * const decoder = new MUtf8Decoder();
 * const text = decoder.decode(src);
 * // Hello 世界!
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/#interface-textdecoder}
 */
export class MUtf8Decoder {
  #fatal: boolean;

  #ignoreBOM: boolean;

  #leavings?: Uint8Array;

  /**
   * @returns Always `"mutf-8"`.
   */
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * @returns `true` if error mode is fatal, otherwise `false`.
   */
  get fatal(): boolean {
    return this.#fatal;
  }

  /**
   * @returns Whether to ignore the BOM or not.
   */
  get ignoreBOM(): boolean {
    return this.#ignoreBOM;
  }

  /**
   * @param label   - The label of the decoder. Must be `"mutf-8"` or `"mutf8"`.
   * @param options - The options for the decoder.
   * @throws `RangeError` If the `label` is an invalid value.
   */
  constructor(label = "mutf-8", options: TextDecoderOptions = {}) {
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel !== "mutf-8" && normalizedLabel !== "mutf8") {
      throw new RangeError(`MUtf8Decoder.constructor: '${label}' is not supported.`);
    }
    this.#fatal = options.fatal ?? false;
    this.#ignoreBOM = options.ignoreBOM ?? false;
  }

  /**
   * Decodes the specified bytes into a string.
   *
   * @param input   - The bytes to be decoded.
   * @param options - The options for decoding.
   * @returns The resultant string after decoding.
   * @throws `TypeError` If {@link fatal} is `true` and the `input` contains invalid bytes.
   */
  decode(input: AllowSharedBufferSource, options: TextDecodeOptions = {}): string {
    const stream = options.stream ?? false;
    const buf = this.#toBinary(input);
    const length = buf.length;
    const result: string[] = [];
    let p = 0;
    while (p < length) {
      const b1 = buf[p++];
      if (!(b1 & 0x80) && b1 !== 0) {
        // U+0001-007F
        result.push(String.fromCharCode(b1));
      } else if ((b1 & 0xe0) === 0xc0) {
        // U+0000, U+0080-07FF
        if (length <= p) {
          if (stream) {
            this.#leavings = buf.slice(p - 1);
            break;
          }
          result.push(this.#handleError());
          continue;
        }
        const b2 = buf[p++];
        if ((b2 & 0xc0) !== 0x80) {
          result.push(this.#handleError());
          p--;
          continue;
        }
        result.push(String.fromCharCode(((b1 & 0x1f) << 6) | (b2 & 0x3f)));
      } else if ((b1 & 0xf0) === 0xe0) {
        // U+0800-FFFF
        if (length <= p + 1) {
          if (stream) {
            this.#leavings = buf.slice(p - 1);
            break;
          }
          result.push(this.#handleError());
          continue;
        }
        const b2 = buf[p++];
        if ((b2 & 0xc0) !== 0x80) {
          result.push(this.#handleError());
          p--;
          continue;
        }
        const b3 = buf[p++];
        if ((b3 & 0xc0) !== 0x80) {
          result.push(this.#handleError());
          p -= 2;
          continue;
        }
        if (p === 3 && b1 === 0xef && b2 === 0xbb && b3 === 0xbf && !this.ignoreBOM) {
          // skip BOM `EF BB BF`
          continue;
        }
        result.push(String.fromCharCode(((b1 & 0x0f) << 12) | ((b2 & 0x3f) << 6) | (b3 & 0x3f)));
      } else {
        result.push(this.#handleError());
      }
    }
    return result.join("");
  }

  #toBinary(input: AllowSharedBufferSource): Uint8Array {
    let bin: Uint8Array;
    if (input instanceof Uint8Array) {
      bin = input;
    } else {
      bin = new Uint8Array("buffer" in input ? input.buffer : input);
    }
    if (!this.#leavings) {
      return bin;
    }
    const combined = new Uint8Array(this.#leavings.length + bin.length);
    combined.set(this.#leavings, 0);
    combined.set(bin, this.#leavings.length);
    this.#leavings = undefined;
    return combined;
  }

  #handleError() {
    if (this.fatal) {
      throw new TypeError("MUtf8Decoder.decode: Decoding failed.");
    }
    return "\ufffd";
  }
}

/**
 * The encoder for Modified UTF-8.
 *
 * @example
 * ```ts
 * const encoder = new MUtf8Encoder();
 * const code = encoder.encode("Hello 世界!");
 * // Uint8Array [
 * //   0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe4, 0xb8,
 * //   0x96, 0xe7, 0x95, 0x8c, 0x21,
 * // ]
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/#interface-textencoder}
 */
export class MUtf8Encoder {
  /**
   * @returns Always `"mutf-8"`.
   */
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * Encodes the specified string in Modified UTF-8.
   *
   * @param input - The string to be encoded.
   * @returns The resultant bytes.
   */
  encode(input = ""): Uint8Array {
    const bin: number[] = [];
    for (const c of input) {
      // biome-ignore lint/style/noNonNullAssertion: `c` is always a non-empty string.
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
   * Encodes the specified string in Modified UTF-8 and stores the result in the specified array.
   *
   * @param source      - The string to be encoded.
   * @param destination - The array to store the encoded bytes.
   * @returns The progress of the encoding operation.
   */
  encodeInto(source: string, destination: Uint8Array): TextEncoderEncodeIntoResult {
    const destLen = destination.length;
    let i = 0;
    let read = 0;
    for (const c of source) {
      // biome-ignore lint/style/noNonNullAssertion: `c` is always a non-empty string.
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
