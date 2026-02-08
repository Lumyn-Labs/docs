---
hide-toc: true
---

# Connecting to Devices

This page covers how to establish connections to Lumyn Labs devices, handle events, and manage device status across all SDKs.

## Connection Methods

### USB Connection

All devices support USB connections. This is the most common connection method.

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.devices.ConnectorX;
import com.lumynlabs.connection.usb.USBPort;

ConnectorXAnimate cXAnimate = new ConnectorXAnimate();
ConnectorX cX = new ConnectorX();

// Connect to roboRIO USB ports
boolean animateConnected = cXAnimate.Connect(USBPort.kUSB1);
boolean cxConnected = cX.Connect(USBPort.kUSB2);

// Check connection status
if (animateConnected) {
    System.out.println("Device connected!");
}
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/device/ConnectorXAnimate.h>
#include <lumyn/connection/USBPort.h>

lumyn::device::ConnectorX m_cx;
lumyn::device::ConnectorXAnimate m_animate;

// Connect to roboRIO USB ports
bool animateConnected = m_animate.Connect(lumyn::connection::USBPort::kUSB1);
bool cxConnected = m_cx.Connect(lumyn::connection::USBPort::kUSB2);
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone

```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/device/ConnectorXAnimate.h>
#include <iostream>

lumyn::device::ConnectorX m_cx;
lumyn::device::ConnectorXAnimate m_animate;

// Connect via serial port
bool animate_connected = m_animate.Connect("/dev/ttyACM0");    // Linux
bool cx_connected = m_cx.Connect("COM3");                       // Windows

if (animate_connected) {
    std::cout << "Device connected!" << std::endl;
}
```
:::
:::{tab-item} Python
:sync: python

```python
from lumyn_sdk import ConnectorX, ConnectorXAnimate

cx_animate = ConnectorXAnimate()
cx = ConnectorX()

# Connect by port name
animate_connected = cx_animate.connect("COM3")      # Windows
cx_connected = cx.connect("/dev/ttyACM0")           # Linux

if animate_connected:
    print("Device connected!")
```
:::

:::{tab-item} C
:sync: c

```c
#include <lumyn/c/lumyn_sdk.h>

cx_animate_t cx;
lumyn_CreateConnectorXAnimate(&cx);

lumyn_error_t err = lumyn_Connect(LUMYN_BASE_PTR(&cx), "COM3");
if (err == LUMYN_OK) {
    printf("Device connected!\n");
}
```
:::
::::

### UART Connection (ConnectorX Only)

ConnectorX supports UART connections for scenarios where USB isn't available. ConnectorXAnimate is USB-only.

::::{tab-set}
:sync-group: language

:::{tab-item} Java (WPILib)
:sync: java

```java
import com.lumynlabs.devices.ConnectorX;
import com.lumynlabs.connection.uart.UARTPort;

ConnectorX cX = new ConnectorX();

// UART connection with default baud rate (115200)
boolean connected = cX.Connect(UARTPort.MXP);

// UART connection with custom baud rate
boolean fastConnected = cX.Connect(UARTPort.MXP, 230400);
```
:::
:::{tab-item} C++ (WPILib)
:sync: cpp

```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/connection/UARTPort.h>

lumyn::device::ConnectorX m_cx;

// UART connection with default baud rate (115200)
bool connected = m_cx.Connect(lumyn::connection::UARTPort::kMXP);

// UART connection with custom baud rate
bool fastConnected = m_cx.Connect(lumyn::connection::UARTPort::kMXP, 230400);
```
:::
:::{tab-item} C++ (Standalone)
:sync: cpp-standalone

