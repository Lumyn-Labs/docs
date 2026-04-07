---
hide-toc: true
---

# Modules

Browse official modules and add modules to devices.

## Overview

The Modules page lists available modules with a **Categories** sidebar (for example: All, Sensor categories, Coprocessor, Signal, Miscellaneous) and search. Use **Create Module** to author a custom module.

```{image} ../assets/lumyn-studio/modules-page/modules-page.png
:alt: Modules Page
```

Click a module to open its detail page. Built-in modules include sub-pages such as **Overview**, **README**, and **Source** in the side navigation. Custom modules can also include **Details** and **Data**. Use **Back to Modules** to return to the catalog.

```{image} ../assets/lumyn-studio/modules-page/module-preview.png
:alt: Module Preview
```

## Add a Module to a Device

From a module's detail view, click **Add to Device**. The form is organized into:

- **Provisioning**: Module ID, target device, and connection type.
- **Behavior**: Enable polling and polling interval (milliseconds).
- **Configuration**: Dynamic fields defined by the module (pins, options, and so on).

```{image} ../assets/lumyn-studio/modules-page/add-module.png
:alt: Add a Module
```

## Creating a Custom Module

Choose **Create Module** on the Modules page. A guided flow (Basics, Data, Details, Review) walks you through defining the module. After creation, open the module from the catalog; custom modules support **Preview** and **Edit** modes from the toolbar, with **Save** when you have unsaved changes.

## Next Steps

- Configure zones for module-driven effects: [Zones & Zone Groups](zones-and-zone-groups)
- Use module data in code: [Programming Guide](../programming-guide/index)
