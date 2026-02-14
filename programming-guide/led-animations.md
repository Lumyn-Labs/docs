---
hide-toc: true
---

# LED Strip Animations

Control LED strips with solid colors, built-in animations, and animation sequences.

## Setting Colors

Display a solid color on a zone or group using the `Fill` animation.

### Single Zone

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.Animation;

cXAnimate.leds.SetAnimation(Animation.Fill)
    .ForZone("left-climber")
    .WithColor(new Color(1.0, 0, 0))
    .WithDelay(Units.Milliseconds.of(0))
    .RunOnce(false);
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
#include <frc/util/Color.h>
#include <units/time.h>
#include <lumyn/led/Animation.h>

m_animate.SetAnimation(lumyn::led::Animation::Fill)
    .ForZone("left-climber")
    .WithColor(frc::Color{1.0, 0, 0})
    .WithDelay(0_ms)
    .RunOnce(false);
```
:::
:::{tab-item} Python
:sync: python

```python
from lumyn_sdk import Animation

cx_animate.leds.set_animation("left-climber", Animation.Fill, (255, 0, 0), 0)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone

```cpp
#include <lumyn/led/Animation.h>

lumyn::device::ConnectorXAnimate cx;
cx.Connect("/dev/ttyACM0");
cx.SetAnimation(lumyn::led::Animation::Fill)
    .ForZone("left-climber")
    .WithColor({255, 0, 0})
    .WithDelay(0)
    .RunOnce(false);
```
:::

:::{tab-item} C
:sync: c

```c
lumyn_color_t red = {255, 0, 0};
lumyn_SetAnimation(LUMYN_BASE_PTR(&cx), "left-climber",
    LUMYN_ANIMATION_FILL, red, 0, false, false);
```
:::
::::

### Zone Groups

Display a solid color on multiple zones:

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
cXAnimate.leds.SetAnimation(Animation.Fill)
    .ForGroup("all-climbers")
    .WithColor(new Color(0, 1.0, 0))
    .WithDelay(Units.Milliseconds.of(0))
    .RunOnce(false);
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
m_animate.SetAnimation(lumyn::led::Animation::Fill)
    .ForGroup("all-climbers")
    .WithColor(frc::Color{0, 1.0, 0})
    .WithDelay(0_ms)
    .RunOnce(false);
```
:::
:::{tab-item} Python
:sync: python

```python
from lumyn_sdk import Animation

cx_animate.leds.set_animation(Animation.Fill) \
    .for_group("all-climbers") \
    .with_color((0, 255, 0)) \
    .with_delay(0) \
    .run_once(False)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone

```cpp
cx.SetAnimation(lumyn::led::Animation::Fill)
    .ForGroup("all-climbers")
    .WithColor({0, 255, 0})
    .WithDelay(0)
    .RunOnce(false);
```
:::

:::{tab-item} C
:sync: c

```c
lumyn_color_t green = {0, 255, 0};
lumyn_SetGroupAnimation(LUMYN_BASE_PTR(&cx), "all-climbers",
    LUMYN_ANIMATION_FILL, green, 0, false, false);
```
:::
::::

## Built-in Animations

Use the builder API to configure and play animations. The builder pattern provides a fluent interface for setting animation parameters.

### Available Animations

| Animation | Description |
|-----------|-------------|
| `None` | No animation |
| `Fill` | Solid fill — use this to display a solid color on a zone |
| `Blink` | On/off blinking |
| `Breathe` | Smooth fade in/out |
| `Chase` | Moving dot pattern |
| `RainbowRoll` | Rainbow colors rolling along strip |
| `RainbowCycle` | Rainbow cycling in place |
| `SineRoll` | Sine wave color pattern |
| `FadeIn` / `FadeOut` | Gradual fade effects |
| `AlternateBreathe` | Alternating breathing pattern |
| `GrowingBreathe` | Growing breath effect |
| `Comet` | Comet with fading tail |
| `Sparkle` | Random sparkles |
| `Fire` | Fire/flame effect |
| `Scanner` | Back and forth scanner |
| `TheaterChase` | Theater marquee chase |
| `Twinkle` | Random twinkling |
| `Meteor` | Meteor rain effect |
| `Wave` | Wave pattern |
| `Pulse` | Pulsing effect |
| `Larson` | Larson scanner (Knight Rider style) |
| `Ripple` | Ripple effect |
| `Confetti` | Random confetti colors |
| `Lava` | Lava lamp effect |
| `Plasma` | Plasma effect |
| `Heartbeat` | Heartbeat pattern |

### Animation Builder

The builder API follows this pattern:

1. Call `SetAnimation(animation)` with your chosen animation
2. Target a zone with `ForZone("zone-id")` or group with `ForGroup("group-id")`
3. Set color with `WithColor(color)`
4. Set timing with `WithDelay(delay)`
5. Optionally set `Reverse(bool)` for direction
6. Call `RunOnce(bool)` to set one-shot behavior, or call `.execute()` to send with defaults

```{tip}
In C++/Java, you can end the builder chain with either `.RunOnce(false)` or `.execute()`. Using `.execute()` will send the command with the default settings (looping, not reversed).
```

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.Animation;

// Gold chase animation, 40ms between frames, looping
cXAnimate.leds.SetAnimation(Animation.Chase)
    .ForZone("left-climber")
    .WithColor(new Color(0.78, 0.47, 0.06))  // Gold
    .WithDelay(Units.Milliseconds.of(40))
    .Reverse(false)
    .RunOnce(false);

// Red chase on a group, reversed, runs once
cXAnimate.leds.SetAnimation(Animation.Chase)
    .ForGroup("right-climber")
    .WithColor(new Color(1.0, 0, 0))
    .WithDelay(Units.Milliseconds.of(40))
    .Reverse(true)
    .RunOnce(true);

