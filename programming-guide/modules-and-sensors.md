---
hide-toc: true
---

# Modules and sensors

Extend ConnectorX and ConnectorX Animate with sensor inputs and hardware interfaces using the module system.

## Device support

| | ConnectorX | ConnectorX Animate |
|---|---|---|
| Modules at once | Up to 5 | Up to 2 |
| Connection types | I2C, SPI, UART, DIO, AIO | I2C only |
| `DigitalInputModule` (DIO) | Yes | No |
| `AnalogInputModule` (AIO) | Yes | No |
| `VL53L1XModule` (I2C) | Yes | Yes |

Lumyn Studio offers only the connection types each device supports. In the WPILib vendordep and the C and C++ SDKs, both device types have the same module API. In the Python SDK, only `ConnectorX` has a `modules` handler; `ConnectorXAnimate` has none.

## Overview

Modules provide data from I2C, SPI, UART, digital, and analog peripherals. Common use cases include:

- Time-of-flight distance sensors (VL53L1X)
- Digital input monitoring (limit switches, beam breaks)
- Analog voltage readings

The SDK provides both typed helper classes for built-in modules and raw callbacks for custom modules.

## Built-in modules

| Module | Payload Fields | Description |
|--------|---------------|-------------|
| `DigitalInputModule` | `state` (byte) | GPIO pin state (0 or non-zero) |
| `AnalogInputModule` | `rawValue` (int), `scaledValue` (int) | Analog voltage reading |
| `VL53L1XModule` | `valid` (byte), `dist` (short, mm) | Time-of-flight distance |

## Using typed helpers

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
dio.onUpdate([](const lumyn::modules::DigitalInputPayload& payload) {
    std::cout << "State: " << static_cast<int>(payload.state) << std::endl;
});
dio.start();
```
:::
:::{tab-item} Python
:sync: python

```python
from lumyn_sdk import DigitalInputModule

dio = DigitalInputModule(cx, "digital-input")
dio.on_update(lambda payload: print(f"State: {'HIGH' if payload.state else 'LOW'}"))
dio.start()

# Later, when done:
# dio.stop()
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone

```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

// Using the module system with raw callbacks
cx.RegisterModule("digital-input", [](const std::vector<uint8_t>& data) {
    if (!data.empty()) {
        std::cout << "State: " << (data[0] ? "HIGH" : "LOW") << std::endl;
    }
});
cx.SetModulePollingEnabled(true);
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

lumyn_RegisterModule(LUMYN_BASE_PTR(&cx), "digital-input", digital_callback, NULL);
```
:::
::::

### VL53L1XModule (time-of-flight)

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
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

// Using raw callback for VL53L1X data
cx.RegisterModule("tof-sensor", [](const std::vector<uint8_t>& data) {
    if (data.size() >= 3) {
        uint8_t valid = data[0];
        uint16_t dist_mm = data[1] | (data[2] << 8);  // Little-endian
        if (valid) {
            std::cout << "Distance: " << dist_mm << " mm" << std::endl;
        }
    }
});
cx.SetModulePollingEnabled(true);
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

lumyn_RegisterModule(LUMYN_BASE_PTR(&cx), "tof-sensor", tof_callback, NULL);
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
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

// Using raw callback for analog input data
cx.RegisterModule("analog-input", [](const std::vector<uint8_t>& data) {
    if (data.size() >= 6) {
        uint16_t raw_value = data[0] | (data[1] << 8);    // Little-endian
        uint32_t scaled_value = data[2] | (data[3] << 8)
                              | (data[4] << 16) | (data[5] << 24);
        std::cout << "Raw: " << raw_value
                  << ", Scaled: " << scaled_value << std::endl;
    }
});
cx.SetModulePollingEnabled(true);
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

