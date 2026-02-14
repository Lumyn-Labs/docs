---
hide-toc: true
---

# DirectLED

DirectLED provides high-frequency per-pixel LED buffer control with delta compression. Use it for custom animations, WPILib LED patterns, or any scenario where you need direct control over individual LED colors.

## Overview

DirectLED is ideal for:

- Per-pixel control (custom animations, gradients, patterns)
- WPILib `LEDPattern` integration
- High-frequency updates (game-responsive lighting)
- Minimal bandwidth usage (delta compression)

## Creating a DirectLED Controller

Create a DirectLED controller for a zone, specifying the number of LEDs:

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import com.lumynlabs.devices.ConnectorX;
import com.lumynlabs.domain.led.DirectLED;
import com.lumynlabs.connection.usb.USBPort;

ConnectorX cx = new ConnectorX();
cx.Connect(USBPort.kUSB1);

// Create DirectLED for a 60-LED zone
DirectLED direct = cx.createDirectLED("strip-zone", 60);
// Or via the leds handler:
// DirectLED direct = cx.leds.createDirectLED("strip-zone", 60);
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/connection/USBPort.h>

lumyn::device::ConnectorX m_cx;
m_cx.Connect(lumyn::connection::USBPort::kUSB1);

// Create DirectLED for a 60-LED zone
auto direct = m_cx.CreateDirectLED("strip-zone", 60);
```
:::
:::{tab-item} Python
:sync: python

```python
from lumyn_sdk import ConnectorX

cx = ConnectorX()
cx.connect("COM3")

# Create DirectLED for a 60-LED zone
direct = cx.leds.create_direct_led("strip-zone", 60)
```
:::
::::

## Updating the Buffer

Send LED data each frame. The SDK uses delta compression to minimize bandwidth.

### WPILib LEDPattern (Java/C++)

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import edu.wpi.first.wpilibj.AddressableLEDBuffer;
import edu.wpi.first.wpilibj.LEDPattern;
import static edu.wpi.first.units.Units.Meters;
import static edu.wpi.first.units.Units.MetersPerSecond;
import edu.wpi.first.units.measure.Distance;

// Create buffer matching zone size
AddressableLEDBuffer buffer = new AddressableLEDBuffer(60);

// LED spacing (120 LEDs per meter)
Distance ledSpacing = Meters.of(1.0 / 120.0);

// Create a scrolling rainbow pattern
LEDPattern rainbow = LEDPattern.rainbow(255, 128);
LEDPattern scrolling = rainbow.scrollAtAbsoluteSpeed(MetersPerSecond.of(0.1), ledSpacing);

// In robotPeriodic
@Override
public void robotPeriodic() {
    scrolling.applyTo(buffer);
    direct.update(buffer);
}
```
:::
:::{tab-item} C++ (WPILib)
```cpp
#include <array>
#include <frc/AddressableLED.h>
#include <frc/LEDPattern.h>
#include <units/length.h>
#include <units/velocity.h>

constexpr int kStripLength = 60;
constexpr units::meter_t kLedSpacing{1.0 / 120.0};

std::array<frc::AddressableLED::LEDData, kStripLength> buffer;

// Create a scrolling rainbow pattern
auto rainbow = frc::LEDPattern::Rainbow(255, 128);
auto scrolling = rainbow.ScrollAtAbsoluteSpeed(0.1_mps, kLedSpacing);

// In RobotPeriodic
void Robot::RobotPeriodic() {
    scrolling.ApplyTo(buffer);
    direct->Update(buffer);
}
```
:::
::::

### Raw Buffer

::::{tab-set}
:::{tab-item} Python
```python
num_leds = 60

# Build a gradient buffer
buffer = bytearray(num_leds * 3)
for i in range(num_leds):
    r = int(255 * i / (num_leds - 1))
    g = 0
    b = 255 - r
    idx = i * 3
    buffer[idx:idx + 3] = bytes((r, g, b))

# Update the zone
direct.update(bytes(buffer))
```
:::
:::{tab-item} C++ (Standalone)
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorXAnimate.hpp>
#include <vector>

