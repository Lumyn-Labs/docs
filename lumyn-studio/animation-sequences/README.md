# Animation Sequences

The Animation Sequences page allows you to create and edit animation sequences as well as add them to a device configuration. An animation sequence is a series of animations that are played in order, allowing you to create complex lighting effects.

## Overview

By default, the Animation Sequences page is empty. If you have created any animation sequences, they will be displayed here. You can create a new animation sequence by clicking the "Create New Sequence" button.

## Creating a New Animation Sequence

To create a new animation sequence, click the "Create Animation Sequence" button. Next, give your sequence an id (This will be used to reference the sequence in code), a human readable name. Then, choose an animation to start with. Optionally, you can also add a description and tags to help organize your sequences.

The available animations are:
- **Blink**: All LEDs in the zone will blink on and off with a specified color.
- **Breathe**: All LEDs in the zone will fade in and out with a specified color.
- **Chase**: A patch of color will move across the zone.
- **FadeIn**: All LEDs in the zone will fade in with a specified color.
- **FadeOut**: All LEDs in the zone will fade out with a specified color.
- **Fill**: All LEDs in the zone will turn on with a specified color.
- **RainbowFade**: A rainbow of colors will move along the zone.
- **SineRoll**: A changing sine wave will move along the zone with a specified color.
- **RainbowFill**: All LEDs in the zone will turn on in a sequence of colors.

You can also hover over the animations to see a preview of what they look like.

<img src="/lumyn-studio/animation-sequences/new-animation-sequence.png" alt="Creating a new animation sequence" height="400px"/>

## Editing an Animation Sequence

The animation sequence editor allows you to add, remove, and reorder animations in an animation sequence. It may look a bit intimidating at first, but it's quite simple to use.
Let's break down the editor:

<img src="/lumyn-studio/animation-sequences/animation-sequence-editor.png" alt="Animation Sequence Editor" height="400px"/>

- **Preview**: This area shows a preview of what the animation sequence will look like. It's a panable and zoomable canvas that shows the leds and their colors.
- **Play Bar**: Below the preview is the play bar. This allows you to play, pause, and stop the animation sequence. By default it will only have two states since the sequence is empty.
- **Step List**: To the right of the preview is the step list. This is where you can add, remove, and reorder animations in the sequence. Each step represents a single animation in the sequence.
- **Step Play Bar**: Below the step list is the step play bar. This allows you to play, pause, and stop the current step.
- **Step Editor**: Below the step play bar is the step editor. This is where you can configure the current step, such as the color, brightness and state delay. You can also choose if the step should be reversed.
- **Animation Selector**: At the bottom of the page is the animation selector. This allows you to choose which animation to add to the sequence.

For now, let's add a blink animation to the sequence. Choose blink from the animation selector, give it a color, and leave the other settings as default. Click "Add Step to Sequence" to add the blink animation to the sequence.

Now that our first step is added to the sequence, we can save the sequence. Click on the "Save" button in the top right corner of the page. You can also click "Cancel" to discard the sequence.

## Building Up a Sequence

Once you've added your first animation, you can continue to add more steps to build a complex animation sequence.  Each step can use a different animation, color, duration, and even be reversed.  Experiment with different combinations to create unique and interesting effects.

To add another step:

1. Select a new animation from the **Animation Selector**.
2. Configure the animation's parameters in the **Step Editor** (color, brightness, duration, reverse).
3. Click \"Add Step to Sequence\".  The new step will be appended to the end of the sequence.

> [!TIP]
> Use the **Preview** area to visualize your sequence as you build it. The preview dynamically updates as you add and modify steps.

## Adding an Animation Sequence to a Device Configuration

After creating and saving your animation sequence, you need to add it to a device configuration to see it in action on your physical device.  Click the "Add to Device" button in the **Top Bar**.

## Previewing Your Animation Sequence

Before deploying your sequence to a device, thoroughly test it within the Lumyn Studio. Use the **Play Bar** to play the entire sequence and the **Step Play Bar** to test individual steps. The **Preview** area provides a visual representation of how the animation will appear on your device. Pay close attention to timing and order of steps to ensure a visually appealing effect. Adjust parameters in the **Step Editor** as needed to fine-tune your animation.

# Next Steps

Once you've completed your **Animation Sequence**, you may want to start creating [Image Sequences](/lumyn-studio/image-sequences/#) or adding [Modules](/lumyn-studio/modules-page/#).