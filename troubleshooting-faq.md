---
hide-toc: true
---

# Troubleshooting & FAQ

Find solutions to common issues and answers to frequent questions. This guide helps you diagnose problems and get the support you need.

## Troubleshooting Guide

### Unable to Connect Using Lumyn Studio

#### 1. Verify the Device Has Fully Booted

- RGB LED should breathe blue when ready.
- If not, power-cycle the device. If running custom firmware, try flashing official firmware (see [Flashing Official Firmware](#flashing-official-firmware) below).

#### 2. Check Your USB Cable

- Ensure the cable supports data, not just charging.
- In your OS device list, the device should appear under serial/COM interfaces.

If the device is not listed, try a different USB cable.

#### 3. Update Lumyn Studio

- Force refresh with CTRL+F5 to ensure the latest version is loaded.

#### 4. Install Correct USB Drivers (Windows)

- Download and run [Zadig](https://zadig.akeo.ie/)
- Options > List All Devices
- Select TinyUSB Serial Interface 0
- Install USB CDC driver, then reconnect the device.

---

### Device Freezes with Solid Teal LED on Boot

If your device's status LED turns solid teal and freezes during boot, this is a known issue.

#### Resolution

1. Unplug and replug the device, or press the RST/RESET button to restart.
2. The device should boot normally and the LED will breathe blue when ready.

If the issue persists after multiple restarts, please email us at [support@lumynlabs.com](mailto:support@lumynlabs.com) with your device configuration file and steps to reproduce the issue.

---

### LED Strip or Matrix Not Responding

#### 1. Verify the microSD Card

- Format as FAT32 only. exFAT/NTFS are not supported.

#### 2. Verify the Configuration File

- Ensure the exported configuration JSON is correct and located on the microSD root as config.json.
- For image sequences, export with assets and copy the folders to the microSD root.

---

### Configuration File Reference

Reference for the JSON structure used by Lumyn Studio device exports.

A minimal example:

```json
{
  "team": null,
  "network": { "mode": "USB" },
  "channels": {},
  "sequences": [],
  "bitmaps": [],
  "sensors": [],
  "groups": []
}
```

#### Configuration File Structure

- **channels**: Per-channel definitions, including zones and groups. Each channel defines the physical LED configuration and contains one or more zones.
- **sequences**: Animation sequence metadata used by zones/groups. Defines ordered lists of animations with timing and parameters.
- **bitmaps**: Image sequence descriptors for matrix zones. References image files stored in the deploy directory.
- **sensors**: Module wiring/configuration. Defines how modules are connected and configured on the device.
- **groups**: Collections of zones for synchronized control. Allows you to control multiple zones together with a single command.

The configuration file is typically exported from Lumyn Studio and placed in your robot project's `deploy/` directory. The device loads this configuration at startup, and your robot code references zones, groups, and modules by their names as defined in this file.

---

#### 3. Confirm the Device is Receiving 12V Power

- +12V IN to positive, GND to ground.
- Do not power the LED strip/matrix separately; the device regulates 5V for LEDs.
- FRC: Power from PDP/PDH, not VRM.

#### 4. Ensure Proper LED Connection

- +5V to +5V, GND to GND, data to DATA.

#### 5. Test with a Different LED Strip or Matrix

- ConnectorX/Animate support WS2812B-only. Try a known-good strip/matrix.

---

### Flashing Official Firmware

#### 1. Download Firmware

Download the latest `firmware.uf2` for your device from our [GitHub Releases page](https://github.com/Lumyn-Labs/Releases/releases).

#### 2. Enter Bootloader Mode

1. Connect device via USB and wait for boot.
2. Hold BOOT/BOOTSEL.
3. Press and release RESET.
4. Release BOOT/BOOTSEL.

The device will mount as a removable drive.

#### 3. Flash the Firmware

- Drag-and-drop firmware.uf2 onto the mounted drive. The device flashes and restarts automatically.

---

## Frequently Asked Questions

### Why can't Lumyn Studio find my device?

- Use a Chromium-based browser that supports Web Serial.
- Try a different USB cable that supports data.
- Install drivers on Windows (see [Troubleshooting Guide](#troubleshooting-guide) above).

### My LEDs don't light up. What should I check?

- Ensure microSD is FAT32 and config.json is in the root.
- Verify +12V IN and GND wiring; device regulates 5V for LEDs.
- Confirm DATA to the correct pin, and try a known-good WS2812B strip/matrix.

### How do I export and deploy a configuration?

- Export from Devices > Export Configuration.
- Optionally include image assets to get a zip with folders.
- Copy config.json (and any image folders) to the microSD root.

### What LED types are supported?

- ConnectorX and ConnectorX Animate support WS2812B LEDs.

### Where do I get firmware or drivers?

- See [Drivers and Firmware](drivers-and-firmware) for firmware flashing steps and driver links.

---

## Common Issues Quick Reference

**Device won't connect:**
1. Check [Unable to Connect Using Lumyn Studio](#unable-to-connect-using-lumyn-studio) section above
2. Verify USB cable supports data transfer
3. Install drivers on Windows (see [Drivers and Firmware](drivers-and-firmware))

**LEDs not working:**
1. Check [LED Strip or Matrix Not Responding](#led-strip-or-matrix-not-responding) section above
2. Verify microSD card is FAT32 formatted
3. Ensure config.json is in microSD root
4. Check power and data wiring

**Configuration not loading:**
1. Verify config.json is in microSD root (not in a subfolder)
2. Check file format is valid JSON
3. Ensure image sequences are in correct folders if used
4. See [Saving & Exporting Configurations](user-guide/saving-and-exporting-configurations)

**Need to update firmware:**
1. See [Drivers and Firmware](drivers-and-firmware)
2. Check [Flashing Official Firmware](#flashing-official-firmware) section above

---

## Support & Contact Information

Need help? Try these options:

- **Documentation**: Browse this site's [User Guide](user-guide/index), [Programming Guide](programming-guide/index), and [Troubleshooting & FAQ](troubleshooting-faq) sections.
- **Email**: [support@lumynlabs.com](mailto:support@lumynlabs.com)

For urgent hardware issues, include:

- Device model and firmware version
- OS and browser versions
- Steps to reproduce and screenshots/logs

We aim to respond within 2–3 business days.

