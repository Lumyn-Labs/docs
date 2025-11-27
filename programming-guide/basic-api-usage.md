---
hide-toc: true
---

# Basic API Usage

The Lumyn Labs Vendor Library allows you to control Lumyn Labs devices with WPILib. A significant effort has been made to prioritize ease-of-use so that you can get up and running quickly.

## API Overview

The Lumyn Labs Vendor Library resides in the `com.lumynlabs` package in Java and the `lumyn` namespace in C++. In Java, the api is further split into the `device` and `domain` packages. The `device` package provides classes for interacting with lumyn labs devices, while the `domain` package provides classes related to data that is sent to and from the device.

## Connect to a Device

To connect to a device, you must first create an instance of the device class. There are two device classes, `ConnectorX` and `ConnectorXAnimate`, which share some common methods but also have unique methods related to their specific hardware features.

```{note}
**Java Resource Management**: In Java, device classes implement `AutoCloseable`, allowing you to use try-with-resources for automatic resource cleanup. This ensures connections are properly closed even if exceptions occur.
```

```{warning}
**2026 Beta Feature**: The `USBPort` connection API is new in the 2026 beta vendordep. The 2025 vendordep used `SerialPort.Port` (Java) or `HAL_SerialPort` (C++). The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.devices.ConnectorX;
import com.lumynlabs.connection.usb.USBPort;

// Standard connection
private ConnectorXAnimate cXAnimate = new ConnectorXAnimate();
private ConnectorX cX = new ConnectorX();

boolean animateConnected = cXAnimate.Connect(USBPort.kUSB1);
boolean cxConnected = cX.Connect(USBPort.kUSB2);

// Or use try-with-resources for automatic cleanup
try (ConnectorXAnimate cXAnimate = new ConnectorXAnimate();
     ConnectorX cX = new ConnectorX()) {
    boolean animateConnected = cXAnimate.Connect(USBPort.kUSB1);
    boolean cxConnected = cX.Connect(USBPort.kUSB2);
    // Device connections are automatically closed when exiting this block
}
```
:::
:::{tab-item} C++ (header)
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/connection/USBPort.h>

lumyn::device::ConnectorX m_cx;
lumyn::device::ConnectorXAnimate m_animate;
```
:::
:::{tab-item} C++ (source)
```cpp
bool animateConnected = m_animate.Connect(lumyn::connection::USBPort::kUSB1);
bool cxConnected = m_cx.Connect(lumyn::connection::USBPort::kUSB2);
```
:::
::::

## Controlling LEDs

Controlling LED strips and matrices is a common use-case for Lumyn Labs devices. The following actions can be performed on either a single zone or a group of zones:

- Set the color
- Set an animation
- Set an animation sequence
- Set a bitmap
- Display text on a Matrix

### Zones vs Groups

A **zone** is a logical subsection of a channel that you can control independently (either a Strip Zone or Matrix Zone). A **group** is a collection of zones that can be controlled together. When using the builder API, use `ForZone()` to target a single zone, or `ForGroup()` to target multiple zones simultaneously. This allows you to synchronize animations across multiple zones with a single command.

### Set a Color

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color;

// Sets the color of the "left-climber" zone to red
cXAnimate.leds.SetColor("left-climber", new Color(255, 0, 0));
```
:::
:::{tab-item} C++
```cpp
m_animate.SetColor("left-climber", {255, 0, 0});
```
:::
::::

### Set an Animation

