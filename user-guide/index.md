---
hide-toc: true
---

# User Guide

This section walks through the Lumyn Studio UI and core workflows. Learn how to configure your devices, create LED animations, integrate sensors, and manage your configurations.

## Where to Start

**New to Lumyn Studio?** Start with [Getting Started with Lumyn Studio](getting-started-with-lumyn-studio) to learn the interface and connect your first device.

**Ready to configure LEDs?** Begin with [Getting Started with Lumyn Studio](getting-started-with-lumyn-studio) to learn the interface and set up your LED channels and zones.

## Guide Overview

### Getting Started with Lumyn Studio

**When to use**: First time using Lumyn Studio or need to understand the interface.

Learn how to access Lumyn Studio, navigate the interface, connect to your device, and create your first configuration. This page covers the basics of the Studio interface, including tabs, the Connected Device Panel, and initial device setup.


### Zones and Zone Groups

**When to use**: Need to divide channels into sections or control multiple zones together.

Learn how to create zones that divide a channel into independently controllable sections, and how to create groups that let you control multiple zones simultaneously. Essential for complex LED setups where different parts of your robot need different animations.

### Animations & Sequences

**When to use**: Creating LED strip animations or animation sequences.

Create and edit animation sequences for LED strips. Learn how to combine multiple animations (Blink, Chase, Rainbow, etc.) into sequences with timing and parameters. Perfect for creating dynamic lighting effects that respond to robot state.

### Image Sequences (Matrix)

**When to use**: Working with LED matrices and need to display images or animations.

Create image sequences for matrix zones by importing images, animated GIFs, or drawing directly on the canvas. Learn how to create frame-by-frame animations, text displays, and custom graphics for your matrix displays.

### Modules

**When to use**: Adding sensors or I/O expansion to your ConnectorX device.

Browse official modules and add modules to your device configuration. Modules extend your device's capabilities with sensors, digital I/O, and other hardware interfaces. Learn how to find, configure, and integrate modules into your robot.

### Device Settings & Management

**When to use**: Managing device connections, viewing logs, or configuring Studio settings.

Use the Connected Device Panel to monitor device events, view module values, send test commands, and access device logs. Also covers Studio-level settings like FRC team number and cache management.

### Saving & Exporting Configurations

**When to use**: Ready to deploy your configuration to hardware or share it with your team.

Learn how to export device configurations from Lumyn Studio, include image assets, and properly deploy configurations to your device's microSD card. Essential for getting your configuration onto your robot.

## Key Concepts

A quick glossary of common terms used throughout the docs and Lumyn Studio:

- **Device**: A Lumyn Labs controller such as ConnectorX or ConnectorX Animate.
- **Configuration**: The saved settings and assets for a device (channels, zones, groups, modules, sequences, images). Exported as config.json plus optional image folders.
- **Channel**: A physical LED output on the device. ConnectorX has one; ConnectorX Animate has four.
- **Zone**: A logical subsection of a channel you can control independently (Strip Zone or Matrix Zone).
- **Strip Zone**: A linear sequence of LEDs.
- **Matrix Zone**: A 2D grid of LEDs, used with image sequences and text.
- **Group**: A collection of zones controlled together.
- **Animation**: A built-in effect (Blink, Chase, Rainbow, etc.).
- **Animation Sequence**: An ordered list of animations with timings and parameters.
- **Image Sequence**: A sequence of images displayed on a matrix zone.
- **Module**: An extension providing data or behavior via I2C/SPI/UART/digital/analog.
- **Brightness Auto**: Device-managed brightness based on LED count and power constraints.

## Common Workflows

**Setting up a new device:**
1. [Getting Started with Lumyn Studio](getting-started-with-lumyn-studio) → Connect device and create channels/zones
2. [Animations & Sequences](animations-and-sequences) or [Image Sequences](image-sequences-matrix) → Create content
3. [Saving & Exporting Configurations](saving-and-exporting-configurations) → Deploy to device

**Adding sensors:**
1. [Modules](modules) → Browse and add modules
2. [Device Settings & Management](device-settings-and-management) → Monitor module values

**Creating complex LED effects:**
1. [Zones and Zone Groups](zones-and-zone-groups) → Organize your LEDs
2. [Animations & Sequences](animations-and-sequences) → Create sequences
3. [Image Sequences (Matrix)](image-sequences-matrix) → Create matrix content

```{toctree}
:maxdepth: 1
:hidden:

getting-started-with-lumyn-studio
zones-and-zone-groups
animations-and-sequences
image-sequences-matrix
modules
device-settings-and-management
saving-and-exporting-configurations
```
