// SPDX-License-Identifier: MIT
import { type AllowSharedBufferSource, MUtf8Decoder, MUtf8Encoder, type TextDecoderOptions } from "mutf-8";

/**
 * The decoder for Modified UTF-8. It is the streaming equivalent of {@link MUtf8Decoder}.
 *
 * @example
 * ```ts
 * // Convert Modified UTF-8 stream to UTF-8 stream.
 * await mutf8Stream.pipeThrough(new MUtf8DecoderStream())
 *   .pipeThrough(new TextEncoderStream())
 *   .pipeTo(destination);
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/}
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
   * Creates an instance of `MUtf8DecoderStream`.
   *
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
 * // Convert UTF-8 stream to Modified UTF-8 stream.
 * await utf8Stream.pipeThrough(new TextDecoderStream())
 *   .pipeThrough(new MUtf8EncoderStream())
 *   .pipeTo(destination);
 * ```
 *
 * @see {@link https://encoding.spec.whatwg.org/}
 */
export class MUtf8EncoderStream extends TransformStream<string, Uint8Array> {
  /**
   * @returns Always `"mutf-8"`.
   */
  get encoding(): string {
    return "mutf-8";
  }

  /**
   * Creates an instance of `MUtf8EncoderStream`.
   */
  constructor() {
    const encoder = new MUtf8Encoder();
    super({
      transform: (chunk, controller) => {
        controller.enqueue(encoder.encode(chunk));
      },
    });
  }
}