```cpp
#include <lumyn/device/ConnectorX.h>
#include <iostream>

lumyn::device::ConnectorX m_cx;

// UART connection with default baud rate (115200)
bool connected = m_cx.Connect("/dev/ttyS0");

// UART connection with custom baud rate
bool fast_connected = m_cx.Connect("/dev/ttyS0", 230400);

if (connected) {
    std::cout << "Connected to UART device" << std::endl;
}
```
:::
:::{tab-item} Python
```python
from lumyn_sdk import ConnectorX

cx = ConnectorX()

# UART connection with default baud rate (115200)
connected = cx.connect_uart("/dev/ttyS0")

# UART connection with custom baud rate
fast_connected = cx.connect_uart("/dev/ttyS0", 230400)
```
:::
:::{tab-item} C
```c
#include <lumyn/c/lumyn_sdk.h>

cx_t cx;
lumyn_CreateConnectorX(&cx);

// UART connection with custom baud rate
lumyn_error_t err = lumyn_ConnectWithBaud(LUMYN_BASE_PTR(&cx), "/dev/ttyS0", 230400);
```
:::
::::

### Resource Cleanup

Always close connections when done, especially in non-robot applications.

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
// Option 1: Manual close
cXAnimate.Close();

// Option 2: Try-with-resources (recommended)
try (ConnectorXAnimate cXAnimate = new ConnectorXAnimate()) {
    cXAnimate.Connect(USBPort.kUSB1);
    // Use the device...
}  // Automatically closed here
```
:::
:::{tab-item} C++ (WPILib)
```cpp
// C++ destructors handle cleanup automatically
// Just let the object go out of scope
```
:::
:::{tab-item} Python
```python
# Manual close
cx.close()

# Or use context manager (when available)
# The destructor will also clean up if you forget
```
:::
:::{tab-item} C
```c
// Must explicitly destroy the device
lumyn_DestroyConnectorXAnimate(&cx);
// or
lumyn_DestroyConnectorX(&cx);
```
:::
::::

## Event Handling

Devices emit events to report state changes. Use these to respond to connections, disconnections, errors, and other conditions.

### Event Types

| Event | Description |
|-------|-------------|
| `BeginInitialization` | Device starting up |
| `FinishInitialization` | Device ready |
| `Enabled` | Device enabled |
| `Disabled` | Device disabled |
| `Connected` | Connection established |
| `Disconnected` | Connection lost |
| `Error` | Recoverable error |
| `FatalError` | Non-recoverable error |
| `RegisteredEntity` | Module/zone registered |
| `Custom` | User-defined event |
| `PinInterrupt` | GPIO pin state change |
| `HeartBeat` | Keep-alive signal |

### Registering Event Handlers

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import com.lumynlabs.domain.event.Event;

// Register an event handler
cXAnimate.AddEventHandler((e) -> {
    switch (e.type) {
        case Connected:
            System.out.println("Device connected!");
            break;
        case Disconnected:
            System.out.println("Device disconnected!");
            break;
        case Error:
            System.out.println("Error: " + e.extraMessage);
            break;
        default:
            System.out.println("Event: " + e.type);
    }
});
```
:::
:::{tab-item} C++ (WPILib)
```cpp
#include <lumyn/device/ConnectorX.h>
#include <iostream>

m_cx.AddEventHandler([](const lumyn::internal::Eventing::Event& event) {
    switch (event.header.type) {
        case lumyn::internal::Eventing::EventType::Connected:
            std::cout << "Device connected!" << std::endl;
            break;
        case lumyn::internal::Eventing::EventType::Disconnected:
            std::cout << "Device disconnected!" << std::endl;
            break;
        case lumyn::internal::Eventing::EventType::Error:
            std::cout << "Error occurred" << std::endl;
            break;
        default:
            std::cout << "Event type: " << static_cast<int>(event.header.type) << std::endl;
    }
});
```
:::
:::{tab-item} Python
```python
from lumyn_sdk import ConnectorX, EventType
from lumyn_sdk.interfaces.i_event_callback import IEventCallback
from lumyn_sdk.domain.event.event import Event

class MyEventHandler(IEventCallback):
    def handle_event(self, event: Event) -> None:
        if event.type == EventType.Connected:
            print("Device connected!")
        elif event.type == EventType.Disconnected:
            print("Device disconnected!")
        elif event.type == EventType.Error:
            print(f"Error: {event.extra_message}")
        else:
            print(f"Event: {event.type}")

cx = ConnectorX()
cx.add_event_callback(MyEventHandler())
cx.connect_usb("COM3")
```
:::
:::{tab-item} C
```c
void my_event_handler(lumyn_event_t* evt, void* user) {
    printf("Event type: %d\n", evt->type);
}

lumyn_AddEventHandler(LUMYN_BASE_PTR(&cx), my_event_handler, NULL);
```
:::
::::

