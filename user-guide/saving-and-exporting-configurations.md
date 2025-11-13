---
hide-toc: true
---

# Saving & Exporting Configurations

Export device configurations from Lumyn Studio and deploy them to your device.

## Export from Devices Page

Open the Devices page, select your configuration, then click Export Configuration in the top-right to preview and download the JSON.

```{image} ../assets/whats-new/config-uploads.png
:alt: Direct Config Uploads
:height: 447px
```

If your configuration includes image sequences, optionally check Include Image Assets in Export to download a zip containing config.json at the root and folders for each sequence.

## Direct Upload to Device

```{note}
**2026 Feature**: You can now upload your configuration JSON directly to any connected device from within Studio. This makes deploying configurations faster and easier - no need to manually copy files to a microSD card.
```

With a device connected, you can upload your configuration directly to the device from the Connected Device Panel. This eliminates the need to manually copy files to a microSD card for configuration deployment.

```{note}
**Note**: Image assets still need to be manually copied to the microSD card. Direct image upload is coming in a future update.
```

## Copy to microSD (Manual Deploy)

- Place config.json in the microSD root.
- If exporting image assets, copy the included sequence folders to the microSD root unchanged.

Keep the structure intact so the device can locate assets.

## Next Steps

- Create sequences: [Animations & Sequences](animations-and-sequences)
- Create matrix content: [Image Sequences](image-sequences-matrix)
