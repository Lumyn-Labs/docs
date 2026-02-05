---
hide-toc: true
---

# Getting Started with C/C++ SDK (Standalone)

Control Lumyn Labs devices using native C or C++ on Windows, Linux, macOS, and embedded systems. The standalone C/C++ SDK provides a low-level API for maximum performance and control.

```{warning}
**Beta Software**: The standalone C/C++ SDK is currently in beta and may be unstable. APIs and functionality are subject to change. Please report any issues to [support@lumynlabs.com](mailto:support@lumynlabs.com).
```

## When to Use This SDK

Use the **standalone C/C++ SDK** when:

- Building desktop applications on Windows, Linux, or macOS
- Developing embedded Linux applications (Raspberry Pi, Jetson, etc.)
- You need maximum performance and minimal overhead
- You're not using the FRC/WPILib ecosystem

Use **WPILib C++** instead if:

- You're building an FRC robot
- Your team uses WPILib and vendor dependencies
- You want integration with roboRIO and the FRC toolchain

## Installation

### Download Binary Release

Download the latest pre-built release from the [GitHub releases page](https://github.com/Lumyn-Labs/lumyn-c-sdk/releases):

1. Navigate to the releases page
2. Download the archive for your platform:
   - `lumyn-c-sdk-*.zip` for Windows
   - `lumyn-c-sdk-*.tar.gz` for Linux/macOS
3. Extract to your desired location

### CMake Integration

In your `CMakeLists.txt`:

```cmake
# Set the SDK path
set(LUMYN_SDK_PATH "/path/to/lumyn-c-sdk")

# Include the SDK
include_directories(${LUMYN_SDK_PATH}/include)
link_directories(${LUMYN_SDK_PATH}/lib)

# Link against the SDK
target_link_libraries(your_target lumyn)
```

### Include Headers

```cpp
// For C++
#include <lumyn/device/ConnectorX.hpp>
#include <lumyn/device/ConnectorXAnimate.hpp>

// For C
#include <lumyn/c/lumyn_sdk.h>
```

## Choosing Between C and C++

### C++ API

More ergonomic, object-oriented, uses modern C++ features:

```cpp
#include <lumyn/device/ConnectorXAnimate.hpp>

int main() {
    lumyn::device::ConnectorXAnimate device;
    device.Connect("/dev/ttyACM0");
    
    device.SetColor("zone-id", 255, 0, 0);  // Red
    
    device.Disconnect();
    return 0;
}
```

### C API

Lower-level, procedural, maximum compatibility:

```c
#include <lumyn/c/lumyn_sdk.h>

int main() {
    LUMYN_DEVICE device = lumyn_CreateConnectorXAnimate();
    lumyn_Connect(device, "/dev/ttyACM0");
    
    lumyn_SetColor(device, "zone-id", 255, 0, 0);  // Red
    
    lumyn_Disconnect(device);
    lumyn_ReleaseDevice(device);
    return 0;
}
```

## Quick Start: C++

### Basic Connection and LED Control

```cpp
#include <lumyn/device/ConnectorXAnimate.hpp>
#include <iostream>

int main() {
    // Create device
    lumyn::device::ConnectorXAnimate device;
    
    // Connect
    if (!device.Connect("/dev/ttyACM0")) {  // Or "COM3" on Windows
        std::cerr << "Failed to connect" << std::endl;
        return 1;
    }
    
    std::cout << "Connected!" << std::endl;
    
    // Set a color
    device.SetColor("builtin-strip", 255, 0, 0);  // Red
    
    // Disconnect
    device.Disconnect();
    return 0;
}
```

### Playing Animations

```cpp
#include <lumyn/device/ConnectorXAnimate.hpp>
#include <thread>
#include <chrono>

int main() {
    lumyn::device::ConnectorXAnimate device;
    device.Connect("/dev/ttyACM0");
    
    // Play chase animation
    device.SetAnimation(
        "builtin-strip",
        lumyn::animation::Type::CHASE,
        {255, 0, 0},      // Red
        40,               // Delay in milliseconds
        false,            // Don't reverse
        false             // Loop continuously
    );
    
    // Keep the connection alive
    std::this_thread::sleep_for(std::chrono::seconds(10));
    
    device.Disconnect();
    return 0;
}
```

### DirectLED (High-Frequency Updates)

```cpp
#include <lumyn/device/ConnectorXAnimate.hpp>
#include <vector>
#include <cstring>

int main() {
    lumyn::device::ConnectorXAnimate device;
    device.Connect("/dev/ttyACM0");
    
    // Get DirectLED controller for a zone (60 LEDs)
    auto direct = device.GetDirectLED("builtin-strip", 60);
    
    // Create RGB buffer (3 bytes per LED)
    std::vector<uint8_t> buffer(60 * 3, 0);
    
    // Set up a gradient: red to blue
    for (int i = 0; i < 60; ++i) {
        buffer[i * 3 + 0] = (i * 255) / 60;     // Red increases
        buffer[i * 3 + 1] = 0;                  // Green stays 0
        buffer[i * 3 + 2] = 255 - (i * 255) / 60; // Blue decreases
    }
    
    // Send to device
    direct->Update(buffer);
    
    device.Disconnect();
    return 0;
}
```

## Quick Start: C

### Basic Connection and LED Control

```c
#include <lumyn/c/lumyn_sdk.h>
#include <stdio.h>

int main() {
    // Create device
    LUMYN_DEVICE device = lumyn_CreateConnectorXAnimate();
    
    // Connect
    if (!lumyn_Connect(device, "/dev/ttyACM0")) {  // Or "COM3" on Windows
        fprintf(stderr, "Failed to connect\n");
        lumyn_ReleaseDevice(device);
        return 1;
    }
    
    printf("Connected!\n");
    
    // Set a color
    lumyn_SetColor(device, "builtin-strip", 255, 0, 0);  // Red
    
    // Disconnect and cleanup
    lumyn_Disconnect(device);
    lumyn_ReleaseDevice(device);
    return 0;
}
```

### Playing Animations

```c
#include <lumyn/c/lumyn_sdk.h>
#include <unistd.h>

int main() {
    LUMYN_DEVICE device = lumyn_CreateConnectorXAnimate();
    lumyn_Connect(device, "/dev/ttyACM0");
    
    // Play chase animation (red)
    lumyn_SetAnimation(
        device,
        "builtin-strip",
        LUMYN_ANIMATION_CHASE,
        255, 0, 0,  // Red
        40,         // Delay in milliseconds
        0,          // Don't reverse
        0           // Loop continuously
    );
    
    // Keep the connection alive
    sleep(10);
    
    lumyn_Disconnect(device);
    lumyn_ReleaseDevice(device);
    return 0;
}
```

### DirectLED (High-Frequency Updates)

```c
#include <lumyn/c/lumyn_sdk.h>
#include <stdint.h>
#include <string.h>

int main() {
    LUMYN_DEVICE device = lumyn_CreateConnectorXAnimate();
    lumyn_Connect(device, "/dev/ttyACM0");
    
    // Create DirectLED controller (60 LEDs)
    LUMYN_DIRECT_LED direct = lumyn_CreateDirectLED(device, "builtin-strip", 60);
    
    // Create RGB buffer (3 bytes per LED)
    uint8_t buffer[60 * 3];
    memset(buffer, 0, sizeof(buffer));
    
    // Set up a gradient: red to blue
    for (int i = 0; i < 60; ++i) {
        buffer[i * 3 + 0] = (i * 255) / 60;     // Red increases
        buffer[i * 3 + 1] = 0;                  // Green stays 0
        buffer[i * 3 + 2] = 255 - (i * 255) / 60; // Blue decreases
    }
    
    // Send to device
    lumyn_DirectLEDUpdate(direct, buffer, sizeof(buffer));
    
    // Cleanup
    lumyn_ReleaseDirectLED(direct);
    lumyn_Disconnect(device);
    lumyn_ReleaseDevice(device);
    return 0;
}
```

## C SDK Reference

### Error Codes

| Code | Name | Description |
|------|------|-------------|
| 0 | `LUMYN_OK` | Success |
| 1 | `LUMYN_ERR_INVALID_ARGUMENT` | Invalid argument |
| 2 | `LUMYN_ERR_INVALID_HANDLE` | Invalid device handle |
| 3 | `LUMYN_ERR_NOT_CONNECTED` | Device not connected |
| 4 | `LUMYN_ERR_TIMEOUT` | Operation timed out |
| 5 | `LUMYN_ERR_IO` | I/O error |
| 6 | `LUMYN_ERR_INTERNAL` | Internal error |
| 7 | `LUMYN_ERR_NOT_SUPPORTED` | Operation not supported |
| 8 | `LUMYN_ERR_PARSE` | Parse error |

### Struct-Based Device Lifecycle

```c
#include <lumyn/c/lumyn_sdk.h>

// Create device
cx_t cx;
lumyn_CreateConnectorX(&cx);

// Connect
lumyn_error_t err = lumyn_Connect(LUMYN_BASE_PTR(&cx), "COM3");
if (err != LUMYN_OK) {
    printf("Connection failed: %s\n", Lumyn_ErrorString(err));
}

// Use device...

// Cleanup
lumyn_DestroyConnectorX(&cx);
```

### Version Information

```c
const char* version = lumyn_GetVersion();      // e.g., "4.1.0"
int major = lumyn_GetVersionMajor();           // Protocol version
int minor = lumyn_GetVersionMinor();
int patch = lumyn_GetVersionPatch();
```

## Complete Example (C++)

A complete example demonstrating multiple features:

```cpp
#include <lumyn/device/ConnectorXAnimate.hpp>
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    try {
        // Create and connect
        lumyn::device::ConnectorXAnimate device;
        
        if (!device.Connect("/dev/ttyACM0")) {
            std::cerr << "Failed to connect to device" << std::endl;
            return 1;
        }
        
        std::cout << "Connected to device!" << std::endl;
        
        // Set initial color
        device.SetColor("builtin-strip", 255, 0, 0);
        std::this_thread::sleep_for(std::chrono::seconds(2));
        
        // Play animation
        device.SetAnimation(
            "builtin-strip",
            lumyn::animation::Type::RAINBOW_ROLL,
            {0, 0, 0},
            40,
            false,
            false
        );
        
        // Run for 10 seconds
        std::this_thread::sleep_for(std::chrono::seconds(10));
        
        // DirectLED example
        auto direct = device.GetDirectLED("builtin-strip", 60);
        std::vector<uint8_t> buffer(60 * 3);
        
        for (int frame = 0; frame < 100; ++frame) {
            for (int i = 0; i < 60; ++i) {
                int hue = (i + frame) % 60;
                buffer[i * 3 + 0] = (hue < 20) ? 255 : (hue < 40) ? 0 : 128;
                buffer[i * 3 + 1] = (hue < 20) ? 0 : (hue < 40) ? 255 : 128;
                buffer[i * 3 + 2] = (hue < 20) ? 0 : (hue < 40) ? 0 : 255;
            }
            direct->Update(buffer);
            std::this_thread::sleep_for(std::chrono::milliseconds(30));
        }
        
        device.Disconnect();
        std::cout << "Disconnected" << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}
```

## Error Handling

### C++

```cpp
#include <lumyn/device/ConnectorXAnimate.hpp>

try {
    lumyn::device::ConnectorXAnimate device;
    if (!device.Connect("/dev/ttyACM0")) {
        throw std::runtime_error("Connection failed");
    }
    device.SetColor("builtin-strip", 255, 0, 0);
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
}
```

### C

```c
#include <lumyn/c/lumyn_sdk.h>
#include <stdio.h>

LUMYN_DEVICE device = lumyn_CreateConnectorXAnimate();
if (!lumyn_Connect(device, "/dev/ttyACM0")) {
    fprintf(stderr, "Connection failed\n");
    lumyn_ReleaseDevice(device);
    return 1;
}

if (!lumyn_SetColor(device, "builtin-strip", 255, 0, 0)) {
    fprintf(stderr, "Failed to set color\n");
}

lumyn_Disconnect(device);
lumyn_ReleaseDevice(device);
```

## Next Steps

- [Connecting to Devices](connecting-to-devices) - USB, UART, port selection
- [LED Animations](led-animations) - Animation types, sequences, timing
- [LED Matrices](led-matrices) - Matrix control, text, images
- [DirectLED](directled) - High-frequency per-pixel control
- [Device Configuration](device-configuration) - Configuration management
- [Modules & Sensors](modules-and-sensors) - ConnectorX module support (C++ only)

## Troubleshooting

### Linking Errors

Make sure you're linking against the library:

**CMake:**
```cmake
target_link_libraries(your_target lumyn)
```

**Manual:**
```bash
g++ -o program program.cpp -I/path/to/sdk/include -L/path/to/sdk/lib -llumyn
```

### Connection Failed

- **Check port name**: Use `lsof -i :*` (macOS) or `ls /dev/tty*` (Linux) to find the port
- **Check permissions**: On Linux, add your user to dialout: `sudo usermod -a -G dialout $USER`
- **Reset device**: Power cycle the device and try again

### Build Errors

- **Missing headers**: Ensure `LUMYN_SDK_PATH` is set correctly in CMakeLists.txt
- **Library not found**: Check that the lib directory exists and contains the compiled libraries
- **Platform mismatch**: Ensure you downloaded the SDK for your platform (Windows/Linux/macOS)
