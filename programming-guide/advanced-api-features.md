---
hide-toc: true
---

# Advanced API Features

This guide covers event handling, modules, device configuration, and system commands for advanced use cases.

## Event Handling

ConnectorX and ConnectorX Animate emit events to report device state changes. You can use these events to trigger actions in your robot code—for example, logging errors, updating status displays, or responding to sensor data.

**Available Events:**

- `BeginInitialization` / `FinishInitialization` – Device startup progress
- `Enabled` / `Disabled` – Device enable state changes
- `Connected` / `Disconnected` – Connection status
- `Error` / `FatalError` – Error conditions (see [Troubleshooting](../troubleshooting-faq))
- `RegisteredEntity` – Module or zone registration
- `Custom` – User-defined events from custom firmware
- `PinInterrupt` – GPIO pin state changes
- `HeartBeat` – Periodic keep-alive signal

Handle events using callbacks (both languages) or manual polling.

### Event Polling Modes

By default, events are automatically polled in a background thread. You can control this behavior:

- **Auto Polling (default)**: A background thread polls for events and dispatches handlers automatically. Use this for most applications.
- **Manual Polling**: Disable auto polling with `SetAutoPollEvents(false)` before connecting, then call `PollEvents()` or `GetEvents()` from your robot loop.

**Threading Considerations:**
- When auto polling is enabled, event handlers run on the background thread. Synchronize access to shared state if needed.
- When auto polling is disabled, handlers run on your calling thread (e.g., in `robotPeriodic`).
- `GetLatestEvent()` dispatches handlers before returning the event, regardless of polling mode.
- `GetEvents()` drains the event queue, dispatches handlers, and returns all events as a list.

### WPILib Alerts Integration

