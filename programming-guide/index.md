---
hide-toc: true
---

# Programming Guide

Control Lumyn Labs devices with code. This guide covers all features across Java, C++, Python, and C SDKs.

## Installation

Before writing code, connect your device in Lumyn Studio and build a configuration. See the [Quick Start Guide](../quick-start) and [Lumyn Studio Guide](../user-guide/index).

### WPILib Vendordep (Java/C++)

For FRC robots using WPILib, see [Installing the Library (vendordep)](installing-the-library-vendordep).

### Python SDK

```bash
pip install lumyn-sdk
```

### C/C++ SDK

Download from [GitHub Releases](https://github.com/Lumyn-Labs/Releases)

## SDK Overview

Lumyn Labs provides several SDKs for different platforms and use cases:

| SDK | Language | Platform | Use Case |
|-----|----------|----------|----------|
| **WPILib Vendordep** | Java | roboRIO | FRC robots using Java |
| **WPILib Vendordep** | C++ | roboRIO | FRC robots using C++ |
| **Python SDK** | Python | Desktop, Raspberry Pi | Host controllers, testing |
| **C SDK** | C | Embedded, Desktop | Low-level integration |

## Task Guide

Find what you want to do:

::::{grid} 1 2 2 2
:gutter: 3

:::{grid-item-card} Connecting to Devices
:link: connecting-to-devices
:link-type: doc

USB and UART connections, event handling, device status, and system commands.
:::

:::{grid-item-card} LED Strip Animations
:link: led-animations
:link-type: doc

Set colors, play built-in animations, and use animation sequences.
:::

:::{grid-item-card} LED Matrices
:link: led-matrices
:link-type: doc

Display text, fonts, and image sequences on matrix zones.
:::

:::{grid-item-card} DirectLED
:link: directled
:link-type: doc

High-frequency per-pixel control with WPILib LEDPattern integration.
:::

:::{grid-item-card} Modules & Sensors
:link: modules-and-sensors
:link-type: doc

Read sensor data with typed helpers and raw callbacks. ConnectorX only.
:::

:::{grid-item-card} Device Configuration
:link: device-configuration
:link-type: doc

Load, build, and apply configurations programmatically.
:::

:::{grid-item-card} Simulation
:link: simulation
:link-type: doc

Test in the WPILib desktop simulator. Java/C++ vendordep only.
:::

::::

## Quick Reference

**Common tasks by topic:**

### Connections

- **Connect via USB** - See [Connecting to Devices](connecting-to-devices)
- **Connect via UART** - See [Connecting to Devices](connecting-to-devices)
- **Handle events** - See [Connecting to Devices](connecting-to-devices)
- **Restart device** - See [Connecting to Devices](connecting-to-devices)

### LED Strips

- **Set solid color** - See [LED Animations](led-animations)
- **Play animation** - See [LED Animations](led-animations)
- **Use animation sequence** - See [LED Animations](led-animations)

### LED Matrices

- **Display scrolling text** - See [LED Matrices](led-matrices)
- **Static centered text** - See [LED Matrices](led-matrices)
- **Play image sequence** - See [LED Matrices](led-matrices)
- **Choose font** - See [LED Matrices](led-matrices)

### DirectLED

- **Create DirectLED controller** - See [DirectLED](directled)
- **Use WPILib LEDPattern** - See [DirectLED](directled)
- **Raw buffer updates** - See [DirectLED](directled)

### Modules (ConnectorX Only)

- **Use DigitalInputModule** - See [Modules & Sensors](modules-and-sensors)
- **Use VL53L1XModule** - See [Modules & Sensors](modules-and-sensors)
- **Raw module callback** - See [Modules & Sensors](modules-and-sensors)

### Configuration

- **Load from file** - See [Device Configuration](device-configuration)
- **Build with ConfigBuilder** - See [Device Configuration](device-configuration)
- **Request from device** - See [Device Configuration](device-configuration)

```{toctree}
:maxdepth: 1
:hidden:

getting-started-wpilib
getting-started-python
getting-started-c-cpp-sdk
connecting-to-devices
led-animations
led-matrices
directled
modules-and-sensors
device-configuration
simulation
```
