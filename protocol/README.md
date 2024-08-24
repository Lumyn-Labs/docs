# Serial Protocol
The purpose of this document is to describe the serial protocol used to communicate with Lumyn Labs devices. The protocol is designed for compatibility with the arduino [SerialTransfer](https://github.com/PowerBroker2/SerialTransfer) library. It is also designed to be extensible, so that new devices, features, and messages can be added in the future.

## Glossary

| Term                         | Definition                                                                                        |
|------------------------------|---------------------------------------------------------------------------------------------------|
| ConnectorX                   | An LED controller and sensor breakout board produced by Lumyn Labs                                |
| Controller                   | A computer, the roborio, or any other device that can communicate over a serial port              |
| CRC                          | A cyclic redundancy check, used to verify the integrity of a message                              |
| Animation, Zone, or Group ID | The last two bytes of an MD5 hash of the animation, zone, or group name which has been mod 0xFFFF |
| Fault                        | A bit in a bitmask that represents an error or fault condition                                    |
| Device ID                    | A numerical id used to reference the device, assigned by the user                                 |
| Event                        | A message that is sent to the controller or ConnectorX to notify of a change in state             |
| Status                       | The current state of the device, errors, and other information                                    |
| Product SKU                  | The SKU of the product, used to differentiate between models                                      |

## Message Format
```
The following is copied from the SerialTransfer library documentation:
 _______________________________________________________________________________
01111110 00000000 11111111 00000000 00000000 00000000 ... 00000000 10000001
|      | |      | |      | |      | |      | |      | | | |      | |______|__Stop byte
|      | |      | |      | |      | |      | |      | | | |______|___________8-bit CRC
|      | |      | |      | |      | |      | |      | |_|____________________Rest of payload
|      | |      | |      | |      | |      | |______|________________________2nd payload byte
|      | |      | |      | |      | |______|_________________________________1st payload byte
|      | |      | |      | |______|__________________________________________# of payload bytes
|      | |      | |______|___________________________________________________COBS Overhead byte
|      | |______|____________________________________________________________Packet ID (0 by default)
|______|_____________________________________________________________________Start byte (constant)
```

While the protocol is designed to be compatible with the SerialTransfer library, there is more metadata that is sent with each packet. This is to be specific to the LumynLabs devices, and allow for future expansion (new devices, new features, etc). The packet ID is used to determine the type of the message, and the first few bytes of the payload are used to determine the other metadata. The rest of the payload is the actual data being sent.

The first two bytes of the payload are for identifying the message. The first byte is the transmission class, and the second byte is the transmission type. The rest of the payload is the data being sent.

## Transmission Classes

| Transmission Type (class) | Description                                   | ID |
|---------------------------|-----------------------------------------------|----|
| Handshake                 | A handshake message to establish a connection | 0  |
| Request                   | A request for data from the ConnectorX        | 1  |
| Response                  | A response to a request                       | 2  |
| Event                     | An event that either side should act upon     | 3  |
| Config                    | Contains the ConnectorX configuration         | 4  |
| Command                   | A command to the ConnectorX                   | 5  |

## Handshake
The handshake message is used to establish a connection between the controller and the ConnectorX. It is sent by the Controller to the ConnectorX when the connection is first established. There are two types of handshake messages, the request has id 0, and the response has id 1.

### Handshake Request (Controller -> ConnectorX)
While other fields may be added in the future, fields may not be removed or changed. This is to ensure backwards compatibility with future versions of the protocol.

| Byte # | Description | Value Type | Value Description           |
|--------|-------------|------------|-----------------------------|
| 0      | Version     | uint8_t    | The version of the protocol |

### Handshake Message (ConnectorX -> Controller)
The handshake message is sent in response to the handshake request.

| Byte # | Description | Value Type | Value Description               |
|--------|-------------|------------|---------------------------------|
| 0      | Version     | uint8_t    | The version of the protocol     |
| 1-2    | Product SKU | uint16_t   | The product SKU of the device   |
| 3-6    | Serial #    | uint32_t   | The serial number of the device |
| 7-14   | Config Hash | uint8_t[8] | The hash of the config          |

Once the handshake is complete, the controller and ConnectorX can begin communicating. If the handshake fails, the controller should close the connection and display an error message.

## Request Types

| Request Type (type) | Description                                                 | ID |
|---------------------|-------------------------------------------------------------|----|
| Status              | Request the status of the device                            | 0  |
| ProductSKU          | Request the product SKU of the device                       | 1  |
| ProductSerialNumber | Request the serial number of the device                     | 2  |
| ConfigHash          | Request the hash of the config                              | 3  |
| Faults              | Request the faults of the device                            | 4  |
| DeviceStatus        | Request the status of the device coupled with the device ID | 5  |
| DeviceData          | Request the data of the device                              | 6  |
| LEDChannelStatus    | Request the status of an LED channel                        | 7  |
| LEDZoneStatus       | Request the status of a Zone                                | 8  |
| LatestEvent         | Request the latest event                                    | 9  |
| EventFlags          | Request the event flags                                     | 10 |

## Response Types
See Request Types, the response message will have the same transmission type id, but a different class id.

### StatusInfo

TODO

### ProductSKU

| Byte # | Description | Value Type | Value Description |
|--------|-------------|------------|-------------------|
| 0-1    | Product SKU | uint16_t   | The product SKU   |

### ProductSerialNumber

| Byte # | Description      | Value Type | Value Description         |
|--------|------------------|------------|---------------------------|
| 0-3    | Product Serial # | uint32_t   | The product serial number |

### ConfigHash

| Byte # | Description | Value Type | Value Description      |
|--------|-------------|------------|------------------------|
| 0-7    | Hash        | uint8_t[8] | The hash of the config |

### Faults

| Byte # | Description | Value Type | Value Description |
|--------|-------------|------------|-------------------|
| 0-3    | Faults      | uint32_t   | The fault bitmask |

### DeviceStatus

| Byte # | Description | Value Type | Value Description        |
|--------|-------------|------------|--------------------------|
| 0-1    | Device ID   | uint16_t   | The ID of the device     |
| 2      | Status      | uint8_t    | The status of the device |

### DeviceData

| Byte # | Description | Value Type  | Value Description      |
|--------|-------------|-------------|------------------------|
| 0-1    | Device ID   | uint16_t    | The ID of the device   |
| 2-17   | Data        | uint8_t[16] | The data of the device |
| 18     | Length      | uint8_t     | The length of the data |

### LEDChannelStatus

| Byte # | Description | Value Type | Value Description         |
|--------|-------------|------------|---------------------------|
| 0-1    | Channel ID  | uint16_t   | The ID of the LED channel |

### LEDZoneStatus

| Byte # | Description | Value Type | Value Description  |
|--------|-------------|------------|--------------------|
| 0-1    | Zone ID     | uint16_t   | The ID of the zone |

### LatestEvent

| Byte # | Description | Value Type | Value Description |
|--------|-------------|------------|-------------------|
| 0-3    | Event       | uint32_t   | The EventType     |

### EventFlags

| Byte # | Description | Value Type | Value Description |
|--------|-------------|------------|-------------------|
| 0-3    | Flags       | uint32_t   | The event flags   |

## Event Types

| Event Type (type)    | Description                            | ID |
|----------------------|----------------------------------------|----|
| BeginInitialization  | The device has begun initialization    | 0  |
| FinishInitialization | The device has finished initialization | 1  |
| Enabled              | The device has been enabled            | 2  |
| Disabled             | The device has been disabled           | 3  |
| Connected            | The device has been connected          | 4  |
| Disconnected         | The device has been disconnected       | 5  |
| Error                | An error has occurred                  | 6  |
| FatalError           | A fatal error has occurred             | 7  |
| RegisteredEntity     | An entity has been registered          | 8  |
| Custom               | A custom event                         | 9  |
| PinInterrupt         | A pin interrupt has occurred           | 10 |
| HeartBeat            | A periodic status event                | 11 |

## Config
When the controller sends a config message, the first byte of the payload is the config version. The rest of the payload is a base64 encoded string of the config json.

## Command Types
Command types are addressed using an 8 bit identifier, which is the first byte sent in the Command. The following table describes the command types.

| Command Type (type) | Description     | ID |
|---------------------|-----------------|----|
| System              | System commands | 0  |
| LED                 | LED commands    | 1  |
| Device              | Device commands | 2  |

## LED Command Types

| Command Type (type)       | Description                                   | ID |
|---------------------------|-----------------------------------------------|----|
| SetAnimation              | Set the animation of an LED channel           | 0  |
| SetAnimationGroup         | Set the animation of a group of LEDs          | 1  |
| SetColor                  | Set the color of an LED channel               | 2  |
| SetColorGroup             | Set the color of a group of LEDs              | 3  |
| SetAnimationSequence      | Set the animation sequence of an LED channel  | 4  |
| SetAnimationSequenceGroup | Set the animation sequence of a group of LEDs | 5  |
| SetBitmap                 | Set the bitmap of an LED channel              | 6  |
| SetBitmapGroup            | Set the bitmap of a group of LEDs             | 7  |

### SetAnimation

| Byte # | Description  | Value Type | Value Description              |
|--------|--------------|------------|--------------------------------|
| 0-1    | Zone ID      | uint16_t   | The ID of the zone             |
| 2-3    | Animation ID | uint16_t   | The ID of the animation        |
| 4-5    | Delay        | uint16_t   | The animation's delay          |
| 6-8    | Color        | uint8_t[3] | The color of the LED (R, G, B) |
| 9      | Reversed     | uint8_t    | The reversed flag              |
| 10     | OneShot      | uint8_t    | The OneShot flag               |

### SetAnimationGroup

| Byte # | Description  | Value Type | Value Description              |
|--------|--------------|------------|--------------------------------|
| 0-1    | Group ID     | uint16_t   | The ID of the group            |
| 2-3    | Animation ID | uint16_t   | The ID of the animation        |
| 4-5    | Delay        | uint16_t   | The animation's delay          |
| 6-8    | Color        | uint8_t[3] | The color of the LED (R, G, B) |
| 9      | Reversed     | uint8_t    | The reversed flag              |
| 10     | OneShot      | uint8_t    | The OneShot flag               |

### SetColor

| Byte # | Description | Value Type | Value Description              |
|--------|-------------|------------|--------------------------------|
| 0-1    | Zone ID     | uint16_t   | The ID of the zone             |
| 2-4    | Color       | uint8_t[3] | The color of the LED (R, G, B) |

### SetColorGroup

| Byte # | Description | Value Type | Value Description              |
|--------|-------------|------------|--------------------------------|
| 0-1    | Group ID    | uint16_t   | The ID of the group            |
| 2-4    | Color       | uint8_t[3] | The color of the LED (R, G, B) |

### SetAnimationSequence

| Byte # | Description | Value Type | Value Description      |
|--------|-------------|------------|------------------------|
| 0-1    | Zone ID     | uint16_t   | The ID of the zone     |
| 2-3    | Sequence ID | uint16_t   | The ID of the sequence |

### SetAnimationSequenceGroup

| Byte # | Description | Value Type | Value Description      |
|--------|-------------|------------|------------------------|
| 0-1    | Group ID    | uint16_t   | The ID of the group    |
| 2-3    | Sequence ID | uint16_t   | The ID of the sequence |

### SetBitmap

| Byte # | Description | Value Type | Value Description                            |
|--------|-------------|------------|----------------------------------------------|
| 0-1    | Zone ID     | uint16_t   | The ID of the zone                           |
| 2-3    | Bitmap ID   | uint16_t   | The ID of the bitmap                         |
| 4-6    | Color       | uint8_t[3] | The color of the Bitmap (R, G, B)            |
| 7      | setColor    | uint8_t    | The setColor flag (is the bitmap grayscale?) |
| 8      | OneShot     | uint8_t    | The OneShot flag                             |

### SetBitmapGroup

| Byte # | Description | Value Type   | Value Description                            |
|--------|-------------|--------------|----------------------------------------------|
| 0-1    | Group ID    | uint16_t     | The ID of the group                          |
| 2-3    | Bitmap ID   | uint16_t     | The ID of the bitmap                         |
| 4-6    | Color       | 3 uint8_t[3] | The color of the Bitmap (R, G, B)            |
| 7      | setColor    | uint8_t      | The setColor flag (is the bitmap grayscale?) |
| 8      | OneShot     | uint8_t      | The OneShot flag                             |

## System Command Types

| Command Type (type) | Description         | ID |
|---------------------|---------------------|----|
| ClearStatusFlag     | Clear a status flag | 0  |
| Reboot              | Reboot the device   | 1  |

### ClearStatusFlag

| Byte # | Description | Value Type | Value Description         |
|--------|-------------|------------|---------------------------|
| 0-3    | Flag        | uint32_t   | Bitmask for flag to clear |

## Device Command Types
Marked for future expansion