// Rainbow roll animation
cXAnimate.leds.SetAnimation(Animation.RainbowRoll)
    .ForZone("front")
    .WithColor(new Color(1.0, 1.0, 1.0))  // Color tint
    .WithDelay(Units.Milliseconds.of(50))
    .Reverse(false)
    .RunOnce(false);
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/led/Animation.h>
#include <frc/util/Color.h>
#include <units/time.h>

using lumyn::led::Animation;

// Gold chase animation, 40ms between frames, looping
m_animate.SetAnimation(Animation::Chase)
    .ForZone("left-climber")
    .WithColor({200, 120, 15})
    .WithDelay(40_ms)
    .Reverse(false)
    .RunOnce(false);

// Red chase on a group, reversed, runs once
m_animate.SetAnimation(Animation::Chase)
    .ForGroup("right-climber")
    .WithColor({255, 0, 0})
    .WithDelay(40_ms)
    .Reverse(true)
    .RunOnce(true);

// Rainbow roll animation
m_animate.SetAnimation(Animation::RainbowRoll)
    .ForZone("front")
    .WithColor(frc::Color8Bit(255, 255, 255).ToColor())
    .WithDelay(50_ms)
    .Reverse(false)
    .RunOnce(false);
```
:::
:::{tab-item} Python
```python
from lumyn_sdk import Animation

# Gold chase animation, 40ms between frames, looping
cx_animate.leds.set_animation(Animation.Chase) \
    .for_zone("left-climber") \
    .with_color((200, 120, 15)) \
    .with_delay(40) \
    .reverse(False) \
    .run_once(False)

# Red chase on a group, reversed, runs once
cx_animate.leds.set_animation(Animation.Chase) \
    .for_group("right-climber") \
    .with_color((255, 0, 0)) \
    .with_delay(40) \
    .reverse(True) \
    .run_once(True)

# Rainbow roll animation
cx_animate.leds.set_animation(Animation.RainbowRoll) \
    .for_zone("front") \
    .with_color((255, 255, 255)) \
    .with_delay(50) \
    .reverse(False) \
    .run_once(False)
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorXAnimate.hpp>

// Gold chase animation, 40ms between frames, looping
cx.SetAnimation(lumyn::led::Animation::Chase)
    .ForZone("left-climber")
    .WithColor({200, 120, 15})
    .WithDelay(40)
    .Reverse(false)
    .RunOnce(false);

// Red chase on a group, reversed, runs once
cx.SetAnimation(lumyn::led::Animation::Chase)
    .ForGroup("right-climber")
    .WithColor({255, 0, 0})
    .WithDelay(40)
    .Reverse(true)
    .RunOnce(true);
```
:::
:::{tab-item} C
```c
lumyn_color_t gold = {200, 120, 15};
lumyn_SetAnimation(LUMYN_BASE_PTR(&cx), "left-climber",
    LUMYN_ANIMATION_CHASE, gold, 40, 0, 0);

lumyn_color_t red = {255, 0, 0};
lumyn_SetAnimation(LUMYN_BASE_PTR(&cx), "right-climber",
    LUMYN_ANIMATION_CHASE, red, 40, 1, 1);  // reversed, run once
```
:::
::::

## Animation Sequences

Animation sequences are predefined patterns configured on the device (via Lumyn Studio or configuration files). They chain multiple animations together with timing. Each step in a sequence has its own animation type, color, delay, direction, and optional repeat count.

```{important}
Animation sequences **play once** and stop. They do not loop. After the last step completes, the zone goes idle. To replay a sequence, send the `SetAnimationSequence` command again.
```

```{note}
Starting a new animation with `SetAnimation` while a sequence is playing will **cancel the sequence** and replace it with the new animation.
```

### Playing a Sequence

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
// Play the "intake-sequence" on the "intake" zone
cXAnimate.leds.SetAnimationSequence("intake", "intake-sequence");

// Play on a group of zones
cXAnimate.leds.SetGroupAnimationSequence("all-intake", "intake-sequence");
```
:::
:::{tab-item} C++ (WPILib)
```cpp
// Play the "intake-sequence" on the "intake" zone
m_animate.SetAnimationSequence("intake", "intake-sequence");

// Play on a group of zones
m_animate.SetGroupAnimationSequence("all-intake", "intake-sequence");
```
:::
:::{tab-item} Python
```python
# Play the "intake-sequence" on the "intake" zone
cx_animate.leds.set_animation_sequence("intake", "intake-sequence")

# Play on a group of zones
cx_animate.leds.set_group_animation_sequence("all-intake", "intake-sequence")
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
cx.SetAnimationSequence("intake", "intake-sequence");
cx.SetGroupAnimationSequence("all-intake", "intake-sequence");
```
:::
:::{tab-item} C
```c
lumyn_SetAnimationSequence(LUMYN_BASE_PTR(&cx), "intake", "intake-sequence");
lumyn_SetGroupAnimationSequence(LUMYN_BASE_PTR(&cx), "all-intake", "intake-sequence");
```
:::
::::

### Creating Sequences

Animation sequences are typically created in Lumyn Studio:

1. Open the **Animation Sequences** tab
2. Click **Create Animation Sequence**
3. Add steps with animations, colors, delays, and repeat counts
4. Use the preview to visualize the sequence
5. Save and export to your device

See [Animations & Sequences](../user-guide/animations-and-sequences) in the Lumyn Studio Guide for details.

## Zones vs Groups

Understanding zones and groups is key to effective LED control:

**Zone**: A logical subsection of a channel that you control independently. Configured in Lumyn Studio with an ID like `"left-climber"` or `"front"`.

**Group**: A collection of zones that receive the same command simultaneously. Groups are configured in Lumyn Studio and referenced by their group ID.
