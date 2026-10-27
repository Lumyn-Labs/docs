---
hide-toc: true
---

# Getting started with the WPILib vendordep

Add the Lumyn Labs vendor library to your WPILib robot project and control your first LED.

```{note}
The current vendordep is for WPILib 2027.0.0-alpha-8 and the SystemCore robot controller. It does not support the roboRIO. For a roboRIO robot, use the 2026 vendordep, which works with firmware 4.0.2 and later.
```

## Prerequisites

Before you begin, ensure you have:

- WPILib 2027.0.0-alpha-8 installed, with VS Code and the WPILib extension
- A Java or C++ robot project that uses GradleRIO 2027.0.0-alpha-8. Java projects build with Java 25.
- A SystemCore robot controller
- A ConnectorX or ConnectorX Animate with up-to-date firmware
- A USB cable from the board to a SystemCore USB port

A 2027 project's `build.gradle` names the GradleRIO plugin like this:

```groovy
plugins {
    id "org.wpilib.GradleRIO" version "2027.0.0-alpha-8"
}
```

## Installation

### Install from the WPILib dependency list (recommended)

1. Open your robot project in VS Code.
2. Click the WPILib icon in the sidebar.
3. Under **Available Dependencies**, find **Lumyn Labs**.
4. Click **Install**.

To update later, open this list and click **To Latest**.

### Install from the vendordep URL

1. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS).
2. Type `Manage Vendor Libraries` and select it.
3. Choose **Install new libraries (online)**.
4. Paste this URL and press Enter:

   ```text
   https://packages.lumynlabs.com/LumynLabs.json
   ```

5. Build your project.

## Your first program

::::{tab-set}
:::{tab-item} Java
```java
package frc.robot;

import org.wpilib.framework.TimedRobot;
import org.wpilib.util.Color;
import org.wpilib.util.Color8Bit;
import org.wpilib.units.Units;

import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.connection.usb.USBPort;
import com.lumynlabs.domain.led.Animation;

public class Robot extends TimedRobot {
    private ConnectorXAnimate m_leds = new ConnectorXAnimate();

    public Robot() {
        // Connect to the device on USB port 1
        boolean connected = m_leds.Connect(USBPort.kUSB1);
        System.out.println("ConnectorX connected: " + connected);
    }

    @Override
    public void teleopInit() {
        // Display a solid green color on the "front" zone
        m_leds.leds.SetAnimation(Animation.Fill)
            .ForZone("front")
            .WithColor(new Color(new Color8Bit(0, 255, 0)))
            .WithDelay(Units.Milliseconds.of(0))
            .RunOnce(false);
    }

    @Override
    public void autonomousInit() {
        // Play a rainbow animation on the "front" zone
        m_leds.leds.SetAnimation(Animation.RainbowRoll)
            .ForZone("front")
            .WithColor(new Color(new Color8Bit(255, 255, 255)))
            .WithDelay(Units.Milliseconds.of(50))
            .Reverse(false)
            .RunOnce(false);
    }
}
```
:::
:::{tab-item} C++
```cpp
// Robot.h
#pragma once

#include <wpi/framework/TimedRobot.hpp>
#include <lumyn/device/ConnectorXAnimate.h>

class Robot : public wpi::TimedRobot {
public:
    Robot();
    void TeleopInit() override;
    void AutonomousInit() override;

private:
    lumyn::device::ConnectorXAnimate m_leds;
};
```

```cpp
// Robot.cpp
#include "Robot.h"
#include <lumyn/connection/USBPort.h>
#include <lumyn/led/Animation.h>
#include <wpi/util/Color8Bit.hpp>
#include <wpi/units/time.hpp>
#include <iostream>

using lumyn::led::Animation;

Robot::Robot() {
    // Connect to the device on USB port 1
    bool connected = m_leds.Connect(lumyn::connection::USBPort::kUSB1);
    std::cout << "ConnectorX connected: " << connected << std::endl;
}

void Robot::TeleopInit() {
    // Display a solid green color on the "front" zone
    m_leds.SetAnimation(Animation::Fill)
        .ForZone("front")
        .WithColor(wpi::util::Color{0, 255, 0})
        .WithDelay(0_ms)
        .RunOnce(false);
}

void Robot::AutonomousInit() {
    // Play a rainbow animation on the "front" zone
    m_leds.SetAnimation(Animation::RainbowRoll)
        .ForZone("front")
        .WithColor(wpi::util::Color{255, 255, 255})
        .WithDelay(50_ms)
        .Reverse(false)
        .RunOnce(false);
}
```
:::
::::

## Key concepts

### Zones and groups

Zones are named sections of your LED strips/matrices configured in Lumyn Studio. Groups let you control multiple zones together.

::::{tab-set}
:::{tab-item} Java
```java
// Change the color of the currently running animation on a zone
m_leds.leds.SetColor("left-climber", new Color(new Color8Bit(255, 0, 0)));

// Change the color on a group of zones
m_leds.leds.SetGroupColor("all-climbers", new Color(new Color8Bit(0, 255, 0)));
```
:::
:::{tab-item} C++
```cpp
// Change the color of the currently running animation on a zone
m_leds.SetColor("left-climber", wpi::util::Color{255, 0, 0});

// Change the color on a group of zones
m_leds.SetGroupColor("all-climbers", wpi::util::Color{0, 255, 0});
```
:::
::::

### Connection ports

On SystemCore, connect over USB with the `USBPort` enum, `USBPort.kUSB1` or `USBPort.kUSB2` (`USBPort::kUSB1` or `USBPort::kUSB2` in C++):

- With one board plugged in, `kUSB1` and `kUSB2` both find it.
- With two boards plugged in, each device object takes a board of its own type: a `ConnectorXAnimate` object opens the ConnectorX Animate, and a `ConnectorX` object opens the ConnectorX. When two boards are the same type, `kUSB1` and `kUSB2` follow the order of the SystemCore USB ports they are plugged into.
- A board can be open in only one device object at a time.

ConnectorX also has a UART connection. On SystemCore, UART does not connect yet: `Connect` logs an error and returns `false`. Connect over USB instead. In simulation, a UART connection connects to the simulated board.

::::{tab-set}
:::{tab-item} Java
```java
m_cx.Connect(UARTPort.MXP);
m_cx.Connect(UARTPort.MXP, 230400);  // Custom baud rate
```
:::
:::{tab-item} C++
```cpp
m_cx.Connect(lumyn::connection::UARTPort::kMXP);
m_cx.Connect(lumyn::connection::UARTPort::kMXP, 230400);  // Custom baud rate
```
:::
::::

## Next steps

Now that you're connected, explore what you can do:

- [Connecting to devices](connecting-to-devices) - USB, UART, event handling
- [LED strip animations](led-animations) - Colors, animations, and sequences
- [LED matrices](led-matrices) - Text and image display
- [DirectLED](directled) - Per-pixel control with WPILib LEDPattern
- [Modules and sensors](modules-and-sensors) - Sensor data callbacks (ConnectorX Animate supports I2C modules only)
- [Device configuration](device-configuration) - Load and apply configurations
- [Simulation](simulation) - Test in the WPILib simulator
