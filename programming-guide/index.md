---
hide-toc: true
---

# Programming guide

Control Lumyn Labs devices with code. This guide covers all features across Java, C++, Python, and C SDKs.

## Installation

Before writing code, connect your device in Lumyn Studio and build a configuration. See the [Quick start guide](../quick-start) and [Lumyn Studio guide](../user-guide/index).

### WPILib Vendordep (Java/C++)

For FRC robots using WPILib, see [Installing the Library (vendordep)](getting-started-wpilib).

### Python SDK

See [Getting started (Python)](getting-started-python) and install with uv.

### C/C++ SDK

Download from the [Lumyn Labs releases page](https://github.com/Lumyn-Labs/Releases/releases). See [Getting started with C/C++ SDK](getting-started-c-cpp-sdk).

## SDK overview

Lumyn Labs provides several SDKs for different platforms and use cases:

| SDK | Language | Platform | Use Case |
|-----|----------|----------|----------|
| **WPILib vendordep** | Java | SystemCore | FRC robots using Java |
| **WPILib vendordep** | C++ | SystemCore | FRC robots using C++ |
| **Python SDK** | Python | Desktop, Raspberry Pi | Host controllers, testing |
| **C SDK** | C | Embedded, Desktop | Low-level integration |

:::{important}
**Java vs C++ API Style Difference:** In Java, LED commands are accessed through the `.leds` sub-object (for example, `cXAnimate.leds.SetAnimation(...)`). In C++, LED commands are called directly on the device object (for example, `m_animate.SetAnimation(...)`). Module commands follow the same pattern: Java uses `cX.modules.RegisterModule(...)`, C++ uses `m_cx.RegisterModule(...)`.
:::

:::{note}
This guide uses terminology from the [WPILib / FRC ecosystem](https://frcdocs.wpi.edu). Key terms: **SystemCore** (the FRC robot controller the 2027 vendordep runs on), **roboRIO** (the FRC robot controller before SystemCore), **vendordep** (a WPILib third-party library package), **SimGUI** (WPILib's desktop simulation environment), **MXP** (the roboRIO expansion port; `UARTPort.MXP` keeps the name, but UART doesn't connect on SystemCore yet).
:::

## How Studio and code connect

The zone IDs, group IDs, module IDs, and sequence IDs you create in Lumyn Studio are the exact strings you use in your robot code. For example, if you create a strip zone called `left-climber` in Studio, you reference it as `"left-climber"` in `SetAnimation(...).ForZone("left-climber")`. Keep IDs short, lowercase-with-hyphens, and consistent between Studio and code.

## Task guide

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

Read sensor data with typed helpers and raw callbacks. ConnectorX Animate supports I2C modules only.
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

## Quick reference

**Common tasks by topic:**

### Connections

- **Connect via USB** - See [Connecting to devices](connecting-to-devices)
- **Connect via UART** (doesn't connect on SystemCore yet) - See [Connecting to devices](connecting-to-devices)
- **Handle events** - See [Connecting to devices](connecting-to-devices)
- **Restart device** - See [Connecting to devices](connecting-to-devices)

### LED strips

- **Set solid color** - See [LED Animations](led-animations)
- **Play animation** - See [LED Animations](led-animations)
- **Use animation sequence** - See [LED Animations](led-animations)

### LED matrices

- **Display scrolling text** - See [LED matrices](led-matrices)
- **Static centered text** - See [LED matrices](led-matrices)
- **Play image sequence** - See [LED matrices](led-matrices)
- **Choose font** - See [LED matrices](led-matrices)

### DirectLED

- **Create DirectLED controller** - See [DirectLED](directled)
- **Use WPILib LEDPattern** - See [DirectLED](directled)
- **Raw buffer updates** - See [DirectLED](directled)

### Modules

- **Use DigitalInputModule** - See [Modules & sensors](modules-and-sensors)
- **Use VL53L1XModule** - See [Modules & sensors](modules-and-sensors)
- **Raw module callback** - See [Modules & sensors](modules-and-sensors)

### Configuration

- **Load from file** - See [Device configuration](device-configuration)
- **Build with ConfigBuilder** - See [Device configuration](device-configuration)
- **Request from device** - See [Device configuration](device-configuration)

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
