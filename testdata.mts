// This file is generated by scripts/gen-testdatacode.groovy

export default [
  {
    name: "The null character",
    text: "\u0000",
    binary: new Uint8Array([0xc0, 0x80]),
  },
  {
    name: "A character whose code point is between U+0001 and U+007F",
    text: "A",
    binary: new Uint8Array([0x41]),
  },
  {
    name: "A character whose code point is between U+0080 and U+07FF",
    text: "\u00C4",
    binary: new Uint8Array([0xc3, 0x84]),
  },
  {
    name: "A character whose code point is between U+0800 and U+FFFF",
    text: "\u3042",
    binary: new Uint8Array([0xe3, 0x81, 0x82]),
  },
  {
    name: "A character whose code point is above U+FFFF",
    text: "\uD83D\uDC22",
    binary: new Uint8Array([0xed, 0xa0, 0xbd, 0xed, 0xb0, 0xa2]),
  },
  {
    name: "A message text (en)",
    text: "The quick brown fox jumps over the lazy dog.",
    binary: new Uint8Array([0x54, 0x68, 0x65, 0x20, 0x71, 0x75, 0x69, 0x63, 0x6b, 0x20, 0x62, 0x72, 0x6f, 0x77, 0x6e, 0x20, 0x66, 0x6f, 0x78, 0x20, 0x6a, 0x75, 0x6d, 0x70, 0x73, 0x20, 0x6f, 0x76, 0x65, 0x72, 0x20, 0x74, 0x68, 0x65, 0x20, 0x6c, 0x61, 0x7a, 0x79, 0x20, 0x64, 0x6f, 0x67, 0x2e]),
  },
  {
    name: "A message text (fr)",
    text: "Le c\u0153ur d\u00E9\u00E7u mais l\'\u00E2me plut\u00F4t na\u00EFve, Lou\u00FFs r\u00EAva de crapa\u00FCter en cano\u00EB au del\u00E0 des \u00EEles, pr\u00E8s du m\u00E4lstr\u00F6m o\u00F9 br\u00FBlent les nov\u00E6.",
    binary: new Uint8Array([0x4c, 0x65, 0x20, 0x63, 0xc5, 0x93, 0x75, 0x72, 0x20, 0x64, 0xc3, 0xa9, 0xc3, 0xa7, 0x75, 0x20, 0x6d, 0x61, 0x69, 0x73, 0x20, 0x6c, 0x27, 0xc3, 0xa2, 0x6d, 0x65, 0x20, 0x70, 0x6c, 0x75, 0x74, 0xc3, 0xb4, 0x74, 0x20, 0x6e, 0x61, 0xc3, 0xaf, 0x76, 0x65, 0x2c, 0x20, 0x4c, 0x6f, 0x75, 0xc3, 0xbf, 0x73, 0x20, 0x72, 0xc3, 0xaa, 0x76, 0x61, 0x20, 0x64, 0x65, 0x20, 0x63, 0x72, 0x61, 0x70, 0x61, 0xc3, 0xbc, 0x74, 0x65, 0x72, 0x20, 0x65, 0x6e, 0x20, 0x63, 0x61, 0x6e, 0x6f, 0xc3, 0xab, 0x20, 0x61, 0x75, 0x20, 0x64, 0x65, 0x6c, 0xc3, 0xa0, 0x20, 0x64, 0x65, 0x73, 0x20, 0xc3, 0xae, 0x6c, 0x65, 0x73, 0x2c, 0x20, 0x70, 0x72, 0xc3, 0xa8, 0x73, 0x20, 0x64, 0x75, 0x20, 0x6d, 0xc3, 0xa4, 0x6c, 0x73, 0x74, 0x72, 0xc3, 0xb6, 0x6d, 0x20, 0x6f, 0xc3, 0xb9, 0x20, 0x62, 0x72, 0xc3, 0xbb, 0x6c, 0x65, 0x6e, 0x74, 0x20, 0x6c, 0x65, 0x73, 0x20, 0x6e, 0x6f, 0x76, 0xc3, 0xa6, 0x2e]),
  },
  {
    name: "A message text (pt)",
    text: "Um pequeno jabuti xereta viu dez cegonhas felizes.",
    binary: new Uint8Array([0x55, 0x6d, 0x20, 0x70, 0x65, 0x71, 0x75, 0x65, 0x6e, 0x6f, 0x20, 0x6a, 0x61, 0x62, 0x75, 0x74, 0x69, 0x20, 0x78, 0x65, 0x72, 0x65, 0x74, 0x61, 0x20, 0x76, 0x69, 0x75, 0x20, 0x64, 0x65, 0x7a, 0x20, 0x63, 0x65, 0x67, 0x6f, 0x6e, 0x68, 0x61, 0x73, 0x20, 0x66, 0x65, 0x6c, 0x69, 0x7a, 0x65, 0x73, 0x2e]),
  },
  {
    name: "A message text (ru)",
    text: "\u0428\u0438\u0440\u043E\u043A\u0430\u044F \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u044E\u0436\u043D\u044B\u0445 \u0433\u0443\u0431\u0435\u0440\u043D\u0438\u0439 \u0434\u0430\u0441\u0442 \u043C\u043E\u0449\u043D\u044B\u0439 \u0442\u043E\u043B\u0447\u043E\u043A \u043F\u043E\u0434\u044A\u0451\u043C\u0443 \u0441\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u0445\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u0430.",
    binary: new Uint8Array([0xd0, 0xa8, 0xd0, 0xb8, 0xd1, 0x80, 0xd0, 0xbe, 0xd0, 0xba, 0xd0, 0xb0, 0xd1, 0x8f, 0x20, 0xd1, 0x8d, 0xd0, 0xbb, 0xd0, 0xb5, 0xd0, 0xba, 0xd1, 0x82, 0xd1, 0x80, 0xd0, 0xb8, 0xd1, 0x84, 0xd0, 0xb8, 0xd0, 0xba, 0xd0, 0xb0, 0xd1, 0x86, 0xd0, 0xb8, 0xd1, 0x8f, 0x20, 0xd1, 0x8e, 0xd0, 0xb6, 0xd0, 0xbd, 0xd1, 0x8b, 0xd1, 0x85, 0x20, 0xd0, 0xb3, 0xd1, 0x83, 0xd0, 0xb1, 0xd0, 0xb5, 0xd1, 0x80, 0xd0, 0xbd, 0xd0, 0xb8, 0xd0, 0xb9, 0x20, 0xd0, 0xb4, 0xd0, 0xb0, 0xd1, 0x81, 0xd1, 0x82, 0x20, 0xd0, 0xbc, 0xd0, 0xbe, 0xd1, 0x89, 0xd0, 0xbd, 0xd1, 0x8b, 0xd0, 0xb9, 0x20, 0xd1, 0x82, 0xd0, 0xbe, 0xd0, 0xbb, 0xd1, 0x87, 0xd0, 0xbe, 0xd0, 0xba, 0x20, 0xd0, 0xbf, 0xd0, 0xbe, 0xd0, 0xb4, 0xd1, 0x8a, 0xd1, 0x91, 0xd0, 0xbc, 0xd1, 0x83, 0x20, 0xd1, 0x81, 0xd0, 0xb5, 0xd0, 0xbb, 0xd1, 0x8c, 0xd1, 0x81, 0xd0, 0xba, 0xd0, 0xbe, 0xd0, 0xb3, 0xd0, 0xbe, 0x20, 0xd1, 0x85, 0xd0, 0xbe, 0xd0, 0xb7, 0xd1, 0x8f, 0xd0, 0xb9, 0xd1, 0x81, 0xd1, 0x82, 0xd0, 0xb2, 0xd0, 0xb0, 0x2e]),
  },
  {
    name: "A message text (ja)",
    text: "\u3044\u308D\u306F\u306B\u307B\u3078\u3068 \u3061\u308A\u306C\u308B\u3092 \u308F\u304B\u3088\u305F\u308C\u305D \u3064\u306D\u306A\u3089\u3080 \u3046\u3090\u306E\u304A\u304F\u3084\u307E \u3051\u3075\u3053\u3048\u3066 \u3042\u3055\u304D\u3086\u3081\u307F\u3057 \u3091\u3072\u3082\u305B\u3059",
    binary: new Uint8Array([0xe3, 0x81, 0x84, 0xe3, 0x82, 0x8d, 0xe3, 0x81, 0xaf, 0xe3, 0x81, 0xab, 0xe3, 0x81, 0xbb, 0xe3, 0x81, 0xb8, 0xe3, 0x81, 0xa8, 0x20, 0xe3, 0x81, 0xa1, 0xe3, 0x82, 0x8a, 0xe3, 0x81, 0xac, 0xe3, 0x82, 0x8b, 0xe3, 0x82, 0x92, 0x20, 0xe3, 0x82, 0x8f, 0xe3, 0x81, 0x8b, 0xe3, 0x82, 0x88, 0xe3, 0x81, 0x9f, 0xe3, 0x82, 0x8c, 0xe3, 0x81, 0x9d, 0x20, 0xe3, 0x81, 0xa4, 0xe3, 0x81, 0xad, 0xe3, 0x81, 0xaa, 0xe3, 0x82, 0x89, 0xe3, 0x82, 0x80, 0x20, 0xe3, 0x81, 0x86, 0xe3, 0x82, 0x90, 0xe3, 0x81, 0xae, 0xe3, 0x81, 0x8a, 0xe3, 0x81, 0x8f, 0xe3, 0x82, 0x84, 0xe3, 0x81, 0xbe, 0x20, 0xe3, 0x81, 0x91, 0xe3, 0x81, 0xb5, 0xe3, 0x81, 0x93, 0xe3, 0x81, 0x88, 0xe3, 0x81, 0xa6, 0x20, 0xe3, 0x81, 0x82, 0xe3, 0x81, 0x95, 0xe3, 0x81, 0x8d, 0xe3, 0x82, 0x86, 0xe3, 0x82, 0x81, 0xe3, 0x81, 0xbf, 0xe3, 0x81, 0x97, 0x20, 0xe3, 0x82, 0x91, 0xe3, 0x81, 0xb2, 0xe3, 0x82, 0x82, 0xe3, 0x81, 0x9b, 0xe3, 0x81, 0x99]),
  },
  {
    name: "A message text (ja half-width)",
    text: "\uFF72\uFF9B\uFF8A\uFF86\uFF8E\uFF8D\uFF84 \uFF81\uFF98\uFF87\uFF99\uFF66 \uFF9C\uFF76\uFF96\uFF80\uFF9A\uFF7F \uFF82\uFF88\uFF85\uFF97\uFF91 \uFF73\uFF72\uFF89\uFF75\uFF78\uFF94\uFF8F \uFF79\uFF8C\uFF7A\uFF74\uFF83 \uFF71\uFF7B\uFF77\uFF95\uFF92\uFF90\uFF7C \uFF74\uFF8B\uFF93\uFF7E\uFF7D",
    binary: new Uint8Array([0xef, 0xbd, 0xb2, 0xef, 0xbe, 0x9b, 0xef, 0xbe, 0x8a, 0xef, 0xbe, 0x86, 0xef, 0xbe, 0x8e, 0xef, 0xbe, 0x8d, 0xef, 0xbe, 0x84, 0x20, 0xef, 0xbe, 0x81, 0xef, 0xbe, 0x98, 0xef, 0xbe, 0x87, 0xef, 0xbe, 0x99, 0xef, 0xbd, 0xa6, 0x20, 0xef, 0xbe, 0x9c, 0xef, 0xbd, 0xb6, 0xef, 0xbe, 0x96, 0xef, 0xbe, 0x80, 0xef, 0xbe, 0x9a, 0xef, 0xbd, 0xbf, 0x20, 0xef, 0xbe, 0x82, 0xef, 0xbe, 0x88, 0xef, 0xbe, 0x85, 0xef, 0xbe, 0x97, 0xef, 0xbe, 0x91, 0x20, 0xef, 0xbd, 0xb3, 0xef, 0xbd, 0xb2, 0xef, 0xbe, 0x89, 0xef, 0xbd, 0xb5, 0xef, 0xbd, 0xb8, 0xef, 0xbe, 0x94, 0xef, 0xbe, 0x8f, 0x20, 0xef, 0xbd, 0xb9, 0xef, 0xbe, 0x8c, 0xef, 0xbd, 0xba, 0xef, 0xbd, 0xb4, 0xef, 0xbe, 0x83, 0x20, 0xef, 0xbd, 0xb1, 0xef, 0xbd, 0xbb, 0xef, 0xbd, 0xb7, 0xef, 0xbe, 0x95, 0xef, 0xbe, 0x92, 0xef, 0xbe, 0x90, 0xef, 0xbd, 0xbc, 0x20, 0xef, 0xbd, 0xb4, 0xef, 0xbe, 0x8b, 0xef, 0xbe, 0x93, 0xef, 0xbd, 0xbe, 0xef, 0xbd, 0xbd]),
  },
  {
    name: "A message text (zh)",
    text: "\u5929\u5730\u7384\u9EC3 \u5B87\u5B99\u6D2A\u8352 \u65E5\u6708\u76C8\u6603 \u8FB0\u5BBF\u5217\u5F35 \u5BD2\u4F86\u6691\u5F80 \u79CB\u6536\u51AC\u85CF",
    binary: new Uint8Array([0xe5, 0xa4, 0xa9, 0xe5, 0x9c, 0xb0, 0xe7, 0x8e, 0x84, 0xe9, 0xbb, 0x83, 0x20, 0xe5, 0xae, 0x87, 0xe5, 0xae, 0x99, 0xe6, 0xb4, 0xaa, 0xe8, 0x8d, 0x92, 0x20, 0xe6, 0x97, 0xa5, 0xe6, 0x9c, 0x88, 0xe7, 0x9b, 0x88, 0xe6, 0x98, 0x83, 0x20, 0xe8, 0xbe, 0xb0, 0xe5, 0xae, 0xbf, 0xe5, 0x88, 0x97, 0xe5, 0xbc, 0xb5, 0x20, 0xe5, 0xaf, 0x92, 0xe4, 0xbe, 0x86, 0xe6, 0x9a, 0x91, 0xe5, 0xbe, 0x80, 0x20, 0xe7, 0xa7, 0x8b, 0xe6, 0x94, 0xb6, 0xe5, 0x86, 0xac, 0xe8, 0x97, 0x8f]),
  },
  {
    name: "A message text (ko)",
    text: "\uD0A4\uC2A4\uC758 \uACE0\uC720\uC870\uAC74\uC740 \uC785\uC220\uB07C\uB9AC \uB9CC\uB098\uC57C \uD558\uACE0 \uD2B9\uBCC4\uD55C \uAE30\uC220\uC740 \uD544\uC694\uCE58 \uC54A\uB2E4.",
    binary: new Uint8Array([0xed, 0x82, 0xa4, 0xec, 0x8a, 0xa4, 0xec, 0x9d, 0x98, 0x20, 0xea, 0xb3, 0xa0, 0xec, 0x9c, 0xa0, 0xec, 0xa1, 0xb0, 0xea, 0xb1, 0xb4, 0xec, 0x9d, 0x80, 0x20, 0xec, 0x9e, 0x85, 0xec, 0x88, 0xa0, 0xeb, 0x81, 0xbc, 0xeb, 0xa6, 0xac, 0x20, 0xeb, 0xa7, 0x8c, 0xeb, 0x82, 0x98, 0xec, 0x95, 0xbc, 0x20, 0xed, 0x95, 0x98, 0xea, 0xb3, 0xa0, 0x20, 0xed, 0x8a, 0xb9, 0xeb, 0xb3, 0x84, 0xed, 0x95, 0x9c, 0x20, 0xea, 0xb8, 0xb0, 0xec, 0x88, 0xa0, 0xec, 0x9d, 0x80, 0x20, 0xed, 0x95, 0x84, 0xec, 0x9a, 0x94, 0xec, 0xb9, 0x98, 0x20, 0xec, 0x95, 0x8a, 0xeb, 0x8b, 0xa4, 0x2e]),
  },
  {
    name: "A message text (hi)",
    text: "\u0915\u091A\u094D\u091A\u093E \u092A\u093E\u092A\u0921\u093C \u092A\u0915\u094D\u0915\u093E \u092A\u093E\u092A\u0921\u093C",
    binary: new Uint8Array([0xe0, 0xa4, 0x95, 0xe0, 0xa4, 0x9a, 0xe0, 0xa5, 0x8d, 0xe0, 0xa4, 0x9a, 0xe0, 0xa4, 0xbe, 0x20, 0xe0, 0xa4, 0xaa, 0xe0, 0xa4, 0xbe, 0xe0, 0xa4, 0xaa, 0xe0, 0xa4, 0xa1, 0xe0, 0xa4, 0xbc, 0x20, 0xe0, 0xa4, 0xaa, 0xe0, 0xa4, 0x95, 0xe0, 0xa5, 0x8d, 0xe0, 0xa4, 0x95, 0xe0, 0xa4, 0xbe, 0x20, 0xe0, 0xa4, 0xaa, 0xe0, 0xa4, 0xbe, 0xe0, 0xa4, 0xaa, 0xe0, 0xa4, 0xa1, 0xe0, 0xa4, 0xbc]),
  },
  {
    name: "A message text (he)",
    text: "\u05E2\u05D8\u05DC\u05E3 \u05D0\u05D1\u05E7 \u05E0\u05E1 \u05D3\u05E8\u05DA \u05DE\u05D6\u05D2\u05DF \u05E9\u05D4\u05EA\u05E4\u05D5\u05E6\u05E5 \u05DB\u05D9 \u05D7\u05DD",
    binary: new Uint8Array([0xd7, 0xa2, 0xd7, 0x98, 0xd7, 0x9c, 0xd7, 0xa3, 0x20, 0xd7, 0x90, 0xd7, 0x91, 0xd7, 0xa7, 0x20, 0xd7, 0xa0, 0xd7, 0xa1, 0x20, 0xd7, 0x93, 0xd7, 0xa8, 0xd7, 0x9a, 0x20, 0xd7, 0x9e, 0xd7, 0x96, 0xd7, 0x92, 0xd7, 0x9f, 0x20, 0xd7, 0xa9, 0xd7, 0x94, 0xd7, 0xaa, 0xd7, 0xa4, 0xd7, 0x95, 0xd7, 0xa6, 0xd7, 0xa5, 0x20, 0xd7, 0x9b, 0xd7, 0x99, 0x20, 0xd7, 0x97, 0xd7, 0x9d]),
  },
  {
    name: "Emojis",
    text: "\uD83D\uDE00\uD83D\uDE03\uD83D\uDE04\uD83D\uDE01\uD83D\uDE06\uD83D\uDE05\uD83D\uDE02\uD83E\uDD23\uD83D\uDE0A\uD83D\uDE07\uD83D\uDE0D\uD83D\uDE18\uD83D\uDE17\uD83D\uDE19\uD83D\uDE1A\uD83D\uDE0B\uD83D\uDE1B\uD83D\uDE1C\uD83D\uDE1D\uD83D\uDE0E\uD83D\uDE2D\uD83D\uDE0C\uD83D\uDE16\uD83D\uDE14\uD83D\uDE1E\uD83D\uDE22\uD83D\uDE20\uD83D\uDE21\uD83D\uDE2A",
    binary: new Uint8Array([0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x80, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x83, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x84, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x81, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x86, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x85, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x82, 0xed, 0xa0, 0xbe, 0xed, 0xb4, 0xa3, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x8a, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x87, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x8d, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x98, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x97, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x99, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x9a, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x8b, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x9b, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x9c, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x9d, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x8e, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0xad, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x8c, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x96, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x94, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0x9e, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0xa2, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0xa0, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0xa1, 0xed, 0xa0, 0xbd, 0xed, 0xb8, 0xaa]),
  },
];
