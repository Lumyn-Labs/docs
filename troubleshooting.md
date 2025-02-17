# Troubleshooting

This guide provides step-by-step instructions for troubleshooting common issues with Lumyn Labs devices.

---

## Unable to Connect Using Lumyn Studio

If you are unable to connect your device using Lumyn Studio, try the following steps:

### 1. Verify the Device Has Fully Booted

- **Check the RGB LED:** Once booted, the device’s RGB LED should display a breathing blue light.  
- **If the LED is not breathing blue:**  
  - The device may still be booting or could have encountered an error.
  - Unplug the device, wait a few seconds, and then plug it back in to restart the boot process.
  - If you are using custom firmware, consider [flashing the official firmware](#flashing-official-firmware).

### 2. Check Your USB Cable

- **Confirm Data Transfer Capability:**  
  Some USB cables are designed for charging only and do not support data transfer.  
- **How to check:**  
  - Open the Device Manager on your computer.
  - Look for your device under the **"Ports (COM & LPT)"** section.

- **Example:**  
  Below is an example of how your device might appear in the Device Manager:

<img src="/assets/device-manager.png" alt="Device Manager" height="400px"/>

- **Next Step:**  
  If the device is not listed, try using a different USB cable.

---

## LED Strip or Matrix Not Responding

If you are unable to control the LEDs on your device, follow these troubleshooting steps:

### 1. Verify the Configuration File

- **For Lumyn Studio Users:**  
  - Ensure the device configuration file is correct and has been transferred properly to the microSD card.
  - Insert the microSD card into your computer and open the `config.json` file in a text editor.
  - Verify that the configuration matches what you set in Lumyn Studio.
  
- **Accessing the Configuration JSON in Studio:**  
  Navigate to the **Devices** tab, select your device, and click the **Export Configuration** button.

- **For Image Sequences:**  
  - Confirm that the images are located in the correct folder on the microSD card.
  - When exporting, you can choose the **Include image assets in export** option to download a zip file containing the images.
  - Unzip the file and copy the folder structure to the root of the microSD card.

### 2. Confirm the Device is Receiving 12V Power

Lumyn Labs devices require a 12V power supply to display animations on the LED strip or matrix and regulate the voltage to 5V for the LEDs.
  
- **Check Connections:**  
  - The positive wire should be connected to the `+12V IN` terminal.
  - The negative wire should be connected to the `GND` terminal.

- **Important Note:**  
  Do not power the LED strip or matrix separately. The device’s built-in power supply delivers the correct voltage and current.  
  - **For FRC customers:** Connect the device directly to the PDP or PDH rather than to the VRM or other power management sources. These sources may not provide the necessary current.

### 3. Ensure Proper LED Connection

- **Connection Details:**  
  - The 5V and GND wires must be connected to the `+5V` and `GND` pins, respectively.
  - The data wire should be connected to the `DATA` pin.

- **Double-check:**  
Incorrect wiring or swapped connections can prevent the LEDs from functioning properly.

### 4. Test with a Different LED Strip or Matrix

ConnectorX and ConnectorX Animate support only WS2812B LED strips and matrices.
  
- **Action:**  
If none of the previous steps resolve the issue, try using a different, known-compatible LED strip or matrix to determine if the problem lies with the hardware.

---

## Flashing Official Firmware

If you continue to experience issues, try flashing the official firmware by following these steps:

### 1. Download the Official Firmware

- **Locate the Firmware:**  
  Find the official firmware in your device's custom firmware repository:
  - [ConnectorX](https://github.com/Lumyn-Labs/ConnectorX-Fimware-Starter/releases/latest)
  - [ConnectorX Animate](https://github.com/Lumyn-Labs/ConnectorX-Animate-Fimware-Starter/releases)

- **Download:**  
  Download the latest release of the `firmware.uf2` file.

### 2. Enter Bootloader Mode

- **Steps to Enter Bootloader Mode:**
  1. Connect the device to your computer using a USB cable and wait for it to boot up.
  2. Hold down the `BOOT`/`BOOTSEL` button on the device.
  3. Quickly press and release the `RESET` button.
  4. Release the `BOOT`/`BOOTSEL` button.

- **Result:**  
  The device should now appear as a removable drive on your computer.

### 3. Flash the Firmware

- **How to Flash:**  
  Drag and drop the `firmware.uf2` file onto the removable drive that appeared.  
- **Automatic Process:**  
  The device will automatically flash the new firmware and restart once the file is copied.

---

By following these steps, you should be able to resolve most common issues with your Lumyn Labs device. If you continue to experience problems, please contact us for further assistance.