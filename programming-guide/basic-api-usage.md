---
hide-toc: true
---

# Basic API Usage

The Lumyn Labs Vendor Library allows you to control Lumyn Labs devices with WPILib. A significant effort has been made to prioritize ease-of-use so that you can get up and running quickly.

## API Overview

The Lumyn Labs Vendor Library resides in the `com.lumynlabs` package in Java and the `lumyn` namespace in C++. In Java, the api is further split into the `device` and `domain` packages. The `device` package provides classes for interacting with lumyn labs devices, while the `domain` package provides classes related to data that is sent to and from the device.

## Connect to a Device

To connect to a device, you must first create an instance of the device class. There are two device classes, `ConnectorX` and `ConnectorXAnimate`, which share some common methods but also have unique methods related to their specific hardware features.

Connection methods return a boolean indicating success. Devices support USB and UART connections. For UART connections, you can optionally specify a custom baud rate (default is 115200).

```{note}
**Java Resource Management**: In Java, device classes implement `AutoCloseable`, allowing you to use try-with-resources for automatic resource cleanup. This ensures connections are properly closed even if exceptions occur.
```

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.devices.ConnectorX;
import com.lumynlabs.connection.usb.USBPort;
import com.lumynlabs.connection.uart.UARTPort;

// Standard connection
private ConnectorXAnimate cXAnimate = new ConnectorXAnimate();
private ConnectorX cX = new ConnectorX();

// USB connections
boolean animateConnected = cXAnimate.Connect(USBPort.kUSB1);
boolean cxConnected = cX.Connect(USBPort.kUSB2);

// UART connections (ConnectorX only)
boolean cxUart = cX.Connect(UARTPort.MXP);
boolean cxUartFast = cX.Connect(UARTPort.MXP, 230400);

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
#include <lumyn/connection/UARTPort.h>
#include <frc/util/Color8Bit.h>

lumyn::device::ConnectorX m_cx;
lumyn::device::ConnectorXAnimate m_animate;
```
:::
:::{tab-item} C++ (source)
```cpp
bool animateConnected = m_animate.Connect(lumyn::connection::USBPort::kUSB1);
bool cxConnected = m_cx.Connect(lumyn::connection::USBPort::kUSB2);
// UART connections (ConnectorX only)
bool cxUart = m_cx.Connect(lumyn::connection::UARTPort::kMXP);
bool cxUartFast = m_cx.Connect(lumyn::connection::UARTPort::kMXP, 230400);
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
import edu.wpi.first.wpilibj.util.Color8Bit;
import edu.wpi.first.wpilibj.util.Color;

// Sets the color of the "left-climber" zone to red
// Convert Color8Bit to Color via the Color constructor
cXAnimate.leds.SetColor("left-climber", new Color(new Color8Bit(255, 0, 0)));

// Set color on a group of zones
cXAnimate.leds.SetGroupColor("all-climbers", new Color(new Color8Bit(0, 255, 0)));
```
:::
:::{tab-item} C++
```cpp
#include <frc/util/Color8Bit.h>

// Sets the color of the "left-climber" zone to red
m_animate.SetColor("left-climber", frc::Color8Bit(255, 0, 0).ToColor());

// Set color on a group of zones
m_animate.SetGroupColor("all-climbers", frc::Color8Bit(0, 255, 0).ToColor());
```
:::
::::

### Set an Animation

With the 2026 update, we've introduced a new "builder" style API that makes it easier to configure and command your devices. The legacy API is deprecated and will be removed in 2027.

#### Builder API

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color8Bit;
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.Animation;

// Sets a gold chase animation on the "left-climber" zone with a period of 40ms that is not reversed and loops indefinitely
cXAnimate.leds.SetAnimation(Animation.Chase)
  .ForZone("left-climber")
  .WithColor(new Color(new Color8Bit(200, 120, 15)))
  .WithDelay(Units.Milliseconds.of(40))
  .Reverse(false)
  .RunOnce(false);

// Sets a red chase animation on the "right-climber" group with a period of 40ms that is reversed and runs only once
cXAnimate.leds.SetAnimation(Animation.Chase)
  .ForGroup("right-climber")
  .WithColor(new Color(new Color8Bit(255, 0, 0)))
  .WithDelay(Units.Milliseconds.of(40))
  .Reverse(true)
  .RunOnce(true);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/led/Animation.h>
#include <frc/util/Color8Bit.h>
#include <units/time.h>

// Sets a gold chase animation on the "left-climber" zone with a period of 40ms that is not reversed and loops indefinitely
m_animate.SetAnimation(lumyn::led::Animation::Chase)
  .ForZone("left-climber")
  .WithColor(frc::Color8Bit(200, 120, 15).ToColor())
  .WithDelay(40_ms)
  .Reverse(false)
  .RunOnce(false);

// Sets a red chase animation on the "right-climber" group with a period of 40ms that is reversed and runs only once
m_animate.SetAnimation(lumyn::led::Animation::Chase)
  .ForGroup("right-climber")
  .WithColor(frc::Color8Bit(255, 0, 0).ToColor())
  .WithDelay(40_ms)
  .Reverse(true)
  .RunOnce(true);

// Builder APIs also work on ConnectorX
m_cx.SetAnimation(lumyn::led::Animation::Chase)
  .ForZone("front")
  .WithColor(frc::Color8Bit(0, 255, 0).ToColor())
  .WithDelay(50_ms)
  .Reverse(false)
  .RunOnce(false);
```
:::
::::

