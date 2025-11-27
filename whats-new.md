---
hide-toc: true
---

# What's New in 2026

Welcome to the next generation of the Lumyn Labs software ecosystem! For 2026, we've rebuilt our entire software stack from the ground up based on your feedback to be faster, more powerful, and easier to use.

This massive free update is focused on three key areas: a more powerful **Vendordep** for robot code, a smarter **Lumyn Studio** for configuration, and a faster, simpler **Firmware** experience.

```{warning}
**2026 Beta Vendordep**: The 2026 beta vendordep is not yet available and is waiting on the FRC 2026 WPILib beta release. The feature list below is still in flux and will continue to evolve during the beta period. None of these features are guaranteed to be included in the final release.
```

## Key Features

### 1. Vendordep & Simulation Upgrades

- **Full SimGUI Integration**: We are the first FRC vendor to offer a custom GUI inside of WPILib's SimGUI. Visualize animations, test commands, and inject fake sensor data without a physical robot.

- **Modern "Builder" API**: A new, intuitive builder-style syntax for setting animations, image sequences, and parameters in Java and C++. The legacy API is deprecated and will be removed in 2027.

::::{tab-set}
:::{tab-item} Java
```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import com.lumynlabs.domain.led.Animation;

// Sets a gold chase animation on the "left-climber" zone
cXAnimate.leds.SetAnimation(Animation.Chase)
  .ForZone("left-climber")
  .WithColor(new Color(200, 120, 15))
  .WithDelay(Units.Milliseconds.of(40))
  .Reverse(false)
  .RunOnce(false);
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/led/Animation.h>
#include <units/time.h>

// Sets a gold chase animation on the "left-climber" zone
m_animate.SetAnimation(lumyn::led::Animation::Chase)
  .ForZone("left-climber")
  .WithColor({200.0/255.0, 120.0/255.0, 15.0/255.0})
  .WithDelay(40_ms)
  .Reverse(false)
  .RunOnce(false);
```
:::
::::
- **NetworkTables Integration**: All device states are automatically published to NetworkTables for easier debugging.
- **Persistent Alerts**: Get clear, actionable [persistent alerts](https://frcdocs.wpi.edu/en/latest/docs/software/telemetry/persistent-alerts.html) directly in the Driver Station via NetworkTables.
- **Modules V2**: A new push-pull architecture supporting arbitrary-length data with automatic background polling.

::::{tab-set}
:::{tab-item} Java
```java
// Register a module callback - data is automatically polled in the background
cX.modules.RegisterModule("test-dio", (data) -> {
    DigitalInputPayload payload = new DigitalInputPayload();
    try {
        ModuleHandler.ExtractData(payload, data);
        System.out.println("State: " + payload.state);
    } catch (Exception e) {
        System.out.println("Error parsing data: " + e);
    }
});
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/modules/DigitalInputModule.h>

// Register a module callback - data is automatically polled in the background
m_cx.RegisterModule("test-dio", [this](const lumyn::internal::ModuleData::ModuleDataEntry &data) {
    DigitalInputPayload payload;
    m_cx.ExtractFromPayload<DigitalInputPayload>(&data, payload);
    std::cout << "Got new data: " << payload.state << std::endl;
});
```
:::
::::
- **Device Configuration API**: Load configurations from deploy directory for simulation, and request full device configurations programmatically.

::::{tab-set}
:::{tab-item} Java
```java
import com.lumynlabs.domain.config.LumynDeviceConfig;

// Load configuration from deploy directory (for simulation)
LumynDeviceConfig cfg = cXAnimate.LoadConfigurationFromDeploy("lumyn_config.json");
if (cfg != null) {
    cXAnimate.ApplyConfiguration(cfg);
}

// Request full configuration from connected device
byte[] configBytes = cXAnimate.RequestConfigFull();
```
:::
:::{tab-item} C++
```cpp
#include <lumyn/configuration/LumynDeviceConfig.h>

// Load configuration from deploy directory (for simulation)
auto config = m_cx.LoadConfigurationFromDeploy("lumyn_config.json");
if (config) {
    m_cx.ApplyConfiguration(*config);
}

// Request full configuration from connected device
auto deviceConfig = m_cx.RequestConfig();
if (deviceConfig) {
    std::cout << "Loaded " << deviceConfig->channels.size() << " channels" << std::endl;
}
```
:::
::::
- **System Commands**: Restart devices programmatically with configurable delays.

### 2. A Smarter Lumyn Studio

Our desktop configuration tool, Lumyn Studio, has also received a major overhaul. The new, snappier communications stack enables a host of new features to make setup and creativity effortless.

- **Configuration Sync**: When you connect a device, Studio now automatically syncs the configuration from the device. If a different configuration for that device is already saved in Studio, you'll be prompted to choose which version to keep.

```{image} assets/whats-new/new-config.png
:alt: New Studio Configuration Sync
:height: 190px
```

- **Direct Config Uploads**: You can now upload your configuration JSON directly to any connected device from within Studio. (We're still working on getting image assets to upload directly, but this is a huge step forward!)

```{image} assets/whats-new/config-uploads.png
:alt: Direct Config Uploads
:height: 447px
```

- **Redesigned LED Commander**: The LED testing utility now uses the configuration on your device to populate its options. It will also show a live preview of your animations, animation sequences, and image sequences as you send them.

```{image} assets/whats-new/led-commander.png
:alt: LED Commander
:height: 403px
```

- **Preview Image Sequences at Size**: Once added to a device config, preview your image sequences at the resolution of the LED Matrix they will display on.

```{image} assets/whats-new/bing-chilling.png
:alt: Preview Image Sequences at Size
:height: 438px
```

### 3. Faster Firmware

- **Performance & Stability**: Our fastest and most stable firmware yet.

Our V2 firmware is packed with 13 new, stunning animations. From "Fire" to "Plasma" to "Confetti," your robot has never been more expressive. Use the interactive widget below to try them out!

<iframe src="https://widgets.lumynlabs.com/animations-widget?default=fire" height="330" width="100%" frameborder="0" loading="lazy"></iframe>

## Future Roadmap

Looking beyond the 2026 release, we're planning additional features for future updates:

- **Python SDK**: A Python library with API parity to the WPILib Vendordep is in development.
- **Studio Enhancements**: We're planning an improved Image Sequence editor and more robust device management features.


