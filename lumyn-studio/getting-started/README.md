# Getting Started

To get started with **Lumyn Studio**, you'll need a modern chromium-based browser (Chrome, Edge, etc.) and a **Lumyn Labs device**. If you don't have a device, you can still create animations and sequences but you won't be able to apply them to a configuration.

## Accessing Lumyn Studio

To access Lumyn Studio, visit [studio.lumynlabs.com](https://studio.lumynlabs.com). Let's start by exploring the interface.

## Interface Overview

The studio interface is divided into tabs, each with a specific purpose. Here's a quick overview of each tab:

- **Home**: This is where you find yourself right now. It provides quick access to documentation, support, and commonly used pages in the app.
<!-- ![Home Tab](/assets/lumyn-studio/home-tab.png) -->
- **Devices**: This tab lists all devices that have been connected to the studio. You can select a device to view and edit its configuration as well as export the configuration.
<!-- ![Devices Tab](/assets/lumyn-studio/devices-tab.png) -->
- **Modules**: This tab lists all modules that are available for use with a device. You can browse official modules, create custom modules, and view more detailed information, such as the module's API.
<!-- ![Modules Tab](/assets/lumyn-studio/modules-tab.png) -->
- **Animation Sequences**: This tab is where you create and manage animation sequences intended for an LED strip. An animation sequence is a series of individual animations (Blink, Chase, etc.) that are played in order.
<!-- ![Animation Sequences Tab](/assets/lumyn-studio/animation-sequences-tab.png) -->
- **Image Sequences**: This tab is where you create and manage image sequences intended for an LED matrix. An image sequence is a series of images displayed in order. You can create it from a starting image, import a GIF, or draw directly on the canvas.
<!-- ![Image Sequences Tab](/assets/lumyn-studio/image-sequences-tab.png) -->
- **Settings**: This tab allows you to configure settings for the studio, such as the FRC team number.

Additionally, the title bar at the top of the screen provides quick access to the home page, connecting to a device, and settings.

## Connecting to a Device

> [!NOTE]
> This tutorial uses the [ConnectorX](/devices/connectorx) device as an example. The interface may look slightly different depending on the device you're using.

> [!WARNING]
> Connecting to a device requires a modern chromium-based browser (Chrome, Edge, etc.) because the studio uses the Web Serial API to communicate with the device, which is not supported in all browsers. If you're having trouble connecting, try using a different browser.

Now that you're familiar with the interface, let’s connect to a device. To do this, you’ll need a **Lumyn Labs device** and a USB cable. Connect the device to your computer and wait for it to boot up. If you’ve attached an OLED screen, it should display the model of the device.

Next, click the **Connect** button in the title bar and select the device you’d like to connect to. If the device is not listed, try refreshing the page. Once you've selected a device, click **Connect**, and the **Connected Device Panel** will appear.

<!-- ![Connecting to a Device](/assets/lumyn-studio/connecting-to-a-device.gif) -->

## The Connected Device Panel

The **Connected Device Panel** provides a quick overview of the connected device variant and what it supports. Because this is the first time we've connected to this device, the panel will prompt us to create a new device configuration.

<img src="/lumyn-studio/getting-started/new-device.png" alt="New Device" height="400px"/>

Start by clicking "**Set up my device**", give your device a name, and click **Add**.

<img src="/lumyn-studio/getting-started/new-config.png" alt="Setting up a new device" height="400px"/>

Studio will automatically create a new device configuration with the default settings. This panel provides many tools for interacting with a connected device, but for now, we'll focus on the device configuration. To learn more, visit the [Connected Device Panel](/lumyn-studio/connected-device-panel/) page.

Click outside of the **Connected Device Panel** to explore the **Devices Tab**.

## The Devices Tab

The **Devices Tab** has been updated to show the device we just connected to and is redirected to display our new configuration. The device configuration area provides an overview of the device, its added sequences, modules, and allows you to export the configuration.

Along the left side of the screen, there are a few buttons that allow access to the different configuration sections:

- **Configuration**: This is the default view. It provides an overview of the device and shows all channels, sequences, and modules that have been added to the device.
- **LED Channels**: This view allows you to configure the LED channels on the device, configure zones, and create or edit groups.
- **Modules**: This page allows you to view and edit modules that have been added to the device.
- **Animation Sequences**: This page allows you to preview and edit animation sequences that have been added to the device.
- **Image Sequences**: This page allows you to preview and edit image sequences that have been added to the device.
- **Information**: This page provides detailed information about the device variant and its capabilities. You can also rename the device here.

Currently, the **Configuration** page is selected. This page provides an overview of the device and its configuration. You can also export the configuration from this page, which is useful for sharing configurations or saving a backup.

<img src="/lumyn-studio/getting-started/configuration-overview.png" alt="The Configuration Overview" height="600px"/>

Now that you've connected to your new device, you’ll want to start creating LED animations. Before we do that, we need to configure the LED channels on the device. Let’s head over to the **LED Channels** page and get started! Click on the **LED Channels** button on the left side of the screen.

## LED Channels

The **LED Channels** page allows you to configure the LED channels on the device. Each channel can be configured with a length, many zones, and groups. A **zone** is a section of the channel that can be controlled independently, and a **group** is a collection of zones that can be controlled together.

<img src="/lumyn-studio/getting-started/led-channels.png" alt="LED Channels Page" height="600px"/>

Because this is a fresh configuration, there are no channels, zones, or groups. Let’s start by adding a new channel. Click on an empty port and select "**Configure**". Give your channel an ID (this is unique and used to reference the channel when controlling it directly, it cannot be changed later), a length, and a brightness. If you're unsure what brightness to use, select **Auto**, and ConnectorX will adjust the brightness based on the number of LEDs and the power supply.

> [!TIP]
> For power reasons, channel may not have more than 320 LEDs. If you need more than **320 LEDs**, consider the [ConnectorX Animate](/devices/connectorx-animate) device, which has four channels for a total of **1280 LEDs**.

<img src="/lumyn-studio/getting-started/channel-creation.png" alt="Channel Creation" height="200px"/>

Now that our channel is created, we can add our first **zone**. A zone is a section of the channel that can be controlled independently. This is useful for addressing a specific section of LEDs, for example, a robot subsystem. Click the "**Set up a new zone**" button to get started.

Next, we'll need to choose a **zone type**. There are two types of zones: **Strip Zone** and **Matrix Zone**. A **Strip Zone** is a linear section of LEDs, while a **Matrix Zone** is a 2D grid of LEDs. This tutorial will guide you through creating a **Strip Zone**.

<img src="/lumyn-studio/getting-started/zone-type.png" alt="Zone Type Selection" height="200px"/>

After selecting a zone type, you'll need to configure the zone. Give your zone an id and select its brightness, then click **Next**.

<img src="/lumyn-studio/getting-started/strip-zone-step-1.png" alt="Zone Creation" height="400px"/>

Next, choose its length and whether it's reversed. A reversed zone will be addressed in reverse order, this is useful for running animations in the opposite direction. Once you are satisfied with the zone configuration, click "**Save**".

<img src="/lumyn-studio/getting-started/strip-zone-step-2.png" alt="Zone Configuration" height="400px"/>

Once you've created a zone, it will appear in the list of zones for the channel. You can add more zones by clicking the "**Set up a new zone**" button. Zones can be reordered by dragging and dropping them in the list.

Now that we have a channel and a zone, we can move on to creating an animation sequence. Click on the **Animation Sequences** button on the left side of the screen.

## Animation Sequences

The **Animation Sequences** page allows you to manage and edit animation sequences that have been added to the device. An animation sequence is a series of individual animations (Blink, Chase, etc.) that are played in order.

<img src="/lumyn-studio/getting-started/animation-sequences-devices-tab.png" alt="Animation Sequences Page" height="600px"/>

Let's start by creating a new animation sequence. Click the "**Add Animation Sequence**" button and you'll be redirected to the [animation sequence editor](/lumyn-studio/animation-sequences/#).