lumyn::device::ConnectorXAnimate cx;
cx.Connect("/dev/ttyACM0");

auto direct = cx.CreateDirectLED("strip-zone", 60);

// Build a gradient buffer (3 bytes per LED: R, G, B)
std::vector<uint8_t> buffer(60 * 3);
for (int i = 0; i < 60; i++) {
    uint8_t r = static_cast<uint8_t>(255.0f * i / 59.0f);
    uint8_t g = 0;
    uint8_t b = static_cast<uint8_t>(255.0f * (1.0f - i / 59.0f));
    
    buffer[i * 3 + 0] = r;
    buffer[i * 3 + 1] = g;
    buffer[i * 3 + 2] = b;
}

// Update the zone (raw bytes)
direct.UpdateRaw(buffer.data(), buffer.size());
```
:::
:::{tab-item} C
```c
#include <lumyn/c/lumyn_device.h>
#include <lumyn/c/lumyn_direct_led.h>
#include <stdint.h>
#include <stdio.h>

cx_animate_t cx;
lumyn_CreateConnectorXAnimate(&cx);
lumyn_Connect(LUMYN_BASE_PTR(&cx), "COM3");

// Create DirectLED controller (60 LEDs, full refresh every 100 frames)
lumyn_direct_led_t *direct = NULL;
lumyn_DirectLEDCreate(LUMYN_BASE_PTR(&cx), "strip-zone", 60, 100, &direct);

// Build a gradient buffer (3 bytes per LED: R, G, B)
uint8_t buffer[60 * 3];
for (int i = 0; i < 60; i++) {
    uint8_t r = (uint8_t)(255.0f * i / 59.0f);
    uint8_t g = 0;
    uint8_t b = (uint8_t)(255.0f * (1.0f - i / 59.0f));
    
    buffer[i * 3 + 0] = r;
    buffer[i * 3 + 1] = g;
    buffer[i * 3 + 2] = b;
}

// Update the zone (raw bytes)
lumyn_DirectLEDUpdateRaw(direct, buffer, sizeof(buffer));

// Cleanup
lumyn_DirectLEDDestroy(direct);
```
:::
::::

## Important Behavior

```{warning}
When DirectLED writes pixel data to a zone, the zone's built-in animation is **frozen**. The animation is not cleared, but it stops updating. To resume normal animations after using DirectLED, you must explicitly send a `SetAnimation` command.
```

This means:
- After you stop sending DirectLED frames, the zone will display the last frame indefinitely.
- Calling `SetColor` after DirectLED will **not** make anything visible — the zone is frozen.
- To return to built-in animations, call `SetAnimation` with any animation type (e.g., `Fill` for a solid color).

## Full Example

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.AddressableLEDBuffer;
import edu.wpi.first.wpilibj.LEDPattern;
import static edu.wpi.first.units.Units.*;
import edu.wpi.first.units.measure.Distance;

import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.connection.usb.USBPort;
import com.lumynlabs.domain.led.DirectLED;

public class Robot extends TimedRobot {
    private static final int STRIP_LENGTH = 60;
    private static final Distance LED_SPACING = Meters.of(1.0 / 120.0);

    private ConnectorXAnimate m_leds = new ConnectorXAnimate();
    private DirectLED m_direct;
    private AddressableLEDBuffer m_buffer = new AddressableLEDBuffer(STRIP_LENGTH);
    private LEDPattern m_pattern;

    @Override
    public void robotInit() {
        m_leds.Connect(USBPort.kUSB1);
        m_direct = m_leds.leds.createDirectLED("front", STRIP_LENGTH);
        
        // Scrolling rainbow
        m_pattern = LEDPattern.rainbow(255, 128)
            .scrollAtAbsoluteSpeed(MetersPerSecond.of(0.5), LED_SPACING);
    }

    @Override
    public void robotPeriodic() {
        m_pattern.applyTo(m_buffer);
        m_direct.update(m_buffer);
    }
}
```
:::
:::{tab-item} C++ (WPILib)
```cpp
// Robot.h
#pragma once

#include <frc/TimedRobot.h>
#include <frc/AddressableLED.h>
#include <frc/LEDPattern.h>
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/domain/led/DirectLED.h>
#include <array>
#include <memory>

class Robot : public frc::TimedRobot {
public:
    void RobotInit() override;
    void RobotPeriodic() override;

private:
    static constexpr int kStripLength = 60;
    static constexpr units::meter_t kLedSpacing{1.0 / 120.0};

    lumyn::device::ConnectorXAnimate m_leds;
    std::unique_ptr<lumyn::device::DirectLED> m_direct;
    std::array<frc::AddressableLED::LEDData, kStripLength> m_buffer;
    frc::LEDPattern m_pattern = frc::LEDPattern::Rainbow(255, 128)
        .ScrollAtAbsoluteSpeed(0.5_mps, kLedSpacing);
};
```

