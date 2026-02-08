---
hide-toc: true
---

# Modules & Sensors

Extend ConnectorX with sensor inputs and hardware interfaces using the module system.

```{important}
Modules are only supported on **ConnectorX**, not ConnectorXAnimate.
```

## Overview

Modules provide data from I2C, SPI, UART, digital, and analog peripherals. Common use cases include:

- Time-of-flight distance sensors (VL53L1X)
- Digital input monitoring (limit switches, beam breaks)
- Analog voltage readings

The SDK provides both typed helper classes for built-in modules and raw callbacks for custom modules.

## Built-in Modules

| Module | Payload Fields | Description |
|--------|---------------|-------------|
| `DigitalInputModule` | `state` (byte) | GPIO pin state (0 or non-zero) |
| `AnalogInputModule` | `rawValue` (int), `scaledValue` (int) | Analog voltage reading |
| `VL53L1XModule` | `valid` (byte), `dist` (short, mm) | Time-of-flight distance |

## Using Typed Helpers

Typed helper classes handle payload parsing automatically and provide a clean API.

### DigitalInputModule

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import com.lumynlabs.modules.DigitalInputModule;

DigitalInputModule dio = new DigitalInputModule(cX, "digital-input");

// Option 1: Callback for automatic updates
dio.onUpdate(payload -> {
    System.out.println("State: " + (payload.state != 0 ? "HIGH" : "LOW"));
});
dio.start();

// Option 2: Poll manually
var result = dio.get();
if (result.ok() && !result.value().isEmpty()) {
    for (var payload : result.value()) {
        System.out.println("State: " + payload.state);
    }
}
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
#include <lumyn/modules/DigitalInputModule.h>

lumyn::modules::DigitalInputModule dio(m_cx, "digital-input");

// Callback for automatic updates
dio.OnUpdate([](const lumyn::modules::DigitalInputPayload& payload) {
    std::cout << "State: " << static_cast<int>(payload.state) << std::endl;
});
dio.Start();
```
:::
:::{tab-item} Python
:sync: python

```python
from lumyn_sdk import DigitalInputModule

dio = DigitalInputModule(cx, "digital-1")
dio.on_update(lambda payload: print(f"State: {'HIGH' if payload.state else 'LOW'}"))
dio.start()

# Later, when done:
# dio.stop()
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone

```cpp
#include <lumyn/cpp/modules/DigitalInputModule.hpp>

lumyn::modules::DigitalInputModule dio(cx, "digital-input");
dio.OnUpdate([](const lumyn::modules::DigitalInputPayload& payload) {
    std::cout << "State: " << (payload.state ? "HIGH" : "LOW") << std::endl;
});
dio.Start();
```
:::

:::{tab-item} C
:sync: c

```c
void digital_callback(const char* module_id, const uint8_t* data, size_t len, void* user) {
    lumyn_digital_input_payload_t payload;
    if (lumyn_ParseDigitalInputPayload(data, len, &payload)) {
        printf("[%s] State: %s\n", module_id, payload.state ? "HIGH" : "LOW");
    }
}

lumyn_RegisterModule(&cx.base, "digital-input", digital_callback, NULL);
```
:::
::::

### VL53L1XModule (Time-of-Flight)

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import com.lumynlabs.modules.VL53L1XModule;

VL53L1XModule tof = new VL53L1XModule(cX, "tof-sensor");

tof.onUpdate(payload -> {
    if (payload.valid != 0) {
        System.out.println("Distance: " + payload.dist + " mm");
    } else {
        System.out.println("Invalid reading");
    }
});
tof.start();
```
:::
:::{tab-item} C++ (WPILib)
```cpp
#include <lumyn/modules/VL53L1XModule.h>

lumyn::modules::VL53L1XModule tof(m_cx, "tof-sensor");

tof.onUpdate([](const lumyn::modules::VL53L1XPayload& payload) {
    if (payload.valid) {
        std::cout << "Distance: " << payload.dist << " mm" << std::endl;
    }
});
tof.start();
```
:::
:::{tab-item} Python
```python
from lumyn_sdk import VL53L1XModule

tof = VL53L1XModule(cx, "tof-sensor")

def handle_tof(payload):
    if payload.valid:
        print(f"Distance: {payload.dist} mm")

tof.on_update(handle_tof)
tof.start()
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/modules/VL53L1XModule.hpp>

