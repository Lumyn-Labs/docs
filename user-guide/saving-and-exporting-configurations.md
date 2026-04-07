---
hide-toc: true
---

# Saving & Exporting Configurations

Export device configurations from Lumyn Studio and deploy them to your device.

## Export from Devices Page

Open a device's **Configuration Overview** page, then click **Export Configuration** in the toolbar to preview and download JSON.

```{image} ../assets/whats-new/config-uploads.png
:alt: Direct Config Uploads
```

If your configuration includes image sequences, optionally check **Include image assets in export** to download a zip containing `config.json` at the root and folders for each sequence.

When assets are included and your device firmware supports it, you can also enable **Export as LLA animation files** to package Lumyn LED Animation (`.lla`) files. A chip in the dialog shows whether you are exporting JSON only, a zip with bitmaps, or a zip with `.lla` files.

Use **Download JSON/ZIP** to save the file locally. With a connected device running firmware **4.3** or newer and stream support, **Send to Device** uploads the configuration (and assets when applicable) directly from this dialog.

## Direct Upload to Device

With a compatible device connected, use **Send to Device** in the **Export Configuration** dialog. A progress overlay shows phases such as preparing assets, uploading, and completion. This can avoid copying files manually when stream upload is available.

```{note}
For very large configurations, copying `config.json` to the microSD card can still be the most reliable approach if USB apply limits apply on your hardware. See [Troubleshooting & FAQ](../troubleshooting-faq).
```

## Copy to microSD (Manual Deploy)

- Place `config.json` in the microSD root.
- If exporting image assets, copy the included sequence folders to the microSD root unchanged.

Keep the structure intact so the device can locate assets.

## Next Steps

- Create sequences: [Animation Sequences](animation-sequences)
- Create matrix content: [Image Sequences](image-sequences-matrix)
