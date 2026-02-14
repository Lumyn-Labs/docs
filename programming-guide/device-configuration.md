---
hide-toc: true
---

# Device Configuration

Load, build, and apply device configurations programmatically.

## Overview

Device configurations define your LED channels, zones, groups, and modules. You can:

- Load configurations from JSON files
- Build configurations programmatically with ConfigBuilder
- Request the current configuration from a connected device
- Apply configurations to hardware or simulation

## Loading from File

Load a JSON configuration from your project's deploy directory (WPILib) or any file path (Python).

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
import com.lumynlabs.domain.config.LumynDeviceConfig;
import java.util.Optional;

// Load from deploy/lumyn_config.json (default filename)
Optional<LumynDeviceConfig> cfg = mCx.LoadConfigurationFromDeploy();
cfg.ifPresent(mCx::ApplyConfiguration);

// Load from a custom filename in deploy/
Optional<LumynDeviceConfig> customCfg = mCx.LoadConfigurationFromDeploy("my_config.json");
customCfg.ifPresent(mCx::ApplyConfiguration);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/configuration/Configuration.h>

// Load from deploy/lumyn_config.json
auto config = m_cx.LoadConfigurationFromDeploy();
if (config) {
    m_cx.ApplyConfiguration(*config);
}

// Load from a custom filename
auto customConfig = m_cx.LoadConfigurationFromDeploy("my_config.json");
if (customConfig) {
    m_cx.ApplyConfiguration(*customConfig);
}
```
:::

:::{tab-item} Python
:sync: python
```python
from lumyn_sdk import ConnectorX

cx = ConnectorX()
cx.connect("COM3")

# Load and apply configuration from file (returns True on success)
success = cx.load_configuration_from_file("my_config.json")

# Or apply configuration from JSON string
import json
with open("my_config.json") as f:
    config_json = f.read()
cx.apply_configuration_json(config_json)
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

lumyn::device::ConnectorX cx;
cx.Connect("/dev/ttyACM0");

// Load and apply from any JSON file path
bool ok = cx.LoadConfigurationFromFile("my_config.json");
```
:::

:::{tab-item} C
:sync: c
```c
#include <lumyn/c/lumyn_device.h>
#include <lumyn/c/lumyn_config.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Pass &cx.base (or &cx_animate.base for ConnectorX Animate) to config functions
FILE* f = fopen("my_config.json", "rb");
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

## Building with ConfigBuilder

Build configurations programmatically using the fluent builder API.

### Basic Configuration

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
import com.lumynlabs.domain.config.ConfigBuilder;
import com.lumynlabs.domain.config.LumynDeviceConfig;
import com.lumynlabs.domain.config.NetworkType;

ConfigBuilder builder = new ConfigBuilder();
LumynDeviceConfig cfg = builder
    .forTeam("9993")
    .setNetworkType(NetworkType.USB)
    .addChannel(1, "main-channel", 120)  // Channel 1, name, total LEDs
        .addStripZone("front", 60)       // Zone name, LED count
        .addStripZone("back", 60)
        .endChannel()
    .build();

mCx.ApplyConfiguration(cfg);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/configuration/ConfigBuilder.h>

lumyn::config::ConfigBuilder builder;
auto cfg = builder
    .ForTeam("9993")
    .SetNetworkType(lumyn::internal::Configuration::NetworkType::USB)
    .AddChannel(1, "main-channel", 120)
        .AddStripZone("front", 60)
        .AddStripZone("back", 60)
        .EndChannel()
    .Build();

m_cx.ApplyConfiguration(cfg);
```
:::

:::{tab-item} Python
:sync: python
```python
from lumyn_sdk import ConfigBuilder, NetworkType, SerializeConfigToJson

config = ConfigBuilder() \
    .ForTeam("9993") \
    .SetNetworkType(NetworkType.USB) \
    .AddChannel(1, "main-channel", 120) \
        .AddStripZone("front", 60, False) \
        .AddStripZone("back", 60, False) \
        .EndChannel() \
    .Build()

cx.apply_configuration_json(SerializeConfigToJson(config))
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>

