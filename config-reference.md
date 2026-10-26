---
hide-toc: true
---

# Configuration file reference

A configuration is a JSON file that describes a board's LED channels, zones, animation sequences, images, and modules. Lumyn Studio writes it for you. This page describes each field so you can read an exported file, write one by hand, or check one that the board refuses.

The board keeps its configuration as `config.json` in the root of the microSD card. Your code can also send one; see [Device configuration](programming-guide/device-configuration).

Keys and string values are case-sensitive. Use the exact spellings on this page.

## Minimal configuration

```json
{
  "network": { "mode": "USB" },
  "channels": {},
  "sequences": [],
  "sensors": [],
  "groups": []
}
```

## Top-level fields

| Field | Type | Required | Description |
|---|---|---|---|
| `team` | string | No | Your FRC team number, as digits, from `"0"` to `"99999"`. |
| `network` | object | Yes | How the robot talks to the board. See [Network](#network). |
| `channels` | object | No | LED channels, keyed by channel number. See [Channels](#channels). |
| `sequences` | array | No | Animation sequences. See [Sequences](#sequences). |
| `animations` | array | No | Lumyn animation (`.lla`) files. See [Animation files](#animation-files). |
| `bitmaps` | array | No | Images and image sequences for matrix zones. See [Bitmaps](#bitmaps). |
| `sensors` | array | No | Modules. See [Modules](#modules). |
| `groups` | array | No | Zone groups. See [Groups](#groups). |
| `version` | string | No | Configuration format version. |

Modules go under `sensors`. The board does not read a `modules` key.

## Network

| Field | Type | Description |
|---|---|---|
| `mode` | string | `"USB"` or `"UART"`. Required. |
| `baudRate` | integer | UART speed, from 9600 to 921600. Required when `mode` is `"UART"`. |

USB is always available, whatever `mode` says. `"UART"` adds a UART connection and works on ConnectorX only.

The board also accepts `"I2C"` (with an `address` from 2 to 126) and `"CAN"`, but neither ConnectorX nor ConnectorX Animate has those connections.

A change to `network` takes effect the next time the board starts.

## Channels

`channels` is an object. Each key is a channel number as a string: `"1"` on ConnectorX, `"1"` to `"4"` on ConnectorX Animate.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Channel name. |
| `length` | integer | Yes | Number of LEDs on the channel, up to 320. |
| `zones` | array | Yes | The zones on this channel, in wiring order. |
| `brightness` | integer | No | Default brightness for the channel, from 0 to 255. |

## Zones

A zone is a section of a channel that your code controls by its `id`. A zone is a strip or a matrix.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Zone name. Your code uses it. |
| `type` | string | Yes | `"strip"` or `"matrix"`. |
| `brightness` | integer | No | Brightness for this zone, from 0 to 255. |

### Strip zone

| Field | Type | Required | Description |
|---|---|---|---|
| `length` | integer | Yes | Number of LEDs in the zone. |
| `reversed` | boolean | No | `true` reverses the zone's direction. |

### Matrix zone

| Field | Type | Required | Description |
|---|---|---|---|
| `rows` | integer | Yes | Number of rows. |
| `cols` | integer | Yes | Number of columns. |
| `orientation` | object | Yes | How the LEDs are wired. All four fields are required. |

```json
{
  "id": "front-matrix",
  "type": "matrix",
  "rows": 8,
  "cols": 32,
  "orientation": {
    "cornerTopBottom": "top",
    "cornerLeftRight": "left",
    "axisLayout": "rows",
    "sequenceLayout": "zigzag"
  }
}
```

## Matrix orientation

The orientation tells the board where each LED of the matrix is, so text and images come out the right way up. Look at the matrix from the side you will view it from, and find the first LED, the one the data wire connects to.

| Field | Values | Meaning |
|---|---|---|
| `cornerTopBottom` | `"top"`, `"bottom"` | Whether the first LED is in the top row or the bottom row. |
| `cornerLeftRight` | `"left"`, `"right"` | Whether the first LED is in the left column or the right column. |
| `axisLayout` | `"rows"`, `"cols"` | Whether the LEDs run along a row before moving to the next row (`"rows"`), or down a column before moving to the next column (`"cols"`). |
| `sequenceLayout` | `"progressive"`, `"zigzag"` | `"progressive"`: every row (or column) runs in the same direction. `"zigzag"`: each row (or column) runs the opposite way from the one before, as in a matrix wired in one continuous snake. |

A value other than the ones listed is read as the first value in its list: `"top"`, `"left"`, `"rows"`, `"progressive"`.

These grids show which LED, counting from 0, is at each position of a matrix with 3 rows and 4 columns, as you view it.

`top`, `left`, `rows`, `progressive`:

```text
 0  1  2  3
 4  5  6  7
 8  9 10 11
```

`top`, `left`, `rows`, `zigzag`:

```text
 0  1  2  3
 7  6  5  4
 8  9 10 11
```

`bottom`, `left`, `rows`, `zigzag`:

```text
 8  9 10 11
 7  6  5  4
 0  1  2  3
```

`top`, `left`, `cols`, `zigzag`:

```text
 0  5  6 11
 1  4  7 10
 2  3  8  9
```

`top`, `right`, `cols`, `progressive`:

```text
 9  6  3  0
10  7  4  1
11  8  5  2
```

If text appears mirrored left to right, change `cornerLeftRight`. If it appears upside down, change `cornerTopBottom`. If every other row or column appears reversed, change `sequenceLayout`. If rows appear as columns, change `axisLayout`.

## Sequences

A sequence is a list of animation steps that play in order. Your code plays it by its `id`.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Sequence name. |
| `steps` | array | Yes | The steps, in order. |

Each step:

| Field | Type | Required | Description |
|---|---|---|---|
| `animationId` | string | Yes | Animation name, such as `"Blink"` or `"RainbowRoll"`. See [LED animations](programming-guide/led-animations). |
| `delay` | integer | Yes | Time between animation frames, in milliseconds. |
| `reversed` | boolean | Yes | `true` runs the animation in the opposite direction. |
| `color` | object | No | `{ "r": 0-255, "g": 0-255, "b": 0-255 }`. |
| `repeat` | integer | No | Repeat count for the step, from 0 to 255. |

## Animation files

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Animation name. |
| `path` | string | Yes | Path to the `.lla` file on the board. |

## Bitmaps

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Image name. Your code uses it. |
| `type` | string | Yes | `"static"` for one image, `"animated"` for a sequence of frames. |
| `path` | string | For `"static"` | Path to the image file on the board. |
| `folder` | string | For `"animated"` | Folder that holds the frames. |
| `delay` | integer | For `"animated"` | Time between frames, in milliseconds. |

## Modules

Each entry in `sensors` is one module. See [Modules and sensors](programming-guide/modules-and-sensors) for which modules each board supports.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Module name. Your code uses it. |
| `type` | string | Yes | Module type, such as `"DigitalInput"`, `"AnalogInput"`, or `"VL53L1X"`. |
| `pollingRateMs` | integer | Yes | How often the board reads the module, in milliseconds: `0`, or 20 or more. |
| `connection` | string | Yes | `"I2C"`, `"SPI"`, `"UART"`, `"DIO"`, or `"AIO"`. |
| `config` | object | No | Settings for the module type, as string, number, or boolean values. For example, `DigitalInput` and `AnalogInput` take a `pin`, such as `"DIO0"` or `"AIO0"`. |

```json
"sensors": [
  {
    "id": "tof-sensor",
    "type": "VL53L1X",
    "pollingRateMs": 100,
    "connection": "I2C"
  }
]
```

## Groups

A group lets your code control several zones with one command.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Group name. |
| `zoneIds` | array of strings | Yes | The `id` of each zone in the group. |

## Configurations the board refuses

With firmware 4.4 and later, a configuration you send is checked before it replaces the saved one. The board refuses the whole file, and keeps running its saved configuration, when any of these is true:

- The file is not valid JSON.
- `network` or `network.mode` is missing, `mode` is not one of `"USB"`, `"UART"`, `"I2C"`, or `"CAN"`, or a UART or I2C setting is missing or out of range.
- `team` is a string that is not a number from 0 to 99999.
- A channel has no `id`, `length`, or `zones`, or its `length` is above 320.
- A zone has no `id` or `type`, its `type` is not `"strip"` or `"matrix"`, a strip has no `length`, or a matrix has no `rows`, `cols`, or any of the four `orientation` fields.
- A brightness or color value is outside 0 to 255.
- A sequence has no `id` or `steps`, or a step has no `animationId`, `delay`, or `reversed`.
- An animation file has no `id` or `path`.
- A bitmap has no `id`, its `type` is not `"static"` or `"animated"`, a static bitmap has no `path`, or an animated bitmap has no `folder` or `delay`.
- A module has no `id`, `type`, `pollingRateMs`, or `connection`, its `pollingRateMs` is between 1 and 19, or its `connection` is not one of the listed values.
- A group has no `id` or `zoneIds`.