lumyn_RegisterModule(LUMYN_BASE_PTR(&cx), "analog-input", analog_callback, NULL);
```
:::
::::

## Raw module callbacks

For custom modules or when you need low-level control, register raw callbacks.

In a WPILib robot program, registering a callback returns a `ModuleHandle`. Pass it to `UnregisterModule` to remove just that callback; the module's other callbacks keep running. `UnregisterModule` with the module ID removes them all. Registering the same callback twice registers it once and returns the same handle. In Java that means the same object (by `equals`); in C++ it means the same function, so each lambda you pass is a registration of its own. Keep the handle if you'll remove a lambda later.

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import com.lumynlabs.modules.DigitalInputModule;
import com.lumynlabs.modules.ModuleHandle;
import com.lumynlabs.domain.module.ModuleHandler;

ModuleHandle handle = cX.modules.RegisterModule("custom-module", (entry) -> {
    // entry.data holds the raw bytes; entry.len is how many there are
    if (entry.len > 0) {
        System.out.println("Received " + entry.len + " bytes");
        System.out.println("First byte: " + entry.data[0]);
    }
});

// Later, remove just this callback
cX.modules.UnregisterModule(handle);

// Or parse into a known payload type
cX.modules.RegisterModule("digital-input", (entry) -> {
    DigitalInputModule.Payload payload = new DigitalInputModule.Payload();
    try {
        ModuleHandler.ExtractData(payload, entry);
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

lumyn::device::ModuleHandle handle =
    m_cx.RegisterModule("custom-module", [this](uint16_t unitId, const std::vector<uint8_t>& payload) {
        if (payload.size() >= 3) {
            auto parsed = m_cx.ExtractFromPayload<CustomPayload>(payload);
            std::cout << "Value1: " << static_cast<int>(parsed.value1)
                      << ", Value2: " << parsed.value2 << std::endl;
        }
    });

// Later, remove just this callback
m_cx.UnregisterModule(handle);
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

cx.RegisterModule("custom-module", [](const std::vector<uint8_t>& data) {
    std::cout << "custom-module: " << data.size() << " bytes" << std::endl;
});
cx.SetModulePollingEnabled(true);
```
:::
:::{tab-item} Python
```python
# Option 1: Callback interface
from lumyn_sdk.interfaces.i_module_data_callback import IModuleDataCallback
from lumyn_sdk.domain.module.new_data_info import NewDataInfo

class MyModuleHandler(IModuleDataCallback):
    def handle_data(self, info: NewDataInfo) -> None:
        print(f"Module data received")

cx.modules.register_module("custom-module", MyModuleHandler())

# Option 2: Dispatcher with function callbacks
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

## Send JSON to a module

Robot code can send JSON to a module on the device. A custom module receives it in its `handleReceivedJson()` (see the [firmware starters](../advanced-topics.md)). Each send holds about 4 KB of JSON. Name the module by its ID in the device's config.

A send made before the device is connected waits for the connection, as LED commands do. JSON that's empty, or too large to send while connected, is refused at once. The device reports JSON it can't parse with an error event.

Send JSON to a custom module only; the built-in modules don't take any.

::::{tab-set}
:::{tab-item} Java (WPILib)
:sync: java
```java
// Returns false if the JSON is empty, or too large to send while connected.
boolean sent = cX.SendModuleJson("screen", "{\"text\":\"Hello\",\"size\":2}");
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
// Returns false if the JSON is empty, or too large to send while connected.
bool sent = m_cx.SendModuleJson("screen", R"({"text":"Hello","size":2})");
```
:::
:::{tab-item} Python
:sync: python
```python
# A dict is encoded as JSON; a str is sent as it is.
# Raises ValueError if the JSON is empty, or too large to send while connected.
cx.send_module_json("screen", {"text": "Hello", "size": 2})
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
lumyn_error_t err = cx.SendModuleJson("screen", R"({"text":"Hello","size":2})");
if (err != LUMYN_OK) {
    // LUMYN_ERR_INVALID_ARGUMENT: empty, or too large to send while connected
}
```
:::
:::{tab-item} C
:sync: c
```c
const char *json = "{\"text\":\"Hello\",\"size\":2}";
lumyn_error_t err = lumyn_SendModuleJson(LUMYN_BASE_PTR(&cx), "screen", json, strlen(json));
```
:::
::::

On the device, the module handles it in `handleReceivedJson()`. Return `true` when the JSON was understood:

```cpp
bool handleReceivedJson(ArduinoJson::JsonVariantConst json) override {
    const char *text = json["text"] | "";
    int size = json["size"] | 1;
    // ...draw `text` at `size`...
    return true;
}
```

The ConnectorX Animate starter's `OledModule` is a complete example: it shows text sent from robot code on a 0.96" OLED.

## Manual polling

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
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>
#include <chrono>
#include <thread>

cx.RegisterModule("digital-input", [](const std::vector<uint8_t>& data) {
    if (!data.empty()) std::cout << "State: " << static_cast<int>(data[0]) << std::endl;
});
cx.SetModulePollingEnabled(true);

while (true) {
    cx.PollModules();
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
}
```
:::
:::{tab-item} C
:sync: c
```c
lumyn_SetModulePollingEnabled(LUMYN_BASE_PTR(&cx), true);
lumyn_RegisterModule(LUMYN_BASE_PTR(&cx), "digital-input", digital_callback, NULL);

while (1) {
    lumyn_PollModules(LUMYN_BASE_PTR(&cx));
}
```
:::
::::

## Module configuration

Modules are configured in Lumyn Studio or with `ConfigBuilder`. In the configuration JSON, the list of modules is under the `sensors` key; the board ignores a `modules` key.

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
# The Python ConfigBuilder mirrors Java/C++ naming
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

// Load and apply configuration from a JSON file
bool ok = cx.LoadConfigurationFromFile("lumyn_config.json");
```
:::
:::{tab-item} C
:sync: c
```c
#include <lumyn/c/lumyn_device.h>
#include <lumyn/c/lumyn_config.h>
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

lumyn_ApplyConfig(LUMYN_BASE_PTR(&cx), config_json, (size_t)len);
free(config_json);
```
:::
::::

## Payload byte order

Module payloads use **little-endian** byte order. The typed helpers and `ExtractFromPayload` handle byte order conversion automatically.

If parsing manually:

```cpp
// Little-endian uint16_t from bytes
uint16_t value = payload[0] | (payload[1] << 8);
```
