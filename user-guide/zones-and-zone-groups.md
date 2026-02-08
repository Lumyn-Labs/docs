---
hide-toc: true
---

# Zones and Zone Groups

Zones divide a channel into independently controllable sections; groups let you control multiple zones together.

## The Devices Tab

The Devices tab shows your device and its configuration overview, including channels, sequences, and modules. You can export the configuration from here.

Left-side navigation:

- Configuration: Overview of the device plus channels, sequences, and modules.
- LED Channels: Configure channels, zones, and groups.
- Modules: View and edit modules added to the device.
- Animation Sequences: Preview and edit sequence assets on the device.
- Image Sequences: Preview and edit image sequences on the device.
- Information: Device variant details and rename.

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
- Length: Number of LEDs on the channel.
- Brightness: Fixed value or Auto for automatic power-aware brightness.

```{tip}
For power reasons, a single channel supports up to 320 LEDs. For more LEDs, consider ConnectorX Animate (four channels, up to 1280 LEDs total).
```

```{image} ../assets/lumyn-studio/getting-started/channel-creation.png
:alt: Channel Creation
```

## Zones

Click Set up a new zone and choose the zone type:

- Strip Zone: Linear section of LEDs.
- Matrix Zone: 2D grid of LEDs.

```{image} ../assets/lumyn-studio/getting-started/zone-type.png
:alt: Zone Type Selection
```

Configure the zone ID and brightness, then continue:

```{image} ../assets/lumyn-studio/getting-started/strip-zone-step-1.png
:alt: Zone Creation
```

Set length and whether the zone is reversed. Reversed zones index LEDs in the opposite direction.

```{image} ../assets/lumyn-studio/getting-started/strip-zone-step-2.png
:alt: Zone Configuration
```

Reorder zones via drag-and-drop. Create additional zones as needed.

## Groups

Create groups to control multiple zones together. Groups can span zones on the same channel, allowing you to synchronize animations across multiple zones with a single command.

1. In LED Channels, open Groups.
2. Create a group and add zones to it.
3. Use groups to apply animations or commands to multiple zones at once.
