---
hide-toc: true
---

# Changelog

All notable changes to Lumyn Labs products will be documented here.

---

## [2026.1.2] - February 5, 2026

This release introduces Matrix Text 2.0 with enhanced text rendering capabilities, alongside new standalone SDKs and stability improvements.

### Firmware

#### Added

**Matrix Text 2.0**: Major enhancements to matrix text functionality:

- **Multiple Fonts**: Choose from optimized fonts for LED matrices (`BUILTIN`, `FREE_SANS_9`)
- **Foreground & Background Colors**: Independent color control for text and background
- **Static Text Mode**: Display non-scrolling text with precise positioning
- **Ping Pong Scrolling**: Text scrolls forward then reverses for smooth bouncing animation
- **Smooth Scrolling**: Pixel-by-pixel text movement for improved readability
- **Y-Offset Control**: Fine vertical positioning with `WithYOffset(int8_t)` for perfect centering
- **Text Alignment**: Left, center, and right alignment options for static text

### Vendordep

#### Added

**Enhanced Matrix Text Builder**: The fluent builder API now supports all Matrix Text 2.0 features:

- `WithBackgroundColor(frc::Color)` - Set background color (requires `WithShowBackground(true)`)
- `WithFont(MatrixTextFont)` - Select font type
- `WithAlign(MatrixTextAlign)` - Control text alignment for static text
- `WithSmoothScroll(bool)` - Enable pixel-by-pixel scrolling
- `WithPingPong(bool)` - Enable bouncing scroll animation
- `WithShowBackground(bool)` - Toggle background color rendering
- `WithNoScroll(bool)` - Create static text with alignment
- `WithYOffset(int8_t)` - Fine-tune vertical positioning

#### Changed

**SimGUI Improvements**: Enhanced simulation environment stability and usability:

- More stable and reliable under load
- Improved UI for module data injection
- Faster and more intuitive sensor testing

### SDKs

#### Added

**Standalone SDKs (Beta)**: New cross-platform SDKs for non-WPILib applications:

- **Python SDK**: Full API parity with WPILib vendordep, available on PyPI
  - LED control, module reading, configuration management
  - Screen mirroring capabilities with DirectLED
  - Cross-platform support (desktop, Raspberry Pi, etc.)

- **C/C++ SDK**: Performance-optimized SDK for embedded systems
  - Complete documentation and examples
  - Available on GitHub Releases

### Fixed

- Patched edge cases discovered since kickoff
- Overall stability improvements across all components
- Major build tooling improvements for faster development cycles
- Enhanced connection reliability

---

## [2026.0.0] - January 7, 2026

This release finalizes the 2026 API surface and adds compatibility with the WPILib LED animation API.

### Added

- **DirectLED buffers** for high-frequency, delta-compressed LED updates in Java and C++
  - Create via `ConnectorX.createDirectLED(...)` (Java) or `ConnectorX::CreateDirectLED(...)` (C++)
  - Supports full-refresh interval, force-full update, and reset
  - Supported in the simulation GUI

### Changed

- Updated WPILib dependency to 2026.1.1

### Fixed

- **ConfigBuilder channels now require a channel number** (e.g., `addChannel(1, "front", 60)`); channel keys are fixed to the numeric channel index


---

## [2026.0.0-beta-1] - December 6, 2025

This release includes significant API improvements, enhanced simulation capabilities, and new features for the 2026 FRC season.

### Added

#### Builder-Style LED APIs

Introducing fluent builder APIs for LED control, providing improved readability and ease of use:

- **Animation builder**: `SetAnimation(Animation).ForZone("zone").WithColor(...).WithDelay(...).Reverse(false).RunOnce(false)`
- **Image sequence builder**: `SetImageSequence("sequence").ForZone("zone").WithColor(...).SetColor(true).RunOnce(false)`
- **Matrix text builder**: `SetText("text").ForZone("zone").WithColor(...).WithDirection(...).WithDelay(...).RunOnce(false)`
- All builders support both zone and group targeting via `ForZone()` and `ForGroup()` methods

#### Group LED Commands

Apply effects to multiple zones simultaneously with new group control methods:

- `SetGroupColor()` - Apply a color to all zones in a group
- `SetGroupAnimation()` - Apply an animation to all zones in a group
- `SetGroupAnimationSequence()` - Apply an animation sequence to all zones in a group
- `SetGroupText()` - Display text on all matrix zones in a group

#### Configuration System

New programmatic configuration APIs for both Java and C++:

