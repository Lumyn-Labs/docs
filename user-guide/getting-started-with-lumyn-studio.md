---
hide-toc: true
---

# Getting Started with Lumyn Studio

To get started with Lumyn Studio, you'll need a modern Chromium-based browser (Chrome, Edge, etc.) and a Lumyn Labs device. You can explore most features without a device, but applying configurations requires hardware.

## Accessing Lumyn Studio

Open: [studio.lumynlabs.com](https://studio.lumynlabs.com)

## Interface Overview

The Studio interface is organized into tabs:

- Home: Quick access to docs, support, and common actions.
- Devices: Lists connected devices and lets you view, edit, and export a device configuration.
- Modules: Browse official modules, create custom modules, and read module API details.
- Animation Sequences: Create and manage LED strip animation sequences.
- Image Sequences: Create and manage LED matrix image sequences.
- Settings: Studio-level settings such as FRC team number.

The title bar provides quick access to Home, Connect, and Settings.

## Connecting to a Device

```{note}
Connecting requires a Chromium-based browser that supports the Web Serial API. If connecting fails, try a different browser.
```

Connect your device via USB and wait for it to boot. Click Connect in the title bar and select your device. When connected, the Connected Device Panel opens.

With the 2026 update, Lumyn Studio now automatically syncs the configuration from your device when you connect. If a different configuration for that device is already saved in Studio, you'll be prompted to choose which version to keep. Lumyn Studio will also notify you if a new firmware version is available.

```{note}
**Configuration Sync**: Studio automatically reads your device configuration when you connect. If you have a different configuration saved in Studio for the same device, you'll be asked whether to keep the device's configuration or Studio's saved version.
```

```{image} ../assets/lumyn-studio/getting-started/new-device.png
:alt: New Device
:height: 400px
```

Click Set up my device, name your device, and click Add.

```{image} ../assets/lumyn-studio/getting-started/new-config.png
:alt: Setting up a new device
:height: 400px
```

To learn more about this panel, see [Device Settings & Management](device-settings-and-management).

Click outside the panel to explore the Devices tab.

## Next Steps

- Configure channels, zones, and groups: [Zones and Zone Groups](zones-and-zone-groups)
- Create your first sequence: [Animations & Sequences](animations-and-sequences)
- Build an LED matrix animation: [Image Sequences](image-sequences-matrix)
- Add modules to extend your device: [Modules](modules)
- Learn more about device tabs and tools: [Device Settings & Management](device-settings-and-management)
- Save and deploy: [Saving & Exporting Configurations](saving-and-exporting-configurations)
