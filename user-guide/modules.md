---
hide-toc: true
---

# Modules

The Lumyn Labs Module ecosystem allows you to easily integrate sensor and peripheral data into your applications without writing custom code.

## Overview

The Modules page lists available modules and allows you to filter by category or search. Don't see a module for your sensor or peripheral? Use **Create Module** to author a custom module.

```{image} ../assets/lumyn-studio/modules-page/modules-page.png
:alt: Modules Page
```

Click a module to open its detail page. Every module specifies its category, supported interfaces, configurable fields, and source code. Use **Back to Modules** to return to the catalog.

```{image} ../assets/lumyn-studio/modules-page/module-preview.png
:alt: Module Preview
```

## Add a Module to a Device

From a module's detail view, click **Add to Device**. The form is organized into:

- **Provisioning**: Module ID, target device, and connection type.
- **Behavior**: **Enable Polling** and **Polling Rate (ms)**.
- **Configuration**: Dynamic fields defined by the module (pins, options, and so on).

Connection type options are filtered by the selected device's supported interfaces. Configuration fields appear when the module defines configuration options and a target device is selected.

```{image} ../assets/lumyn-studio/modules-page/add-module.png
:alt: Add a Module
```

## Creating a Custom Module

To create a custom module, navigate to the Modules page and click **Create Module**.

```{image} ../assets/lumyn-studio/modules-page/create-module.png
:alt: Create Module Dialog
```

In the **Create Custom Module** dialog, enter a **Module ID** and optional **Display Name**, then click **Create Module**. The Module ID must be PascalCase (for example, `TemperatureSensor`). New modules open in the edit workspace so you can start defining behavior and configuration fields.

```{image} ../assets/lumyn-studio/modules-page/module-editor.png
:alt: Module Editor
```

Studio provides two detail experiences:

- **Catalog module detail**: A read-focused view with **Overview**, **README**, **Data**, and **Source**.
- **Custom module editor**: An authoring view with **Preview** and **Edit** modes and five sections:

- **Overview**: View and edit the module's display name, category, discovery tags, and supported interfaces.
- **Details**: Add a hero image plus Datasheet URL, Purchase URL, and Wiring Diagram URL.
- **README**: Markdown editor for the module's README, which appears in the catalog.
- **Data**: Define the module's payload data structure and configuration fields.
- **Source**: View generated source artifacts for use in custom firmware.

For custom modules, **Add to Device** is available from preview mode after saving changes (it is hidden while editing or when there are unsaved edits).

### Module Data

The **Data** page is where you define the module's data structure and configuration fields. The data structure defines what information the module reports each time it is polled, such as a distance reading or a pin state. Each field maps to a value in the binary payload the firmware sends to your host application (robot code or SDK), while configuration fields allow users to customize module behavior when adding it to a device.

Each time the module polls, it sends a payload of data to the SDK with the structure defined on this page. For example, a distance sensor module might have a payload with a single `distance` field, while a more complex module could have multiple fields for different sensor readings.

The configuration fields allow you to specify the parameters needed to set up the module on a device such as pin numbers, thresholds, or modes. When a user adds the module to a device, they will be prompted to fill in these fields, and the values will be passed to the module's code to configure its behavior.

### Generated Source

Once you've defined the module's data structure and configuration fields, the **Source** page generates boilerplate source artifacts that you can use in your custom firmware to read module data and register the module.

## Next Steps

- Configure zones for module-driven effects: [Zones & Zone Groups](zones-and-zone-groups)
- Use module data in code: [Programming Guide](../programming-guide/index)
