# Connected Device Panel

The **Connected Device Panel** provides a quick overview of the connected device as well as tools for interacting with it. This page will introduce you to the panel and its features. To access the panel, click the **Connect** button in the title bar and connect to a device. If you're already connected, the panel will automatically appear.

<img src="/lumyn-studio/connected-device-panel/connected-device-panel.png" alt="The Connected Device Panel" height="400px"/>

## New Device Configuration

When you connect to a device for the first time, the **Connected Device Panel** will prompt you to create a new device configuration. This configuration will store all settings and sequences for the device.

> [!WARNING]
> Because the configuration is stored in your browser's local storage, it will be lost if you clear your browser data. To save your configuration externally, use the export feature.

## Panel Overview

The **Connected Device Panel** is divided into a series of tabs, each with a specific purpose. Here's a quick overview of each tab:

- **Connection**: This tab provides information about the connected device and what it supports. It also allows you to create a new device configuration if one that matches your device's serial number does not already exist.
- **Events**: This tab displays a log of events that have occurred on the device. This can be useful for debugging and understanding the device’s behavior.
- **Logs**: This tab displays a human-readable log of the device's output. If the device is running custom firmware, this log may contain useful information about its state. (To access this tab, you must connect to the secondary serial port on the device.)
- **Module Values**: This tab displays the current values of all modules on the device.
- **LED Commander**: This tab allows you to send raw LED commands to the device. This can be useful for ensuring everything is wired correctly or quickly testing a new animation.
