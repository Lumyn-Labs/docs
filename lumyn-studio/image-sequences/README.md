# Image Sequences

This section provides documentation for creating and managing **Image Sequences** in Lumyn Studio. Image sequences are a series of images displayed in order on an LED matrix. They can be created from a starting image, importing a GIF, or drawing directly on the canvas.

## Creating a New Image Sequence

To create a new image sequence, navigate to the **Image Sequences** page in Lumyn Studio. By default, this page is empty. If you have created any image sequences, they will be displayed here. You can also hover over created image sequences to see a preview of what they look like.

To create a new image sequence, click the "**Create Image Sequence**" button. This will open a dialog where you can configure the image sequence. Start by choosing your image source:

- **Single Image**: Create an image sequence from a single image. This is useful for displaying static images on your LED matrix or when you want to design the sequence frame by frame.
- **Animated GIF**: Import a GIF file to create an image sequence. This is useful when you have an existing GIF animation that you want to display on your LED matrix.
- **Free-Draw**: Draw directly on the canvas to create an image sequence. This is useful for creating custom animations or patterns, displaying text, or drawing shapes on your LED matrix.

<img src="/lumyn-studio/image-sequences/create-dialog-page1.png" alt="Image Sequence Creation Dialog Page 1" height="400"/>

After choosing your image source, give your image sequence an ID (this will be used to reference the sequence in code) and a human-readable name. Choose an initial aspect ratio for the canvas (ideally matching the aspect ratio of your image source or LED matrix), and provide a description and tags to help organize your sequences. Finally, click "**Create**" to create the image sequence.

<img src="/lumyn-studio/image-sequences/create-dialog-page2.png" alt="Image Sequence Creation Dialog Page 2" height="400"/>

## Editing an Image Sequence

To edit an image sequence, click on the sequence in the **Image Sequences** page. This will open the Image Sequence Editor, where you can add and remove images in the sequence. The editor is divided into three main sections:

- **Preview**: This area shows a preview of what the image sequence will look like. It's a panable and zoomable canvas that shows the images in the sequence.
- **Frame List**: To the right of the preview is the frame list. This is where you can add, remove, and reorder images in the sequence. Each frame represents a single image in the sequence.
- **Toolbar**: Below the preview is the toolbar. It contains tools for editing your image sequence, such as adding text, shapes, or moving images around.

<img src="/lumyn-studio/image-sequences/editor-page.png" alt="Image Sequence Editor" height="600"/>

To add objects to the canvas, select a tool from the toolbar. Selecting a tool will display additional options for customizing the object. Here are the available tools:

- **Text**: Add text to the canvas. You can customize the font, size, color, alignment and more.
- **Rectangle**: Add a rectangle to the canvas.
- **Circle**: Add a circle to the canvas.
- **Triangle**: Add a triangle to the canvas.
- **Line**: Add a line to the canvas.

Clicking any of these tools will immediately add the object to the canvas. You can then move, resize, and customize the object using the toolbar. To remove an object, select it on the canvas and click the **Delete** button in the toolbar. If you are unsure what a tool does, hover over it to see a tooltip with a description.

To add a new frame click the plus icon above the frame list. This will add a new frame to the end of the sequence. You can then edit the frame by adding objects to the canvas. To remove a frame, click the ... icon in the top right of the frame list and select "**Delete Frame**".

Once you are done editing your image sequence, click on the **hamburger menu** at the top right of the editor and select "**Save and Generate**". This will save your changes and compile the image sequence. To preview the sequence, hover "**Preview**" from the hamburger menu. This menu also allows you to delete the sequence or change the aspect ratio of the canvas.

## Adding to a Device Configuration

Once you have created an image sequence, you can add it to a device configuration. To do this, navigate to the image sequence in the **Image Sequences** page and click the "**Add to Device**" button. This will open a dialog where you can choose the device configuration to add the image sequence to.

![Add to Device Dialog](add-to-device.png)

Select a device from the dropdown, and choose a matrix zone to display the image sequence on. The matrix zone you choose will determine the exported resolution of the image sequence. Finally, click "**Save**" to add the image sequence to the device configuration.

## Next Steps

- Create an [Animation Sequence](/lumyn-studio/animation-sequences/)
- Learn how to [Export Device Configurations](/lumyn-studio/exporting-device-configurations/)
