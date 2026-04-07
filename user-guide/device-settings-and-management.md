---
hide-toc: true
---

# Device Settings & Management

Use the Connected Device Panel and Studio Settings to manage your devices.

## Connected Device Panel

Open via the connection icon in the top-right of the navigation bar after selecting your device.

```{image} ../assets/lumyn-studio/connected-device-panel/connected-device-panel.png
:alt: Connected Device Panel
```

Tabs include (order may vary by device capabilities):

- **Connection**: Device summary, status (for example Active, Booting, Error, Fatal, Unknown), and device setup when needed. Footer: **Refresh**, **Reboot**.
- **LED Commander**: Send test LED commands. Command types include Animation, Animation Sequence, Image Sequence, Lumyn Animation (LLA-compatible animations), Matrix Text Scroll, and Color. Targets are filtered using your device configuration, with a live preview. Footer: **Send Command**.
- **Modules**: Live module data (push/pull where supported). Footer: **Refresh**, **Clear**. Shown for module-capable devices.
- **Events**: Device event log.
- **Logs**: Human-readable serial output when **Debug mode** is enabled in the device firmware

```{warning}
Configurations are stored in browser storage. Export regularly to avoid data loss.
```

## Studio Settings

Open the **Settings** tab in the main navigation bar.

```{image} ../assets/lumyn-studio/settings-page/settings-screen.png
:alt: Settings Page
```

- **General**: FRC team number (optional, 1–99999). Theme selector (Automatic / Light / Dark).
- **Advanced**: **Debug mode** enables developer tools and extra UI (such as Logs in the Connected Device Panel and experiment toggles). Most users should leave debug mode **off**.
- **Debug configuration** (with debug mode on): Optional custom CDN URL for module definitions.
- **Network**: **Refresh cached content** to clear and re-download catalog assets.
- **Experiments** (with debug mode on): Optional experimental toggles. Not likely to be stable.
- **Resources**: Links to this documentation site and support.

## Firmware and Drivers

- See [Troubleshooting & FAQ](../troubleshooting-faq) for driver setup and flashing official firmware.

## Related

- [Saving & Exporting Configurations](saving-and-exporting-configurations)
- [Troubleshooting & FAQ](../troubleshooting-faq)
