---
hide-toc: true
---

# LED Matrices

Display text and image sequences on LED matrix zones.

## Displaying Text

Use the text builder API to show scrolling or static text on matrix zones.

### Basic Scrolling Text

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.MatrixTextScrollDirection;

// Scrolling text with white color, scrolling left
cXAnimate.leds.SetText("Hello World!")
    .ForZone("front-matrix")
    .WithColor(new Color(1.0, 1.0, 1.0))
    .WithDirection(MatrixTextScrollDirection.Left)
    .WithDelay(Units.Milliseconds.of(300))
    .RunOnce(false);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
#include <lumyn/device/ConnectorXAnimate.h>
#include <frc/util/Color.h>
#include <units/time.h>

using Dir = lumyn::internal::Command::LED::MatrixTextScrollDirection;

// Scrolling text with white color, scrolling left
m_animate.SetText("Hello World!")
    .ForZone("front-matrix")
    .WithColor(frc::Color{1.0, 1.0, 1.0})
    .WithDirection(Dir::LEFT)
    .WithDelay(300_ms)
    .RunOnce(false);
```
:::

:::{tab-item} Python
:sync: python
```python
from lumyn_sdk import MatrixTextScrollDirection

# Scrolling text with white color, scrolling left
cx_animate.leds.set_text("Hello World!") \
    .for_zone("front-matrix") \
    .with_color((255, 255, 255)) \
    .with_direction(MatrixTextScrollDirection.LEFT) \
    .with_delay(300) \
    .run_once(False)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorXAnimate.hpp>

cx.SetText("Hello World!")
    .ForZone("front-matrix")
    .WithColor({255, 255, 255})
    .WithDirection(LUMYN_MATRIX_TEXT_SCROLL_LEFT)
    .WithDelay(300)
    .RunOnce(false);
```
:::

:::{tab-item} C
:sync: c
```c
lumyn_color_t white = {255, 255, 255};
lumyn_SetText(LUMYN_BASE_PTR(&cx), "front-matrix", "Hello World!",
    white, LUMYN_MATRIX_TEXT_SCROLL_LEFT, 300, 0);
```
:::
::::

### Text on Groups

Display the same text across multiple matrix zones:

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
cXAnimate.leds.SetText("GO TEAM!")
    .ForGroup("all-matrices")
    .WithColor(new Color(1.0, 1.0, 0))
    .WithDirection(MatrixTextScrollDirection.Right)
    .WithDelay(Units.Milliseconds.of(500))
    .RunOnce(false);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
m_animate.SetText("GO TEAM!")
    .ForGroup("all-matrices")
    .WithColor(frc::Color{1.0, 1.0, 0})
    .WithDirection(Dir::RIGHT)
    .WithDelay(500_ms)
    .RunOnce(false);
```
:::

:::{tab-item} Python
:sync: python
```python
cx_animate.leds.set_text("GO TEAM!") \
    .for_group("all-matrices") \
    .with_color((255, 255, 0)) \
    .with_direction(MatrixTextScrollDirection.RIGHT) \
    .with_delay(500) \
    .run_once(False)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
cx.SetText("GO TEAM!")
    .ForGroup("all-matrices")
    .WithColor({255, 255, 0})
    .WithDirection(LUMYN_MATRIX_TEXT_SCROLL_RIGHT)
    .WithDelay(500)
    .RunOnce(false);
```
:::

:::{tab-item} C
:sync: c
```c
lumyn_color_t yellow = {255, 255, 0};
lumyn_SetGroupText(&cx.base, "all-matrices", "GO TEAM!",
    yellow, LUMYN_MATRIX_TEXT_SCROLL_RIGHT, 500, false);
```
:::
::::

## Advanced Text Options

The text builder supports many formatting options for fine-tuned control.

### Available Fonts

| Category | Fonts | Best For |
|----------|-------|----------|
| Tiny (3-6px) | `BUILTIN`, `TINY_3X3`, `PICOPIXEL`, `TOM_THUMB`, `ORG_01` | 8x8 matrices |
| Small (9pt) | `FREE_MONO_9`, `FREE_MONO_BOLD_9`, `FREE_SANS_9`, `FREE_SANS_BOLD_9`, `FREE_SERIF_9`, `FREE_SERIF_BOLD_9` | 16x16 to 32x32 |
| Medium (12pt) | `FREE_MONO_12`, `FREE_MONO_BOLD_12`, `FREE_SANS_12`, `FREE_SANS_BOLD_12`, `FREE_SERIF_12`, `FREE_SERIF_BOLD_12` | 32x32+ |
| Large (18pt) | `FREE_MONO_18`, `FREE_MONO_BOLD_18`, `FREE_SANS_18`, `FREE_SANS_BOLD_18`, `FREE_SERIF_18`, `FREE_SERIF_BOLD_18` | Large displays |
| XL (24pt) | `FREE_MONO_24`, `FREE_MONO_BOLD_24`, `FREE_SANS_24`, `FREE_SANS_BOLD_24`, `FREE_SERIF_24`, `FREE_SERIF_BOLD_24` | Very large displays |

