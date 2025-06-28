// SPDX-License-Identifier: MIT

import { bench, describe } from "vitest";
import { MUtf8Decoder, MUtf8Encoder } from "./index.js";

const encoder = new MUtf8Encoder();
const decoder = new MUtf8Decoder();

describe("MUtf8Decoder.decode", () => {
  describe("ASCII text", () => {
    const asciiText = "The quick brown fox jumps over the lazy dog.";
    const asciiBytes500 = encoder.encode(stretch(asciiText, 500));
    const asciiBytes5K = encoder.encode(stretch(asciiText, 5000));
    const asciiBytes50K = encoder.encode(stretch(asciiText, 50000));

    bench("decode 500 length string", () => {
      decoder.decode(asciiBytes500);
    });

    bench("decode 5K length string", () => {
      decoder.decode(asciiBytes5K);
    });

    bench("decode 50K length string", () => {
      decoder.decode(asciiBytes50K);
    });
  });

  describe("Latin-1 text", () => {
    const latinText = "Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich.";
    const latin1Bytes500 = encoder.encode(stretch(latinText, 500));
    const latin1Bytes5K = encoder.encode(stretch(latinText, 5000));
    const latin1Bytes50K = encoder.encode(stretch(latinText, 50000));

    bench("decode 500 length string", () => {
      decoder.decode(latin1Bytes500);
    });

    bench("decode 5K length string", () => {
      decoder.decode(latin1Bytes5K);
    });

    bench("decode 50K length string", () => {
      decoder.decode(latin1Bytes50K);
    });
  });

  describe("Asian text", () => {
    const asianText = "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら";
    const asianBytes500 = encoder.encode(stretch(asianText, 500));
    const asianBytes5K = encoder.encode(stretch(asianText, 5000));
    const asianBytes50K = encoder.encode(stretch(asianText, 50000));

    bench("decode 500 length string", () => {
      decoder.decode(asianBytes500);
    });

    bench("decode 5K length string", () => {
      decoder.decode(asianBytes5K);
    });

    bench("decode 50K length string", () => {
      decoder.decode(asianBytes50K);
    });
  });

  describe("Emoji text", () => {
    const emojiText = "😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚";
    const emojiBytes500 = encoder.encode(stretch(emojiText, 500));
    const emojiBytes5K = encoder.encode(stretch(emojiText, 5000));
    const emojiBytes50K = encoder.encode(stretch(emojiText, 50000));

    bench("decode 500 length string", () => {
      decoder.decode(emojiBytes500);
    });

    bench("decode 5K length string", () => {
      decoder.decode(emojiBytes5K);
    });

    bench("decode 50K length string", () => {
      decoder.decode(emojiBytes50K);
    });
  });

  describe("Mixed text", () => {
    const mixedText =
      "The quick brown fox jumps over the lazy dog. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら 😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚";
    const mixedBytes500 = encoder.encode(stretch(mixedText, 500));
    const mixedBytes5K = encoder.encode(stretch(mixedText, 5000));
    const mixedBytes50K = encoder.encode(stretch(mixedText, 50000));

    bench("decode 500 length string", () => {
      decoder.decode(mixedBytes500);
    });

    bench("decode 5K length string", () => {
      decoder.decode(mixedBytes5K);
    });

    bench("decode 50K length string", () => {
      decoder.decode(mixedBytes50K);
    });
  });
});

function stretch(text: string, length: number): string {
  return text.repeat(Math.ceil(length / text.length)).slice(0, length);
}
