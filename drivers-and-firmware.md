---
hide-toc: true
---

# Drivers and Firmware

This page covers installing drivers on Windows and updating device firmware.

## Installing Drivers (Windows)

On Windows, you may need to install a specific driver to allow Lumyn Studio to communicate with the ConnectorX device over USB.

### Using Zadig

If your device doesn't appear in Device Manager, use the [Zadig](https://zadig.akeo.ie/) utility to install the correct driver:

1. **Download and install Zadig**: [Download the latest version of Zadig](https://zadig.akeo.ie/).
2. **Run Zadig** and select `Options` > `List All Devices`.
3. **Find `TinyUSB Serial Interface 0`** in the dropdown list.
4. **Install the USB CDC driver** for this device.
5. **Reconnect your device** and try again.

## Updating Firmware

Firmware updates are performed by putting your device into bootloader mode and copying a UF2 file to the USB mass storage device that appears.

### Downloading Firmware

Download the latest firmware UF2 file for your device from the appropriate GitHub releases page:

- **ConnectorX**: [ConnectorX-Firmware-Starter Releases](https://github.com/Lumyn-Labs/ConnectorX-Firmware-Starter/releases)
- **ConnectorX Animate**: [ConnectorX-Animate-Firmware-Starter Releases](https://github.com/Lumyn-Labs/ConnectorX-Animate-Firmware-Starter/releases)

Download the `firmware.uf2` file from the latest release.

### Entering Bootloader Mode

1. **Connect Your Device**: Plug your ConnectorX or ConnectorX Animate into your computer via USB.
2. **Enter Bootloader Mode**:
    1. Wait for the device to fully boot (the LED will be breathing blue).
    2. Press and hold the `BOOT` or `BOOTSEL` button on the device.
    3. While still holding `BOOT`, press and release the `RESET` button.
    4. Release the `BOOT` button.
    
    The device will now appear to your computer as a removable drive called `RPI-RP2`.

### Flashing Firmware

1. **Copy the UF2 File**: Simply drag and drop the downloaded UF2 firmware file onto the `RPI-RP2` drive.
2. **Wait for Completion**: The device will automatically flash the firmware and restart. The `RPI-RP2` drive will disappear when the update is complete.
3. **Verify**: The device should boot normally with the new firmware version.

### Firmware Notifications in Lumyn Studio

Lumyn Studio will automatically notify you when a new firmware version is available for your connected device. A notification will appear upon connecting the device with a link to download the release.

