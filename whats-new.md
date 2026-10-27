---
hide-toc: true
---

# What's new in 2027

This release brings firmware 4.4, a refreshed Lumyn Studio, and a vendordep for WPILib 2027 on SystemCore. Read [Upgrading from 2026](#upgrading-from-2026) before you update a board or a robot project.

---

## Firmware 4.4

### 37 animations

Eleven animations are new: Strobe, Wipe, Fireworks, Aurora, Converge, Starfield, Snake, DigitalRain, Drops, Monitor, and BouncingBalls. Six of them run on matrix zones only: Starfield, Snake, DigitalRain, Drops, Monitor, and BouncingBalls. The other five run on strips and matrices. That makes 37 animations in all. See [Available animations](programming-guide/led-animations.md#available-animations).

Every built-in animation has its own default color, and each one is redrawn so the board, the simulator, and Lumyn Studio show the same thing.

### Animations on matrices

All 26 earlier animations now play on matrix zones, sized to the zone. Before 4.4, matrix zones refused them. See [LED matrices](programming-guide/led-matrices.md).

### Color accuracy

LEDs now show the color you picked. Dim and middle colors aren't washed out, grays stay gray, and a dimmed color keeps its hue.

### Live config

A configuration you upload is used at once, with no restart, and is saved for the next power-up. Zones that didn't change keep playing. A configuration the board can't parse is refused, and the saved one keeps running. See [Configurations the board refuses](config-reference.md#configurations-the-board-refuses).

### Reliability

If the firmware crashes, the board reboots and reports what failed instead of freezing with USB dead. Errors found before a host connects are sent when one does.

---

## Lumyn Studio

Lumyn Studio has a new look, new navigation, and redesigned device, module, sequence, and image pages. See the [Lumyn Studio guide](user-guide/index).

- **Live LED preview**: The preview shows what the selected zone is displaying, read from the board. It needs firmware 4.4.
- **Animation previews**: Studio previews all 37 animations, on strips and on matrices, with the same animation code as the board.
- **Code page**: Each device has a Code page with Java and C++ snippets for its zones, groups, and sequences. The snippets are for WPILib 2027 on SystemCore.
- **Live config**: With firmware 4.4, an uploaded configuration is used at once. Studio reads it back to confirm, and tells you if the board refused it and kept its saved one.

---

## WPILib 2027 and SystemCore

The vendordep builds against WPILib 2027 and runs on SystemCore. Robot projects use GradleRIO 2027.0.0-alpha-8 and Java 25. See [Getting started with the WPILib vendordep](programming-guide/getting-started-wpilib).

### ApplyConfiguration returns a ConfigResult

`ApplyConfiguration` returns a `ConfigResult` at once and never blocks the robot thread. Check it later to see whether the board is running the configuration. See [Applying configuration](programming-guide/device-configuration.md#applying-configuration).

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
// When the robot starts:
ConfigResult result = mCx.ApplyConfiguration(cfg);

// Later, in a periodic method:
if (result.isDone() && !result.succeeded()) {
    System.out.println("Config not applied: " + result.getReasonText());
}
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
// When the robot starts:
lumyn::config::ConfigResult result = m_cx.ApplyConfiguration(cfg);

// Later, in a periodic method:
if (result.IsDone() && !result.Succeeded()) {
    std::cout << "Config not applied: " << result.GetReasonText() << std::endl;
}
```
:::
::::

### Robot code never blocks

`Connect(USBPort)` returns at once. The vendordep finds, opens, and greets the board in the background, and connects again if the board is unplugged and plugged back in. Check `IsConnected()` later. `RequestConfig()` also returns at once. See [Connecting to devices](programming-guide/connecting-to-devices).

Commands you send while the board isn't connected wait and go out in order once it connects.

### Send JSON to a custom module

Robot code can send JSON to a custom module with `SendModuleJson(moduleId, json)`, up to about 4 KB per send. See [Modules and sensors](programming-guide/modules-and-sensors).

### Animation builders

Builders are the way to play an animation, a text scroll, or an image sequence.

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
import org.wpilib.util.Color;
import org.wpilib.units.Units;
import com.lumynlabs.domain.led.Animation;

cXAnimate.leds.SetAnimation(Animation.Chase)
    .ForZone("left-climber")
    .WithColor(new Color(0.78, 0.47, 0.06))
    .WithDelay(Units.Milliseconds.of(40))
    .Reverse(false)
    .RunOnce(false);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
#include <lumyn/led/Animation.h>
#include <wpi/util/Color.hpp>
#include <wpi/units/time.hpp>

m_animate.SetAnimation(lumyn::led::Animation::Chase)
    .ForZone("left-climber")
    .WithColor(wpi::util::Color{200, 120, 15})
    .WithDelay(40_ms)
    .Reverse(false)
    .RunOnce(false);
```
:::
::::

See [Animation builder](programming-guide/led-animations.md#animation-builder).

---

## Coming soon: Lumyn Studio for SystemCore

A stripped-down version of Lumyn Studio that you open from the SystemCore, with no USB cable to your laptop, is coming soon. It will inspect a board's configuration, send LED commands, and show module data. It can't change a configuration or update firmware. We don't have a date yet.

---

## Upgrading from 2026

### Before you update a board

- **Check modules and delays.** A configuration with more modules than the board runs (5 on ConnectorX, 2 on ConnectorX Animate) is refused, and a saved one skips the extra modules. A looping animation can now run up to 10 times its designed speed.

### Before you update robot code

- **Use WPILib 2027 and SystemCore.** The vendordep needs WPILib 2027.0.0-alpha-8 and Java 25. roboRIO robots stay on the 2026 vendordep. Apply WPILib's own 2027 renames: `org.wpilib.util.Color`, `org.wpilib.units`, and `org.wpilib.hardware.led.AddressableLEDBuffer` in Java, and `wpi::util::Color` and `wpi::units::millisecond_t` in C++.
- **Use builders.** The direct calls that take a zone or group ID are removed: `SetAnimation`, `SetGroupAnimation`, `SetText`, `SetGroupText`, `SetImageSequence`, and `SetGroupImageSequence`. Use `SetAnimation(Animation.Chase).ForZone("front")`, `SetText("HI").ForZone("matrix")`, or `SetImageSequence("id").ForZone("matrix")`. Use `ForGroup(...)` for groups. `SetColor` and `SetAnimationSequence` stay.
- **Handle the ConfigResult.** Code that ignores it still compiles. With a board older than firmware 4.4, `ApplyConfiguration` restarts the board first.
- **Use public C++ names.** Names in `lumyn::internal` are removed. Use `lumyn::event::Event`, `lumyn::config::NetworkType`, and `lumyn::led::MatrixTextScrollDirection`. In Java, use `ConfigBuilder` instead of `LumynDeviceConfig.Builder`.
- **Don't expect UART on SystemCore yet.** `Connect(UARTPort...)` logs an error and returns `false`. Connect over USB. See [UART connection](programming-guide/connecting-to-devices.md#uart-connection-connectorx-only).

The [changelog](changelog) lists every change in this release. If you hit a problem, see the [troubleshooting FAQ](troubleshooting-faq) or write to [support@lumynlabs.com](mailto:support@lumynlabs.com).
