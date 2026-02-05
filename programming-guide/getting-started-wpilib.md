---
hide-toc: true
---

# Getting Started with WPILib Vendordep

Add the Lumyn Labs vendor library to your WPILib robot project and control your first LED.

```{note}
**Version Compatibility**: Use the 2026 vendordep with firmware versions 4.0.2 and later. The 2025 vendordep is compatible with earlier firmware versions.
```

## Prerequisites

Before you begin, ensure you have:

- A WPILib robot project (Java or C++)
- VS Code with the WPILib extension installed
- A Lumyn Labs device (ConnectorX or ConnectorX Animate) with updated firmware
- A USB cable for connection

## Installation

### Option 1: WPILib UI (Recommended)

1. Open your robot project in VS Code
2. Click the WPILib icon in the sidebar
3. Under **Available Dependencies**, locate "Lumyn Labs"
4. Click **Install**

To update later, open this menu and click **To Latest**.

### Option 2: Install via URL

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type `Manage Vendor Libraries` and select it
3. Choose **Install new libraries (online)**
4. Paste the following URL:

```text
https://packages.lumynlabs.com/LumynLabs.json
```

5. Press Enter and build your project

## Your First Program

### Java

```java
package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.wpilibj.util.Color8Bit;
import edu.wpi.first.units.Units;

import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.connection.usb.USBPort;
import com.lumynlabs.domain.led.Animation;

public class Robot extends TimedRobot {
    private ConnectorXAnimate m_leds = new ConnectorXAnimate();

    @Override
    public void robotInit() {
        // Connect to the device on USB port 1
        boolean connected = m_leds.Connect(USBPort.kUSB1);
        System.out.println("ConnectorX connected: " + connected);
    }

    @Override
    public void teleopInit() {
        // Set a solid green color on the "front" zone
        m_leds.leds.SetColor("front", new Color(new Color8Bit(0, 255, 0)));
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

### C++

```cpp
// Robot.h
#pragma once

#include <frc/TimedRobot.h>
#include <lumyn/device/ConnectorXAnimate.h>

class Robot : public frc::TimedRobot {
public:
    void RobotInit() override;
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
#include <frc/util/Color8Bit.h>
#include <units/time.h>
#include <iostream>

using lumyn::led::Animation;

void Robot::RobotInit() {
    // Connect to the device on USB port 1
    bool connected = m_leds.Connect(lumyn::connection::USBPort::kUSB1);
    std::cout << "ConnectorX connected: " << connected << std::endl;
}

void Robot::TeleopInit() {
    // Set a solid green color on the "front" zone
    m_leds.SetColor("front", frc::Color8Bit(0, 255, 0).ToColor());
}

void Robot::AutonomousInit() {
    // Play a rainbow animation on the "front" zone
    m_leds.SetAnimation(Animation::RainbowRoll)
        .ForZone("front")
        .WithColor(frc::Color8Bit(255, 255, 255).ToColor())
        .WithDelay(50_ms)
        .Reverse(false)
        .RunOnce(false);
}
```

## Key Concepts

### Device Classes

- **ConnectorXAnimate**: LED-only control via USB. Best for simple LED projects.
- **ConnectorX**: Full features including modules/sensors and UART connectivity.

### Zones and Groups

Zones are named sections of your LED strips/matrices configured in Lumyn Studio. Groups let you control multiple zones together.

```java
// Control a single zone
m_leds.leds.SetColor("left-climber", new Color(new Color8Bit(255, 0, 0)));

// Control a group of zones
m_leds.leds.SetGroupColor("all-climbers", new Color(new Color8Bit(0, 255, 0)));
```

### Connection Ports

For roboRIO, use the `USBPort` enum:

- `USBPort.kUSB1` / `USBPort::kUSB1` - First USB port
- `USBPort.kUSB2` / `USBPort::kUSB2` - Second USB port

For ConnectorX with UART:

```java
// Java - UART connection
m_cx.Connect(UARTPort.MXP);
m_cx.Connect(UARTPort.MXP, 230400);  // Custom baud rate
```

```cpp
// C++ - UART connection
m_cx.Connect(lumyn::connection::UARTPort::kMXP);
m_cx.Connect(lumyn::connection::UARTPort::kMXP, 230400);  // Custom baud rate
```

## Next Steps

Now that you're connected, explore what you can do:

- [Connecting to Devices](connecting-to-devices) - USB, UART, event handling
- [LED Strip Animations](led-animations) - Colors, animations, and sequences
- [LED Matrices](led-matrices) - Text and image display
- [DirectLED](directled) - Per-pixel control with WPILib LEDPattern
- [Modules & Sensors](modules-and-sensors) - Sensor data callbacks (ConnectorX only)
- [Device Configuration](device-configuration) - Load and apply configurations
- [Simulation](simulation) - Test in the WPILib simulator
