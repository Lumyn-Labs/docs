---
hide-toc: true
---

# Programming Guide

Learn how to control Lumyn Labs devices from your robot code using our powerful WPILib vendor library. This guide covers everything from installation to advanced features, with practical examples to get you started quickly.

## Where to Start

**New to the API?** Start with [Installing the Library](installing-the-library-vendordep) to add the vendordep to your project, then jump to [Basic API Usage](basic-api-usage) to learn the fundamentals.

**Ready to build?** See the [Basic API Usage](basic-api-usage) page for code examples and common patterns.

## Guide Overview

### Installing the Library (vendordep)

**When to use**: Setting up a new project or updating to the latest version.

Learn how to add the Lumyn Labs vendor library to your WPILib project using the WPILib Vendor Dependencies tool or manual installation. Includes firmware compatibility information and setup instructions.

### Basic API Usage

**When to use**: Learning how to connect to devices and control LEDs.

Comprehensive guide covering device connection, LED control (colors, animations, sequences, image sequences, text), zones and groups, and development tools like simulation and debugging. This is your primary reference for day-to-day API usage.

**Covers:**
- Connecting to devices
- Setting colors and animations
- Using animation and image sequences
- Displaying text on matrices
- Simulation (SimGUI) integration
- Debugging features

### Advanced API Features

**When to use**: You need event handling, module integration, device configuration, or system commands.

Deep dive into advanced features including event handling (callbacks and polling), module registration and data handling, loading and requesting device configurations, and system commands like device restart.

**Covers:**
- Event handling (Java callbacks, C++ callbacks and polling)
- Module registration and data extraction
- Device configuration APIs
- System commands (restart device)

## Quick Reference

**Common Tasks:**
- **Connect to device**: See [Basic API Usage](basic-api-usage) → Connect to a Device
- **Set LED color**: See [Basic API Usage](basic-api-usage) → Set a Color
- **Play animation**: See [Basic API Usage](basic-api-usage) → Set an Animation
- **Handle events**: See [Advanced API Features](advanced-api-features) → Event Handling
- **Use modules**: See [Advanced API Features](advanced-api-features) → Modules

```{toctree}
:maxdepth: 1
:hidden:

installing-the-library-vendordep
basic-api-usage
advanced-api-features
```