std::string config_json = R"({
    "team": "9999",
    "network": {"mode": "USB"},
    "channels": {
        "1": {
            "id": "1",
            "length": 144,
            "brightness": 255,
            "zones": [{
                "id": "main",
                "type": "strip",
                "length": 144,
                "brightness": 100
            }]
        }
    }
})";

lumyn::device::ConnectorX cx;
cx.Connect("/dev/ttyACM0");
cx.ApplyConfigurationJson(config_json);
```
:::

:::{tab-item} C
:sync: c
```c
#include <lumyn/c/lumyn_device.h>
#include <lumyn/c/lumyn_config.h>
#include <string.h>

const char* config_json =
    "{"
      "\"team\":\"9999\","
      "\"network\":{\"mode\":\"USB\"},"
      "\"channels\":{"
        "\"1\":{"
          "\"id\":\"1\","
          "\"length\":144,"
          "\"brightness\":255,"
          "\"zones\":[{"
            "\"id\":\"main\","
            "\"type\":\"strip\","
            "\"length\":144,"
            "\"brightness\":100"
          "}]"
        "}"
      "}"
    "}";

lumyn_ApplyConfig(&cx.base, config_json, strlen(config_json));
```
:::
::::

### With Matrix Zones

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
LumynDeviceConfig cfg = builder
    .forTeam("9993")
    .setNetworkType(NetworkType.USB)
    .addChannel(1, "main-channel", 316)
        .addStripZone("strip", 60)
        .addMatrixZone("front-matrix", 16, 16)  // 16x16 matrix
        .endChannel()
    .build();
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
auto cfg = builder
    .ForTeam("9993")
    .SetNetworkType(lumyn::internal::Configuration::NetworkType::USB)
    .AddChannel(1, "main-channel", 316)
        .AddStripZone("strip", 60)
        .AddMatrixZone("front-matrix", 16, 16)
        .EndChannel()
    .Build();
```
:::

:::{tab-item} Python
:sync: python
```python
config = ConfigBuilder() \
    .ForTeam("9993") \
    .SetNetworkType(NetworkType.USB) \
    .AddChannel(1, "main-channel", 316) \
        .AddStripZone("strip", 60, False) \
        .AddMatrixZone("front-matrix", 16, 16, 100) \
        .EndChannel() \
    .Build()
```
:::
::::

### With Modules

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
LumynDeviceConfig cfg = builder
    .forTeam("9993")
    .setNetworkType(NetworkType.USB)
    .addChannel(1, "main-channel", 60)
        .addStripZone("strip", 60)
        .endChannel()
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
:sync: cpp
```cpp
auto cfg = builder
    .ForTeam("9993")
    .SetNetworkType(lumyn::internal::Configuration::NetworkType::USB)
    .AddChannel(1, "main-channel", 60)
        .AddStripZone("strip", 60)
        .EndChannel()
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
:sync: python
```python
config = ConfigBuilder() \
    .ForTeam("9993") \
    .SetNetworkType(NetworkType.USB) \
    .AddChannel(1, "main-channel", 60) \
        .AddStripZone("strip", 60, False) \
        .EndChannel() \
    .AddModule("digital-input", "DigitalInput", 50, "DIO") \
        .WithConfig("pin", "DIO0") \
        .EndModule() \
    .AddModule("tof-sensor", "VL53L1X", 100, "I2C") \
        .WithConfig("address", "0x29") \
        .EndModule() \
    .Build()
```
:::
::::

## Requesting from Device

Retrieve the current configuration from a connected device.

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
Optional<LumynDeviceConfig> config = mCx.RequestConfig();
config.ifPresent(cfg -> {
    System.out.println("Channels: " + cfg.channels.size());
    // Use the config as needed
});
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
auto config = m_cx.RequestConfig();
if (config) {
    std::cout << "Channels: " << config->channels.size() << std::endl;
}
```
:::

:::{tab-item} Python
:sync: python
```python
config = cx.request_config()
if config:
    num_channels = len(config.channels) if config.channels else 0
    print(f"Channels: {num_channels}")
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <lumyn/cpp/connectorXVariant/ConnectorX.hpp>
#include <iostream>

std::string config_json;
if (cx.RequestConfig(config_json, 5000) == LUMYN_OK) {
    std::cout << config_json << std::endl;
}
```
:::