### Event Polling Modes

By default, events are polled automatically in a background thread. You can control this behavior:

**Auto Polling (default)**: Events are polled automatically and handlers are called on the background thread.

**Manual Polling**: Disable auto polling and call `PollEvents()` from your main loop.

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
// Disable auto polling before connecting
cXAnimate.SetAutoPollEvents(false);
cXAnimate.Connect(USBPort.kUSB1);

// In robotPeriodic or your main loop
@Override
public void robotPeriodic() {
    cXAnimate.PollEvents();  // Handlers run on this thread
}

// Get specific events
Optional<Event> latest = cXAnimate.GetLatestEvent();
List<Event> all = cXAnimate.GetEvents();  // Drains queue
```
:::
:::{tab-item} C++ (WPILib)
```cpp
// Disable auto polling before connecting
m_cx.SetAutoPollEvents(false);
m_cx.Connect(lumyn::connection::USBPort::kUSB1);

// In RobotPeriodic
void Robot::RobotPeriodic() {
    m_cx.PollEvents();
}

// Get specific events
auto latest = m_cx.GetLatestEvent();
auto all = m_cx.GetEvents();
```
:::
:::{tab-item} Python
```python
# Disable auto polling before connecting
cx.set_auto_poll_events(False)
cx.connect_usb("COM3")

# In your main loop
def main_loop():
    cx.poll_events_once()
```
:::
::::

### WPILib Alerts Integration

```{note}
WPILib alerts are only available in the Java/C++ vendordep.
```

The vendordep automatically publishes connection and error events as [WPILib persistent alerts](https://frcdocs.wpi.edu/en/latest/docs/software/telemetry/persistent-alerts.html). These appear in AdvantageScope, Shuffleboard, and the Driver Station.

```java
// Disable automatic alerts if you handle error reporting yourself
cXAnimate.SetAlertsEnabled(false);
```

```cpp
m_cx.SetAlertsEnabled(false);
```

## System Commands

### Restart Device

Restart a device from code—useful for error recovery or applying configuration changes.

::::{tab-set}
:::{tab-item} Java (WPILib)
```java
import edu.wpi.first.units.Units;

// Restart immediately
cXAnimate.RestartDevice(Units.Milliseconds.of(0));

// Restart after 1 second delay
cXAnimate.RestartDevice(Units.Seconds.of(1));
```
:::
:::{tab-item} C++ (WPILib)
```cpp
#include <units/time.h>

// Restart immediately
m_cx.RestartDevice(0_ms);

// Restart after 1 second delay
m_cx.RestartDevice(1_s);
```
:::
:::{tab-item} Python
```python
# High-level restart helper is not currently exposed in the Python wrapper.
# Use C / C++ / WPILib APIs for restart commands.
```
:::
:::{tab-item} C
```c
// Restart immediately
lumyn_RestartDevice(LUMYN_BASE_PTR(&cx), 0);

// Restart after 1 second (1000 ms)
lumyn_RestartDevice(LUMYN_BASE_PTR(&cx), 1000);
```
:::
::::

## Connection Reference

| Platform | USB Method | UART Method |
|----------|------------|-------------|
| Java | `Connect(USBPort)` | `Connect(UARTPort, baud)` |
| C++ | `Connect(USBPort)` | `Connect(UARTPort, baud)` |
| Python | `connect_usb(port_string)` | `connect_uart(port, baud)` |
| C | `lumyn_Connect(inst, port)` | `lumyn_ConnectWithBaud(inst, port, baud)` |

**Default Baud Rate**: 115200

**UART Support**: ConnectorX only (not ConnectorXAnimate)
