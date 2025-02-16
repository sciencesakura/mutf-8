// SPDX-License-Identifier: MIT

import { describe, expect, test } from "vitest";
import { MUtf8DecoderStream, MUtf8EncoderStream } from "./index.js";
import testdata from "./testdata.mjs";

describe("MUtf8DecoderStream", () => {
  async function readAll(stream: ReadableStream<string>): Promise<string> {
    const chunks: string[] = [];
    for await (const item of stream) {
      chunks.push(item);
    }
    return chunks.join("");
  }

  test("decode an empty stream", async () => {
    const decoder = new MUtf8DecoderStream();
    const decodingStream = new ReadableStream({
      start(controller) {
        controller.close();
      },
    }).pipeThrough(decoder);
    await expect(readAll(decodingStream)).resolves.toBe("");
  });

  test.each(testdata)("decode a chunked byte sequence representing the text: $text", async ({ text, binary }) => {
    const decoder = new MUtf8DecoderStream();
    const writer = decoder.writable.getWriter();
    // Split the binary into chunks of 5 bytes
    for (let i = 0; i < binary.length; i += 5) {
      writer.write(binary.slice(i, i + 5));
    }
    writer.close();
    await expect(readAll(decoder.readable)).resolves.toBe(text);
  });

  test("when fatal is true, an invalid byte sequence causes a TypeError", async () => {
    const decoder = new MUtf8DecoderStream("mutf-8", { fatal: true });
    expect(decoder.fatal).toBe(true);
    const decodingStream = new Blob([new Uint8Array([0x61, 0x80, 0x62])]).stream().pipeThrough(decoder);
    await expect(readAll(decodingStream)).rejects.toThrow(TypeError);
  });

  test("when fatal is false, an invalid byte sequence is replaced by U+FFFD", async () => {
    const decoder = new MUtf8DecoderStream("mutf-8", { fatal: false });
    expect(decoder.fatal).toBe(false);
    const decodingStream = new Blob([new Uint8Array([0x61, 0x80, 0x62])]).stream().pipeThrough(decoder);
    await expect(readAll(decodingStream)).resolves.toBe("a\ufffdb");
  });
});

describe("MUtf8EncoderStream", () => {
  async function readAll(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
    const temp: Uint8Array[] = [];
    let length = 0;
    for await (const item of stream) {
      temp.push(item);
      length += item.length;
    }
    const result = new Uint8Array(length);
    let offset = 0;
    for (const chunk of temp) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  }

  test("encode an empty stream", async () => {
    const encoder = new MUtf8EncoderStream();
    const encodingStream = new ReadableStream({
      start(controller) {
        controller.close();
      },
    }).pipeThrough(encoder);
    await expect(readAll(encodingStream)).resolves.toEqual(new Uint8Array(0));
  });

  test.each(testdata)("encode the text: $text", async ({ text, binary }) => {
    const encoder = new MUtf8EncoderStream();
    const writer = encoder.writable.getWriter();
    // Split the text into chunks of 3 characters
    for (let i = 0; i < text.length; i += 3) {
      writer.write(text.slice(i, i + 3));
    }
    writer.close();
    await expect(readAll(encoder.readable)).resolves.toEqual(binary);
  });
});
