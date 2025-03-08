# ConnectorX Animate

ConnectorX Animate is an advanced version of the ConnectorX breakout board, specifically designed for controlling LEDs. It features a much more powerful voltage regulator to handle a higher number of LEDs and includes three additional LED channels, allowing for easier wiring and control of multiple LED strips or matrices.

## Features

- 4x LED channels
- 12V input to 5V @6A output
- SD card slot
- Screen connector

## Board Layout

1. 12V input
2. USB-C
3. Bootsel, Rst buttons
4. Micro SD card slot
5. LED channel 1
6. LED channel 2
7. LED channel 3
8. LED channel 4
9. 5V output
10. OLED screen connector

<img src="/assets/connectorx-animate.png" alt="ConnectorX Animate" height="400px"/>

## Power Management

ConnectorX Animate features **more powerful** onboard power management compared to ConnectorX. The board can convert **12V input to a 5V @ 6A output**, which is shared between the board and all four LED channels. This higher current capacity allows it to handle more LEDs, providing ample power for your projects. The board also features large 5V pads for soldering **additional devices easily**, such as a Raspberry Pi or Jetson Nano.

## LED Channels

ConnectorX Animate features four LED channels, each capable of controlling up to 320 LEDs. Each channel can be configured within Lumyn Studio to control multiple zones, groups of LEDs, LED matrices, and more. ConnectorX Animate will automatically adjust the brightness of the LEDs based on the number of LEDs to prevent overdriving them.