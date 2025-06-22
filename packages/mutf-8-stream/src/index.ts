// SPDX-License-Identifier: MIT

import { type AllowSharedBufferSource, MUtf8Decoder, MUtf8Encoder, type TextDecoderOptions } from "mutf-8";

/**
 * The streaming equivalent of {@link MUtf8Decoder}.
 *
 * This transform stream provides efficient decoding of Modified UTF-8 data in streaming scenarios, allowing you to
 * process large amounts of data without loading everything into memory.
 *
 * @example
 * ```typescript
 * import { MUtf8DecoderStream } from 'mutf-8-stream';
 *
 * await binaryStream
 *   .pipeThrough(new MUtf8DecoderStream())
 *   .pipeTo(new WritableStream({
 *     write(textChunk) {
 *       console.log('Decoded text:', textChunk);
 *     }
 *   }));
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/#interface-textdecoderstream | WHATWG Encoding Standard, TextDecoderStream}
 * @see {@link https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.4.7 | The Java Virtual Machine Specification, Java SE 21 Edition, Section 4.4.7}
 * @since v1.2.0
 */
export class MUtf8DecoderStream extends TransformStream<AllowSharedBufferSource, string> {
  #decoder: MUtf8Decoder;

  /**
   * The encoding name for this decoder.
   *
   * This property is provided for compatibility with the WHATWG `TextDecoderStream` interface.
   *
   * @returns Always `"mutf-8"`
   */
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * Indicates whether the decoder is in fatal error mode.
   *
   * When `true`, the decoder will throw a `TypeError` when encountering invalid Modified UTF-8 byte sequences. When
   * `false`, invalid sequences are replaced with the Unicode replacement character (U+FFFD).
   *
   * @returns `true` if error mode is fatal, otherwise `false`
   */
  get fatal(): boolean {
    return this.#decoder.fatal;
  }

  /**
   * Indicates whether the decoder ignores Byte Order Marks.
   *
   * When `true`, BOM bytes (0xEF 0xBB 0xBF) at the beginning of input are silently ignored. When `false`, they are
   * treated as regular characters.
   *
   * @returns `true` if BOM should be ignored, otherwise `false`
   */
  get ignoreBOM(): boolean {
    return this.#decoder.ignoreBOM;
  }

  /**
   * @param label - The encoding label. Must be `"mutf-8"` or `"mutf8"` (case-insensitive)
   * @param options - Configuration options for the decoder behavior
   * @throws `RangeError` If the `label` is not a supported value
   */
  constructor(label = "mutf-8", options: TextDecoderOptions = {}) {
    const decoder = new MUtf8Decoder(label, options);
    super({
      transform: (chunk, controller) => {
        controller.enqueue(decoder.decode(chunk, { stream: true }));
      },
    });
    this.#decoder = decoder;
  }
}

/**
 * The streaming equivalent of {@link MUtf8Encoder}.
 *
 * This transform stream provides efficient encoding of text strings into Modified UTF-8 byte sequences in streaming
 * scenarios, allowing you to process large amounts of text without loading everything into memory.
 *
 * @example
 * ```typescript
 * import { MUtf8EncoderStream } from 'mutf-8-stream';
 *
 * await textStream
 *   .pipeThrough(new MUtf8EncoderStream())
 *   .pipeTo(new WritableStream({
 *     write(binaryChunk) {
 *       console.log('Encoded bytes:', binaryChunk);
 *     }
 *   }));
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/#interface-textencoderstream | WHATWG Encoding Standard, TextEncoderStream}
 * @see {@link https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.4.7 | The Java Virtual Machine Specification, Java SE 21 Edition, Section 4.4.7}
 * @since v1.2.0
 */
export class MUtf8EncoderStream extends TransformStream<string, Uint8Array> {
  /**
   * The encoding name for this encoder.
   *
   * This property is provided for compatibility with the WHATWG `TextEncoderStream` interface.
   *
   * @returns Always `"mutf-8"`
   */
  get encoding(): string {
    return "mutf-8";
  }

  constructor() {
    const encoder = new MUtf8Encoder();
    super({
      transform: (chunk, controller) => {
        controller.enqueue(encoder.encode(chunk));
      },
    });
  }
}
