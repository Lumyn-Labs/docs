# Animation Sequences Page

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

<img src="/lumyn-studio/new-animation-sequence.png" alt="Creating a new animation sequence" height="400px"/>

## Editing an Animation Sequence

The animation sequence editor allows you to add, remove, and reorder animations in an animation sequence. It may look a bit intimidating at first, but it's quite simple to use.
Let's break down the editor:

<img src="/lumyn-studio/animation-sequence-editor.png" alt="Animation Sequence Editor" height="400px"/>

- **Preview**: This area shows a preview of what the animation sequence will look like. It's a panable and zoomable canvas that shows the leds and their colors.
- **Play Bar**: Below the preview is the play bar. This allows you to play, pause, and stop the animation sequence. By default it will only have two states since the sequence is empty.
- **Step List**: To the right of the preview is the step list. This is where you can add, remove, and reorder animations in the sequence. Each step represents a single animation in the sequence.
- **Step Play Bar**: Below the step list is the step play bar. This allows you to play, pause, and stop the current step.
- **Step Editor**: Below the step play bar is the step editor. This is where you can configure the current step, such as the color, brightness and state delay. You can also choose if the step should be reversed.
- **Animation Selector**: At the bottom of the page is the animation selector. This allows you to choose which animation to add to the sequence.

For now, let's add a blink animation to the sequence. Choose blink from the animation selector, give it a color, and leave the other settings as default. Click "Add Step to Sequence" to add the blink animation to the sequence.

Now that our first step is added to the sequence, we can save the sequence. Click on the "Save" button in the top right corner of the page. You can also click "Cancel" to discard the sequence.

---
TODO: information on building up a sequence, adding it to a device, and previewing it.