### Text Builder Options

| Method | Description |
|--------|-------------|
| `ForZone(zoneId)` | Target a single zone |
| `ForGroup(groupId)` | Target multiple zones |
| `WithColor(color)` | Text foreground color |
| `WithFont(font)` | Font selection |
| `WithBackgroundColor(color)` | Background color |
| `WithDelay(delay)` | Scroll speed |
| `WithDirection(dir)` | Scroll direction (`Left`, `Right`) |
| `WithShowBackground(bool)` | Enable background rendering |
| `WithSmoothScroll(bool)` | Pixel-by-pixel scrolling |
| `WithPingPong(bool)` | Bounce back and forth |
| `WithNoScroll(bool)` | Static text (use alignment) |
| `WithAlign(align)` | Text alignment: `Left`, `Center`, `Right` |
| `WithYOffset(offset)` | Vertical offset |
| `RunOnce(bool)` | Run once or loop |

### Custom Font and Background

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
import com.lumynlabs.domain.led.MatrixTextFont;

// Custom font with background color
cXAnimate.leds.SetText("Team 9993")
    .ForZone("front-matrix")
    .WithColor(new Color(1.0, 1.0, 0))
    .WithBackgroundColor(new Color(0, 0, 0.25))
    .WithShowBackground(true)
    .WithFont(MatrixTextFont.FreeSans9)
    .WithSmoothScroll(true)
    .WithDelay(Units.Milliseconds.of(40))
    .RunOnce(false);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
using Font = lumyn::internal::Command::LED::MatrixTextFont;

m_animate.SetText("Team 9993")
    .ForZone("front-matrix")
    .WithColor(frc::Color{1.0, 1.0, 0})
    .WithBackgroundColor(frc::Color{0, 0, 0.25})
    .WithShowBackground(true)
    .WithFont(Font::FREE_SANS_9)
    .WithSmoothScroll(true)
    .WithDelay(40_ms)
    .RunOnce(false);
```
:::

:::{tab-item} Python
:sync: python
```python
from lumyn_sdk import MatrixTextFont, MatrixTextAlign

cx_animate.leds.set_text("Team 9993") \
    .for_zone("front-matrix") \
    .with_color((255, 255, 0)) \
    .with_background_color((0, 0, 64)) \
    .show_background(True) \
    .with_font(MatrixTextFont.FREE_SANS_9) \
    .smooth_scroll(True) \
    .with_delay(40) \
    .run_once(False)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
cx.SetText("Team 9993")
    .ForZone("front-matrix")
    .WithColor({255, 255, 0})
    .WithBackgroundColor({0, 0, 64})
    .ShowBackground(true)
    .WithFont(LUMYN_MATRIX_TEXT_FONT_FREE_SANS_9)
    .SmoothScroll(true)
    .WithDelay(40)
    .RunOnce(false);
```
:::

:::{tab-item} C
:sync: c
```c
lumyn_matrix_text_flags_t flags = {0};
flags.showBackground = 1;
flags.smoothScroll = 1;

lumyn_SetTextAdvanced(
    &cx.base, "front-matrix", "Team 9993", (lumyn_color_t){255, 255, 0},
    LUMYN_MATRIX_TEXT_SCROLL_LEFT, 40, false,
    (lumyn_color_t){0, 0, 64},
    LUMYN_MATRIX_TEXT_FONT_FREE_SANS_9,
    LUMYN_MATRIX_TEXT_ALIGN_LEFT,
    flags, 0);
```
:::
::::

### Static Centered Text

For non-scrolling text with alignment:

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
import com.lumynlabs.domain.led.MatrixTextFont;
import com.lumynlabs.domain.led.MatrixTextAlign;

cXAnimate.leds.SetText("READY")
    .ForZone("status-matrix")
    .WithColor(new Color(0, 1.0, 0))
    .WithNoScroll(true)
    .WithAlign(MatrixTextAlign.Center)
    .WithFont(MatrixTextFont.TomThumb)
    .RunOnce(false);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
using Font = lumyn::internal::Command::LED::MatrixTextFont;
using Align = lumyn::internal::Command::LED::MatrixTextAlign;

m_animate.SetText("READY")
    .ForZone("status-matrix")
    .WithColor(frc::Color{0, 1.0, 0})
    .WithNoScroll(true)
    .WithAlign(Align::CENTER)
    .WithFont(Font::TOM_THUMB)
    .RunOnce(false);
```
:::

:::{tab-item} Python
:sync: python
```python
from lumyn_sdk import MatrixTextFont, MatrixTextAlign

cx_animate.leds.set_text("READY") \
    .for_zone("status-matrix") \
    .with_color((0, 255, 0)) \
    .no_scroll(True) \
    .with_align(MatrixTextAlign.CENTER) \
    .with_font(MatrixTextFont.TOM_THUMB) \
    .run_once(False)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
cx.SetText("READY")
    .ForZone("status-matrix")
    .WithColor({0, 255, 0})
    .NoScroll(true)
    .WithAlign(LUMYN_MATRIX_TEXT_ALIGN_CENTER)
    .WithFont(LUMYN_MATRIX_TEXT_FONT_TOM_THUMB)
    .RunOnce(false);
```
:::

