---
hide-toc: true
---

# Troubleshooting & FAQ

Find solutions to common issues and answers to frequent questions. This guide helps you diagnose problems and get the support you need.

## Troubleshooting guide

### Unable to connect using Lumyn Studio

#### 1. Verify the device has fully booted

- RGB LED should breathe blue when ready.
- If not, power-cycle the device. If running custom firmware, try flashing official firmware (see [Flashing Official Firmware](#flashing-official-firmware) below).

#### 2. Check your USB cable

- Ensure the cable supports data, not just charging.
- In your OS device list, the device should appear under serial/COM interfaces.

If the device is not listed, try a different USB cable.

#### 3. Update Lumyn Studio

- Force refresh with CTRL+F5 to ensure the latest version is loaded.

#### 4. Install correct USB drivers (Windows)

- Download and run [Zadig](https://zadig.akeo.ie/)
- Options > List All Devices
- Select TinyUSB Serial Interface 0
- Install USB CDC driver, then reconnect the device.

#### 5. Connecting via SDK (Python, WPILib, C/C++)

- **Check port name**: Use Device Manager on Windows, `ls /dev/ttyACM*` on Linux, or `ls /dev/cu.usbmodem*` on macOS. From Python, `lumyn_sdk.list_available_ports()` lists every serial port.
- **Check permissions**: On Linux, add your user to the `dialout` group: `sudo usermod -a -G dialout $USER`
- **Try a different port**: Some USB hubs may cause issues

---

### Device freezes with solid teal LED on boot

```{admonition} Status: Under investigation
:class: tip
This is a known issue. We are investigating root causes and workarounds.
```

If your device's status LED turns solid teal and freezes during boot:

#### Resolution

1. Unplug and replug the device, or press the `RST` button to restart.
2. The device should boot normally and the LED will breathe blue when ready.

If the issue persists after multiple restarts, please email us at [support@lumynlabs.com](mailto:support@lumynlabs.com) with your device configuration file and steps to reproduce the issue.

---

### Device config larger than 4KB fails to apply

```{admonition} Status: Fixed in firmware 4.3+
:class: tip
Device firmware **4.3** and above supports large configurations over USB. Use **Send to Device** in the **Export Configuration** dialog in Lumyn Studio; stream upload applies configs that exceed the older ~4KB USB apply limit.
```

On firmware **older than 4.3**, applying a configuration larger than ~4KB will fail.

#### Resolution

On firmware **4.3** and newer, use **Send to Device** from the **Export Configuration** dialog in Lumyn Studio.

If you cannot upgrade yet, or upload still fails, copy the configuration file directly to the device's SD card instead of applying over USB:

1. Export your configuration from Lumyn Studio
2. Copy the `config.json` file to the microSD root
3. Insert the microSD card into the device and restart
4. The device will load the configuration on boot

---

### LED strip or matrix not responding

#### 1. Verify the microSD card

- Format as FAT32 only. exFAT/NTFS are not supported.

#### 2. Verify the configuration file

- Ensure the exported configuration JSON is correct and located on the microSD root as config.json.
- For image sequences, export with assets and copy the folders to the microSD root.

---

### Configuration file reference

The fields of the configuration JSON, what each one means, and which files the board refuses are in the [Configuration file reference](config-reference).

---

#### 3. Confirm the device is receiving 12V power

- +12V IN to positive, GND to ground.
- Do not power the LED strip/matrix separately; the device regulates 5V for LEDs.
- FRC: Power from PDP/PDH, not VRM.

#### 4. Ensure proper LED connection

- +5V to +5V, GND to GND, data to DATA.

#### 5. Test with a different LED strip or matrix

- ConnectorX/Animate support WS2812B-only. Try a known-good strip/matrix.

### Module data not updating

- **Check configuration**: Ensure the module is configured in the device
- **Check connection**: Modules require a stable connection
- **Check module ID**: Verify the module ID matches your configuration
- **Enable polling**: Ensure event/module polling is enabled (e.g. `cx.set_auto_poll_events(True)` in Python)

---

### Flashing official firmware

If you need to flash or update firmware, see [Entering bootloader mode](drivers-and-firmware.md#entering-bootloader-mode) and the flashing steps after it.

---

## Frequently asked questions

### Why can't Lumyn Studio find my device?

- Use a Chromium-based browser that supports Web Serial.
- Try a different USB cable that supports data.
- Install drivers on Windows (see [Troubleshooting Guide](#troubleshooting-guide) above).

### Python: ModuleNotFoundError for lumyn_sdk?

Install the SDK with uv. See [Getting started (Python)](programming-guide/getting-started-python).

### My LEDs don't light up. What should I check?

- Ensure microSD is FAT32 and config.json is in the root.
- Verify +12V IN and GND wiring; device regulates 5V for LEDs.
- Confirm DATA to the correct pin, and try a known-good WS2812B strip/matrix.

### How do I export and deploy a configuration?

- Open a device's **Configuration Overview** page and click **Export Configuration** in the toolbar.
- Optionally include image assets to get a zip with folders.
- Copy config.json (and any image folders) to the microSD root.

If you need a default empty config to start with, see the [Configuration file reference](#configuration-file-reference) section above, or **Step 2: Add the Default Config** in the [Quick start guide](quick-start).

### What LED types are supported?

- ConnectorX and ConnectorX Animate support WS2812B LEDs.

### Where do I get firmware or drivers?

- See [Drivers and firmware](drivers-and-firmware) for firmware flashing steps and driver links.

---

## Common issues quick reference

**Device won't connect:**
1. Check [Unable to Connect Using Lumyn Studio](#unable-to-connect-using-lumyn-studio) section above
2. Verify USB cable supports data transfer
3. Install drivers on Windows (see [Drivers and firmware](drivers-and-firmware))

**LEDs not working:**
1. Check [LED Strip or Matrix Not Responding](#led-strip-or-matrix-not-responding) section above
2. Verify microSD card is FAT32 formatted
3. Ensure config.json is in microSD root
4. Check power and data wiring

**Configuration not loading:**
1. Verify config.json is in microSD root (not in a subfolder)
2. Check file format is valid JSON
3. Ensure image sequences are in correct folders if used
4. See [Saving & exporting configurations](user-guide/saving-and-exporting-configurations)

**Need to update firmware:**
1. See [Updating firmware](drivers-and-firmware.md#updating-firmware).

---

## Support & contact information

Need help? Try these options:

- **Documentation**: Browse this site's [User guide](user-guide/index), [Programming guide](programming-guide/index), and [Troubleshooting & FAQ](troubleshooting-faq) sections.
- **Email**: [support@lumynlabs.com](mailto:support@lumynlabs.com)

For urgent hardware issues, include:

- Device model and firmware version
- OS and browser versions
- Steps to reproduce and screenshots/logs

We aim to respond within 2–3 business days.
