---
hide-toc: true
---

# Hardware, wiring, and power

This page describes the connectors on ConnectorX and ConnectorX Animate and how to power and wire them on a robot. Connector labels in this page are the labels printed on the board.

## Power

Both boards have the same power design:

- A 2-pin screw terminal (5.08 mm pitch) labeled **+12V** and **GND** takes robot power. On ConnectorX Animate it is labeled **+12V IN**.
- A regulator on the board turns the 12 V input into 5 V for the LED connectors.
- USB-C powers only the board's logic. With USB alone you can connect to Lumyn Studio, update firmware, and send a configuration, but the LED connectors have no power.

| | ConnectorX | ConnectorX Animate |
|---|---|---|
| Power input | Screw terminal, **+12V** and **GND** | Screw terminal, **+12V IN** and **GND** |
| 5 V regulator output | 3000 mA | 6000 mA |
| LED connectors powered from USB alone | No | No |

The 5 V regulator output is shared by every LED connector on the board. Plan the LED count and brightness so the strips' total current stays under it.

```{warning}
The 12 V input has no fuse and no reverse-polarity protection on the board. Power it from a fused output, such as a spare port on the Power Distribution Hub (PDH) or Power Distribution Panel (PDP), and check the polarity before you turn on the robot.
```

### Wire the power input

1. Turn off the robot.
2. Run a pair of wires from a fused PDH or PDP output to the board's screw terminal.
3. Connect the positive wire to **+12V** and the negative wire to **GND**, then tighten the terminal screws.
4. Connect the board to the robot controller with a USB-C data cable.

## LED connectors

The LED connectors are 3-pin JST VH (3.96 mm pitch). The pins are labeled, from pin 1: **GND**, **DATA**, **5V**. Match them to the strip's ground, data input, and 5 V wires.

| | ConnectorX | ConnectorX Animate |
|---|---|---|
| LED channels | 1 | 4 |
| Connector labels | **CHAN0**, **CHAN1** | **1**, **2**, **3**, **4** |
| Maximum LEDs per channel | 320 | 320 |

On ConnectorX, the firmware drives one LED channel. Connect your LEDs to **CHAN0**.

On ConnectorX Animate, each LED connector has an **ACTIVE** indicator LED next to it.

A configuration that sets a channel `length` above 320 is refused by the board. See [Configuration file reference](config-reference).

## Module connectors

Modules are sensors and other peripherals that the board reads and reports to your code. See [Modules and sensors](programming-guide/modules-and-sensors) for the software side.

All module connectors supply 3.3 V. Neither board has I2C pull-up resistors, so I2C modules must provide their own.

### ConnectorX

| Connector | Pins (from pin 1) | Used for |
|---|---|---|
| Two Grove ports, I2C1 | GND, 3.3V, SDA, SCL | I2C modules |
| **SPI1** (6-pin header) | GND, CS0, SCK, CIPO, COPI, 3.3V | SPI modules |
| **DIO_0**, **DIO_1** (3-pin headers) | 3.3V, PIN, GND | Digital input modules |
| **AIO_0**, **AIO_1** (3-pin headers) | 3.3V, PIN, GND | Analog input modules |
| **SCREEN** (4-pin socket) | GND, 3.3V, SCL, SDA | I2C |

The **SCREEN** socket is on the same I2C bus as the Grove ports. Its SDA and SCL pins are in the opposite order from the Grove ports.

### ConnectorX Animate

| Connector | Pins (from pin 1) | Used for |
|---|---|---|
| **SCREEN** (4-pin socket) | GND, 3.3V, SCL, SDA | I2C modules |

ConnectorX Animate has no Grove port and no SPI, DIO, or AIO headers. Connect I2C modules, up to two, to the **SCREEN** socket.

## Other parts of the board

- **microSD slot**: holds the configuration file and image files. Format the card as FAT32; see the [Quick start guide](quick-start).
- **USB-C port**: connects to the robot controller or a computer.
- **BOOTSEL** button: puts the board in firmware update mode; see [Drivers and firmware](drivers-and-firmware).
- **RST** button: restarts the board.
- Indicator LEDs:
  - **PWR**: lights when the board's 3.3 V logic supply is on.
  - **ALV**: turned on by the firmware when it starts.
  - **STATUS**: an RGB LED that the firmware sets.
