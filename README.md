# mutf-8: An Encoder and Decoder for Modified UTF-8

![](https://github.com/sciencesakura/mutf-8/actions/workflows/build.yaml/badge.svg) [![npm version](https://badge.fury.io/js/mutf-8.svg)](https://badge.fury.io/js/mutf-8)

A TypeScript/JavaScript library for encoding and decoding Modified UTF-8, the character encoding variant used in the Java platform for class files, object serialization, and other Java technologies.

## What is Modified UTF-8?

Modified UTF-8 is a variant of UTF-8 encoding used internally by the Java platform. It differs from standard UTF-8 in the following ways:

- **Null character**: The null character U+0000 is encoded as a 2-byte sequence 0xC0 0x80 instead of the single byte 0x00.
- **Supplementary characters**: Characters whose code points are above U+FFFF are encoded as two 3-byte sequences instead of a single 4-byte sequence.

See [The Java Virtual Machine Specification, Java SE 21 Edition, Section 4.4.7](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.4.7) for more details.

## Installation

You can install the mutf-8 library via npm or npm-compatible package managers. It comes in two packages:

### Core Package

```sh
npm install mutf-8
```

### Stream Package (Optional)

For streaming operations with large data sets:

```sh
npm install mutf-8-stream
```

## Usage

The APIs are compatible with the [WHATWG Encoding Standard](https://encoding.spec.whatwg.org/) standard, providing a simple interface for encoding and decoding Modified UTF-8.

### Basic Encoding and Decoding

```javascript
import { MUtf8Decoder, MUtf8Encoder } from "mutf-8";

const encoder = new MUtf8Encoder();
const decoder = new MUtf8Decoder();

// Encode a string to Modified UTF-8 bytes
const text = "Hello 世界! Santé🍻";
const encoded = encoder.encode(text);
console.log(encoded);
// Uint8Array [
//   0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe4, 0xb8,
//   0x96, 0xe7, 0x95, 0x8c, 0x21, 0x20, 0x53, 0x61,
//   0x6e, 0x74, 0xc3, 0xa9, 0xed, 0xa0, 0xbc, 0xed,
//   0xbd, 0xbb
// ]

// Decode Modified UTF-8 bytes back to string
const decoded = decoder.decode(encoded);
console.log(decoded); // "Hello 世界! Santé🍻"
```

### Error Handling

```javascript
import { MUtf8Decoder } from "mutf-8";

// Default behavior: replace invalid bytes with replacement character (U+FFFD)
const decoder = new MUtf8Decoder();
const invalidBytes = new Uint8Array([0xFF, 0xFE]);
console.log(decoder.decode(invalidBytes)); // "��" (replacement characters)

// Fatal mode: throw TypeError on invalid input
const strictDecoder = new MUtf8Decoder("mutf-8", { fatal: true });
try {
  strictDecoder.decode(invalidBytes);
} catch (error) {
  console.error("Decoding failed:", error.message);
}
```

### Stream API

For processing large amounts of data efficiently:

```javascript
import { MUtf8DecoderStream, MUtf8EncoderStream } from "mutf-8-stream";

// Encoding large text streams
const textStream = new ReadableStream({
  start(controller) {
    controller.enqueue("Large text chunk 1");
    controller.enqueue("Large text chunk 2");
    controller.close();
  }
});

await textStream
  .pipeThrough(new MUtf8EncoderStream())
  .pipeTo(new WritableStream({
    write(chunk) {
      console.log("Encoded chunk:", chunk);
    }
  }));

// Decoding large binary streams
const binaryStream = new ReadableStream({
  start(controller) {
    controller.enqueue(new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]));
    controller.enqueue(new Uint8Array([0x20, 0xe4, 0xb8, 0x96, 0xe7]));
    controller.enqueue(new Uint8Array([0x95, 0x8c, 0x21]));
    controller.close();
  }
});

await binaryStream
  .pipeThrough(new MUtf8DecoderStream())
  .pipeTo(new WritableStream({
    write(chunk) {
      console.log("Decoded chunk:", chunk);
    }
  }));
```

See [API Documentation](https://sciencesakura.github.io/mutf-8/) for more details.

## License

This library is licensed under the MIT License.

Copyright (c) 2025 sciencesakura