lumyn::modules::VL53L1XModule tof(cx, "tof-sensor");
tof.OnUpdate([](const lumyn::modules::VL53L1XPayload& payload) {
    if (payload.valid) {
        std::cout << "Distance: " << payload.dist_mm << " mm" << std::endl;
    }
});
tof.Start();
```
:::

:::{tab-item} C
:sync: c
```c
void tof_callback(const char* module_id, const uint8_t* data, size_t len, void* user) {
    lumyn_vl53l1x_payload_t payload;
    if (lumyn_ParseVL53L1XPayload(data, len, &payload) && payload.valid) {
        printf("[%s] Distance: %u mm\n", module_id, payload.dist_mm);
    }
}

lumyn_RegisterModule(&cx.base, "tof-sensor", tof_callback, NULL);
```
:::
::::

### AnalogInputModule

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import com.lumynlabs.modules.AnalogInputModule;

AnalogInputModule analog = new AnalogInputModule(cX, "analog-input");

analog.onUpdate(payload -> {
    System.out.printf("Raw: %d, Scaled: %d%n", payload.rawValue, payload.scaledValue);
});
analog.start();
```
:::
:::{tab-item} C++ (WPILib)
```cpp
#include <lumyn/modules/AnalogInputModule.h>

lumyn::modules::AnalogInputModule analog(m_cx, "analog-input");

analog.onUpdate([](const lumyn::modules::AnalogInputPayload& payload) {
    std::cout << "Raw: " << payload.rawValue 
              << ", Scaled: " << payload.scaledValue << std::endl;
});
analog.start();
```
:::
:::{tab-item} Python
```python
from lumyn_sdk import AnalogInputModule

analog = AnalogInputModule(cx, "analog-input")
analog.on_update(lambda p: print(f"Raw: {p.raw_value}, Scaled: {p.scaled_value}"))
analog.start()
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/modules/AnalogInputModule.hpp>

lumyn::modules::AnalogInputModule analog(cx, "analog-input");
analog.OnUpdate([](const lumyn::modules::AnalogInputPayload& payload) {
    std::cout << "Raw: " << payload.raw_value
              << ", Scaled: " << payload.scaled_value << std::endl;
});
analog.Start();
```
:::

:::{tab-item} C
:sync: c
```c
void analog_callback(const char* module_id, const uint8_t* data, size_t len, void* user) {
    lumyn_analog_input_payload_t payload;
    if (lumyn_ParseAnalogInputPayload(data, len, &payload)) {
        printf("[%s] Raw=%u Scaled=%u\n", module_id, payload.raw_value, payload.scaled_value);
    }
}

lumyn_RegisterModule(&cx.base, "analog-input", analog_callback, NULL);
```
:::
::::

## Raw Module Callbacks

For custom modules or when you need low-level control, register raw callbacks.

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import com.lumynlabs.modules.DigitalInputModule;
import com.lumynlabs.domain.module.ModuleHandler;

cX.modules.RegisterModule("custom-module", (data) -> {
    // Parse raw bytes
    if (data.length > 0) {
        System.out.println("Received " + data.length + " bytes");
        System.out.println("First byte: " + data[0]);
    }
});

// Or parse into a known payload type
cX.modules.RegisterModule("digital-input", (data) -> {
    DigitalInputModule.Payload payload = new DigitalInputModule.Payload();
    try {
        ModuleHandler.ExtractData(payload, data);
        System.out.println("State: " + payload.state);
    } catch (Exception e) {
        System.out.println("Parse error: " + e);
    }
});
```
:::
:::{tab-item} C++ (WPILib)
```cpp
struct CustomPayload {
    uint8_t value1;
    uint16_t value2;
};

m_cx.RegisterModule("custom-module", [this](uint16_t unitId, const std::vector<uint8_t>& payload) {
    if (payload.size() >= 3) {
        auto parsed = m_cx.ExtractFromPayload<CustomPayload>(payload);
        std::cout << "Value1: " << static_cast<int>(parsed.value1) 
                  << ", Value2: " << parsed.value2 << std::endl;
    }
});
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
cx.RegisterModule("custom-module", [](const std::vector<uint8_t>& data) {
    std::cout << "custom-module: " << data.size() << " bytes" << std::endl;
});
```
:::
:::{tab-item} Python
```python
dispatcher = cx.get_module_dispatcher()

def handle_raw(entries):
    for entry in entries:
        print(f"Module data: {list(entry.data)}")

dispatcher.register_listener("custom-module", handle_raw)
dispatcher.start()

# Later, when done:
# dispatcher.stop()
```
:::
:::{tab-item} C
```c
void module_callback(const char* module_id, const uint8_t* data, size_t len, void* user) {
    printf("Module %s: %zu bytes\n", module_id, len);
    if (len > 0) {
        printf("First byte: %d\n", data[0]);
    }
}

