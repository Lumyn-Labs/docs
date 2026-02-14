---
hide-toc: true
---

# Getting Started with Python SDK

Control Lumyn Labs devices from Python on desktop computers, Raspberry Pi, and other host controllers. The Python SDK provides a Pythonic API for LED control, modules, and configuration.

```{warning}
**Beta Software**: The Python SDK is currently in beta and may be unstable. APIs and functionality are subject to change. Please report any issues to [support@lumynlabs.com](mailto:support@lumynlabs.com).
```

## Prerequisites

- **Python 3.11** (recommended)
- **uv** package manager
- **USB or UART connection** to your device

## Installation

### Install with uv

[uv](https://docs.astral.sh/uv/) is a fast Python package installer and virtual environment manager. Use it to install the SDK.

#### Step 1: Install uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Add uv to your PATH:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

To make this permanent, add it to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.).

#### Step 2: Install Python 3.11

```bash
uv python install 3.11
```

#### Step 3: Create a Virtual Environment

```bash
uv venv --python 3.11 ~/venvs/lumyn311
source ~/venvs/lumyn311/bin/activate
```

#### Step 4: Install pip (if needed)

```bash
python -m ensurepip --upgrade
python -m pip install -U pip
```

#### Step 5: Install the SDK

```bash
python -m pip install --only-binary=:all: lumyn-sdk
```

## Choose Your Device Class

The Python SDK provides two device classes that correspond to the physical hardware you own:

### ConnectorX

Use the `ConnectorX` class if you have a **ConnectorX** device.

```python
from lumyn_sdk import ConnectorX

cx = ConnectorX()
cx.connect("COM3")
```

### ConnectorXAnimate

Use the `ConnectorXAnimate` class if you have a **ConnectorX Animate** device.

```python
from lumyn_sdk import ConnectorXAnimate

cx_animate = ConnectorXAnimate()
cx_animate.connect("COM3")
```

```{important}
You must use the correct class for your physical device. Using the wrong class may result in unexpected behavior.
```

## Quick Start

### Import and Connect

```python
from lumyn_sdk import ConnectorX

# Create device instance
cx = ConnectorX()

# Connect via USB
cx.connect("COM3")  # Windows
# cx.connect("/dev/ttyACM0")  # Linux
# cx.connect("/dev/tty.usbserial-0001")  # macOS

# Check connection status
if cx.is_connected():
    print("Connected!")
```

### Set LED Colors

```python
# Change the color of the currently running animation on a zone (strip zones only)
cx.leds.set_color("strip-zone", (255, 0, 0))  # Red

# Change the color on a group of zones
cx.leds.set_group_color("group-id", (0, 255, 0))  # Green

# To display a solid color from scratch, use the Fill animation
cx.leds.set_animation("strip-zone", Animation.Fill, (255, 0, 0), 0)
```

### Play Animations

```python
from lumyn_sdk import Animation

# Set an animation (short form - zone, animation, color, delay)
cx.leds.set_animation("strip-zone", Animation.Chase, (0, 0, 255), 40)

# With optional parameters
cx.leds.set_animation("strip-zone", Animation.Breathe, (0, 255, 0), 30,
                       reverse=True, one_shot=True)

# Or use the builder pattern for more control
cx.leds.set_animation(Animation.RainbowRoll) \
    .for_zone("strip-zone") \
    .with_color((255, 255, 255)) \
    .with_delay(50) \
    .reverse(False) \
    .run_once(False)

# Play a pre-configured animation sequence
cx.leds.set_animation_sequence("strip-zone", "sequence-id")
```

### Display Text on Matrix

```python
from lumyn_sdk import MatrixTextScrollDirection

# Scrolling text using builder pattern
cx.leds.set_text("Hello World") \
    .for_zone("matrix-zone") \
    .with_color((255, 255, 0)) \
    .with_direction(MatrixTextScrollDirection.LEFT) \
    .with_delay(100) \
    .run_once(False)

# Static centered text
cx.leds.set_text("GO!") \
    .for_zone("matrix-zone") \
    .with_color((0, 255, 0)) \
    .no_scroll(True) \
    .run_once(False)
```

### Handle Events

```python
from lumyn_sdk import EventType
from lumyn_sdk.interfaces.i_event_callback import IEventCallback
from lumyn_sdk.domain.event.event import Event

class MyEventHandler(IEventCallback):
    def handle_event(self, event: Event) -> None:
        print(f"Event: {event.type}")
        if event.type == EventType.Connected:
            print("Device connected!")
        elif event.type == EventType.Disconnected:
            print("Device disconnected!")

# Register event handler
cx.add_event_callback(MyEventHandler())

# Enable background event polling
cx.set_auto_poll_events(True)
```

### DirectLED (High-Frequency Updates)

```python
# Create DirectLED controller for a zone
direct = cx.leds.create_direct_led("strip-zone", 60)

# Create RGB buffer (3 bytes per LED: R, G, B)
buffer = bytearray(60 * 3)

# Set all LEDs to blue
for i in range(60):
    buffer[i * 3 + 0] = 0    # Red
    buffer[i * 3 + 1] = 0    # Green
    buffer[i * 3 + 2] = 255  # Blue

# Update the LEDs
direct.update(bytes(buffer))

# Reset (force full refresh)
direct.reset()
```

### Load Configuration

```python
# Load and apply configuration from file (returns True on success)
success = cx.load_configuration_from_file("device_config.json")

# Or apply configuration from JSON string
import json
with open("device_config.json") as f:
    config_json = f.read()
cx.apply_configuration_json(config_json)
```

## Complete Example

Here's a complete example that demonstrates multiple features:

```python
from lumyn_sdk import ConnectorX, Animation, EventType, MatrixTextScrollDirection
from lumyn_sdk.interfaces.i_event_callback import IEventCallback
from lumyn_sdk.domain.event.event import Event
import time

# Event handler
class EventHandler(IEventCallback):
    def handle_event(self, event: Event) -> None:
        print(f"Event: {event.type}")

# Create and connect
cx = ConnectorX()
cx.add_event_callback(EventHandler())
cx.set_auto_poll_events(True)
cx.connect("COM3")

# Wait for connection
while not cx.is_connected():
    time.sleep(0.1)

print("Connected!")

# Change the color of the currently running animation
cx.leds.set_color("strip-zone", (255, 0, 0))
time.sleep(2)

# Play an animation using builder pattern
cx.leds.set_animation(Animation.RainbowRoll) \
    .for_zone("strip-zone") \
    .with_color((255, 255, 255)) \
    .with_delay(40) \
    .reverse(False) \
    .run_once(False)

# Display text on matrix using builder pattern
cx.leds.set_text("Python SDK") \
    .for_zone("matrix-zone") \
    .with_color((0, 255, 255)) \
    .with_direction(MatrixTextScrollDirection.LEFT) \
    .with_delay(80) \
    .run_once(False)

# Keep running
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    cx.close()
    print("Exiting...")
```

## Next Steps

- [Connecting to Devices](connecting-to-devices) - USB, UART, events, status
- [LED Animations](led-animations) - Colors, animations, sequences
- [LED Matrices](led-matrices) - Text, fonts, image sequences
- [DirectLED](directled) - High-frequency per-pixel control
- [Modules & Sensors](modules-and-sensors) - Module callbacks, typed helpers
- [Device Configuration](device-configuration) - ConfigBuilder, loading configs
- [Troubleshooting & FAQ](../troubleshooting-faq) - Common issues and solutions
