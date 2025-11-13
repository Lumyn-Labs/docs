---
hide-toc: true
---

# Image Sequences (Matrix)

Create and manage image sequences for LED matrices.

## Create a New Image Sequence

Open the Image Sequences page. If none exist, the page is empty. Click Create Image Sequence and pick a source:

- Single Image: Start from one image; design frame-by-frame if desired.
- Animated GIF: Import a GIF to generate frames.
- Free-Draw: Draw directly on the canvas for custom animations, text, and shapes.

```{image} ../assets/lumyn-studio/image-sequences/create-dialog-page1.png
:alt: Image Sequence Creation Dialog Page 1
:height: 400px
```

Assign an ID (for code references), a name, choose a canvas aspect ratio (ideally matching your matrix or source), and optionally add a description and tags. Click Create.

```{image} ../assets/lumyn-studio/image-sequences/create-dialog-page2.png
:alt: Image Sequence Creation Dialog Page 2
:height: 400px
```

## Edit an Image Sequence

The editor includes:

- Preview: Live view of the sequence.
- Controls: Tools to add/remove/edit objects and a play bar to scrub frames.
- Frame List: All frames with add/remove/save controls.

```{image} ../assets/lumyn-studio/image-sequences/editor-page.png
:alt: Image Sequence Editor
```

### Adding Objects

Use the toolbar to add and customize:

- Text: Font, size, color, alignment, etc.
- Rectangle, Circle, Triangle
- Line

Objects can be moved, resized, and deleted.

### Managing Frames

- Click + above the frame list to add a frame.
- Use the frame overflow menu (…) to delete.
- Changes save when switching frames; you can also click the floppy disk icon to save.

### Finalize and Export

Open the top-right menu and choose Save and Generate to compile the sequence. Preview from the menu if needed.

## Add to a Device Configuration

From the Image Sequences page, click Add to Device.

```{image} ../assets/lumyn-studio/image-sequences/add-to-device.png
:alt: Add to Device Dialog
:height: 420px
```

- Select a device configuration.
- Choose a matrix zone (defines exported resolution).
- Save to attach the sequence to the configuration.

```{note}
**2026 Feature - Preview at Size**: Once added to a device configuration, you can preview your image sequences at the exact resolution of the LED Matrix they will display on. This helps you see exactly how your content will appear on the physical hardware before deploying.
```

## Next Steps

- Export with image assets: [Saving & Exporting Configurations](saving-and-exporting-configurations)
- Create strip animations: [Animations & Sequences](animations-and-sequences)
