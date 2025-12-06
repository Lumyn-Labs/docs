---
hide-toc: true
---

# What's New in 2026

Welcome to the next generation of the Lumyn Labs software ecosystem! For 2026, we've rebuilt our entire software stack from the ground up based on your feedback to be faster, more powerful, and easier to use.

This massive free update is focused on three key areas: a more powerful **Vendordep** for robot code, a smarter **Lumyn Studio** for configuration, and a faster, simpler **Firmware** experience.

---

## Vendordep & Simulation Upgrades

### Full SimGUI Integration

We are the **first FRC vendor** to offer a custom GUI inside of WPILib's SimGUI. Our simulation environment provides three powerful tabs:

- **LEDs Tab**: Real-time visualization of LED strips and matrices with responsive multi-row layouts, live animation playback, matrix text scrolling, and image sequence rendering
- **Modules Tab**: Interactive controls for testing module data—compose payloads, inject data, and trigger callbacks without hardware
- **Device Tab**: Simulate connection states, device status, SKU variants, and inject custom events to test your error handling

Test animations, validate module callbacks, and inject fake sensor data—all without a physical robot.

### Modern "Builder" API

Say goodbye to long parameter lists! The new builder-style API makes your code more readable and self-documenting. Every LED command now supports the fluent builder pattern.

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color8Bit;
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.Animation;

// Clean, readable builder syntax
cXAnimate.leds.SetAnimation(Animation.Chase)
  .ForZone("left-climber")
  .WithColor(new Color(new Color8Bit(200, 120, 15)))
  .WithDelay(Units.Milliseconds.of(40))
  .Reverse(false)
  .RunOnce(false);

// Image sequences with the builder API
cXAnimate.leds.SetImageSequence("Emoji_16x16_unknown")
  .ForZone("front-matrix")
  .WithColor(new Color(new Color8Bit(120, 0, 100)))
  .SetColor(true)
  .RunOnce(false);

// Scrolling text on matrices
cXAnimate.leds.SetText("Hello World!")
  .ForZone("front-matrix")
  .WithColor(new Color(new Color8Bit(255, 255, 255)))
  .WithDirection(MatrixTextScrollDirection.Left)
  .WithDelay(Units.Milliseconds.of(300))
  .RunOnce(false);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/led/Animation.h>
#include <frc/util/Color8Bit.h>
#include <units/time.h>

// Clean, readable builder syntax
m_animate.SetAnimation(lumyn::led::Animation::Chase)
    .ForZone("left-climber")
    .WithColor(frc::Color8Bit(200, 120, 15).ToColor())
    .WithDelay(40_ms)
    .Reverse(false)
    .RunOnce(false);

// Image sequences with the builder API
m_animate.SetImageSequence("Emoji_16x16_unknown")
    .ForZone("front-matrix")
    .WithColor(frc::Color8Bit(120, 0, 100).ToColor())
    .SetColor(true)
    .RunOnce(false);

// Scrolling text on matrices
m_animate.SetText("Hello World!")
    .ForZone("front-matrix")
    .WithColor(frc::Color8Bit(255, 255, 255).ToColor())
    .WithDirection(lumyn::internal::Command::LED::MatrixTextScrollDirection::LEFT)
    .WithDelay(300_ms)
    .RunOnce(false);
```
:::
::::

```{note}
The legacy direct method calls are deprecated and will be removed in 2027. Please migrate to the builder API.
```

### New Connection Options

ConnectorX now supports **UART connections** with configurable baud rates, in addition to USB. This enables more flexible wiring and higher-bandwidth communication.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.connection.usb.USBPort;
import com.lumynlabs.connection.uart.UARTPort;

// USB connections (both ConnectorX and ConnectorXAnimate)
boolean connected = cXAnimate.Connect(USBPort.kUSB1);

// UART connections with custom baud rate (ConnectorX only)
boolean uartConnected = cX.Connect(UARTPort.MXP, 230400);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/connection/USBPort.h>
#include <lumyn/connection/UARTPort.h>

// USB connections
bool connected = m_animate.Connect(lumyn::connection::USBPort::kUSB1);

// UART connections with custom baud rate (ConnectorX only)
bool uartConnected = m_cx.Connect(lumyn::connection::UARTPort::kMXP, 230400);
```
:::
::::

### NetworkTables Integration & Persistent Alerts

