// SPDX-License-Identifier: MIT

import { bench, describe } from "vitest";
import { MUtf8Decoder, MUtf8Encoder } from "./index.js";

const asciiText = "The quick brown fox jumps over the lazy dog.";
const latinText = "Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich.";
const asianText = "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら";
const emojiText = "😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚";
const mixedText = `${asciiText} ${latinText} ${asianText} ${emojiText}`;

const encoder = new MUtf8Encoder();
const decoder = new MUtf8Decoder();

describe("MUtf8Decoder.decode", () => {
  describe("ASCII text", () => {
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

describe("MUtf8Encoder.encode", () => {
  describe("ASCII text", () => {
    const asciiText500 = stretch(asciiText, 500);
    const asciiText5K = stretch(asciiText, 5000);
    const asciiText50K = stretch(asciiText, 50000);

    bench("encode 500 length string", () => {
      encoder.encode(asciiText500);
    });

    bench("encode 5K length string", () => {
      encoder.encode(asciiText5K);
    });

    bench("encode 50K length string", () => {
      encoder.encode(asciiText50K);
    });
  });

  describe("Latin-1 text", () => {
    const latinText500 = stretch(latinText, 500);
    const latinText5K = stretch(latinText, 5000);
    const latinText50K = stretch(latinText, 50000);

    bench("encode 500 length string", () => {
      encoder.encode(latinText500);
    });

    bench("encode 5K length string", () => {
      encoder.encode(latinText5K);
    });

    bench("encode 50K length string", () => {
      encoder.encode(latinText50K);
    });
  });

  describe("Asian text", () => {
    const asianText500 = stretch(asianText, 500);
    const asianText5K = stretch(asianText, 5000);
    const asianText50K = stretch(asianText, 50000);

    bench("encode 500 length string", () => {
      encoder.encode(asianText500);
    });

    bench("encode 5K length string", () => {
      encoder.encode(asianText5K);
    });

    bench("encode 50K length string", () => {
      encoder.encode(asianText50K);
    });
  });

  describe("Emoji text", () => {
    const emojiText500 = stretch(emojiText, 500);
    const emojiText5K = stretch(emojiText, 5000);
    const emojiText50K = stretch(emojiText, 50000);

    bench("encode 500 length string", () => {
      encoder.encode(emojiText500);
    });

    bench("encode 5K length string", () => {
      encoder.encode(emojiText5K);
    });

    bench("encode 50K length string", () => {
      encoder.encode(emojiText50K);
    });
  });

  describe("Mixed text", () => {
    const mixedText500 = stretch(mixedText, 500);
    const mixedText5K = stretch(mixedText, 5000);
    const mixedText50K = stretch(mixedText, 50000);

    bench("encode 500 length string", () => {
      encoder.encode(mixedText500);
    });

    bench("encode 5K length string", () => {
      encoder.encode(mixedText5K);
    });

    bench("encode 50K length string", () => {
      encoder.encode(mixedText50K);
    });
  });
});

describe("MUtf8Encoder.encodeInto", () => {
  const buffer = new Uint8Array(800000);

  describe("ASCII text", () => {
    const asciiText500 = stretch(asciiText, 500);
    const asciiText5K = stretch(asciiText, 5000);
    const asciiText50K = stretch(asciiText, 50000);

    bench("encode 500 length string", () => {
      encoder.encodeInto(asciiText500, buffer);
    });

    bench("encode 5K length string", () => {
      encoder.encodeInto(asciiText5K, buffer);
    });

    bench("encode 50K length string", () => {
      encoder.encodeInto(asciiText50K, buffer);
    });
  });

  describe("Latin-1 text", () => {
    const latinText500 = stretch(latinText, 500);
    const latinText5K = stretch(latinText, 5000);
    const latinText50K = stretch(latinText, 50000);

    bench("encode 500 length string", () => {
      encoder.encodeInto(latinText500, buffer);
    });

    bench("encode 5K length string", () => {
      encoder.encodeInto(latinText5K, buffer);
    });

    bench("encode 50K length string", () => {
      encoder.encodeInto(latinText50K, buffer);
    });
  });

  describe("Asian text", () => {
    const asianText500 = stretch(asianText, 500);
    const asianText5K = stretch(asianText, 5000);
    const asianText50K = stretch(asianText, 50000);

    bench("encode 500 length string", () => {
      encoder.encodeInto(asianText500, buffer);
    });

    bench("encode 5K length string", () => {
      encoder.encodeInto(asianText5K, buffer);
    });

    bench("encode 50K length string", () => {
      encoder.encodeInto(asianText50K, buffer);
    });
  });

  describe("Emoji text", () => {
    const emojiText500 = stretch(emojiText, 500);
    const emojiText5K = stretch(emojiText, 5000);
    const emojiText50K = stretch(emojiText, 50000);

    bench("encode 500 length string", () => {
      encoder.encodeInto(emojiText500, buffer);
    });

    bench("encode 5K length string", () => {
      encoder.encodeInto(emojiText5K, buffer);
    });

    bench("encode 50K length string", () => {
      encoder.encodeInto(emojiText50K, buffer);
    });
  });

  describe("Mixed text", () => {
    const mixedText500 = stretch(mixedText, 500);
    const mixedText5K = stretch(mixedText, 5000);
    const mixedText50K = stretch(mixedText, 50000);

    bench("encode 500 length string", () => {
      encoder.encodeInto(mixedText500, buffer);
    });

    bench("encode 5K length string", () => {
      encoder.encodeInto(mixedText5K, buffer);
    });

    bench("encode 50K length string", () => {
      encoder.encodeInto(mixedText50K, buffer);
    });
  });
});

function stretch(text: string, length: number): string {
  return text.repeat(Math.ceil(length / text.length)).slice(0, length);
}
