# Image Sequences

This section provides documentation for creating and managing image sequences in Lumyn Studio. Image sequences are a series of images that are displayed in order on an LED matrix. They can be created from a starting image, importing a gif, or drawing directly on the canvas.

## Creating a New Image Sequence

To create a new image sequence, navigate to the Image Sequences page in Lumyn Studio. By default, the Image Sequences page is empty. If you have created any image sequences, they will be displayed here. You can also hover over created image sequences to see a preview of what they look like.

To create a new image sequence, click the "Create Image Sequence" button. This will open a dialog where you can configure the image sequence. Start by choosing your image source:

- **Single Image**: Create an image sequence from a single image. This is useful for displaying static images on your LED matrix or when you want to design the sequence frame by frame.
- **Animated GIF**: Import a GIF file to create an image sequence. This is useful when you have an existing GIF animation that you want to display on your LED matrix.
- **Free-Draw**: Draw directly on the canvas to create an image sequence. This is useful when you want to create custom animations or patterns, display text, or draw shapes on your LED matrix.

<img src="/lumyn-studio/image-sequences/create-dialog-page1.png" alt="Image Sequence Creation Dialog Page 1" height="400"/>

After choosing your image source, give your image sequence an id (this will be used to reference the sequence in code) and a human-readable name. Choose an initial aspect ratio for the canvas (ideally matching the aspect ratio of your image source or LED matrix) and provice a description and tags to help organize your sequences. Finally, click "Create" to create the image sequence.

<img src="/lumyn-studio/image-sequences/create-dialog-page2.png" alt="Image Sequence Creation Dialog Page 2" height="400"/>

## Editing an Image Sequence

To edit an image sequence, click on the sequence in the Image Sequences page. This will open the image sequence editor where you can add, and remove images in the sequence. The editor is divided into three main sections:

- **Preview**: This area shows a preview of what the image sequence will look like. It's a panable and zoomable canvas that shows the images in the sequence.
- **Frame List**: To the right of the preview is the frame list. This is where you can add, and remove images in the sequence. Each frame represents a single image in the sequence.
- **Toolbar**: Below the preview is the toolbar. It contains tools for editing your image sequence, such as adding text, shapes, or moving images around.

<img src="/lumyn-studio/image-sequences/editor-page.png" alt="Image Sequence Editor" height="600"/>

---
TODO: Detail adding images, shapes, text, previewing, and adding to a device configuration.