lumyn_RegisterModule(LUMYN_BASE_PTR(&cx), "custom-module", module_callback, NULL);
```
:::
::::

## Manual Polling

If you prefer polling over callbacks, you can retrieve the latest module data manually.

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
// With typed helper
var result = dio.get();
if (result.ok()) {
    for (var payload : result.value()) {
        System.out.println("State: " + payload.state);
    }
}
```
:::
:::{tab-item} C++ (WPILib)
```cpp
struct DigitalInputPayload { uint8_t state; };

std::vector<std::pair<uint16_t, std::vector<uint8_t>>> latest;
if (m_cx.GetLatestModuleData("digital-input", latest)) {
    for (const auto& [unitId, payload] : latest) {
        auto parsed = m_cx.ExtractFromPayload<DigitalInputPayload>(payload);
        std::cout << "Unit " << unitId << " state: " 
                  << static_cast<int>(parsed.state) << std::endl;
    }
}
```
:::
:::{tab-item} Python
```python
# Python uses the module dispatcher thread for polling.
# Tune polling interval and start the dispatcher:
dispatcher = cx.get_module_dispatcher()
dispatcher.set_poll_interval(100)  # ms
dispatcher.start()
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <chrono>
#include <thread>

cx.SetModulePollingEnabled(true);
cx.RegisterModule("digital-input", [](const std::vector<uint8_t>& data) {
    if (!data.empty()) std::cout << "State: " << static_cast<int>(data[0]) << std::endl;
});

while (true) {
    cx.PollModules();
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
}
```
:::
:::{tab-item} C
:sync: c
```c
lumyn_SetModulePollingEnabled(&cx.base, true);
lumyn_RegisterModule(&cx.base, "digital-input", digital_callback, NULL);

while (1) {
    lumyn_PollModules(&cx.base);
}
```
:::
::::

## Module Configuration

Modules are configured in Lumyn Studio or via ConfigBuilder:

### Lumyn Studio

1. Open the **Modules** tab
2. Browse available modules
3. Add modules to your configuration
4. Configure pin assignments and settings
5. Export to your device

### ConfigBuilder

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import com.lumynlabs.domain.config.ConfigBuilder;

ConfigBuilder builder = new ConfigBuilder();
LumynDeviceConfig cfg = builder
    .forTeam("9993")
    .addModule("digital-input", "DigitalInput", 50, "DIO")
        .withConfig("pin", "DIO0")
        .endModule()
    .addModule("tof-sensor", "VL53L1X", 100, "I2C")
        .withConfig("address", "0x29")
        .endModule()
    .build();
```
:::
:::{tab-item} C++ (WPILib)
```cpp
auto cfg = lumyn::config::ConfigBuilder()
    .AddModule("digital-input", "DigitalInput", 50, "DIO")
        .WithConfig("pin", std::string("DIO0"))
        .EndModule()
    .AddModule("tof-sensor", "VL53L1X", 100, "I2C")
        .WithConfig("address", std::string("0x29"))
        .EndModule()
    .Build();
```
:::
:::{tab-item} Python
```python
config = ConfigBuilder() \
    .AddModule("digital-input", "DigitalInput", 50, "DIO") \
        .WithConfig("pin", "DIO0") \
        .EndModule() \
    .AddModule("tof-sensor", "VL53L1X", 100, "I2C") \
        .WithConfig("address", "0x29") \
        .EndModule() \
    .Build()
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

bool ok = cx.LoadConfigurationFromFile("lumyn_config.json");
```
:::
:::{tab-item} C
:sync: c
```c
#include <lumyn/c/lumyn_sdk.h>
#include <stdio.h>
#include <stdlib.h>

FILE* f = fopen("lumyn_config.json", "rb");
fseek(f, 0, SEEK_END);
long len = ftell(f);
rewind(f);

char* config_json = (char*)malloc((size_t)len + 1);
fread(config_json, 1, (size_t)len, f);
config_json[len] = '\0';
fclose(f);

lumyn_ApplyConfig(&cx.base, config_json, (size_t)len);
free(config_json);
```
:::
::::

## Payload Byte Order

Module payloads use **little-endian** byte order. The typed helpers and `ExtractFromPayload` handle byte order conversion automatically.

If parsing manually:

```cpp
// Little-endian uint16_t from bytes
uint16_t value = payload[0] | (payload[1] << 8);
```
