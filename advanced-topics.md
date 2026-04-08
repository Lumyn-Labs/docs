---
hide-toc: true
---

# Advanced Topics

Deeper customization and development workflows for extending Lumyn Labs devices beyond their standard capabilities.

## Custom Firmware Development

At Lumyn Labs, we believe in empowering everyone to truly "connect anything", which also means letting you use your device in the way you want. Whether it's creating a new Animation for use in a Sequence or adding a Custom Module to read from a favorite sensor, custom firmware allows for it all. By using our firmware starter repositories, you can leverage the existing ConnectorX infrastructure and libraries to do incredible things.

Start from our firmware starter repositories and follow each repo's README for environment setup, building, and debugging:

- **ConnectorX**: [ConnectorX Firmware Starter](https://github.com/Lumyn-Labs/ConnectorX-Firmware-Starter)
- **ConnectorX Animate**: [ConnectorX Animate Firmware Starter](https://github.com/Lumyn-Labs/ConnectorX-Animate-Firmware-Starter)

### When to Use Custom Firmware

Custom firmware development is typically only necessary if you need:

- Custom Animations for use in Animation Sequences
- Custom Modules to read from specialized sensors or hardware
- Custom communication protocols
- Performance optimizations for specific use cases
- Integration with non-standard hardware

For most users, the standard firmware and module system will be sufficient.

### Setup

#### Install PlatformIO

After cloning the repository and opening in VS Code, [install the PlatformIO extension](https://marketplace.visualstudio.com/items?itemName=platformio.platformio-ide) and then [follow these instructions](https://arduino-pico.readthedocs.io/en/latest/platformio.html#important-steps-for-windows-users-before-installing) if you're on Windows to enable long filepaths.

Re-open the repository in VS Code after rebooting and watch as PlatformIO installs the necessary toolchains, libraries, and board files automatically. Do note that this step can take several minutes, so be patient.

#### main.cpp Structure

Open `main.cpp` in the firmware starter and notice the registration section between the two system init calls. Ordering here is important:

1. `LumynLabs::System::init()`
2. Register your custom modules/animations
3. `LumynLabs::System::initServices()`

This ensures custom types are registered before services load your configuration.

### Register Custom Animations

#### What is an Animation?

LED Animations revolve around the core concept of "states". If an LED blinks on or off, it has 2 states ('on' and 'off'). If an LED breathes (gradually moves to full brightness and then back to off), it has 512 states: 256 when going up (0 to 255) and 256 more when going back down (256 to 511). Your Animations must follow this same model.

Because some Animations depend on the number of LEDs in addition to a set number of states (think Chase or one where the LEDs 'grow' along the entire strip), we have the concept of a `StateMode` which can be either `Constant` (number of states never changes) or `LedCount` (number of states is related to the number of LEDs). If it's `LedCount`, then the number of states is: `# of LEDs + the state count`.

#### Animation::AnimationInstance Structure

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

#### Creating a Custom Animation

To create a custom Animation, it is recommended to create a new header file (`.h`) inside the `animations` folder with the name of your custom Animation. It must be of the type `Animation::AnimationInstance` and have a name that does not conflict with any existing Animations. After creating your Animation, include the header file in `main.cpp` and then register it.

#### Registration

Simply call `LumynLabs::registerAnimation(MyAnimationStruct);` where `MyAnimationStruct` is the name of your `static Animation::AnimationInstance` value.

```{note}
Built-in animations are registered **automatically** by the SDK and should not need to be re-registered.
```

### Register Custom Modules

Custom modules should inherit from `LumynLabs::Module<T>`, where `T` is your module payload struct.

Use Lumyn Studio's generated Source templates as your starting point (see [Modules](user-guide/modules)):

- **Module Header**: generated class skeleton implementing `initModule()` and `readData(T* dataOut)`
- **Module Registration**: generated registration snippet for `main.cpp`

A minimal registration looks like:

```cpp
LumynLabs::registerModule<MyCustomData, MyCustomModule>("MY_CUSTOM_MODULE_ID");
```

The module ID string must match the Module ID used in Lumyn Studio. Register modules during startup before services are initialized.

When implementing module code:

- Populate payload values in `readData(T* dataOut)`.
- Keep payload struct layout stable between firmware and host-side expectations.
- Parse optional custom configuration from `config().customConfig` and `config().customConfigSize`.
- Use `config().connectionType` to select the expected peripheral behavior.

```{note}
`config().customConfig` is a raw byte blob and is module-defined. In the current SDK headers, `customConfigSize` is limited to 32 bytes.
```

### Flashing Custom Firmware

On the left pane in VS Code, click the PlatformIO icon (the ant), then open the folder labeled `pico` and click `General > Upload` after ensuring your board is available for flashing (see [Recovery](#recovery) and follow through step 3).

```{warning}
PlatformIO gives the option to **Upload Filesystem Image**. DO NOT CLICK THIS because the ConnectorX ships with its filesystem already flashed with important internal files that will render the device **inoperable** if deleted/overwritten.
```

### Recovery

If you or your device get stuck, you can recover by flashing a default UF2 file. The firmware starter repositories contain a default UF2 file that is identical in function to the image that shipped on your device (no custom Modules or Animations), although be aware that future releases of the firmware will also be reflected in it, such as bug fixes or new features.

With the board plugged into your computer:

1. Hold down the `BOOT`/`BOOTSEL` button near the USB-C port
2. While holding the button, click `RST`/`RESET` and _continue_ holding the `BOOT`/`BOOTSEL` button
3. Release the `BOOT`/`BOOTSEL` button when a drive mounts to your computer
4. Drag-n-drop the UF2 file found in the `firmware` folder of the repository and wait for it to upload
5. Watch as your ConnectorX reboots

This process will work regardless of the software running on the ConnectorX, so if you accidentally created an infinite loop - no worries!

Alternatively, you can follow the setup instructions above to compile the default firmware locally and then flash via PlatformIO.

### Available Classes and Methods

#### System APIs

Use `LumynLabs::System::init()` and `LumynLabs::System::initServices()` as shown in the firmware starter `main.cpp`. Register custom modules and animations between those calls.

#### LedService

In here, you can manually register additional Channels, Animations, Animation Sequences, and Image Sequences. There are also methods that expose sending asynchronous LED commands from your code.

#### SerialLogger

Use `SerialLogger` to log messages via the secondary serial port in a thread-safe way. There are 5 different logging levels: `Verbose`, `Info`, `Warn`, `Error`, and `Fatal`.

#### Event APIs

Use the event service APIs provided by your selected firmware starter version for asynchronous events. If you're working from interrupt context, use the ISR-safe variant documented in that starter's README/source comments.

## Creating Custom Modules (Studio-Based)

Custom modules in Studio define metadata, payload shape, and configuration inputs, then generate source templates you can copy into firmware. You still need to implement, build, and flash firmware for the module to run on hardware.

### Workflow

1. **Create Module**: Open the Create dialog, set a Module ID, and create your custom module.
2. **Define Editor Sections**: Fill out Overview, Details, README, and Data sections in the custom module editor.
3. **Model Payload + Config**: Define payload fields and configuration options that are passed into firmware at runtime.
4. **Copy Source Artifacts**: Use the Source tab to copy:
   - the generated module header template
   - the module registration snippet for `main.cpp`
5. **Implement + Flash**: Complete TODOs in the generated template, build with PlatformIO, and flash your device.

### Module Development Tips

- Keep payload sizes small for best performance and compatibility
- Use clear, descriptive names for your modules
- Document your module's behavior and wiring requirements
- Test modules thoroughly on hardware after flashing firmware changes

See the [Modules](user-guide/modules) page for UI details and screenshots of the module creation interface.

