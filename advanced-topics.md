---
hide-toc: true
---

# Advanced topics

Deeper customization and development workflows for extending Lumyn Labs devices beyond their standard capabilities.

## Custom firmware development

At Lumyn Labs, we believe in empowering everyone to truly "connect anything", which also means letting you use your device in the way you want. Whether it's creating a new Animation for use in a Sequence or a custom communication protocol, custom firmware allows for it all. By using our firmware starter repositories, you can leverage the existing ConnectorX infrastructure and libraries to do incredible things.

Start from our firmware starter repositories and follow each repo's README for environment setup, building, and debugging:

- **ConnectorX**: [ConnectorX Firmware Starter](https://github.com/Lumyn-Labs/ConnectorX-Firmware-Starter)
- **ConnectorX Animate**: [ConnectorX Animate Firmware Starter](https://github.com/Lumyn-Labs/ConnectorX-Animate-Firmware-Starter)

### When to use custom firmware

Custom firmware development is typically only necessary if you need:

- Custom Animations for use in Animation Sequences
- Custom communication protocols
- Performance optimizations for specific use cases
- Integration with non-standard hardware

For most users, the standard firmware and module system will be sufficient. A custom module doesn't need custom firmware either: it's a unit that the board loads from its microSD card. See [Custom modules](#custom-modules).

### Setup

#### Install PlatformIO

After cloning the repository and opening in VS Code, [install the PlatformIO extension](https://marketplace.visualstudio.com/items?itemName=platformio.platformio-ide) and then [follow these instructions](https://arduino-pico.readthedocs.io/en/latest/platformio.html#important-steps-for-windows-users-before-installing) if you're on Windows to enable long filepaths.

Re-open the repository in VS Code after rebooting and watch as PlatformIO installs the necessary toolchains, libraries, and board files automatically. Do note that this step can take several minutes, so be patient.

#### main.cpp structure

Open `main.cpp` in the firmware starter and notice the registration section between the two system init calls. Ordering here is important:

1. `LumynLabs::System::init()`
2. Register your custom modules/animations
3. `LumynLabs::System::initServices()`

This ensures custom types are registered before services load your configuration.

### Register custom animations

#### What is an animation?

LED Animations revolve around the core concept of "states". If an LED blinks on or off, it has 2 states ('on' and 'off'). If an LED breathes (gradually moves to full brightness and then back to off), it has 512 states: 256 when going up (0 to 255) and 256 more when going back down (256 to 511). Your Animations must follow this same model.

Because some Animations depend on the number of LEDs in addition to a set number of states (think Chase or one where the LEDs 'grow' along the entire strip), we have the concept of a `StateMode` which can be either `Constant` (number of states never changes) or `LedCount` (number of states is related to the number of LEDs). If it's `LedCount`, then the number of states is: `# of LEDs + the state count`.

#### Animation::AnimationInstance structure

The core building block of every Animation is the `Animation::AnimationInstance` struct:

| Member name | Type | Description |
| :---------: | :--: | :---------: |
| `id` | `std::string_view` | The ID to reference this Animation in commands and Animation Sequences |
| `stateMode` | `Animation::StateMode` | `Constant` for constant; `LedCount` for LED count + `stateCount` |
| `stateCount` | `uint16_t` | Number of states |
| `defaultDelay` | `uint16_t` | The default delay between each state update in milliseconds |
| `defaultColor` | `LumynLabs::Color` | The default color of the Animation given as 8-bit `r, g, b` values |
| `cb` | `Animation::AnimationFrameCallback` | The function called every time the state updates |

#### AnimationFrameCallback

This function is called every time the state changes. The signature is: `std::function<bool(LumynLabs::Color*, LumynLabs::Color, uint16_t, uint16_t)>` with the parameters:

| Name | Type | Description |
| :--: | :--: | :---------: |
| `strip` | `LumynLabs::Color*` | The array of raw color values. This corresponds 1:1 with the zone so do not modify values outside of its boundary |
| `color` | `LumynLabs::Color` | The requested color. Note that this may be ignored depending on the Animation's needs (such as a rainbow animation) |
| `state` | `uint16_t` | The current, 0-indexed state that the callback needs to handle. It is incremented automatically for you |
| `count` | `uint16_t` | The number of LEDs in the Zone. This must be used when updating the `strip` array in order to not exceed its boundary! |

The callback **must** return a `bool`. Return `true` if the Channel should be updated for this Animation's state or `false` to not update.

#### Creating a custom animation

To create a custom Animation, it is recommended to create a new header file (`.h`) inside the `animations` folder with the name of your custom Animation. It must be of the type `Animation::AnimationInstance` and have a name that does not conflict with any existing Animations. After creating your Animation, include the header file in `main.cpp` and then register it.

#### Registration

Simply call `LumynLabs::registerAnimation(MyAnimationStruct);` where `MyAnimationStruct` is the name of your `static Animation::AnimationInstance` value.

```{note}
Built-in animations are registered **automatically** by the SDK and should not need to be re-registered.
```

### Register custom modules

You don't need custom firmware for a module. Write it as a unit, and the standard firmware runs it from the microSD card. See [Custom modules](#custom-modules).

Firmware built from the ConnectorX starter can still register a module type in `main.cpp`, as its README shows.

### Flashing custom firmware

On the left pane in VS Code, click the PlatformIO icon (the ant), then open the folder labeled `pico` and click `General > Upload` after ensuring your board is available for flashing (see [Recovery](#recovery) and follow through step 3).

```{warning}
PlatformIO gives the option to **Upload Filesystem Image**. DO NOT CLICK THIS because the ConnectorX ships with its filesystem already flashed with important internal files that will render the device **inoperable** if deleted/overwritten.
```

### Recovery

If you or your device get stuck, you can recover by flashing a default UF2 file. The firmware starter repositories contain a default UF2 file that is identical in function to the image that shipped on your device (no custom Modules or Animations), although be aware that future releases of the firmware will also be reflected in it, such as bug fixes or new features.

1. Put the board in bootloader mode. Follow the steps in [Entering bootloader mode](drivers-and-firmware.md#entering-bootloader-mode).
2. Drag the UF2 file from the repository's `firmware` folder onto the `RPI-RP2` drive, and wait for it to copy.
3. The board restarts with the default firmware.

This works whatever firmware the board runs, including firmware stuck in an infinite loop.

Alternatively, you can follow the setup instructions above to compile the default firmware locally and then flash via PlatformIO.

### Available classes and methods

#### System APIs

Use `LumynLabs::System::init()` and `LumynLabs::System::initServices()` as shown in the firmware starter `main.cpp`. Register custom modules and animations between those calls.

#### LedService

In here, you can manually register additional Channels, Animations, Animation Sequences, and Image Sequences. There are also methods that expose sending asynchronous LED commands from your code.

#### SerialLogger

Use `SerialLogger` to log messages via the secondary serial port in a thread-safe way. There are 5 different logging levels: `Verbose`, `Info`, `Warn`, `Error`, and `Fatal`.

#### Event APIs

Use the event service APIs provided by your selected firmware starter version for asynchronous events. If you're working from interrupt context, use the ISR-safe variant documented in that starter's README/source comments.

## Custom modules

A module reads a sensor or other hardware, and the board sends its readings to your robot code. A custom module is a unit: a module built on its own, which the board loads from its microSD card. It runs on the standard firmware, so you don't build or flash firmware for it.

A module is two files:

- `<Type>.json`, its spec: what it connects to, its options, and what each reading holds.
- `src/<Type>.cpp`, its code.

### Start in Lumyn Studio

1. On the **Modules** page, click **Create module** and enter a **Type**, such as `Thermometer`.
2. Fill in the **Overview**, **Details**, **README**, and **Data** sections. On **Data**, the payload fields are what each reading holds, and the configuration fields are the module's options.
3. Open the **Source** section. It shows `src/<Type>.cpp` and `<Type>.json`, made from what you entered. Copy both.

The starter code builds as it is and sends zeros. Its `TODO` comments say where your code goes. See [Modules](user-guide/modules) for the editor.

### Write the spec

This spec is for a module that reads a TMP102 temperature sensor over I2C:

```json
{
  "$schema": "https://cdn.lumynlabs.com/schemas/unit/1.json",
  "id": "my.thermometer",
  "type": "Thermometer",
  "kind": "module",
  "version": "0.1.0",
  "displayName": "Thermometer",
  "description": "Reads a TMP102 temperature sensor over I2C.",
  "connection": {
    "types": ["I2C"],
    "i2c": { "address": 72, "addressMin": 72, "addressMax": 75 }
  },
  "config": [
    { "key": "offset", "type": "number", "label": "Offset", "default": 0, "min": -10, "max": 10,
      "description": "Added to each reading, in degrees Celsius" }
  ],
  "payload": [
    { "name": "celsius", "type": "f32", "unit": "°C" }
  ]
}
```

| Key | What it says |
|---|---|
| `$schema` | The schema an editor checks the file with. |
| `id` | The unit's name in a catalog: a publisher, a dot, and a name, such as `my.thermometer`. |
| `type` | The module's type. A configuration's `sensors` entry names it, and the class and the files take its name. |
| `kind` | `"module"`. |
| `version` | Its version, such as `0.1.0`. |
| `displayName`, `description` | What Lumyn Studio shows. |
| `connection` | The connections it takes: `"I2C"`, `"SPI"`, `"UART"`, `"DIO"`, or `"AIO"`. An I2C module gives its device's address, and the addresses a configuration may pick, in decimal: `72` is `0x48`. |
| `config` | Its options. Each has a `key` and a `type`, such as `number`, `boolean`, `select`, `text`, or `pin`. |
| `payload` | The fields of one reading, in order. A field is a number (`u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`, `f32`, or `f64`), a `bool`, or `text` with a `maxLength`. |

A reading is its fields in order, little-endian, with no padding. It holds at most 64 bytes. Your robot code reads these bytes; see [Raw module callbacks](programming-guide/modules-and-sensors.md#raw-module-callbacks).

### Write the code

The build makes `<Type>.gen.h` from the spec. Its `<Type>Spec` has the reading as `Payload` and the options as `Config`. This is the thermometer's code:

```cpp
// Thermometer: reads a TMP102 temperature sensor over I2C.

#include "Thermometer.gen.h"

using namespace LumynLabs;

class Thermometer : public Module<ThermometerSpec> {
 public:
  explicit Thermometer(ModuleSetup& setup) : _config(setup) {}

  Status start(ModuleBus& bus) {
    // Something answers at its I2C address.
    return bus.answers() ? Status::ok() : Status::failed(1);
  }

  Reading poll(ModuleBus& bus, Payload& out) {
    // Register 0 holds the temperature: 256 counts a degree.
    const uint8_t reg = 0;
    uint8_t value[2];
    if (bus.writeRead(&reg, 1, value, sizeof(value)) != 0) return Reading::failed(1);
    const int16_t raw = static_cast<int16_t>((value[0] << 8) | value[1]);
    out.celsius = static_cast<float>(raw) / 256.0f + _config.offset;
    return Reading::ready();
  }

  bool simulate(Simulation& simulation, Payload& out) {
    // Room temperature, give or take half a degree.
    out.celsius = 21.0f + simulation.rnd() - 0.5f + _config.offset;
    return true;
  }

 private:
  ThermometerSpec::Config _config;
};

LUMYN_UNIT(Thermometer)
```

| Part | What it does |
|---|---|
| Constructor | Reads the options. It doesn't touch the hardware. |
| `start` | Sets the hardware up. If it fails, the board tries again about once a second. |
| `poll` | Reads the hardware at the module's polling rate. Write the reading into `out`, which starts as zeros, and return `Reading::ready()` to send it. `Reading::none()` sends nothing this time, and `Reading::failed()` reports a failure. |
| `simulate` | Makes up a reading where there's no hardware: on a virtual device, or on a board when the module's `sensors` entry has `"simulate": true`. |
| `LUMYN_UNIT` | Ties the class to its spec. |

`ModuleBus` reaches the module's hardware:

- I2C, at the module's address: `writeRead`, `write`, `read`, and `answers`.
- SPI: `spi`.
- Pins, from its `pin` options: `mode`, `level`, `drive`, `analog`, and `millivolts`.

To take JSON from robot code, see [Send JSON to a module](programming-guide/modules-and-sensors.md#send-json-to-a-module). To use an Arduino library, derive from `ArduinoModule<Spec>` instead of `Module<Spec>`, and include `<Arduino.h>` and `<Wire.h>`.

### Build it

Lumyn Studio's Unit IDE builds a module in your browser. It's an experiment for now: in **Settings**, turn on **Debug mode**, then turn on the **Unit IDE** experiment.

1. Put `<Type>.json` and `src/<Type>.cpp` in a `.zip` file.
2. On the **Modules** tab, click **Import** and choose the `.zip` file. The IDE builds the module as you type, and runs it on a virtual device beside the code.
3. Click **Build for the board**.
4. Click **Download** beside **Board** to save `<Type>.lub`.

To start in the IDE instead, click **New module**. It starts from a template.

### Put it on a board

1. Find the SHA-256 of `<Type>.lub`:
   - Windows: `certutil -hashfile Thermometer.lub SHA256`
   - macOS: `shasum -a 256 Thermometer.lub`
   - Linux: `sha256sum Thermometer.lub`
2. On the board's microSD card, make a folder named `u` in the root. Copy the file there, named with the first 8 digits of its SHA-256, such as `u/abc533b0.lub`.
3. In `config.json`, list the module under `units` with its type and its whole SHA-256, in lowercase. Then add a `sensors` entry of its type:

```json
"units": [
  { "type": "Thermometer", "sha256": "abc533b01bce1efd5842c7f92f06e745f3859090717975c76eb1f899ed94f442" }
],
"sensors": [
  { "id": "thermometer", "type": "Thermometer", "pollingRateMs": 100, "connection": "I2C" }
]
```

The board loads the module when it loads the configuration. Your robot code reads it by its `id`, as it reads any module. See [Modules and sensors](programming-guide/modules-and-sensors).

### Module development tips

- Use clear, descriptive names for your modules.
- Document the module's behavior and wiring in its README.
- Try it on the virtual device before you put it on a board.

