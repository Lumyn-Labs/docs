---
hide-toc: true
---

# Device Settings & Management

Use the Connected Device Panel and Studio Settings to manage your devices.

## Connected Device Panel

Open via the Connect button in the title bar after selecting your device.

```{image} ../assets/lumyn-studio/connected-device-panel/connected-device-panel.png
:alt: Connected Device Panel
```

Tabs include:

- Connection: Device summary and configuration creation if none exists.
- Events: Device event log.
- Logs: Human-readable output (requires connecting to the secondary serial port when available).
- Module Values: Current values reported by modules.
- LED Commander: Send LED commands for quick wiring tests. Uses your device configuration to populate options and shows a live preview.

```{warning}
Configurations are stored in browser storage. Export regularly to avoid data loss.
```

## Studio Settings

Access from the gear icon in the title bar.

```{image} ../assets/lumyn-studio/settings-page/settings-screen.png
:alt: Settings Page
```

- FRC Team Number: Optional team number (whole number 1–99999) used in configurations.
- Cache: Clear cached CDN assets if experiencing load issues.

## Firmware and Drivers

- See [Troubleshooting & FAQ](../troubleshooting-faq) for driver setup and flashing official firmware.

## Related

- [Saving & Exporting Configurations](saving-and-exporting-configurations)
- [Troubleshooting & FAQ](../troubleshooting-faq)
