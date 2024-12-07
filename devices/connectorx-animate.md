# ConnectorX Animate

ConnectorX Animate is a more advanced version of the ConnectorX breakout board. It's designed specifically for controlling LEDs and features a much more powerful volage regulator to handle more LEDs. Animate also features three additional LED channels allowing for easier wiring across multiple areas of your robot.

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

ConnectorX Animate features more powerful onboard power management compared to ConnectorX. The board can convert 12V input to 5V @6A output, which is shared between the board, and all four LED channels. The board also features large 5V pads for easily soldering additional devices such as a Raspberry Pi or Jetson Nano.

## LED Channels

ConnectorX Animate features four LED channels, each capable of controlling up to 320 LEDs. Each channel can be configured within Lumyn Studio to control multiple zones and groups of LEDs, LED matrices, and more. ConnectorX Animate will automatically adjust the brightness of the LEDs based on the number of LEDs to ensure they are not overdriven.