:::{tab-item} C
:sync: c
```c
char* config_json = NULL;
lumyn_error_t err = lumyn_RequestConfigAlloc(&cx.base, &config_json, 5000);
if (err == LUMYN_OK && config_json) {
    printf("%s\n", config_json);
    lumyn_FreeString(config_json);
}
```
:::
::::

## Applying Configuration

`ApplyConfiguration` works identically for hardware and simulation:

- **Hardware**: Sends the configuration to the connected device
- **Simulation**: Drives the WPILib simulator UI

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java
```java
mCx.ApplyConfiguration(cfg);
```
:::

:::{tab-item} C++ (WPILib)
:sync: cpp
```cpp
m_cx.ApplyConfiguration(cfg);
```
:::

:::{tab-item} Python
:sync: python
```python
from lumyn_sdk import SerializeConfigToJson
cx.apply_configuration_json(SerializeConfigToJson(config))
```
:::

:::{tab-item} C++ (Standalone)
:sync: cpp-standalone
```cpp
#include <fstream>
#include <iterator>
#include <string>

std::ifstream file("my_config.json", std::ios::binary);
std::string config_json((std::istreambuf_iterator<char>(file)),
                         std::istreambuf_iterator<char>());
cx.ApplyConfigurationJson(config_json);
```
:::

:::{tab-item} C
:sync: c
```c
const char* config_json =
    "{\"team\":\"9999\",\"network\":{\"mode\":\"USB\"},"
    "\"channels\":{\"1\":{\"id\":\"1\",\"length\":144,"
    "\"zones\":[{\"id\":\"main\",\"type\":\"strip\",\"length\":144}]}}}";
lumyn_ApplyConfig(&cx.base, config_json, strlen(config_json));
```
:::
::::

## SDK Example Config JSONs (Standalone C/C++)

These are the exact configs used by the tested standalone example programs.

::::{tab-set}

:::{tab-item} CX basic

```json
{
  "team": null,
  "network": {
    "mode": "USB"
  },
  "channels": {
    "1": {
      "id": "MyChan",
      "length": 72,
      "brightness": 20,
      "zones": [
        {
          "id": "MyStrip",
          "type": "strip",
          "length": 8,
          "brightness": 255,
          "reversed": false
        },
        {
          "id": "MyMatrix",
          "type": "matrix",
          "rows": 8,
          "cols": 8,
          "brightness": 255,
          "orientation": {
            "cornerTopBottom": "top",
            "cornerLeftRight": "left",
            "axisLayout": "cols",
            "sequenceLayout": "zigzag"
          }
        }
      ]
    }
  },
  "sequences": [
    {
      "id": "1",
      "steps": [
        {
          "animationId": "Blink",
          "color": {
            "r": 10,
            "g": 10,
            "b": 200
          },
          "delay": 500,
          "reversed": false,
          "repeat": 2
        }
      ]
    },
    {
      "id": "cool",
      "steps": [
        {
          "animationId": "RainbowRoll",
          "color": {
            "r": 10,
            "g": 10,
            "b": 200
          },
          "delay": 10,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "AlternateBreathe",
          "color": {
            "r": 13,
            "g": 158,
            "b": 2
          },
          "delay": 5,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "GrowingBreathe",
          "color": {
            "r": 255,
            "g": 0,
            "b": 204
          },
          "delay": 1,
          "reversed": false,
          "repeat": null
        }
      ]
    }
  ],
  "bitmaps": [],
  "sensors": [
    {
      "id": "digital-1",
      "type": "DigitalInput",
      "pollingRateMs": 100,
      "connection": "DIO",
      "config": {
        "pin": "DIO0",
        "interruptMode": null
      }
    },
    {
      "id": "analog-1",
      "type": "AnalogInput",
      "pollingRateMs": 50,
      "connection": "AIO",
      "config": {
        "pin": "AIO0",
        "scaleFactor": 1,
        "outputMin": 0,
        "outputMax": 1023
      }
    }
  ],
  "groups": [
  ]
}
```
:::

:::{tab-item} CX Animate basic

