---
hide-toc: true
---

# Zones and Zone Groups

Zones divide a channel into independently controllable sections; groups let you control multiple zones together.

## LED Channels

Once your device is set up, open it from the Devices list to access its configuration. Use the **LED Channels** page in the left sidebar to configure channels, zones, and groups.

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
