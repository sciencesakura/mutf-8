// SPDX-License-Identifier: MIT

import groovy.json.*
import static java.io.ObjectStreamConstants.*

def header = '''\
// This file is generated by scripts/gen-testdatacode.groovy
'''

//  off | field          | value
// -----|----------------|--------------------------------
//    0 | magic          | STREAM_MAGIC
//    2 | version        | STREAM_VERSION
//    4 | tag            | TC_BLOCKDATA
//    5 | size           | sizeof(length) + sizeof(bytes)
//    6 | length         | sizeof(bytes)
//    8 | bytes          | MUTF-8 encoded string
def encode = { text ->
  new ByteArrayOutputStream().with {
    new ObjectOutputStream(it).withCloseable { it.writeUTF(text) }
    def serial = it.toByteArray()
      assert serial[4] == TC_BLOCKDATA
    assert serial[4] == TC_BLOCKDATA
    serial[8..<serial.length].collect(Byte::toUnsignedInt)
  }
}

def decode = { binary ->
  def bin = new byte[binary.length + 8].tap {
    it[0] = (STREAM_MAGIC >> 8) as byte
    it[1] = STREAM_MAGIC as byte
    it[2] = (STREAM_VERSION >> 8) as byte
    it[3] = STREAM_VERSION as byte
    it[4] = TC_BLOCKDATA as byte
    it[5] = (binary.length + 2) as byte
    it[6] = (binary.length >> 8) as byte
    it[7] = binary.length as byte
    System.arraycopy(binary, 0, it, 8, binary.length)
  }
  new ByteArrayInputStream(bin).with {
    new ObjectInputStream(it).withCloseable { it.readUTF() }
  }
}

def generateTestdataCode = { jsonFile ->
  def code = new StringBuilder(header)
  code << 'const testdata = ['
  new JsonSlurper().parse(jsonFile).each {
    def binary = encode(it.text)
    def jsName = StringEscapeUtils.escapeJavaScript(it.name)
    def jsText = StringEscapeUtils.escapeJavaScript(it.text)
    def jsBinary = binary.collect { '0x' + Integer.toHexString(it) }.join(', ')
    code << """
      |  {
      |    name: "$jsName",
      |    text: "$jsText",
      |    binary: new Uint8Array([$jsBinary]),
      |  },""".stripMargin()
  }
  code << '\n];'
  code << '\nexport default testdata;\n'
  code.toString()
}

new File(this.args[0]).eachFileMatch(~/.*\.json/) { file ->
  def name = file.name.replaceFirst(/\.json$/, '')
  def outFile = new File('src', "testdata-${name}.mts")
  outFile.text = generateTestdataCode(file)
}
