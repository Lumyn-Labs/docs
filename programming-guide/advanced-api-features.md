---
hide-toc: true
---

# Advanced API Features

Deep-dive into event handling, modules, device configuration, and system commands.

## Event Handling

Both ConnectorX and Animate provide information about the device's state and events that occur. The following events are available:

- Begin Initialization
- Finish Initialization
- Enabled
- Disabled
- Connected
- Disconnected
- Error
- FatalError
- RegisteredEntity
- Custom
- PinInterrupt
- HeartBeat

In some situations, you may want to handle these events. A slightly different approach is used in Java and C++.

::::{tab-set}
:::{tab-item} Java
In Java, events are handled via callbacks. To handle an event, you must call `addEventHandler` on the device instance and provide a lambda function to be called. Callback functions are called on every event, so you must parse the event type to determine the action to take.

```java
cXAnimate.AddEventHandler((e) -> {
      System.out.printf("Found event type %d", e.type.value);
});
```
:::
:::{tab-item} C++ (Callbacks)
```{warning}
**2026 Beta Feature**: C++ event callbacks via `AddEventHandler` are new in the 2026 beta vendordep. The 2025 vendordep only supported polling. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

In C++, events are handled via callbacks similar to Java. To handle an event, you must call `AddEventHandler` on the device instance and provide a lambda function to be called. Callback functions are called on every event, so you must parse the event type to determine the action to take.

```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/domain/event/Event.h>

m_cx.AddEventHandler([](const lumyn::internal::Eventing::Event& event) {
    std::cout << "Found event type " << static_cast<int>(event.header.type) << std::endl;
});
```
:::
:::{tab-item} C++ (Polling)
Alternatively, you can poll for events manually (available in both 2025 and 2026 vendordep):

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

Modules are a powerful feature of Lumyn Labs devices that allow you to extend the functionality of the device. Modules can connect over a variety of protocols, such as I2C, SPI, and UART, and can be used to interface with sensors, co-processors, and other devices. Additionally, with custom firmware, you can create your own modules to interface with custom hardware. Due to the wide variety of modules available, this section will not cover all possible use cases, but will provide a general overview of how to interact with them using the built-in module system.

```{note}
**V2 Module Architecture**: The 2026 vendordep features a redesigned module architecture with a new **push/pull data model**. This allows for more flexible and efficient communication with sensors and custom hardware, supporting longer data payloads and more sophisticated interactions. Module data is automatically polled in the background and delivered to your callbacks.
```

### Register a Module

```{warning}
**2026 Beta Feature**: The modules API has changed in the 2026 beta vendordep. The callback signature and data extraction methods differ from the 2025 vendordep. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

::::{tab-set}
:::{tab-item} Java
```java
cX.modules.RegisterModule("test-dio", (data) -> {
      DigitalInputPayload payload = new DigitalInputPayload();

      try {
            ModuleHandler.ExtractData(payload, data);
            System.out.printf("State: " + payload.state);
      } catch (Exception e) {
            System.out.print("Error when parsing data ");
            System.out.println(e);
      }
});
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/modules/DigitalInputModule.h>

// Register a module callback - data will be automatically polled and delivered
m_cx.RegisterModule("test-dio", [this](const lumyn::internal::ModuleData::ModuleDataEntry &data) {
    DigitalInputPayload payload;
    m_cx.ExtractFromPayload<DigitalInputPayload>(&data, payload);
    std::cout << "Got new data: " << payload.state << std::endl; 
});
```
:::
::::

**Note**: Module data is automatically polled in the background. The callback will be invoked whenever new data is available for the registered module.

## Device Configuration

```{warning}
**2026 Beta Feature**: Device configuration APIs (`LoadConfigurationFromDeploy`, `RequestConfig`, `ApplyConfiguration`) are new in the 2026 beta vendordep and were not available in the 2025 vendordep. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

### Loading Configuration from Deploy Directory

You can load device configuration from a JSON file in the robot deploy directory. This is useful for simulation or when you want to configure the device from a file.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.LumynDeviceConfig;

// Load configuration from deploy/lumyn_config.json (or custom filename)
LumynDeviceConfig cfg = cXAnimate.LoadConfigurationFromDeploy("lumyn_config.json");
if (cfg != null) {
    // Apply configuration (simulation only)
    cXAnimate.ApplyConfiguration(cfg);
}
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/configuration/LumynDeviceConfig.h>

// Load configuration from deploy/lumyn_config.json (or custom filename)
auto config = m_cx.LoadConfigurationFromDeploy("lumyn_config.json");
if (config) {
    // Apply configuration (simulation only)
    m_cx.ApplyConfiguration(*config);
}

// Or use default filename
auto defaultConfig = m_cx.LoadConfigurationFromDeploy();
if (defaultConfig) {
    m_cx.ApplyConfiguration(*defaultConfig);
}
```
:::
::::

### Requesting Device Configuration

You can request the full device configuration from a connected device.

::::{tab-set}
:::{tab-item} Java
```java
// Request full configuration as raw bytes
byte[] configBytes = cXAnimate.RequestConfigFull();
if (configBytes != null && configBytes.length > 0) {
    System.out.println("Received config: " + configBytes.length + " bytes");
    // Parse configBytes as needed
}
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/device/ConnectorX.h>

// Request full configuration as raw bytes
auto deviceConfig = m_cx.RequestConfig();
if (deviceConfig) {
    std::cout << "Loaded " << deviceConfig->channels.size() << " channels from device" << std::endl;
}
```
:::
::::

## System Commands

```{warning}
**2026 Beta Feature**: System commands (`RestartDevice`) are new in the 2026 beta vendordep and were not available in the 2025 vendordep. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

### Restarting the Device

You can restart the device from code. This is useful for recovering from errors or applying configuration changes.

::::{tab-set}
:::{tab-item} Java
```java
// Restart the device immediately
cXAnimate.RestartDevice(0);

// Restart the device after a 1 second delay
cXAnimate.RestartDevice(1000);
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