All device states are automatically published to NetworkTables for easier debugging. Get clear, actionable [persistent alerts](https://frcdocs.wpi.edu/en/latest/docs/software/telemetry/persistent-alerts.html) directly in the Driver Station for connection issues, errors, and device status changes.

```java
// Alerts are enabled by default - disable if you prefer manual control
cXAnimate.SetAlertsEnabled(false);
```

### Modules V2: Push-Pull Architecture

The new module system features automatic background polling with support for arbitrary-length data payloads. No more manual polling loops!

**New Features:**
- Automatic background data polling (independent of event polling)
- Support for arbitrary-length payloads
- Typed module helpers with automatic payload parsing
- Built-in modules: `DigitalInput`, `AnalogInput` (with scaling/mapping), `VL53L1X` (ToF sensor)

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.modules.DigitalInputModule;
import com.lumynlabs.modules.AnalogInputModule;
import com.lumynlabs.modules.VL53L1XModule;

// Create typed module helpers - they handle parsing automatically
DigitalInputModule dioModule = new DigitalInputModule(cX, "digital-input");
AnalogInputModule analogModule = new AnalogInputModule(cX, "analog-input");
VL53L1XModule tofModule = new VL53L1XModule(cX, "tof-sensor");

// Poll for data with automatic type conversion
var dioResult = dioModule.get();
if (dioResult.ok() && !dioResult.value().isEmpty()) {
  for (var payload : dioResult.value()) {
    System.out.printf("[DIO] state=%d%n", payload.state);
  }
}

// Or use the callback API for real-time updates
cX.modules.RegisterModule("test-dio", (data) -> {
    DigitalInputModule.Payload payload = new DigitalInputModule.Payload();
    ModuleHandler.ExtractData(payload, data);
    System.out.println("State: " + payload.state);
});
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/modules/DigitalInputModule.h>

// Register a callback for automatic background updates
struct DigitalInputPayload { uint8_t state; };
m_cx.RegisterModule("test-dio", [this](uint16_t unitId, const std::vector<uint8_t>& payload) {
    auto parsed = m_cx.ExtractFromPayload<DigitalInputPayload>(payload);
    std::cout << "Module " << unitId << " state: " << static_cast<int>(parsed.state) << std::endl;
});

// Or poll manually when you prefer
std::vector<std::pair<uint16_t, std::vector<uint8_t>>> latest;
if (m_cx.GetLatestModuleData("test-dio", latest)) {
    for (const auto& [unitId, payload] : latest) {
        auto parsed = m_cx.ExtractFromPayload<DigitalInputPayload>(payload);
        // Process data...
    }
}
```
:::
::::

### ConfigBuilder: Build Configurations in Code

New fluent `ConfigBuilder` API lets you construct device configurations programmatically—perfect for dynamic setups or teams who prefer code over JSON files.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.ConfigBuilder;
import com.lumynlabs.domain.config.NetworkType;

LumynDeviceConfig cfg = new ConfigBuilder()
    .forTeam("5239")
    .setNetworkType(NetworkType.UART)
    .setBaudRate(230400)
    .addChannel("front", 60)
        .addStripZone("front-strip", 60)
        .endChannel()
    .addModule("digital-input", "DigitalInput", 50, "DIO")
        .withConfig("pin", "DIO0")
        .endModule()
    .addModule("voltage-sensor", "AnalogInput", 100, "ADC")
        .withConfig("pin", "AIO0")
        .withConfig("scaleFactor", 3.3 / 1023.0)
        .endModule()
    .build();

cXAnimate.ApplyConfiguration(cfg);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/configuration/ConfigBuilder.h>

auto cfg = lumyn::config::ConfigBuilder()
    .ForTeam("5239")
    .SetNetworkType(lumyn::internal::Configuration::NetworkType::UART)
    .SetBaudRate(230400)
    .AddChannel("front", 60)
        .AddStripZone("front-strip", 60)
        .EndChannel()
    .AddModule("digital-input", "DigitalInput", 50, "DIO")
        .WithConfig("pin", "DIO0")
        .EndModule()
    .Build();

m_cx.ApplyConfiguration(cfg);
```
:::
::::

### Device Configuration API

Load configurations from deploy directory for simulation, request configurations from connected devices, and seamlessly switch between hardware and desktop testing.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.LumynDeviceConfig;
import java.util.Optional;

// Load configuration from deploy directory (works for sim and hardware)
Optional<LumynDeviceConfig> cfg = cXAnimate.LoadConfigurationFromDeploy("lumyn_config.json");
cfg.ifPresent(cXAnimate::ApplyConfiguration);

// Request the current configuration from a connected device
Optional<LumynDeviceConfig> deviceConfig = cXAnimate.RequestConfig();
deviceConfig.ifPresent(c -> {
    System.out.println("Loaded " + c.channels.size() + " channels");
});
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/configuration/LumynDeviceConfig.h>

// Load configuration from deploy directory
auto config = m_cx.LoadConfigurationFromDeploy("lumyn_config.json");
if (config) {
    m_cx.ApplyConfiguration(*config);
}

// Request configuration from connected device
auto deviceConfig = m_cx.RequestConfig();
if (deviceConfig) {
    std::cout << "Loaded " << deviceConfig->channels.size() << " channels" << std::endl;
}
```
:::
::::

### Unified Event System

C++ now supports callback-based event handling, matching Java's API. Both languages also support manual polling with `GetLatestEvent()` and `GetEvents()`. Control whether events are polled automatically in a background thread or manually in your robot loop.

::::{tab-set}
:::{tab-item} Java
```java
// Add event handlers (called by background thread or during polling)
cXAnimate.AddEventHandler((e) -> {
    System.out.printf("Event: %d%n", e.type.value);
});

// Manual polling mode
cXAnimate.SetAutoPollEvents(false);
cXAnimate.Connect(USBPort.kUSB1);

// In robotPeriodic
cXAnimate.PollEvents();  // Dispatches handlers on your thread
```
:::
:::{tab-item} C++
```cpp
// NEW in 2026: Callback-based events in C++ (previously polling-only)
m_cx.AddEventHandler([](const lumyn::internal::Eventing::Event& event) {
    std::cout << "Event: " << static_cast<int>(event.header.type) << std::endl;
});

// Or use polling API
auto events = m_cx.GetEvents();
for (auto& evt : events) {
    // Process events...
}
```
:::
::::

### System Commands

Restart devices programmatically with configurable delays—useful for error recovery or applying configuration changes.

```java
import edu.wpi.first.units.Units;

cXAnimate.RestartDevice(Units.Milliseconds.of(0));  // Restart immediately
cXAnimate.RestartDevice(Units.Seconds.of(1));       // Restart after 1 second
```

---

## A Smarter Lumyn Studio

Our desktop configuration tool has received a major overhaul with a snappier communications stack and powerful new features.

### Configuration Sync

When you connect a device, Studio now automatically syncs the configuration from the device. If a different configuration for that device is already saved in Studio, you'll be prompted to choose which version to keep.

```{image} assets/whats-new/new-config.png
:alt: New Studio Configuration Sync
```

### Direct Config Uploads

Upload your configuration JSON directly to any connected device from within Studio—no more manual file transfers!

```{image} assets/whats-new/config-uploads.png
:alt: Direct Config Uploads
```

### Redesigned LED Commander

The LED testing utility now uses the configuration on your device to populate its options. It shows a **live preview** of your animations, animation sequences, and image sequences as you send them.

```{image} assets/whats-new/led-commander.png
:alt: LED Commander
```

### Preview Image Sequences at Size

Preview your image sequences at the exact resolution of the LED Matrix they will display on.

```{image} assets/whats-new/bing-chilling.png
:alt: Preview Image Sequences at Size
```

---

## Faster Firmware

### Performance & Stability

Our V2 firmware is our fastest and most stable firmware yet, with improved response times and reliability.

### 13 New Stunning Animations

Express your robot's personality with 13 brand-new animations, including **Fire**, **Plasma**, **Confetti**, and more! Use the interactive widget below to try them out:

<iframe src="https://widgets.lumynlabs.com/animations-widget?default=fire" height="330" width="100%" frameborder="0" loading="lazy"></iframe>

## Future Roadmap

Looking beyond the 2026 release, we're planning additional features for future updates:

- **Python SDK**: A Python library with API parity to the WPILib Vendordep is in development.
- **C SDK**: A standalone C library for integration with custom applications and embedded systems.
- **C++ SDK**: A standalone C++ library for use outside of the WPILib ecosystem.
- **Lumyn Studio Firmware Upload**: Upload firmware directly to your device from within Lumyn Studio.
- **Studio Enhancements**: We're planning an improved Image Sequence editor and more robust device management features.
