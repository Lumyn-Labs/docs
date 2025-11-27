---
hide-toc: true
---

# Installing the Library (vendordep)

Add the Lumyn Labs vendor library to your WPILib project.

```{warning}
**Firmware Compatibility**: The 2025 vendordep releases only work with device firmware versions up to v2.1.1. Firmware versions v3.1.1 and beyond require the 2026 beta vendordep to be installed. The 2026 beta vendordep will be available shortly after the FRC 2026 WPILib beta release.
```

## WPILib UI (Recommended)

To add the vendor library to your project, use WPILib's 3rd party library tool. To begin, find the WPILib icon in the sidebar of VSCode and click on it. This will bring up the new WPILib Vendor Dependencies tool. Under `Available Dependencies`, locate the Lumyn Labs vendor library and click `Install`. To update the library once it has been installed, open this menu again and click `To Latest`.

## Install via URL

Alternatively, you can install the library manually by using the url for the Lumyn Labs vendor library.

To begin, click the wpi icon in the top right corner of VSCode, type `Manage Vendor Libraries` and click on the option that appears. Choose `Install new libraries (online)` and a text field should appear.

In the text field paste the following url:

```url
https://packages.lumynlabs.com/LumynLabs.json
```

Once you have pasted the URL and clicked <kbd>Enter</kbd>, it is recommended to perform a build to ensure that IntelliSense picks up the new dependency.
