# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Add
- Add Dependabot settings (https://github.com/sciencesakura/mutf-8/pull/56).
### Changed
- Bump npm-run-all2 from 8.0.4 to 9.0.1 (https://github.com/sciencesakura/mutf-8/pull/58).
- Bump vitest from 4.0.18 to 4.1.8 (https://github.com/sciencesakura/mutf-8/pull/61).
- Bump cpx2 from 8.0.0 to 9.0.0 (https://github.com/sciencesakura/mutf-8/pull/60).
- Bump renamer from 5.0.2 to 5.0.3 (https://github.com/sciencesakura/mutf-8/pull/62).
- Bump markdown-it from 14.1.1 to 14.2.0 (https://github.com/sciencesakura/mutf-8/pull/63).
- Bump shell-quote from 1.8.3 to 1.8.4 (https://github.com/sciencesakura/mutf-8/pull/67).
- Bump minimatch and typedoc (https://github.com/sciencesakura/mutf-8/pull/69).
- Arrage test code (https://github.com/sciencesakura/mutf-8/pull/70).
- Change Dependabot settings to ignore minor updates of Actions (https://github.com/sciencesakura/mutf-8/pull/71).
- Bump actions/checkout from 6 to 7 (https://github.com/sciencesakura/mutf-8/pull/73).
- Bump npm-run-all2 from 9.0.1 to 9.0.2 (https://github.com/sciencesakura/mutf-8/pull/75).
- Bump vitest from 4.1.8 to 4.1.10 (https://github.com/sciencesakura/mutf-8/pull/77).
- Bump typedoc from 0.28.19 to 0.28.20 (https://github.com/sciencesakura/mutf-8/pull/78).
- Bump brace-expansion from 5.0.6 to 5.0.7 (https://github.com/sciencesakura/mutf-8/pull/79).
- Bump shell-quote from 1.8.4 to 1.10.0 (https://github.com/sciencesakura/mutf-8/pull/80).

## [1.2.3] - 2026-06-20
### Changed
- Upgrade Node to v24 (https://github.com/sciencesakura/mutf-8/pull/49).
- Replace Debian base image with Alpine (https://github.com/sciencesakura/mutf-8/pull/51).
- To prepare for TS6, explicitly set rootDir (https://github.com/sciencesakura/mutf-8/pull/52).
- Migrate to npm trusted publishing (https://github.com/sciencesakura/mutf-8/pull/55).

### Fixed
- Fix decoder to respect buffer byteLength (https://github.com/sciencesakura/mutf-8/pull/54).

## [1.2.2] - 2025-06-30
### Fixed
- Fix decoder to respect offsets (https://github.com/sciencesakura/mutf-8/pull/46).

## [1.2.1] - 2025-06-28
### Added
- Add Dev Container configuration (https://github.com/sciencesakura/mutf-8/pull/39).

### Changed
- Enhance documentation in source files and README (https://github.com/sciencesakura/mutf-8/pull/40).
- Improve decoding performance (https://github.com/sciencesakura/mutf-8/pull/41).
- Improve encoding performance (https://github.com/sciencesakura/mutf-8/pull/42).

## [1.2.0] - 2025-02-17
### Add
- Implement the streaming equivalent of `MUtf8Encoder` and `MUtf8Decoder` (https://github.com/sciencesakura/mutf-8/pull/35).

### Changed
- Enhance documentation in source files and README (https://github.com/sciencesakura/mutf-8/pull/33).
- Introduce npm workspace support for planned module splitting (https://github.com/sciencesakura/mutf-8/pull/34).
- Enhance documentation in source files and README (https://github.com/sciencesakura/mutf-8/pull/36).
