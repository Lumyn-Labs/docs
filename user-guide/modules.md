---
hide-toc: true
---

# Modules

Browse official modules, create custom modules, and add modules to devices.

## Overview

The Modules page lists available modules and provides search and category filters.

```{image} ../assets/lumyn-studio/modules-page/modules-page.png
:alt: Modules Page
```

Click a module to view details, options, API snippets, and links to store pages or datasheets.

```{image} ../assets/lumyn-studio/modules-page/module-preview.png
:alt: Module Preview
```

## Add a Module to a Device

From a module’s detail view, click Add to Device. Set:

- ID: Identifier used to reference the module in code.
- Device: Target configuration.
- Polling rate: How often the device queries data (e.g., 100 ms).
- Connection types and any custom options.

```{image} ../assets/lumyn-studio/modules-page/add-module.png
:alt: Add a Module
```

## Creating a Custom Module

Use Create Custom Module to define your own module. The dialog includes:

1. Basic Information: Name, category, tags, images, links, and connection types.

```{image} ../assets/lumyn-studio/modules-page/create-custom-module-page1.png
:alt: Custom Module - Basic Information
```

1. Payload: Define the polled data structure (max 16 bytes).

```{image} ../assets/lumyn-studio/modules-page/create-custom-module-page2.png
:alt: Custom Module - Payload
```

1. Custom Configuration: Module-specific options (e.g., interrupt pin).

```{image} ../assets/lumyn-studio/modules-page/create-custom-module-page3.png
:alt: Custom Module - Custom Configuration
```

1. Readme: Markdown documentation for usage details.

```{image} ../assets/lumyn-studio/modules-page/create-custom-module-page4.png
:alt: Custom Module - Readme
```

1. Generated Firmware: Preview and download boilerplate firmware once inputs are complete.

```{image} ../assets/lumyn-studio/modules-page/generated-firmware.png
:alt: Custom Module - Generated Firmware
```

## Next Steps

- Configure zones for module-driven effects: [Zones & Zone Groups](zones-and-zone-groups)
- Use module data in code: [Programming Guide](../programming-guide/index)
