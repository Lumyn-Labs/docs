# Controlling Lumyn Labs Devices with WPILib

This section provides documentation for controlling Lumyn Labs devices with WPILib.

## Overview

The Lumyn Labs Vendor Library allows you to control Lumyn Labs devices with WPILib. A significant effort has been made to prioritize ease-of-use so that you can get up and running quickly. Rather than providing a tutorial, this section provides code snippets and examples for possible use-cases.

## Obtaining the Vendor Library

To add the vendor library to your project, use WPILib's 3rd party library tool. To begin, click the wpi icon in the top right corner of VSCode, type `Manage Vendor Libraries` and click on the option that appears. Choose `Install new libraries (online)` and a text field should appear. 

In the text field paste the following url:

```url
https://packages.lumynlabs.com/LumynLabs.json
```

Once you have pasted the url and clicked <kbd>Enter</kbd>, it is reccomended to perform a build to ensure that intelisense picks up the new dependency.

## API Overview

The lumyn labs vendor library resides in the `com.lumynlabs` package in Java and the `lumyn` namespace in C++. In Java, the api is further split into the `device` and `domain` packages. The `device` package provides classes for interacting with lumyn labs devices, while the `domain` package provides classes related to data that is sent to and from the device.

## Connect to a Device

To connect to a device, you must first create an instance of the device class. There are two device classes, `ConnectorX` and `ConnectorXAnimate`, which share some common methods but also have unique methods related to their specific hardware features.

### Java
```java
import com.lumynlabs.devices.ConnectorXAnimate;
import com.lumynlabs.devices.ConnectorX;
import edu.wpi.first.wpilibj.SerialPort.Port;

private ConnectorXAnimate cXAnimate = new ConnectorXAnimate();
private ConnectorX cX = new ConnectorX();

cXAnimate.Connect(Port.kUSB1);
```

### C++ (header)
```cpp
#include <lumyn/device/ConnectorX.h>
#include <lumyn/device/ConnectorXAnimate.h>

lumyn::device::ConnectorX m_cx;
lumyn::device::ConnectorXAnimate m_animate;
```

### C++ (source)
```cpp
#include <hal/SerialPort.h>

m_animate.Connect(HAL_SerialPort_USB1);
m_cx.Connect(HAL_SerialPort_USB2);
```

## Controlling LEDs

Controlling LED strips and matrices is a common use-case for Lumyn Labs devices. The following actions can be performed on either a single zone or a group of zones:

- Set the color
- Set an animation
- Set an animation sequence
- Set a bitmap
- Display text on a Matrix

### Set a Color

#### Java
```java
import edu.wpi.first.wpilibj.util.Color;

// Sets the color of the "left-climber" zone to red
cXAnimate.leds.SetColor("left-climber", new Color(255, 0, 0));
```

#### C++
```cpp
m_animate.SetColor("left-climber", {255, 0, 0});
```

### Set an Animation

#### Java
```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.TimeUnit;

// Sets a gold chase animation on the "left-climber" zone with a period of 40ms that is not reversed and loops indefinitely
cXAnimate.leds.SetAnimation("left-climber", Animation.Chase, new Color(200, 120, 15), Units.Milliseconds.of(40), false, false);

// Sets a red chase animation on the "right-climber" group with a period of 40ms that is reversed and runs only once
cXAnimate.leds.SetGroupAnimation("right-climber", Animation.Chase, new Color(255, 0, 0), Units.Milliseconds.of(40), true, true);
```

#### C++
```cpp
m_animate.SetAnimation("left-climber", lumyn::led::Animation::Chase, {200, 120, 15}, 40ms, false, false);
m_animate.SetGroupAnimation("right-climber", lumyn::led::Animation::Chase, {255, 0, 0}, 40ms, true, true);
```

### Set an Animation Sequence

#### Java
```java
// Sets the "intake" zone to the "intake-sequence" animation sequence
cXAnimate.leds.SetAnimationSequence("intake", "intake-sequence");
```

#### C++
```cpp
m_animate.SetAnimationSequence("intake", "intake-sequence");
```

### Display a Bitmap

#### Java
```java
import edu.wpi.first.wpilibj.util.Color;

// Sets the "front-matrix" zone to the "Emoji_16x16_unknown" bitmap with a purple color not reversed and looping indefinitely
cXAnimate.leds.SetImageSequence("front-matrix", "Emoji_16x16_unknown", new Color(120, 0, 100), false, false);
```

#### C++
```cpp
m_animate.SetImageSequence("front-matrix", "Emoji_16x16_unknown", {120, 0, 100}, false, false);
```

### Display Text on a Matrix

#### Java
```java
import edu.wpi.first.wpilibj.util.Color;
import edu.wpi.first.units.Units;
import edu.wpi.first.units.TimeUnit;
import com.lumynlabs.domain.led.MatrixTextScrollDirection;

// Displays "Hello World!" on the "front-matrix" zone with a white color, scrolling left at a speed of 300ms and looping indefinitely
cXAnimate.leds.SetMatrixText("front-matrix", "Hello World!", new Color(255, 255, 255), MatrixTextScrollDirection.Left, Units.Milliseconds.of(300), true);
```

#### C++
```cpp
m_animate.SetMatrixText("front-matrix", "Hello World!", {255, 255, 255}, lumyn::internal::Command::LED::MatrixTextScrollDirection::LEFT, 300_ms, true);
```

## Event Handling

Both ConnectorX and Animate provide information about the device's state and events that occur. The following events are available:

- Begin Initialization
- Finish Initialization
- Enabled
- Disabled
- Connected
- Disconnected
- Error
- FatalError
- RegisteredEntity
- Custom
- PinInterrupt
- HeartBeat

In some situations, you may want to handle these events. A slightly different approach is used in Java and C++.

#### Java
In Java, events are handled via callbacks. To handle an event, you must call `addEventHandler` on the device instance and provide a lambda function to be called. Callback functions are called on every event, so you must parse the event type to determine the action to take.

```java
cXAnimate.AddEventHandler((e) -> {
      System.out.printf("Found event type %d", e.type.value);
});
```

#### C++
In C++ the method for adding a callback is `SetEventCallback`.

```cpp
m_animate.SetEventCallback([](const lumyn::internal::Eventing::Event &evt)
                             { std::cout << "Got new event " << std::to_string((uint32_t)evt.type) << std::endl; });
```