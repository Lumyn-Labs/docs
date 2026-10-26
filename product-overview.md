---
hide-toc: true
---

# Product overview

ConnectorX and ConnectorX Animate are programmable LED and sensor controllers built for FRC robots. They let you configure channels, zones, groups, modules, and animations in Lumyn Studio, then control behavior from robot code through the Lumyn Labs SDKs.

## Hardware at a glance

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

## Ports and configuration concepts

- **LED outputs** are configured as channels in Studio, then divided into strip or matrix zones.
- **Zone IDs and group IDs** created in Studio are reused directly in code.
- **Module IDs** created in Studio map to custom module registrations in firmware and to module APIs in host SDKs.

## Where to go next

- First-time setup: [Quick start guide](quick-start)
- Studio workflows: [Lumyn Studio guide](user-guide/index)
- Programming APIs: [Programming guide](programming-guide/index)
- Custom firmware and modules: [Advanced topics](advanced-topics)

## Product links

- ConnectorX: <https://lumynlabs.com/products/connectorx>
- ConnectorX Animate: <https://lumynlabs.com/products/connectorx-animate>
