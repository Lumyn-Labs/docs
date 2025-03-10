# ConnectorX

Engineered with the First Robotics Competition (FRC) in-mind, ConnectorX brings together advanced LED control, flexible sensor integration, and robust power management in a single, easy-to-use breakout board.

## Features

- 2x Grove-compatible I2C connectors
- 2x Digital in/out headers
- 2x Analog in/out headers
- 1x SPI header
- 1 LED channel

## Board Layout

> [!NOTE]
> This is a preliminary layout and the board may (will) change before release. This is intended to give you an idea of what the board will feature.

1. 12V input
2. USB-C
3. Bootsel, Rst buttons
4. Micro SD card slot
5. LED channel
6. 5V output
7. OLED screen connector
8. Grove-compatible I2C connectors for [Modules](/lumyn-studio/modules-page)
9. Digital I/O headers
10. Analog I/O headers
11. SPI header

<img src="/assets/connectorx.png" alt="ConnectorX" height="400px"/>

## Power Management

ConnectorX features onboard power management to convert 12V input to 5V @3A output. This is output is shared between the board, LED channel, and any connected modules. The board also features large 5V pads for easily soldering additional devices such as a Raspberry Pi or Jetson Nano.

## LED Channel

The ConnectorX LED channel is designed to control WS2812B LEDs. The channel can be configured within Lumyn Studio to control multiple zones and groups of LEDs, LED matrices, and more. ConnectorX will automatically adjust the LED brightness based on the total number of LEDs to prevent overdriving them. Due to power constraints, the maximum number of LEDs that can be controlled on a single channel is 320. If you need to control more LEDs, consider using [ConnectorX Animate](/devices/connectorx-animate) which is optimized for LEDs.