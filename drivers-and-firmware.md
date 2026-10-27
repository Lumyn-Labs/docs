---
hide-toc: true
---

# Drivers and firmware

This page covers installing drivers on Windows and updating device firmware.

## Installing drivers (Windows)

On Windows, you may need to install a specific driver to allow Lumyn Studio to communicate with the ConnectorX device over USB.

### Using Zadig

If your device doesn't appear in Device Manager, use the [Zadig](https://zadig.akeo.ie/) utility to install the correct driver:

1. **Download and install Zadig**: [Download the latest version of Zadig](https://zadig.akeo.ie/).
2. **Run Zadig** and select `Options` > `List All Devices`.
3. **Find `TinyUSB Serial Interface 0`** in the dropdown list.
4. **Install the USB CDC driver** for this device.
5. **Reconnect your device** and try again.

## Updating firmware

Firmware updates are performed by putting your device into bootloader mode and copying a UF2 file to the USB mass storage device that appears.

### Downloading firmware

1. Go to the [Lumyn Labs releases page](https://github.com/Lumyn-Labs/Releases/releases) and open the latest **ConnectorX Firmware** release. The page also lists SDK releases; skip those.
2. Download the file for your board:
   - ConnectorX: `connectorx-v<version>.uf2`
   - ConnectorX Animate: `connectorx-animate-v<version>.uf2`

   Each file is built for one board. Flash the one that matches your board.

### Entering bootloader mode

Both boards have two buttons, labeled `BOOTSEL` and `RST`. This works whatever firmware the board runs, including firmware that doesn't start.

1. Connect the board to your computer with a USB cable.
2. Press and hold `BOOTSEL`.
3. While you hold `BOOTSEL`, press and release `RST`.
4. Release `BOOTSEL`.

The board appears on your computer as a removable drive named `RPI-RP2`.

### Flashing firmware

1. **Copy the UF2 file**: Drag the downloaded UF2 firmware file onto the `RPI-RP2` drive.
2. **Wait for completion**: The device will automatically flash the firmware and restart. The `RPI-RP2` drive will disappear when the update is complete.
3. **Verify**: The device should boot normally with the new firmware version.

### Firmware notifications in Lumyn Studio

When you connect a device, Lumyn Studio notifies you if a newer firmware version is available.

```{image} assets/ota-update-available-prompt.png
:alt: OTA update available prompt in Lumyn Studio
```

#### OTA update flow (firmware 4.3+)

On devices running firmware **4.3** or newer, you can apply firmware updates **over the air (OTA)** directly from Studio:

1. Connect the device in Lumyn Studio.
2. When the update prompt appears, choose the OTA update option.
3. Keep the USB connection stable and avoid closing Studio during upload.
4. Wait for the upload to complete and for the device to restart.
5. Reconnect if prompted, then confirm the new firmware version in the connection panel.

```{image} assets/ota-update-upload-in-progress.png
:alt: OTA firmware upload in progress in Lumyn Studio
```

```{note}
If OTA fails or is unavailable, use the bootloader UF2 method above. The prompt includes a link to the corresponding GitHub release so you can download and flash manually.
```

