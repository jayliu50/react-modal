# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-28

### Added
- Support for React 18+
- Enhanced TypeScript support with TypeScript 5.6.3
- Modern build tooling and dependency management

### Changed
- **Breaking**: Updated minimum React peer dependency from `>=16` to `>=18`
- Updated theme-ui from `^0.3.1` to `^0.17.2` (latest stable)
- Updated @theme-ui/presets from `^0.3.0` to `^0.17.2`
- Updated @theme-ui/match-media from `^0.3.1` to `^0.17.2`
- Updated TypeScript from `^3.9.7` to `^5.6.3`
- Updated framer-motion from `^2.3.0` to `^2.9.5` (latest v2.x)
- Updated React dev dependencies to `^18.3.1`
- Updated React type definitions to `^18.3.24`
- Upgraded Storybook from v5.3.x to v8.6.x
- Modernized Storybook configuration to use latest format
- Updated build tools to use webpack5 for Storybook

### Removed
- Removed `@types/theme-ui` dependency (types now included in main package)
- Removed deprecated Storybook addons and replaced with modern equivalents

### Fixed
- Fixed AnimatePresence TypeScript compatibility issues with newer TypeScript version
- Improved type safety by removing `@ts-ignore` directive for `useResponsiveValue` import
- Fixed peer dependency conflicts between old Storybook and React 18

### Security
- Updated dependencies to eliminate known vulnerabilities
- Modernized dependency versions for better long-term support

### Technical Details
- Enhanced TypeScript configuration for better type checking
- Improved build performance with modern dependency versions
- Updated development environment to support latest React features
- Streamlined Storybook development workflow

## [1.0.3] - Previous Release
- Previous stable release with React 16+ support and theme-ui 0.3.x