```cpp
// Robot.cpp
#include "Robot.h"
#include <lumyn/connection/USBPort.h>

void Robot::RobotInit() {
    m_leds.Connect(lumyn::connection::USBPort::kUSB1);
    m_direct = std::make_unique<lumyn::device::DirectLED>(
        m_leds.CreateDirectLED("front", kStripLength));
}

void Robot::RobotPeriodic() {
    m_pattern.ApplyTo(m_buffer);
    m_direct->Update(m_buffer);
}
```
:::
:::{tab-item} Python
```python
#!/usr/bin/env python3
import time
from lumyn_sdk import ConnectorX

NUM_LEDS = 60
FRAME_DELAY = 0.02  # 50 FPS

def main():
    cx = ConnectorX()
    if not cx.connect_usb("COM3"):
        print("Failed to connect")
        return

    direct = cx.leds.create_direct_led("front", NUM_LEDS)
    offset = 0

    try:
        while True:
            buffer = bytearray(NUM_LEDS * 3)
            for i in range(NUM_LEDS):
                # Animated gradient
                pos = (i + offset) % NUM_LEDS
                r = int(255 * pos / NUM_LEDS)
                g = int(255 * (NUM_LEDS - pos) / NUM_LEDS)
                b = 128
                idx = i * 3
                buffer[idx:idx + 3] = bytes((r, g, b))
            
            direct.update(bytes(buffer))
            offset = (offset + 1) % NUM_LEDS
            time.sleep(FRAME_DELAY)
    except KeyboardInterrupt:
        pass
    finally:
        cx.close()

if __name__ == "__main__":
    main()
```
:::
::::

## Forcing a Full Update

To send the entire buffer without delta compression (useful for the first frame, or after a drastic color change):

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
direct.forceFullUpdate(buffer);
```
:::
:::{tab-item} C++ (WPILib)
```cpp
direct->ForceFullUpdate(buffer);
```
:::
:::{tab-item} Python
```python
direct.force_full_update(bytes(buffer))
```
:::
:::{tab-item} C++ (Standalone)
```cpp
direct.ForceFullUpdateRaw(buffer.data(), buffer.size());
```
:::
:::{tab-item} C
```c
lumyn_DirectLEDForceFullUpdateRaw(direct, buffer, sizeof(buffer));
```
:::
::::

## Reset and Resync

If the buffer gets out of sync (after a large change or reconnection), call `reset()` to reset the delta compression state. The next `update()` call will then send a full buffer:

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
direct.reset();
// Then send a new frame
direct.update(buffer);
```
:::
:::{tab-item} C++ (WPILib)
```cpp
direct->Reset();
// Then send a new frame
direct->Update(buffer);
```
:::
:::{tab-item} Python
```python
direct.reset()
# Then send a new frame
direct.update(buffer)
```
:::
::::

## Performance Tips

1. **Match buffer size to zone size** - The buffer must have exactly 3 bytes per LED.

2. **Update every frame** - DirectLED uses delta compression, so unchanged pixels are efficient.

3. **Call in robotPeriodic** - For consistent timing, update from your main loop.

4. **Reset after large changes** - If you switch patterns dramatically, call `reset()` first.

5. **Consider zone grouping** - For synchronized multi-zone patterns, update each zone's DirectLED in sequence.