```{warning}
**2026 Beta Feature**: The builder API for animations is new in the 2026 beta vendordep. The 2025 vendordep only supported the legacy API. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

With the 2026 update, we've introduced a new "builder" style API that makes it easier to configure and command your devices. The legacy API is deprecated and will be removed in 2027.

#### Builder API

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.Animation;

// Sets a gold chase animation on the "left-climber" zone with a period of 40ms that is not reversed and loops indefinitely
cXAnimate.leds.SetAnimation(Animation.Chase)
  .ForZone("left-climber")
  .WithColor(new Color(200, 120, 15))
  .WithDelay(Units.Milliseconds.of(40))
  .Reverse(false)
  .RunOnce(false);

// Sets a red chase animation on the "right-climber" group with a period of 40ms that is reversed and runs only once
cXAnimate.leds.SetAnimation(Animation.Chase)
  .ForGroup("right-climber")
  .WithColor(new Color(255, 0, 0))
  .WithDelay(Units.Milliseconds.of(40))
  .Reverse(true)
  .RunOnce(true);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/device/ConnectorX.h>
#include <lumyn/led/Animation.h>
#include <frc/util/Color8Bit.h>
#include <units/time.h>

// Sets a gold chase animation on the "left-climber" zone with a period of 40ms that is not reversed and loops indefinitely
m_animate.SetAnimation(lumyn::led::Animation::Chase)
  .ForZone("left-climber")
  .WithColor({200.0/255.0, 120.0/255.0, 15.0/255.0})
  .WithDelay(40_ms)
  .Reverse(false)
  .RunOnce(false);

// Sets a red chase animation on the "right-climber" group with a period of 40ms that is reversed and runs only once
m_animate.SetAnimation(lumyn::led::Animation::Chase)
  .ForGroup("right-climber")
  .WithColor({1.0, 0.0, 0.0})
  .WithDelay(40_ms)
  .Reverse(true)
  .RunOnce(true);

// Builder APIs also work on ConnectorX
m_cx.SetAnimation(lumyn::led::Animation::Chase)
  .ForZone("front")
  .WithColor({0.0, 1.0, 0.0})
  .WithDelay(50_ms)
  .Reverse(false)
  .RunOnce(false);
```
:::
::::

#### Legacy API (Deprecated)

::::{tab-set}
:::{tab-item} Java
```java
// Deprecated: Use builder API instead. Will be removed in 2027.
cXAnimate.leds.SetAnimation("left-climber", Animation.Chase, new Color(200, 120, 15), Units.Milliseconds.of(40), false, false);
cXAnimate.leds.SetGroupAnimation("right-climber", Animation.Chase, new Color(255, 0, 0), Units.Milliseconds.of(40), true, true);
```
:::
:::{tab-item} C++
```cpp
// Deprecated: Use builder API instead. Will be removed in 2027.
m_animate.SetAnimation("left-climber", lumyn::led::Animation::Chase, {200.0/255.0, 120.0/255.0, 15.0/255.0}, 40_ms, false, false);
m_animate.SetGroupAnimation("right-climber", lumyn::led::Animation::Chase, {1.0, 0.0, 0.0}, 40_ms, true, true);
```
:::
::::

### Set an Animation Sequence

::::{tab-set}
:::{tab-item} Java
```java
// Sets the "intake" zone to the "intake-sequence" animation sequence
cXAnimate.leds.SetAnimationSequence("intake", "intake-sequence");
```
:::
:::{tab-item} C++
```cpp
m_animate.SetAnimationSequence("intake", "intake-sequence");
```
:::
::::

### Display an Image Sequence

```{warning}
**2026 Beta Feature**: The builder API for image sequences is new in the 2026 beta vendordep. The 2025 vendordep only supported the legacy API. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

#### Builder API

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color;

// Sets the "front-matrix" zone to the "Emoji_16x16_unknown" image sequence with a purple color tint, looping indefinitely
cXAnimate.leds.SetImageSequence("Emoji_16x16_unknown")
  .ForZone("front-matrix")
  .WithColor(new Color(120, 0, 100))
  .SetColor(true)  // Apply color tint to the sequence
  .RunOnce(false);

// Sets the "logo_8x32" image sequence on a group, using original colors (no tint)
cXAnimate.leds.SetImageSequence("logo_8x32")
  .ForGroup("all-matrices")
  .WithColor(new Color(255, 255, 255))
  .SetColor(false)  // Use original colors
  .RunOnce(true);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/device/ConnectorX.h>
#include <frc/util/Color8Bit.h>

// Sets the "front-matrix" zone to the "Emoji_16x16_unknown" image sequence with a purple color tint, looping indefinitely
m_animate.SetImageSequence("Emoji_16x16_unknown")
  .ForZone("front-matrix")
  .WithColor({120.0/255.0, 0.0, 100.0/255.0})
  .SetColor(true)  // Apply color tint to the sequence
  .RunOnce(false);

// Builder APIs also work on ConnectorX
m_cx.SetImageSequence("logo_8x32")
  .ForZone("back")
  .WithColor({1.0, 1.0, 1.0})
  .SetColor(false)  // Use original colors
  .RunOnce(true);
```
:::
::::

