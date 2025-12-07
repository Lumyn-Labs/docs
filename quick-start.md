---
hide-toc: true
---

# Quick Start Guide

Get your Lumyn Labs device up and running in minutes. This guide covers everything you need to know for first-time setup, from system requirements to your first LED configuration.

## System Requirements

Before you begin, ensure you have the following:

### Lumyn Studio

- **Browser**: A modern Chromium-based browser that supports the Web Serial API.
  - Google Chrome (version 89 or newer)
  - Microsoft Edge (version 89 or newer)
- **Operating System**: Any OS that can run the browsers listed above.
  - Windows 10 or 11
  - macOS
  - Linux

### Hardware

- **USB Cable**: A USB-A to USB-C or USB-C to USB-C cable that supports **data transfer**. Some cheaper cables are for charging only and will not work.
- **microSD Card**:
  - **Format**: FAT32
  - **Size**: 8GB or larger recommended.
  - The card must be formatted as FAT32 to be recognized by the device. exFAT and NTFS are not supported.
- **Power Supply**: A 12V power source, such as the FRC Power Distribution Hub (PDH) or Power Distribution Panel (PDP).

```{note}
**Power Requirements**: The 12V power supply is only required if you want to drive LEDs. To connect to Lumyn Studio and configure your device, you can power it over USB-C alone.
```

## First-Time Setup

Follow these steps to set up your ConnectorX or ConnectorX Animate for the first time.

### Step 1: Format the microSD Card

Before using your device, you must format your microSD card to **FAT32**.

- **Windows**: Use the official [SD Card Formatter](https://www.sdcard.org/downloads/formatter/) tool or the built-in Windows format utility. Ensure you select "FAT32" as the file system.
- **macOS**: Use the "Disk Utility" application. Select the SD card, click "Erase," and choose "MS-DOS (FAT)" as the format.
- **Linux**: Use `gparted` or the command line: `sudo mkfs.vfat -F 32 /dev/sdX` (replace `sdX` with your SD card device).

### Step 2: Connect Power and USB

1. Insert the formatted microSD card into your device.
2. Connect your device to your computer using a USB data cable.
3. **For LED control**: Connect your device to a 12V power source. For FRC robots, connect directly to a spare port on the PDH or PDP. **Note**: USB-C power alone is sufficient for connecting to Lumyn Studio and configuring your device.

### Step 3: Update Firmware

Before configuring your device, ensure you're running the latest firmware. Download the latest firmware from our [GitHub Releases page](https://github.com/Lumyn-Labs/Releases/releases) and follow the [Drivers and Firmware](drivers-and-firmware) guide to update.

### Step 4: Install Drivers (Windows Only)

```{note}
**Driver Installation**: You only need to install drivers if your device doesn't appear when you try to connect in Lumyn Studio. If you can see your device in the connection dialog, you can skip this step.
```

On Windows, you may need to install a driver to allow your browser to communicate with the device. See the [Drivers and Firmware](drivers-and-firmware) page for detailed instructions.

### Step 5: Access Lumyn Studio

Open your Chromium-based browser and navigate to [studio.lumynlabs.com](https://studio.lumynlabs.com).

The Studio interface is organized into tabs: Home, Devices, Modules, Animation Sequences, Image Sequences, and Settings. For a detailed overview, see [Getting Started with Lumyn Studio](user-guide/getting-started-with-lumyn-studio).

### Step 6: Connect to the Device

1. Wait for the device to boot. The onboard RGB LED will breathe blue when it's ready.
2. In Lumyn Studio, click the "Connect" button in the top-right corner.

```{image} assets/quickstart/connect-button.png
:alt: Click Connect Button in Lumyn Studio
```

3. In the dialog that shows up, click "Connect Device"

```{image} assets/quickstart/disconnected-connection-dialog.png
:alt: Click Connect in the Connected Device Panel
```

3. A dialog will appear listing available serial ports. Select your Lumyn Labs device from the list and click "Connect."

If you don't see your device, see the [Troubleshooting & FAQ](troubleshooting-faq) for help.

### Step 7: Create Your First Configuration

Once connected, Lumyn Studio will prompt you to set up a new device configuration. Give your device a name, and you're ready to start configuring channels, zones, and modules!

### Step 8: Configure LEDs

Create a channel and add a zone (Strip or Matrix). See: [Getting Started with Lumyn Studio](user-guide/getting-started-with-lumyn-studio)

### Step 9: Add Content

- **For strips**: Create an animation sequence. See: [Animations & Sequences](user-guide/animations-and-sequences)
- **For matrices**: Create an image sequence. See: [Image Sequences](user-guide/image-sequences-matrix)

### Step 10: Export and Deploy

- Export the configuration JSON and copy to the microSD root. See: [Saving & Exporting Configurations](user-guide/saving-and-exporting-configurations)
- Insert the microSD card into your device and power it on.

## Next Steps

Now that your device is set up, explore these resources:

- **[User Guide](user-guide/index)**: Learn how to use Lumyn Studio to configure your device
- **[Programming Guide](programming-guide/index)**: Control your device from robot code

## Troubleshooting

Having trouble? Check out:

- **[Troubleshooting & FAQ](troubleshooting-faq)**: Common issues and solutions
- **[Drivers and Firmware](drivers-and-firmware)**: Windows driver installation and firmware updates
