# Animation Sequences

The **Animation Sequences** page allows you to create and edit animation sequences, as well as add them to a device configuration. An animation sequence is a series of animations that are played in order, allowing you to create complex lighting effects.

## Overview

By default, the Animation Sequences page is empty. If you have created any animation sequences, they will be displayed here. You can create a new animation sequence by clicking the "**Create New Sequence**" button.

## Creating a New Animation Sequence

To create a new animation sequence, click the "**Create Animation Sequence**" button. Next, give your sequence an ID (this will be used to reference the sequence in code) and a human-readable name. Then, choose an animation to start with. For this tutorial we will choose the **Blink** animation. Optionally, you can also add a description and tags to help organize your sequences.

The available animations are:
- **Blink**: All LEDs in the zone will blink on and off with a specified color.
- **Breathe**: All LEDs in the zone will fade in and out with a specified color.
- **Chase**: A patch of color will move across the zone.
- **FadeIn**: All LEDs in the zone will fade in with a specified color.
- **FadeOut**: All LEDs in the zone will fade out with a specified color.
- **Fill**: All LEDs in the zone will turn on with a specified color.
- **RainbowRoll**: A rainbow of colors will move along the zone.
- **SineRoll**: A changing sine wave will move along the zone with a specified color.
- **RainbowCycle**: All LEDs in the zone will cycle through a rainbow of colors.
- **AlternateBreathe**: Every other LED in the zone will fade in and out with a specified color.
- **GrowingBreathe**: The zone will fill with a specified color, one LED at a time.

You can also hover over the animations to see a preview of what they look like.

<img src="/lumyn-studio/animation-sequences/new-animation-sequence.png" alt="Creating a new animation sequence" height="400px"/>

## Editing an Animation Sequence

The **Animation Sequence Editor** allows you to add, remove, and reorder animations in an animation sequence. It may look a bit intimidating at first, but it's quite simple to use. Let’s break down the editor:

<img src="/lumyn-studio/animation-sequences/animation-sequence-editor.png" alt="Animation Sequence Editor" height="400px"/>

- **Animation Preview**: This area shows a preview of what the animation sequence will look like. It contains a simulated LED strip that displays animations as they would appear on a physical device.
- **Step Controls**: This area provides a play bar to control the current step in the sequence.
- **Sequence Steps**: To the right of the preview is the step list. This is where you can add, remove, and reorder animations in the sequence. Each step represents a single animation in the sequence.
- **Play Bar**: Inside the step list is the step play bar. This allows you to play, pause, and stop all steps in the sequence.
- **Step Editor**: Below the step play bar is the step editor. This is where you can configure steps in the sequence, such as the color, brightness and state delay. You can also choose if a step should be reversed.
- **Animations**: At the bottom of the page is the animation selector. This allows you to choose which animation to add to the sequence. Hover over an animation to see a preview of what it looks like.

Now that our first step is added to the sequence, we can save the sequence. Click on the "**Save**" button in the top right corner of the page. You can also click "**Cancel**" to discard the sequence.

## Building Up a Sequence

Once you've added your first animation, you can continue to add more steps to build a complex animation sequence. Each step can use a different animation, color, duration, and even be reversed.  Experiment with different combinations to create unique and interesting effects.

To add another step:

1. Select a new animation from the **Animation Selector**.
2. Click "**Add Step to Sequence**".  The new step will be appended to the end of the sequence.
3. Configure the animation's parameters in the **Step Editor** (color, brightness, duration, reverse).

> [!TIP]
> Use the Preview area to visualize your sequence as you build it. The preview dynamically updates as you add and modify steps.

## Adding an Animation Sequence to a Device Configuration

After creating and saving your animation sequence, you need to add it to a device configuration in order to see it in action on your physical device.  Click the "**Add to Device**" button in the **Top Bar**.

## Previewing Your Animation Sequence

Before deploying your sequence to a device, thoroughly test it within the Lumyn Studio. Use the **Play Bar** to play the entire sequence and the **Step Controls** to test individual steps. The **Preview** area provides a visual representation of how the animation will appear on your device. Pay close attention to timing and order of steps to ensure a visually appealing effect. Adjust parameters in the **Step Editor** as needed to fine-tune your animation.

# Next Steps

Once you've completed your **Animation Sequence**, you may want to start creating [Image Sequences](/lumyn-studio/image-sequences/#) or adding [Modules](/lumyn-studio/modules-page/#).