#### Legacy API

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color;

// Sets the "front-matrix" zone to the "Emoji_16x16_unknown" image sequence with a purple color tint, looping indefinitely
cXAnimate.leds.SetImageSequence("front-matrix", "Emoji_16x16_unknown", new Color(120, 0, 100), true, false);
```
:::
:::{tab-item} C++
```cpp
m_animate.SetImageSequence("front-matrix", "Emoji_16x16_unknown", {120.0/255.0, 0.0, 100.0/255.0}, true, false);
```
:::
::::

**Note**: Image sequences must be placed in `deploy/connectorx/<sequenceId>/` as numbered BMP files (0.bmp, 1.bmp, etc.). The folder name is the sequence ID.

### Display Text on a Matrix

```{warning}
**2026 Beta Feature**: The `SetText` and `SetGroupText` methods are new in the 2026 beta vendordep. The 2025 vendordep used `SetMatrixText`. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.MatrixTextScrollDirection;

// Displays "Hello World!" on the "front-matrix" zone with a white color, scrolling left at a speed of 300ms and looping indefinitely
cXAnimate.leds.SetText("front-matrix", "Hello World!", new Color(255, 255, 255), MatrixTextScrollDirection.LEFT, Units.Milliseconds.of(300), false);

// Set text on a group of matrix zones
cXAnimate.leds.SetGroupText("all-matrices", "Hello!", new Color(255, 255, 0), MatrixTextScrollDirection.RIGHT, Units.Milliseconds.of(500), false);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <frc/util/Color8Bit.h>
#include <units/time.h>

// Displays "Hello World!" on the "front-matrix" zone with a white color, scrolling left at a speed of 300ms and looping indefinitely
m_animate.SetText("front-matrix", "Hello World!", {1.0, 1.0, 1.0}, lumyn::internal::Command::LED::MatrixTextScrollDirection::LEFT, 300_ms, false);

// Set text on a group of matrix zones
m_animate.SetGroupText("all-matrices", "Hello!", {1.0, 1.0, 0.0}, lumyn::internal::Command::LED::MatrixTextScrollDirection::RIGHT, 500_ms, false);
```
:::
::::

## Development Tools

The 2026 vendordep includes powerful development tools to help you build and debug your robot code more effectively.

### Simulation (SimGUI)

```{note}
**First FRC Vendor Simulation GUI**: Lumyn Labs is the first FRC vendor to offer a custom GUI inside of WPILib's SimGUI, providing an unparalleled simulation experience.
```

Our 2026 Vendordep includes a powerful new simulation GUI integrated directly into the WPILib simulation environment. This allows you to test and visualize your LED animations and sensor logic without needing a physical robot.

#### How it Works

When you run a simulation of your robot code, our library runs the *actual* ConnectorX firmware in the background. This means the behavior you see in simulation is identical to what you'll see on the real hardware.

A custom "Lumyn Labs" SimGUI tab will appear, giving you access to advanced simulation features.

#### Visualizing Animations

Any channels and zones you have defined in your `config.json` will be automatically rendered in the SimGUI. When your robot code plays an animation or sets a color, you will see it update live in the simulation window.

#### Testing Commands

The SimGUI includes a command interface that lets you manually trigger animations and set colors. This is a powerful tool for quickly developing and testing new LED effects without writing any robot code.

#### Injecting Sensor Data

For any modules defined in your configuration, the SimGUI will generate a menu allowing you to inject fake sensor data. This lets you test your robot's logic for various sensor inputs (e.g., a beam break being triggered or a distance sensor reading a specific value) to ensure your code handles all possible scenarios correctly.

### Debugging Features

The 2026 vendordep includes several new features to make debugging your robot code and hardware easier.

#### Configuration Validation

If your robot code references a zone or channel name that doesn't exist in the `config.json` on the device, the vendordep will now print a clear error to the robot console. This helps you quickly identify typos and mismatches between your code and your configuration.

#### NetworkTables Integration

All device data, including connection status, sensor values, and LED states, is now automatically published to NetworkTables under the `LumynLabs/` key. You can view this data in tools like OutlineViewer or AdvantageScope to monitor your devices in real-time.

