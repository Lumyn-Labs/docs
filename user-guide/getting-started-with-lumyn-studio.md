---
hide-toc: true
---

# Getting started with Lumyn Studio

To get started with Lumyn Studio, you'll need a Chromium-based browser, such as Chrome or Edge, and a Lumyn Labs device. You can explore most features without a device, but applying configurations requires hardware.

## Accessing Lumyn Studio

Open: [studio.lumynlabs.com](https://studio.lumynlabs.com)

## Interface overview

The Studio interface is organized into tabs:

- Devices: Lists saved devices and lets you view, edit, and export a device configuration.
- Modules: Browse official modules and read module API details.
- Animation Sequences: Create and manage LED strip animation sequences.
- Image Sequences: Create and manage LED matrix image sequences.
- Settings: Studio-level settings including FRC team number, the theme selector (Automatic / Light / Dark), network cache refresh, links to documentation and support.

The title bar shows the Lumyn Studio brand and version on the left, the five navigation tabs in the center, and the connected device link (when connected) and connection button on the right.

## Connecting to a device

```{note}
Connecting requires a Chromium-based browser that supports the Web Serial API. If connecting fails, try a different browser.
```

Connect your device via USB and wait for it to boot. Click the connection icon in the top-right of the navigation bar. In the dialog, click **Connect Device**, then select your Lumyn device from the serial port list. When connected, the Connected Device Panel opens.

```{note}
**Configuration sync**: Studio automatically reads your device configuration when you connect. If you have a different configuration saved in Studio for the same device, you'll be asked whether to keep the device's configuration or Studio's saved version. You'll also be notified if a new firmware version is available.
```

```{image} ../assets/lumyn-studio/getting-started/new-device.png
:alt: New Device
```

Click **Set Up This Device**, choose a setup mode (**Create new device** to name and create a new Studio entry, or **Associate existing** to link this hardware to an existing Studio device), then click **Create Device** or **Associate Device**.

```{image} ../assets/lumyn-studio/getting-started/new-config.png
:alt: Setting up a new device
```

To learn more about this panel, see [Device settings and management](device-settings-and-management).

Click outside the panel to explore the Devices tab.

## Device configuration page

The Devices tab shows your device and its configuration overview, including channels, sequences, and modules. You can export the configuration from here.

Left-side navigation:

- Configuration: Overview of the device plus channels, sequences, and modules.
- LED Channels: Configure channels, zones, and groups (shown when the device supports LEDs).
- Modules: View and edit modules added to the device (shown when the device supports modules).
- Animation Sequences: Preview and edit sequence assets on the device (shown when the device supports LEDs).
- Image Sequences: Preview and edit image sequences on the device (shown when the device supports LEDs).
- Information: Device variant, firmware version, serial number, rename, specifications, communication modes, and peripheral support.
- Back to Devices: Return to the device list.

```{image} ../assets/lumyn-studio/getting-started/configuration-overview.png
:alt: Configuration Overview
```

Your next step is to create LED channels and zones. See [Zones and zone groups](zones-and-zone-groups).

## Next steps

- Configure channels, zones, and groups: [Zones and zone groups](zones-and-zone-groups)
- Create your first sequence: [Animation sequences](animation-sequences)
- Build an LED matrix animation: [Image sequences](image-sequences-matrix)
- Add modules to extend your device: [Modules](modules)
- Learn more about device tabs and tools: [Device settings and management](device-settings-and-management)
- Save and deploy: [Saving and exporting configurations](saving-and-exporting-configurations)