:::{tab-item} C
:sync: c
```c
lumyn_matrix_text_flags_t flags = {0};
flags.noScroll = 1;

lumyn_SetTextAdvanced(
    &cx.base, "status-matrix", "READY", (lumyn_color_t){0, 255, 0},
    LUMYN_MATRIX_TEXT_SCROLL_LEFT, 50, false,
    (lumyn_color_t){0, 0, 0},
    LUMYN_MATRIX_TEXT_FONT_TOM_THUMB,
    LUMYN_MATRIX_TEXT_ALIGN_CENTER,
    flags, 0);
```
:::
::::

## Image Sequences

Display animated image sequences on matrix zones. Image sequences are created in Lumyn Studio and consist of numbered BMP files.

### Playing an Image Sequence

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
// Play "Emoji_16x16_unknown" with purple tint, looping
cXAnimate.leds.SetImageSequence("Emoji_16x16_unknown")
    .ForZone("front-matrix")
    .WithColor(new Color(0.47, 0, 0.39))
    .SetColor(true)   // Apply color tint
    .RunOnce(false);

// Play with original colors (no tint)
cXAnimate.leds.SetImageSequence("logo_8x32")
    .ForGroup("all-matrices")
    .WithColor(new Color(1.0, 1.0, 1.0))
    .SetColor(false)  // Use original image colors
    .RunOnce(true);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
// Play with purple tint, looping
m_animate.SetImageSequence("Emoji_16x16_unknown")
    .ForZone("front-matrix")
    .WithColor(frc::Color{0.47, 0, 0.39})
    .SetColor(true)
    .RunOnce(false);

// Play with original colors
m_animate.SetImageSequence("logo_8x32")
    .ForGroup("all-matrices")
    .WithColor(frc::Color{1.0, 1.0, 1.0})
    .SetColor(false)
    .RunOnce(true);
```
:::

:::{tab-item} Python
:sync: python
```python
# Play with purple tint, looping
cx_animate.leds.set_image_sequence("Emoji_16x16_unknown") \
    .for_zone("front-matrix") \
    .with_color((120, 0, 100)) \
    .set_color(True) \
    .run_once(False)

# Play with original colors
cx_animate.leds.set_image_sequence("logo_8x32") \
    .for_group("all-matrices") \
    .with_color((255, 255, 255)) \
    .set_color(False) \
    .run_once(True)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
cx.SetImageSequence("Emoji_16x16_unknown")
    .ForZone("front-matrix")
    .WithColor({120, 0, 100})
    .SetColor(true)
    .RunOnce(false);

cx.SetImageSequence("logo_8x32")
    .ForGroup("all-matrices")
    .WithColor({255, 255, 255})
    .SetColor(false)
    .RunOnce(true);
```
:::

:::{tab-item} C
:sync: c
```c
lumyn_SetImageSequence(&cx.base, "front-matrix", "Emoji_16x16_unknown",
    (lumyn_color_t){120, 0, 100}, true, false);

lumyn_SetGroupImageSequence(&cx.base, "all-matrices", "logo_8x32",
    (lumyn_color_t){255, 255, 255}, false, true);
```
:::
::::

### Image Sequence Builder Options

| Method | Description |
|--------|-------------|
| `ForZone(zoneId)` | Target a single zone |
| `ForGroup(groupId)` | Target multiple zones |
| `WithColor(color)` | Color tint |
| `SetColor(bool)` | Apply tint (true) or use original colors (false) |
| `RunOnce(bool)` | Run once or loop |

### Creating Image Sequences

Image sequences are created in Lumyn Studio:

1. Open the **Image Sequences** tab
2. Click **Create Image Sequence**
3. Import images, animated GIFs, or draw directly
4. Configure frame timing
5. Export to your device

See [Image Sequences](../user-guide/image-sequences-matrix) in the Lumyn Studio Guide.

### File Locations

**Simulation (WPILib)**:
- Image sequences: `deploy/connectorx/<sequenceId>/` (then falls back to `deploy/<sequenceId>/`)
- Static bitmaps: `deploy/<path>` (then `deploy/connectorx/<path>`)

**Hardware**:
- Place image folders at the root of the device SD card
- Each folder contains numbered BMP files: `0.bmp`, `1.bmp`, etc.

## Matrix Zone Configuration

Matrix zones are configured in Lumyn Studio with:

- **Rows/Columns**: Matrix dimensions (e.g., 16x16, 8x32)
- **Orientation**: How LEDs are wired (corner position, axis layout, sequence layout)
- **Brightness**: Optional brightness override

The orientation settings ensure images display correctly regardless of how the physical LEDs are wired.
