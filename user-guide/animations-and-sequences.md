---
hide-toc: true
---

# Animations & Sequences

Create and edit animation sequences, then add them to a device configuration.

## Overview

The Animations & Sequences page lists your sequences. Create a new one with Create Animation Sequence.

## Creating a New Animation Sequence

When creating a sequence, set:

- ID: Used to reference the sequence.
- Name: Human-readable title.
- Starting animation: e.g., Blink.
- Optional description and tags.

Available animations include Blink, Breathe, Chase, FadeIn, FadeOut, Fill, RainbowRoll, SineRoll, RainbowCycle, AlternateBreathe, and GrowingBreathe.

```{image} ../assets/lumyn-studio/animation-sequences/new-animation-sequence.png
:alt: Creating a new animation sequence
```

## Editing a Sequence

Use the editor to add, remove, and reorder steps.

```{image} ../assets/lumyn-studio/animation-sequences/animation-sequence-editor.png
:alt: Animation Sequence Editor
```

- **Animation Sequence Metadata**: Configure ID, Name, Description, and Tags at the top. Use "ADD TO DEVICE" and "SAVE" buttons to save and deploy.
- **Animation Preview**: Visualizes the sequence on a simulated LED strip with a timeline showing the current state. Use the play button and state slider to preview the animation.
- **Animations List**: Browse available animations in a searchable grid. Each animation shows a visual preview. Use the search bar and sort dropdown to find animations.
- **Sequence Steps Panel**: View and manage all steps in your sequence. Each step shows its animation name, delay, repeat count, and color. Use the step slider to navigate between steps.
- **Step Editor**: Configure the selected step's properties including delay, reversed checkbox, repeat count, and color picker. Use the buttons at the bottom to add, duplicate, reorder, or remove steps.

## Next Steps

- [Image Sequences](image-sequences-matrix)
- [Modules](modules)
- [Saving & Exporting Configurations](saving-and-exporting-configurations)
