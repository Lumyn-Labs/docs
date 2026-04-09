---
hide-toc: true
---

# Product Overview

ConnectorX and ConnectorX Animate are programmable LED and sensor controllers built for FRC robots. They let you configure channels, zones, groups, modules, and animations in Lumyn Studio, then control behavior from robot code through the Lumyn Labs SDKs.

## Hardware at a Glance

- **ConnectorX**: single-channel LED controller with module-focused expansion support.
- **ConnectorX Animate**: multi-channel LED controller optimized for higher LED counts and matrix animation workflows.

Both devices support:

- USB connectivity
- microSD-backed configuration and assets
- onboard screen support
- Lumyn Studio configuration and SDK control

## ConnectorX vs ConnectorX Animate

| Capability | ConnectorX | ConnectorX Animate |
|---|---|---|
| LED Channels | 1 | 4 |
| Max LEDs | Up to 320 | Up to 1280 total (4x320) |
| Module/Sensor support | Yes (I2C, SPI, UART, DIO/AIO) | Yes (I2C) |
| Supported Communications | USB, UART | USB |
| microSD | Yes | Yes |
| Regulator Output | 3000 mA | 6000 mA |

## Ports and Configuration Concepts

- **LED outputs** are configured as channels in Studio, then divided into strip or matrix zones.
- **Zone IDs and group IDs** created in Studio are reused directly in code.
- **Module IDs** created in Studio map to custom module registrations in firmware and to module APIs in host SDKs.

## Where to Go Next

- First-time setup: [Quick Start Guide](quick-start)
- Studio workflows: [Lumyn Studio Guide](user-guide/index)
- Programming APIs: [Programming Guide](programming-guide/index)
- Custom firmware and modules: [Advanced Topics](advanced-topics)

## Product Links

- ConnectorX: <https://lumynlabs.com/products/connectorx>
- ConnectorX Animate: <https://lumynlabs.com/products/connectorx-animate>
