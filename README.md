# mutf-8: An Encoder and Decoder for Modified UTF-8

![](https://github.com/sciencesakura/mutf-8/actions/workflows/build.yaml/badge.svg) [![npm version](https://badge.fury.io/js/mutf-8.svg)](https://badge.fury.io/js/mutf-8)

## What is Modified UTF-8?

Modified UTF-8 is a variant of UTF-8 used in the Java platform, such as the class file format and object serialization.

See [The Java Virtual Machine Specification, Java SE 21 Edition, Section 4.4.7](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.4.7) for details.

## Installation

```sh
npm install mutf-8
```

If you want to use the stream API, install the `mutf-8-stream` module instead.

```sh
npm install mutf-8-stream
```

## Usage

The APIs are similar to [WHATWG Encoding](https://encoding.spec.whatwg.org/).

```javascript
import { MUtf8Decoder, MUtf8Encoder } from "mutf-8";

const encoder = new MUtf8Encoder();
const code = encoder.encode("Hello 世界! Santé🍻");
// Uint8Array:
//   0x48 0x65 0x6c 0x6c 0x6f 0x20 0xe4 0xb8
//   0x96 0xe7 0x95 0x8c 0x21 0x20 0x53 0x61
//   0x6e 0x74 0xc3 0xa9 0xed 0xa0 0xbc 0xed
//   0xbd 0xbb

const decoder = new MUtf8Decoder();
const text = decoder.decode(code);
// string:
//   Hello 世界! Santé🍻
```

```javascript
import { MUtf8DecoderStream, MUtf8EncoderStream } from "mutf-8-stream";

await getLargeTextAsStream()
  .pipeThrough(new MUtf8EncoderStream())
  .pipeTo(new WritableStream({
    write(chunk) {
      // Handle the encoded chunk
    }
  }));

await getLargeBinaryAsStream()
  .pipeThrough(new MUtf8DecoderStream())
  .pipeTo(new WritableStream({
    write(chunk) {
      // Handle the decoded chunk
    }
  }));
```

See [API Reference](https://sciencesakura.github.io/mutf-8/) for details.

## License

This library is licensed under the MIT License.

Copyright (c) 2025 sciencesakura