The library automatically publishes connection, error, and status events to NetworkTables as [persistent alerts](https://frcdocs.wpi.edu/en/latest/docs/software/telemetry/persistent-alerts.html). These appear in AdvantageScope, Shuffleboard, and the Driver Station without any additional code.

```java
// Disable automatic alerts if you handle error reporting yourself
cXAnimate.SetAlertsEnabled(false);
```

```cpp
// Disable automatic alerts if you handle error reporting yourself
m_cx.SetAlertsEnabled(false);
```

### Manual Polling Example

You can disable auto polling and poll for events yourself. When auto polling is disabled, handlers execute on the calling thread.

::::{tab-set}
:::{tab-item} Java
```java
// Disable auto polling before connecting
cXAnimate.SetAutoPollEvents(false);
cXAnimate.Connect(USBPort.kUSB1);

// In robotPeriodic or your main loop
@Override
public void robotPeriodic() {
    cXAnimate.PollEvents();  // Dispatches handlers synchronously on this thread
}

// Get the latest event (dispatches handlers, then returns event)
Optional<Event> evt = cXAnimate.GetLatestEvent();
evt.ifPresent(e -> System.out.println("Got new event " + e.type.value));

// Drain all pending events (dispatches handlers and returns event list)
List<Event> events = cXAnimate.GetEvents();
for (Event e : events) {
    System.out.println("Drained event type " + e.type.value);
}
```
:::
:::{tab-item} C++
```cpp
// Disable auto polling before connecting
m_cx.SetAutoPollEvents(false);
m_cx.Connect(lumyn::connection::USBPort::kUSB1);

// In robotPeriodic or your main loop
void Robot::RobotPeriodic() {
        m_cx.PollEvents();  // Dispatches handlers synchronously on this thread
}

// Get the latest event
std::optional<lumyn::internal::Eventing::Event> evt = m_cx.GetLatestEvent();
if (evt) {
    std::cout << "Got new event " << static_cast<int>(evt->header.type) << std::endl;
}

// Drain all pending events
std::vector<lumyn::internal::Eventing::Event> events = m_cx.GetEvents();
for (auto &evt : events) {
        std::cout << "Got new event " << static_cast<int>(evt.header.type) << std::endl;
}
```
:::
::::

::::{tab-set}
:::{tab-item} Java
Register a callback with `AddEventHandler`. Your callback receives every event, so check `e.type` to filter for the events you care about.

```java
import com.lumynlabs.domain.event.Event;
import java.util.List;
import java.util.Optional;

// Register an event handler
cXAnimate.AddEventHandler((e) -> {
  System.out.printf("Found event type %d%n", e.type.value);
});

// Get the latest event (dispatches handlers, then returns event)
Optional<Event> evt = cXAnimate.GetLatestEvent();
evt.ifPresent(e -> System.out.println("Got new event " + e.type.value));

// Drain all pending events (dispatches handlers and returns event list)
List<Event> events = cXAnimate.GetEvents();
for (Event e : events) {
  System.out.println("Drained event type " + e.type.value);
}
```
:::
:::{tab-item} C++ (Callbacks)
```{warning}
**2026 Beta Feature**: C++ event callbacks via `AddEventHandler` are new in the 2026 beta vendordep. The 2025 vendordep only supported polling.
```

Register a callback with `AddEventHandler`. Your callback receives every event, so check the event type to filter for specific events.

```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/domain/event/Event.h>

// Register an event handler
m_cx.AddEventHandler([](const lumyn::internal::Eventing::Event& event) {
  std::cout << "Found event type " << static_cast<int>(event.header.type) << std::endl;
});

// Get the latest event (dispatches handlers, then returns event)
std::optional<lumyn::internal::Eventing::Event> evt = m_cx.GetLatestEvent();
if (evt) {
  std::cout << "Got new event " << static_cast<int>(evt->header.type) << std::endl;
}

// Drain all pending events (dispatches handlers and returns event list)
std::vector<lumyn::internal::Eventing::Event> events = m_cx.GetEvents();
for (auto &evt : events) {
  std::cout << "Drained event " << static_cast<int>(evt.header.type) << std::endl;
}
```
:::
:::{tab-item} C++ (Polling)
Poll for events manually instead of using callbacks (works in both 2025 and 2026 vendordeps):

```cpp
// Get the latest event
std::optional<lumyn::internal::Eventing::Event> evt = m_cx.GetLatestEvent();
if (evt)
{
    std::cout << "Got new event " << static_cast<int>(evt->header.type) << std::endl;
}

// Get all events since last call
std::vector<lumyn::internal::Eventing::Event> events = m_cx.GetEvents();
for (auto &evt : events)
{
    std::cout << "Got new event " << static_cast<int>(evt.header.type) << std::endl;
}
```
:::
::::

## Modules

Modules extend ConnectorX with sensor inputs and hardware interfaces. Use modules to read data from I2C, SPI, UART, or GPIO peripherals—including time-of-flight sensors, digital inputs, and custom hardware.

```{important}
Modules are only supported on **ConnectorX**, not ConnectorX Animate.
```

**Built-in Modules:**

- `DigitalInput` – Monitor digital GPIO pins
- `VL53L1X` – Read distance from VL53L1X time-of-flight sensors
- `AnalogInput` – Read analog voltage levels

The library provides typed helper classes (`DigitalInputModule`, `VL53L1XModule`, `AnalogInputModule`) that handle payload parsing automatically. You can also register raw callbacks for custom modules or advanced use cases.

Module data is polled automatically in the background. Your callbacks are invoked whenever new data arrives.

```{note}
**V2 Module Architecture**: The 2026 vendordep introduces a push/pull data model for modules, enabling longer payloads and bidirectional communication with sensors and custom hardware.
```

### Register a Module Callback

Use `RegisterModule` to receive raw payload bytes when module data arrives. This is useful for custom modules or when you need low-level control.

```{warning}
**2026 Beta Feature**: The module callback API changed in 2026. See the migration guide for differences from the 2025 vendordep.
```

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.modules.DigitalInputModule;
import com.lumynlabs.domain.module.ModuleHandler;

cX.modules.RegisterModule("digital-input", (data) -> {
  DigitalInputModule.Payload payload = new DigitalInputModule.Payload();
  
  try {
    ModuleHandler.ExtractData(payload, data);
    System.out.printf("State: %d%n", payload.state);
  } catch (Exception e) {
    System.out.println("Error when parsing data: " + e);
  }
});
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>
#include <cstdint>

// Register a module callback - payload bytes will be automatically polled and delivered
struct DigitalInputPayload { uint8_t state; };
m_cx.RegisterModule("digital-input", [this](uint16_t unitId, const std::vector<uint8_t>& payload) {
  auto parsed = m_cx.ExtractFromPayload<DigitalInputPayload>(payload);
  std::cout << "Module " << unitId << " state: " << static_cast<int>(parsed.state) << std::endl; 
});
```
:::
::::

**Note**: Your callback is invoked automatically whenever new data arrives—no manual polling required.

### Using Typed Module Helpers

For built-in modules, use the typed helper classes instead of raw callbacks. These handle payload parsing automatically and provide a cleaner API.

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

// Option 1: Use callbacks for automatic updates (preferred)
dioModule.onUpdate(payload -> {
  System.out.println("DIO state: " + (payload.state != 0 ? "HIGH" : "LOW"));
});
dioModule.start();

tofModule.onUpdate(payload -> {
  if (payload.valid != 0) {
    System.out.println("Distance: " + payload.dist + " mm");
  }
});
tofModule.start();

// Option 2: Poll for data manually - returns a Result containing a list of payloads
var dioResult = dioModule.get();
if (dioResult.ok() && !dioResult.value().isEmpty()) {
  for (var payload : dioResult.value()) {
    System.out.printf("[DIO] state=%d%n", payload.state);
  }
}

var analogResult = analogModule.get();
if (analogResult.ok() && !analogResult.value().isEmpty()) {
  for (var payload : analogResult.value()) {
    System.out.printf("[Analog] raw=%d scaled=%d%n", payload.rawValue, payload.scaledValue);
  }
}

var tofResult = tofModule.get();
if (tofResult.ok() && !tofResult.value().isEmpty()) {
  for (var payload : tofResult.value()) {
    System.out.printf("[ToF] valid=%d distance=%dmm%n", payload.valid, payload.dist);
  }
}
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/modules/DigitalInputModule.h>

// Typed helper: runs its own polling loop and parses payloads for you
lumyn::modules::DigitalInputModule dio(m_cx, "test-dio");
dio.onUpdate([](const lumyn::modules::DigitalInputPayload& payload) {
    std::cout << "DIO state: " << static_cast<int>(payload.state) << std::endl;
});
dio.start();
```
:::
::::

### Manual Module Polling (C++)

If you prefer polling over callbacks, use `GetLatestModuleData` to retrieve the most recent payload:

```cpp
struct DigitalInputPayload { uint8_t state; };
std::vector<std::pair<uint16_t, std::vector<uint8_t>>> latest;
if (m_cx.GetLatestModuleData("test-dio", latest)) {
  for (const auto& [unitId, payload] : latest) {
    auto parsed = m_cx.ExtractFromPayload<DigitalInputPayload>(payload);
    std::cout << "Module " << unitId << " state: " << static_cast<int>(parsed.state) << std::endl;
  }
}
```

**Note**: Module payloads use little-endian byte order. `ExtractFromPayload` handles byte order conversion for you.

## Direct LED Buffers

DirectLED provides high-frequency LED buffer publishing for a zone. It is ideal for per-pixel control (such as WPILib LED patterns) while minimizing bandwidth. Create a DirectLED controller for a zone, then call `update` each loop with an `AddressableLEDBuffer` (Java) or an array of `frc::AddressableLED::LEDData` (C++).

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.devices.ConnectorX;
import com.lumynlabs.domain.led.DirectLED;
import edu.wpi.first.units.measure.Distance;
import edu.wpi.first.wpilibj.AddressableLEDBuffer;
import edu.wpi.first.wpilibj.LEDPattern;
import static edu.wpi.first.units.Units.Meters;
import static edu.wpi.first.units.Units.MetersPerSecond;

ConnectorX cx = new ConnectorX();
DirectLED direct = cx.createDirectLED("strip-zone", 60);
AddressableLEDBuffer buffer = new AddressableLEDBuffer(60);

Distance ledSpacing = Meters.of(1.0 / 120.0); // 120 LEDs per meter
LEDPattern rainbow = LEDPattern.rainbow(255, 128);
LEDPattern scrolling = rainbow.scrollAtAbsoluteSpeed(MetersPerSecond.of(0.1), ledSpacing);

scrolling.applyTo(buffer);
direct.update(buffer);
```
:::
:::{tab-item} C++
```cpp
#include <array>
#include <lumyn/device/ConnectorX.h>
#include <lumyn/device/DirectLED.h>
#include <frc/AddressableLED.h>
#include <frc/LEDPattern.h>
#include <units/length.h>
#include <units/velocity.h>
#include <memory>

constexpr int kStripLength = 60;
constexpr units::meter_t kLedSpacing{1.0 / 120.0};

lumyn::device::ConnectorX cx;
auto direct = std::make_unique<lumyn::device::DirectLED>(
    cx.CreateDirectLED("strip-zone", kStripLength));

std::array<frc::AddressableLED::LEDData, kStripLength> buffer;
auto rainbow = frc::LEDPattern::Rainbow(255, 128);
auto scrolling = rainbow.ScrollAtAbsoluteSpeed(0.1_mps, kLedSpacing);

scrolling.ApplyTo(buffer);
direct->Update(buffer);
```
:::
::::

**Notes:**
- Buffer length must match the zone length (3 bytes per LED).
- To re-sync after a large change, call `reset()` (Java) / `Reset()` (C++) and then send a new frame.
- On ConnectorXAnimate in Java, use `cXAnimate.leds.createDirectLED(...)`.

## Device Configuration

Device configurations define your LED channels, zones, groups, and modules. You can load configurations from JSON files, build them programmatically, or request the current configuration from a connected device.

```{warning}
**2026 Beta Feature**: Device configuration APIs (`LoadConfigurationFromDeploy`, `RequestConfig`, `ApplyConfiguration`) are new in the 2026 beta vendordep.
```

### Load Configuration from Deploy Directory

Load a JSON configuration file from your robot's `deploy/` directory. This is useful for simulation or when you want to version-control your device configuration.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.LumynDeviceConfig;
import java.util.Optional;

// Load configuration from deploy/lumyn_config.json (default filename)
Optional<LumynDeviceConfig> cfg = mCx.LoadConfigurationFromDeploy();
cfg.ifPresent(mCx::ApplyConfiguration);

// Load configuration from a custom filename
Optional<LumynDeviceConfig> customCfg = mCx.LoadConfigurationFromDeploy("my_config.json");
customCfg.ifPresent(mCx::ApplyConfiguration);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/configuration/Configuration.h>

// Load configuration from deploy/lumyn_config.json (default filename)
auto config = m_cx.LoadConfigurationFromDeploy();
if (config) {
  m_cx.ApplyConfiguration(*config);
}

// Load configuration from a custom filename
auto customConfig = m_cx.LoadConfigurationFromDeploy("my_config.json");
if (customConfig) {
  m_cx.ApplyConfiguration(*customConfig);
}
```
:::
::::

**Note**: `ApplyConfiguration` works identically for hardware and simulation. On a roboRIO, it sends the configuration to the device. On desktop, it drives the simulator.

### Build a Configuration Programmatically

Use `ConfigBuilder` to construct configurations in code. This is useful for dynamic setups or when you want to avoid external JSON files.

::::{tab-set}
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/configuration/ConfigBuilder.h>
#include <string>

lumyn::config::ConfigBuilder builder;
auto cfg = builder
    .ForTeam("9993")
    .SetNetworkType(lumyn::internal::Configuration::NetworkType::USB)
    .AddChannel(1, "main-channel2", 316)
        .AddStripZone("strip-zone", 60)
        .AddMatrixZone("matrix-zone", 16, 16)
        .EndChannel()
    .AddModule("digital-input", "DigitalInput", 50, "DIO")
        .WithConfig("pin", std::string("DIO0"))
        .EndModule()
    .AddModule("analog-input", "AnalogInput", 50, "AIO")
        .WithConfig("pin", std::string("AIO0"))
        .EndModule()
    .Build();

m_cx.ApplyConfiguration(cfg);
```
:::
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.ConfigBuilder;
import com.lumynlabs.domain.config.LumynDeviceConfig;
import com.lumynlabs.domain.config.NetworkType;

ConfigBuilder builder = new ConfigBuilder();
LumynDeviceConfig cfg = builder
    .forTeam("9993")
    .setNetworkType(NetworkType.USB)
    .addChannel(1, "main-channel2", 316)
        .addStripZone("strip-zone", 60)
        .addMatrixZone("matrix-zone", 16, 16)
        .endChannel()
    .addModule("digital-input", "DigitalInput", 50, "DIO")
        .withConfig("pin", "DIO0")
        .endModule()
    .addModule("analog-input", "AnalogInput", 50, "AIO")
        .withConfig("pin", "AIO0")
        .endModule()
    .build();

mCx.ApplyConfiguration(cfg);
```
:::
::::

Network settings default to USB. Use `SetNetworkType` and `SetBaudRate` for UART or other connection types.
Channel numbers are required and become the JSON keys for channels (for example, channel 1 uses `"1"` as the key).

### Request Configuration from Device

Retrieve the current configuration from a connected device. Useful for debugging or saving device state.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.LumynDeviceConfig;
import java.util.Optional;

// Request full configuration from the device
Optional<LumynDeviceConfig> config = mCx.RequestConfig();
config.ifPresent(cfg -> {
  System.out.println("Received config with " + cfg.channels.size() + " channels");
  // Use config object as needed
});
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>

// Request full configuration from the device
auto deviceConfig = m_cx.RequestConfig();
if (deviceConfig) {
  std::cout << "Loaded " << deviceConfig->channels.size() << " channels from device" << std::endl;
}
```
:::
::::

### Simulation

The 2026 release includes a desktop simulation environment integrated with WPILib's SimGUI. Test LED commands and module callbacks without hardware.

After calling `ApplyConfiguration()`, the simulator displays your configured channels, zones, and modules. The same API works for both hardware and simulation—no code changes required.

The simulator provides three tabs:

#### LEDs Tab

Visualizes LED strips and matrices in real-time:

- LED colors update as you send commands
- Animations play at the configured delay
- Matrix text scrolls at the specified speed
- Image sequences display with optional color tinting

#### Modules Tab

Test module callbacks by injecting simulated data:

- Lists all configured modules
- Provides input controls matching each module's data format
- Injects payloads to trigger your registered callbacks

**Example**: A `DigitalInput` module shows a checkbox for the "state" field. Toggle it and inject to test your callback.

#### Device Tab

Simulate connection states and events:

- Toggle connection state (connected/disconnected)
- Set device status (Active, Error, Disabled)
- Inject events (Error, FatalError, etc.) to test your event handlers

**Tip**: Use the Device tab to test error recovery logic without triggering real errors.

## System Commands

```{warning}
**2026 Beta Feature**: System commands are new in the 2026 beta vendordep.
```

### Restart Device

Restart the device from code—useful for error recovery or applying configuration changes.

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.units.Units;

// Restart the device immediately
cXAnimate.RestartDevice(Units.Milliseconds.of(0));

// Restart the device after a 1 second delay
cXAnimate.RestartDevice(Units.Seconds.of(1));
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>
#include <units/time.h>

// Restart the device immediately
m_cx.RestartDevice(0_ms);

// Restart the device after a 1 second delay
m_cx.RestartDevice(1_s);  // or: 1000_ms
```
:::
::::