### Set an Animation Sequence

Animation sequences are predefined animation patterns configured on the device.

::::{tab-set}
:::{tab-item} Java
```java
// Sets the "intake" zone to the "intake-sequence" animation sequence
cXAnimate.leds.SetAnimationSequence("intake", "intake-sequence");

// Set an animation sequence on a group of zones
cXAnimate.leds.SetGroupAnimationSequence("all-intake", "intake-sequence");
```
:::
:::{tab-item} C++
```cpp
// Sets the "intake" zone to the "intake-sequence" animation sequence
m_animate.SetAnimationSequence("intake", "intake-sequence");

// Set an animation sequence on a group of zones
m_animate.SetGroupAnimationSequence("all-intake", "intake-sequence");
```
:::
::::

### Display an Image Sequence

#### Builder API

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color8Bit;
import edu.wpi.first.wpilibj.util.Color;

// Sets the "front-matrix" zone to the "Emoji_16x16_unknown" image sequence with a purple color tint, looping indefinitely
cXAnimate.leds.SetImageSequence("Emoji_16x16_unknown")
  .ForZone("front-matrix")
  .WithColor(new Color(new Color8Bit(120, 0, 100)))
  .SetColor(true)  // Apply color tint to the sequence
  .RunOnce(false);

// Sets the "logo_8x32" image sequence on a group, using original colors (no tint)
cXAnimate.leds.SetImageSequence("logo_8x32")
  .ForGroup("all-matrices")
  .WithColor(new Color(new Color8Bit(255, 255, 255)))
  .SetColor(false)  // Use original colors from the bitmap
  .RunOnce(true);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <frc/util/Color8Bit.h>

// Sets the "front-matrix" zone to the "Emoji_16x16_unknown" image sequence with a purple color tint, looping indefinitely
m_animate.SetImageSequence("Emoji_16x16_unknown")
  .ForZone("front-matrix")
  .WithColor(frc::Color8Bit(120, 0, 100).ToColor())
  .SetColor(true)  // Apply color tint to the sequence
  .RunOnce(false);

// Sets the "logo_8x32" image sequence on a group, using original colors
m_cx.SetImageSequence("logo_8x32")
  .ForZone("back")
  .WithColor(frc::Color8Bit(255, 255, 255).ToColor())
  .SetColor(false)  // Use original colors from the bitmap
  .RunOnce(true);
```
:::
::::

**Image Sequence File Locations:**

- **Simulation**: Animated sequences resolve from `deploy/connectorx/<sequenceName>/` first, then `deploy/<sequenceName>/` (absolute paths also work). Static bitmaps look under `deploy/<path>` first, then `deploy/connectorx/<path>`.
- **Hardware**: Place image folders (with frames named `0.bmp`, `1.bmp`, etc.) at the root of the device SD card.

**Note**: Image sequences must be placed in `deploy/connectorx/<sequenceId>/` as numbered BMP files (0.bmp, 1.bmp, etc.). The folder name is the sequence ID.

### Display Text on a Matrix

Display scrolling or static text on matrix zones using the builder API.

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color8Bit;
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.MatrixTextScrollDirection;

// Displays "Hello World!" on the "front-matrix" zone with a white color, scrolling left at a speed of 300ms per step, looping indefinitely
cXAnimate.leds.SetText("Hello World!")
  .ForZone("front-matrix")
  .WithColor(new Color(new Color8Bit(255, 255, 255)))
  .WithDirection(MatrixTextScrollDirection.Left)
  .WithDelay(Units.Milliseconds.of(300))
  .RunOnce(false);

// Set text on a group of matrix zones, scrolling right
cXAnimate.leds.SetText("Hello!")
  .ForGroup("all-matrices")
  .WithColor(new Color(new Color8Bit(255, 255, 0)))
  .WithDirection(MatrixTextScrollDirection.Right)
  .WithDelay(Units.Milliseconds.of(500))
  .RunOnce(false);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <frc/util/Color8Bit.h>
#include <units/time.h>

// Displays "Hello World!" on the "front-matrix" zone with a white color, scrolling left at a speed of 300ms per step, looping indefinitely
m_animate.SetText("Hello World!")
  .ForZone("front-matrix")
  .WithColor(frc::Color8Bit(255, 255, 255).ToColor())
  .WithDirection(lumyn::internal::Command::LED::MatrixTextScrollDirection::LEFT)
  .WithDelay(300_ms)
  .RunOnce(false);

// Set text on a group of matrix zones, scrolling right
m_animate.SetText("Hello!")
  .ForGroup("all-matrices")
  .WithColor(frc::Color8Bit(255, 255, 0).ToColor())
  .WithDirection(lumyn::internal::Command::LED::MatrixTextScrollDirection::RIGHT)
  .WithDelay(500_ms)
  .RunOnce(false);
```
:::
::::