```json
{
  "team": null,
  "network": {
    "mode": "USB"
  },
  "channels": {
    "1": {
      "id": "MyChannel",
      "length": 320,
      "brightness": null,
      "zones": [
        {
          "id": "MyStrip",
          "type": "strip",
          "length": 320,
          "brightness": 255,
          "reversed": false
        }
      ]
    },
    "3": {
      "id": "MyChan",
      "length": 72,
      "brightness": 20,
      "zones": [
        {
          "id": "MyMatrix",
          "type": "matrix",
          "rows": 8,
          "cols": 8,
          "brightness": 255,
          "orientation": {
            "cornerTopBottom": "top",
            "cornerLeftRight": "left",
            "axisLayout": "cols",
            "sequenceLayout": "zigzag"
          }
        }
      ]
    }
  },
  "sequences": [
    {
      "id": "1",
      "steps": [
        {
          "animationId": "Blink",
          "color": {
            "r": 10,
            "g": 10,
            "b": 200
          },
          "delay": 500,
          "reversed": false,
          "repeat": 2
        }
      ]
    },
    {
      "id": "cool",
      "steps": [
        {
          "animationId": "RainbowRoll",
          "color": {
            "r": 10,
            "g": 10,
            "b": 200
          },
          "delay": 10,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "AlternateBreathe",
          "color": {
            "r": 13,
            "g": 158,
            "b": 2
          },
          "delay": 5,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "GrowingBreathe",
          "color": {
            "r": 255,
            "g": 0,
            "b": 204
          },
          "delay": 1,
          "reversed": false,
          "repeat": null
        }
      ]
    }
  ],
  "bitmaps": [],
  "groups": [
  ]
}
```
:::

:::{tab-item} CX Animate advanced

```json
{
  "team": null,
  "network": {
    "mode": "USB"
  },
  "channels": {
    "1": {
      "id": "MyChannel",
      "length": 320,
      "brightness": null,
      "zones": [
        {
          "id": "MyStrip",
          "type": "strip",
          "length": 320,
          "brightness": 255,
          "reversed": false
        }
      ]
    },
    "3": {
      "id": "MyChan",
      "length": 72,
      "brightness": 20,
      "zones": [
        {
          "id": "MyOtherStrip",
          "type": "strip",
          "length": 8,
          "brightness": 255,
          "reversed": false
        },
        {
          "id": "MyMatrix",
          "type": "matrix",
          "rows": 8,
          "cols": 8,
          "brightness": 255,
          "orientation": {
            "cornerTopBottom": "top",
            "cornerLeftRight": "left",
            "axisLayout": "cols",
            "sequenceLayout": "zigzag"
          }
        }
      ]
    }
  },
  "sequences": [
    {
      "id": "1",
      "steps": [
        {
          "animationId": "Blink",
          "color": {
            "r": 10,
            "g": 10,
            "b": 200
          },
          "delay": 500,
          "reversed": false,
          "repeat": 2
        }
      ]
    },
    {
      "id": "cool",
      "steps": [
        {
          "animationId": "RainbowRoll",
          "color": {
            "r": 10,
            "g": 10,
            "b": 200
          },
          "delay": 10,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "AlternateBreathe",
          "color": {
            "r": 13,
            "g": 158,
            "b": 2
          },
          "delay": 5,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "GrowingBreathe",
          "color": {
            "r": 255,
            "g": 0,
            "b": 204
          },
          "delay": 1,
          "reversed": false,
          "repeat": null
        }
      ]
    },
    {
      "id": "fadebreathe",
      "steps": [
        {
          "animationId": "FadeIn",
          "color": {
            "r": 81,
            "g": 200,
            "b": 10
          },
          "delay": 10,
          "reversed": false,
          "repeat": null
        },
        {
          "animationId": "Blink",
          "color": {
            "r": 23,
            "g": 200,
            "b": 10
          },
          "delay": 200,
          "reversed": false,
          "repeat": 10
        }
      ]
    }
  ],
  "bitmaps": [],
  "groups": [
    {
      "id": "MyGroup",
      "zoneIds": [
        "MyStrip",
        "strip"
      ]
    }
  ]
}
```
:::
::::
