---
orphan: true
---

# Changelog

All notable changes to the Lumyn Labs WPILib Vendor Library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2026.0.0-beta1] - Unreleased

This release includes significant API improvements, enhanced simulation capabilities, and protocol updates for the 2026 FRC season.

### Added

#### Builder-Style LED APIs

- Introduced fluent builder APIs for LED control, providing improved readability and ease of use
- Animation builder: `SetAnimation(Animation).ForZone("zone").WithColor(...).WithDelay(...).Reverse(false).RunOnce(false)`
- Image sequence builder: `SetImageSequence("sequence").ForZone("zone").WithColor(...).SetColor(true).RunOnce(false)`
- Matrix text builder: `SetText("text").ForZone("zone").WithColor(...).WithDirection(...).WithDelay(...).RunOnce(false)`
- All builders support both zone and group targeting via `ForZone()` and `ForGroup()` methods

#### Group LED Commands

- Added group versions of all LED control methods for applying effects to multiple zones simultaneously
- `SetGroupColor()` - Apply a color to all zones in a group
- `SetGroupAnimation()` - Apply an animation to all zones in a group
- `SetGroupAnimationSequence()` - Apply an animation sequence to all zones in a group
- `SetGroupText()` - Display text on all matrix zones in a group

#### Configuration System

- `ConfigBuilder` - New fluent API for programmatic device configuration in both Java and C++
- `LoadConfigurationFromDeploy()` - Load device configuration from JSON files in the robot deploy directory
- `ApplyConfiguration()` - Apply configurations to both hardware devices and simulation environments
- `RequestConfig()` - Retrieve the current configuration from a connected device
- Configuration methods return `Optional` types for safer error handling

#### Event Handling Improvements

- Auto-polling mode with configurable background thread for event processing
- `SetAutoPollEvents(false)` - Disable background event polling for manual control
- `PollEvents()` - Manually poll and dispatch events synchronously
- `GetEvents()` - Retrieve all pending events as a list
- `GetLatestEvent()` - Retrieve the most recent event
- C++ now supports callback-based event handlers matching Java semantics via `AddEventHandler()`
- WPILib Alerts integration for automatic error and warning reporting to NetworkTables
- `SetAlertsEnabled(false)` - Disable automatic WPILib alert generation

#### Connection Enhancements

- New `USBPort` enum (`kUSB1`, `kUSB2`) for USB connections
- New `UARTPort` enum (`kMXP`) for UART connections on ConnectorX
- Connect methods now return a boolean indicating connection success
- UART connections support optional custom baud rate parameter (default: 115200)

#### Module System Enhancements

- Typed module helper classes: `DigitalInputModule`, `AnalogInputModule`, `VL53L1XModule`
- Module helpers provide automatic payload parsing and type-safe access to sensor data
- `ModuleBase` base class for creating custom module helpers
- C++ module callbacks now include `unitId` parameter for multi-instance support

#### System Commands

- `RestartDevice()` - Restart the device with configurable delay using WPILib units

#### Desktop Simulation Environment

- Comprehensive ImGui-based simulation UI integrated with WPILib simulator
- LEDs Tab: Real-time visualization of LED strips and matrices with animation playback
- Modules Tab: Interactive module data injection and payload testing
- Device Tab: Connection simulation, status control, and event injection
- Support for loading and rendering image sequences from deploy directory
- Responsive layout with multi-row LED strip rendering

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

#### Protocol Updates

- Updated to variable-length packet transmission protocol
- Improved handshake framing and connection reliability
- Full configuration request/response flow implementation

### Deprecated

The following APIs are deprecated and will be removed in the 2027 release:

#### Legacy Animation Methods

- `SetAnimation(zoneId, animation, color, delay, reversed, oneShot)` - Use builder API instead
- `SetGroupAnimation(groupId, animation, color, delay, reversed, oneShot)` - Use builder API instead

#### Legacy Image Sequence Methods

- `SetImageSequence(zoneId, sequenceId, color, setColor, oneShot)` - Use builder API instead
- `SetGroupImageSequence(groupId, sequenceId, color, setColor, oneShot)` - Use builder API instead

#### Legacy Text Methods

- `SetText(zoneId, text, color, direction, delay, oneShot)` - Use builder API instead
- `SetGroupText(groupId, text, color, direction, delay, oneShot)` - Use builder API instead

### Fixed

- HAL handle leaks in serial open operations are now properly guarded
- C++ thread join timeout added with 500ms timeout and detach fallback to prevent hangs
- JNI local reference exhaustion fixed in `ApplyConfiguration` using `PushLocalFrame`/`PopLocalFrame`
- Java group JNI routing corrected in `LedHandler`

---

## [2025.1.0] - Previous Release

Initial release for the 2025 FRC season with support for ConnectorX and ConnectorXAnimate devices.

### Features

- USB connection support for ConnectorX and ConnectorXAnimate
- Basic LED control: colors, animations, animation sequences, image sequences, and matrix text
- Event handling with callback-based system in Java
- Module registration and data handling
- Integration with WPILib for FRC robot development
