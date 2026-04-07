---
hide-toc: true
---

# User Guide

This section walks through the Lumyn Studio UI and core workflows. Learn how to configure your devices, create LED animations, integrate sensors, and manage your configurations.

## Where to Start

**New to Lumyn Studio?** Start with [Getting Started with Lumyn Studio](getting-started-with-lumyn-studio) for the interface, connecting your first device, and initial setup. From there, use [Zones and Zone Groups](zones-and-zone-groups) to add LED channels, zones, and groups.

## Guide Overview

### Setup & Configuration

Configure hardware layout and I/O before you create animations.

#### [Getting Started with Lumyn Studio](getting-started-with-lumyn-studio)

**When to use**: First time using Lumyn Studio or you need to understand the interface.

Learn how to access Lumyn Studio, navigate the interface, connect to your device, and create your first configuration. Covers tabs, the Connected Device Panel, and initial device setup.

#### [Zones and Zone Groups](zones-and-zone-groups)

**When to use**: You need to divide channels into sections or control multiple zones together.

Create zones on a channel and groups that control multiple zones at once. Essential for complex LED setups.

#### [Modules](modules)

**When to use**: Adding sensors or I/O expansion to your ConnectorX device.

Browse official modules, add modules to your configuration, and create custom modules. Covers finding, configuring, and integrating modules.

### Creating Content

Build what appears on your LEDs.

#### [Animation Sequences](animation-sequences)

**When to use**: Creating LED strip animations or animation sequences.

Combine built-in animations (Blink, Chase, Fire, Confetti, Plasma, etc.) into sequences with timing and parameters.

#### [Image Sequences (Matrix)](image-sequences-matrix)

**When to use**: Working with LED matrices and need images or motion graphics.

Import images or GIFs, or start from a blank canvas. Create keyframe-animated sequences with vector shapes, text, and images in the Motion Editor.

### Managing & Deploying

Run the app day-to-day and get configurations onto hardware.

#### [Device Settings & Management](device-settings-and-management)

**When to use**: Managing connections, viewing logs, sending test commands, or changing Studio settings.

Use the Connected Device Panel for events, module data, LED Commander, and logs. Adjust team number, cache refresh, and optional developer settings (debug mode and experiments) from the Settings tab.

#### [Saving & Exporting Configurations](saving-and-exporting-configurations)

**When to use**: Ready to deploy your configuration or share it with your team.

Export JSON or zip (with assets), use Send to Device when supported, or copy files to the microSD card.

## Key Concepts

A quick glossary of common terms used throughout the docs and Lumyn Studio:

- **Device**: A Lumyn Labs controller such as ConnectorX or ConnectorX Animate.
- **Configuration**: The saved settings and assets for a device (channels, zones, groups, modules, sequences, images). Exported as config.json plus optional image folders.
- **Channel**: A physical LED output on the device. ConnectorX has one; ConnectorX Animate has four.
- **Zone**: A logical subsection of a channel you can control independently (Strip Zone or Matrix Zone).
- **Strip Zone**: A linear sequence of LEDs.
- **Matrix Zone**: A 2D grid of LEDs, used with image sequences and text.
- **Group**: A collection of zones controlled together.
- **Animation**: A built-in effect (for example Blink, Chase, Fire, Confetti, Plasma, Heartbeat). Lumyn Studio includes 26 built-in animations.
- **Animation Sequence**: An ordered list of animations with timings and parameters.
- **Image Sequence**: A timeline-based animation of vector shapes, text, and images, rendered as frames for a matrix zone.
- **Module**: An extension providing data or behavior via I2C/SPI/UART/digital/analog.
- **Brightness Auto**: Device-managed brightness based on LED count and power constraints.

## Common Workflows

**Setting up a new device:**
1. [Getting Started with Lumyn Studio](getting-started-with-lumyn-studio) → Connect device and create channels/zones
2. [Animation Sequences](animation-sequences) or [Image Sequences](image-sequences-matrix) → Create content
3. [Saving & Exporting Configurations](saving-and-exporting-configurations) → Deploy to device

**Adding sensors:**
1. [Modules](modules) → Browse and add modules
2. [Device Settings & Management](device-settings-and-management) → Monitor module data

**Creating complex LED effects:**
1. [Zones and Zone Groups](zones-and-zone-groups) → Organize your LEDs
2. [Animation Sequences](animation-sequences) → Create sequences
3. [Image Sequences (Matrix)](image-sequences-matrix) → Create matrix content

```{toctree}
:caption: Setup & Configuration
:maxdepth: 1
:hidden:

getting-started-with-lumyn-studio
zones-and-zone-groups
modules
```

```{toctree}
:caption: Creating Content
:maxdepth: 1
:hidden:

animation-sequences
image-sequences-matrix
```

```{toctree}
:caption: Managing & Deploying
:maxdepth: 1
:hidden:

device-settings-and-management
saving-and-exporting-configurations
```
