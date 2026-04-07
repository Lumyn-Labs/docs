---
hide-toc: true
---

# Image Sequences (Matrix)

Create and manage image sequences for LED matrices.

## Create a New Image Sequence

Open the Image Sequences page. If none exist, the page is empty. Click **Create sequence** and pick a source:

- **Import GIF**: Split an animated GIF into frames.
- **Import Image**: Start from a single image as one frame.
- **Free-draw**: Start with a blank canvas.

```{image} ../assets/lumyn-studio/image-sequences/create-dialog-page1.png
:alt: Image Sequence Creation Dialog Page 1
```

The creation flow (**Project setup**) walks through:

- **Details**: ID, Name, Tags.
- **Sizing**: Aspect ratio (presets or custom), source fit (Original, Fit, or Stretch when importing into a preset ratio), and width/height (1–4096 px) with optional linked dimensions.
- **Timeline**: Frame count (1–9999), FPS (1–120), and background (transparent or solid color).

```{image} ../assets/lumyn-studio/image-sequences/create-dialog-page2.png
:alt: Image Sequence Creation Dialog Page 2
```

## Edit an Image Sequence

The **Motion Editor** includes:

- **Toolbar**: Back, sequence name (with unsaved indicator), resolution preset (for example Auto, native size, or a connected matrix size), **Preview** (GIF), **Download** (GIF), **Settings**, **Add to Device**, **Delete**, and **Save**.
- **Left sidebar**: Select tool; add Rectangle, Circle, Triangle, Text, Line, or Image; and a **Layers** list with drag reorder, visibility, lock, delete, and rename.
- **Center canvas**: Vector canvas with transparency grid, selection and transform handles, zoom, and fit-to-viewport.
- **Right panel**: When a layer is selected—transform (position, scale, rotation, opacity), lifetime (start/end frame), appearance (fill, stroke), text options, geometry, and **Add Keyframe** for animated properties.
- **Bottom timeline**: Transport (play, step, jump to start/end), FPS, per-layer lifetime bars, keyframe markers, interpolation, ruler, and playhead.

```{image} ../assets/lumyn-studio/image-sequences/editor-page.png
:alt: Image Sequence Editor
```

### Layers and keyframes

Add shapes or images from the sidebar. Use keyframes on the timeline to animate position, scale, rotation, opacity, and other properties between frames. The editor renders the result to frames for your device.

### Save and export

Click **Save** in the toolbar to persist your project. Use **Preview** to generate a GIF preview, or **Download** to export a GIF file.

## Add to a Device Configuration

From the Image Sequences page or the editor, use **Add to Device**.

```{image} ../assets/lumyn-studio/image-sequences/add-to-device.png
:alt: Add to Device Dialog
```

- Select a device configuration.
- Assign one or more matrix zones (dimensions define exported resolution).
- Save to attach the sequence to the configuration.

Once added, you can preview your image sequence at the exact resolution of the target matrix zone.

## Next Steps

- Export with image assets: [Saving & Exporting Configurations](saving-and-exporting-configurations)
- Create strip animations: [Animation Sequences](animation-sequences)
