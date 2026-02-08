---
hide-toc: true
---

# Simulation

The WPILib vendordep integrates with WPILib's desktop simulator, allowing you to test your LED code on your development computer without connecting physical hardware. The simulator visualizes LED strips and matrices in real-time as your code runs.

```{note}
Simulation requires the Java/C++ WPILib vendordep. Python and standalone C/C++ SDKs do not support simulation.
```

## Quick Start

### 1. Load Configuration in robotInit

::::{tab-set}
:sync-group: language

:::{tab-item} Java
:sync: java

```java
@Override
public void robotInit() {
    m_cx.Connect(USBPort.kUSB1);
    m_cx.LoadConfigurationFromDeploy().ifPresent(m_cx::ApplyConfiguration);
}
```
:::

:::{tab-item} C++
:sync: cpp

```cpp
void Robot::RobotInit() {
    m_cx.Connect(lumyn::connection::USBPort::kUSB1);
    if (auto cfg = m_cx.LoadConfigurationFromDeploy()) {
        m_cx.ApplyConfiguration(*cfg);
    }
}
```
:::
::::

When you run the simulation GUI, a new window appears that visualizes your LED zones.

## Simulator Tabs

| Tab | Purpose |
| --- | ------- |
| **LEDs** | Real-time LED visualization for strips and matrices |
| **Modules** | Inject sensor data to test callbacks |
| **Device** | Simulate connection state and error events |

## Injecting Module Data

Test sensor-driven logic without hardware:

1. Open the **Modules** tab
2. Find your module (e.g., `DigitalInput`)
3. Set the value and click **Inject**
4. Your code receives the data

## Image Sequences

Place image folders in `deploy/connectorx/<sequenceId>/` with files named `0.bmp`, `1.bmp`, etc.

## Troubleshooting

| Problem | Solution |
| ------- | -------- |
| No zones visible | Call `ApplyConfiguration()` in `robotInit()` |
| Modules tab empty | Ensure modules are in your config file |
| Images don't display | Check folder path and file naming |
