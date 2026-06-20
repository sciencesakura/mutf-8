# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
