# mutf-8: Encoder/Decoder for Modified UTF-8

![](https://github.com/sciencesakura/mutf-8/actions/workflows/check.yaml/badge.svg) [![npm version](https://badge.fury.io/js/mutf-8.svg)](https://badge.fury.io/js/mutf-8)

## What is Modified UTF-8?

Modified UTF-8 (MUTF-8) is used in the Java platform, such as the class file format and object serialization.

See [The Java Virtual Machine Specification, Java SE 21 Edition, section 4.4.7](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.4.7) for details.

## Installation

```sh
npm install mutf-8
```

## Usage

The APIs are similar to [WHATWG TextEncoder/TextDecoder](https://encoding.spec.whatwg.org/).

```javascript
import { MUtf8Decoder, MUtf8Encoder } from "mutf-8";         // ES Modules
// const { MUtf8Decoder, MUtf8Encoder } = require("mutf-8"); // CommonJS

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

See [API reference](https://sciencesakura.github.io/mutf-8/) for details.

## License

This library is licensed under the MIT License.

Copyright (c) 2025 sciencesakura