- `ConfigBuilder` - Fluent API for building device configurations in code
- `LoadConfigurationFromDeploy()` - Load device configuration from JSON files in the robot deploy directory
- `ApplyConfiguration()` - Apply configurations to both hardware devices and simulation environments
- `RequestConfig()` - Retrieve the current configuration from a connected device

#### Event Handling Improvements

Enhanced event system with more control over how events are processed:

- Auto-polling mode with configurable background thread for event processing
- `SetAutoPollEvents(false)` - Disable background event polling for manual control
- `PollEvents()` - Manually poll and dispatch events synchronously
- `GetEvents()` - Retrieve all pending events as a list
- `GetLatestEvent()` - Retrieve the most recent event
- C++ now supports callback-based event handlers matching Java semantics via `AddEventHandler()`
- WPILib Alerts integration for automatic error and warning reporting to the Driver Station

#### Connection Enhancements

Improved connection APIs with better feedback:

- New `USBPort` enum (`kUSB1`, `kUSB2`) for USB connections
- New `UARTPort` enum (`kMXP`) for UART connections on ConnectorX
- Connect methods now return a boolean indicating connection success
- UART connections support optional custom baud rate parameter (default: 115200)

#### Module System Enhancements

Typed module helpers for easier sensor integration:

- `DigitalInputModule`, `AnalogInputModule`, `VL53L1XModule` - Built-in typed helpers
- Module helpers provide automatic payload parsing and type-safe access to sensor data
- `ModuleBase` base class for creating your own custom module helpers

#### System Commands

- `RestartDevice()` - Restart the device with configurable delay using WPILib units

#### Desktop Simulation Environment

We're the **first FRC vendor** to offer a custom GUI inside of WPILib's SimGUI:

- **LEDs Tab**: Real-time visualization of LED strips and matrices with animation playback
- **Modules Tab**: Interactive module data injection and payload testing
- **Device Tab**: Connection simulation, status control, and event injection
- Support for loading and rendering image sequences from deploy directory

### Changed

#### Connection API

- Connection methods now use Lumyn Labs-specific enums instead of WPILib HAL enums
- Java: Changed from `edu.wpi.first.wpilibj.SerialPort.Port` to `com.lumynlabs.connection.usb.USBPort`
- C++: Changed from `HAL_SerialPort` to `lumyn::connection::USBPort`

#### C++ Color Specification

- Colors now use `frc::Color8Bit(...).ToColor()` instead of brace-initialized structs
- Example: Changed from `{255, 0, 0}` to `frc::Color8Bit(255, 0, 0).ToColor()`

#### C++ Event Structure

- Event type is now accessed via `evt->header.type` instead of `evt->type`

#### Module Support

- Modules are now supported exclusively on `ConnectorX` devices
- `ConnectorXAnimate` no longer supports module functionality

### Deprecated

The following APIs are deprecated and will be removed in the 2027 release. Please migrate to the builder APIs:

#### Legacy Animation Methods

- `SetAnimation(zoneId, animation, color, delay, reversed, oneShot)` → Use builder API instead
- `SetGroupAnimation(groupId, animation, color, delay, reversed, oneShot)` → Use builder API instead

#### Legacy Image Sequence Methods

- `SetImageSequence(zoneId, sequenceId, color, setColor, oneShot)` → Use builder API instead
- `SetGroupImageSequence(groupId, sequenceId, color, setColor, oneShot)` → Use builder API instead

#### Legacy Text Methods

- `SetText(zoneId, text, color, direction, delay, oneShot)` → Use builder API instead
- `SetGroupText(groupId, text, color, direction, delay, oneShot)` → Use builder API instead

### Fixed

- Improved connection reliability and stability
- Fixed memory management issues that could cause resource leaks
- Fixed group LED command routing

---

## [2025.2.0] - February 16, 2025

Module data pipeline improvements and C++ parity for module data handling.

### Added

- Module data polling pipeline and updated JNI/driver interfaces
- C++ module data retrieval parity with Java
- Circular buffer for module data/event queues to bound memory usage

---

## [2025.0.22] - January 6, 2025

Event callbacks and background polling in the Java API.

### Added

- Java `AddEventHandler(...)` callback support
- Background event polling thread that dispatches event handlers after connect

---

## [2025.0.0] - January 2025

Initial release for the 2025 FRC season with support for ConnectorX and ConnectorXAnimate devices.

### Features

- USB connection support for ConnectorX and ConnectorXAnimate
- LED control: colors, animations, animation sequences, image sequences, and matrix text
- Event reporting via polling API
- Module registration scaffolding
- Full integration with WPILib for FRC robot development
