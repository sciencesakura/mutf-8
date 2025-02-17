// SPDX-License-Identifier: MIT

import { type AllowSharedBufferSource, MUtf8Decoder, MUtf8Encoder, type TextDecoderOptions } from "mutf-8";

/**
 * The decoder for Modified UTF-8. It is the streaming equivalent of {@link MUtf8Decoder}.
 *
 * @example
 * ```ts
 * await getLargeBinaryAsStream()
 *   .pipeThrough(new MUtf8DecoderStream())
 *   .pipeTo(new WritableStream({
 *     write(chunk) {
 *       // Handle the decoded chunk
 *     }
 *   }));
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/#interface-textdecoderstream}
 * @since v1.2.0
 */
export class MUtf8DecoderStream extends TransformStream<AllowSharedBufferSource, string> {
  #decoder: MUtf8Decoder;

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
    return this.#decoder.fatal;
  }

  /**
   * @returns Whether to ignore the BOM or not.
   */
  get ignoreBOM(): boolean {
    return this.#decoder.ignoreBOM;
  }

  /**
   * @param label   - The label of the decoder. Must be `"mutf-8"` or `"mutf8"`.
   * @param options - The options for the decoder.
   * @throws `RangeError` If the `label` is an invalid value.
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
 * The encoder for Modified UTF-8. It is the streaming equivalent of {@link MUtf8Encoder}.
 *
 * @example
 * ```ts
 * await getLargeTextAsStream()
 *   .pipeThrough(new MUtf8EncoderStream())
 *   .pipeTo(new WritableStream({
 *     write(chunk) {
 *       // Handle the encoded chunk
 *     }
 *   }));
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/#interface-textencoderstream}
 * @since v1.2.0
 */
export class MUtf8EncoderStream extends TransformStream<string, Uint8Array> {
  /**
   * @returns Always `"mutf-8"`.
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
