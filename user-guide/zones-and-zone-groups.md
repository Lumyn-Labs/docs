---
hide-toc: true
---

# Zones and Zone Groups

Zones divide a channel into independently controllable sections; groups let you control multiple zones together.

## The Devices Tab

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

## LED Channels

Use LED Channels to configure channel length, zones, and groups.

```{image} ../assets/lumyn-studio/getting-started/led-channels.png
:alt: LED Channels Page
```

Create a channel by clicking an empty port and choosing Configure. Set:

- ID: Unique identifier used for direct control.
- Length: Number of LEDs on the channel (up to 320 per channel).
- Brightness: 1–255, or enable Auto Brightness for power-aware brightness.

```{tip}
For power reasons, a single channel supports up to 320 LEDs. For more LEDs, consider ConnectorX Animate (four channels, up to 1280 LEDs total).
```

```{image} ../assets/lumyn-studio/getting-started/channel-creation.png
:alt: Channel Creation
```

## Zones

Click **Set up a new Zone** and choose the zone type using the option tiles:

- Strip Zone: Linear section of LEDs.
- Matrix Zone: 2D grid of LEDs.

```{image} ../assets/lumyn-studio/getting-started/zone-type.png
:alt: Zone Type Selection
```

Configure the zone ID and brightness, then set the length and whether the zone is reversed.

```{image} ../assets/lumyn-studio/getting-started/strip-zone-dialog.png
:alt: Zone Creation
```

For matrix zones, the editor uses four tabs: **General**, **Dimensions**, **Origin**, and **Layout**.

Reorder zones via drag-and-drop (or use Shift+Up and Shift+Down on a keyboard). Create additional zones as needed.

## Groups

Create groups to control multiple zones together. Groups can span zones on the same channel, allowing you to synchronize animations across multiple zones with a single command.

1. In LED Channels, open **Groups** (the dedicated groups page for that device).
2. Click **Set up a new Animation Group**. Enter a group ID and select zones using the zone chips (all zones in a group must be the same type: strip or matrix).
3. Use groups to apply animations or commands to multiple zones at once.
