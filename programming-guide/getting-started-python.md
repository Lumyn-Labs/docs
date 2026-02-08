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
- **uv** package manager (recommended) or **pip**
- **USB or UART connection** to your device

## Installation

### Recommended: Install with uv

[uv](https://docs.astral.sh/uv/) is a fast Python package installer and virtual environment manager. This is the recommended installation method, especially on ARM platforms like Raspberry Pi.

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
python -m pip install --only-binary=:all: lumyn-sdk==4.1.1
```

### Alternative: Install with pip

If you already have Python 3.11+ installed:

```bash
pip install lumyn-sdk
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

**ConnectorX hardware features:**
- USB and UART connections
- LED control (strips and matrices)
- DirectLED (high-frequency per-pixel control)
- Module/sensor ports and data callbacks
- Configuration management

### ConnectorXAnimate

Use the `ConnectorXAnimate` class if you have a **ConnectorX Animate** device.

```python
from lumyn_sdk import ConnectorXAnimate

cx_animate = ConnectorXAnimate()
cx_animate.connect("COM3")
```

**ConnectorX Animate hardware features:**
- USB connections only
- LED control (strips and matrices)
- DirectLED (high-frequency per-pixel control)
- No module/sensor ports

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
# Set solid color on a zone
cx.leds.set_color("strip-zone", (255, 0, 0))  # Red

# Set color on a group of zones
cx.leds.set_group_color("group-id", (0, 255, 0))  # Green
```

### Play Animations

```python
from lumyn_sdk import Animation

# Set an animation using direct call
cx.leds.set_animation(
    "strip-zone",           # zone_id
    Animation.Chase,        # animation type
    (0, 0, 255),            # Blue color
    40,                     # delay_ms between frames
    False,                  # reversed
    False                   # one_shot (False = loop continuously)
)

# Or use the builder pattern for more control
cx.leds.set_animation(Animation.Breathe) \
    .for_zone("strip-zone") \
    .with_color((0, 255, 0)) \
    .with_delay(30) \
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

# Set a color
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

## Troubleshooting

### Import Error

If you get `ModuleNotFoundError: No module named 'lumyn_sdk'`, make sure you've installed the package:

```bash
pip install lumyn-sdk
```

### Connection Failed

- **Check port name**: Use Device Manager (Windows) or `ls /dev/tty*` (Linux/macOS) to find the correct port
- **Check permissions**: On Linux, add your user to the `dialout` group: `sudo usermod -a -G dialout $USER`
- **Check USB cable**: Ensure it's a data cable, not charge-only
- **Try a different port**: Some USB hubs may cause issues

### Module Not Updating

- **Check configuration**: Ensure the module is configured in the device
- **Check connection**: Modules require a stable connection
- **Check module ID**: Verify the module ID matches your configuration
- **Enable auto-polling**: `cx.set_auto_poll_events(True)` for automatic updates
