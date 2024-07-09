Circular Text Display

Circular Text Display is a dynamic text visualization project that displays text along a circular path. The project allows users to customize various aspects of the text and the circular band, providing a unique and engaging way to present information.
Features

    Text Input: Users can enter the text they want to display on the circular band.
    Font Size: Adjustable font size to fit different design needs.
    Circle Size: Customizable circle diameter to control the display area.
    Speed: Controls the rotation speed of the text around the circle.
    Kerning: Adjusts the spacing between characters for better visual appeal.
    Font Color: Allows users to choose the color of the text.
    Band Color: Customizable band color with transparency control.
    Background Color: Users can set the background color of the canvas.
    Font Selection: Supports multiple font options.
    Angle Control: Adjusts the tilt of the circular band for different viewing angles.
    Transparency: A slider to control the transparency of the band color.

Code Iteration

This is the initial iteration of the Circular Text Display project, which took approximately a few hours of active development and debugging to reach a stable version. The project went through several significant changes and improvements to ensure the desired visual effects were achieved.

Challenges Overcome

    Text Orientation: Ensuring that each letter on the circular path is correctly oriented was a significant challenge. We adjusted the rotation and alignment of each character to match the flow of the band.

    Overlapping Bands: Initially, the text band and the color band overlapped, causing a moiré distortion effect. We resolved this by slightly increasing the diameter of the text band to ensure they do not overlap.

    Correct Text Display: At first, the text was displayed backwards. We corrected this by reversing the order of text drawing to ensure it appears correctly along the circular path.

    Unified Rotation: Ensuring the text and the band rotate as a unified element when the angle slider is adjusted, without causing additional tilts or rotations to the text itself.

How to Use

    Clone the repository: git clone https://github.com/yourusername/circular-text-display.git
    Open the index.html file in your web browser.
    Use the controls on the left side of the screen to customize the text display.

Future Enhancements

    Interactive Animations: Adding more interactive features such as hover effects or click animations.
    Advanced Customization: Allowing for more detailed customization of text properties (e.g., bold, italic).
    Multi-line Support: Extending the functionality to support multi-line text input.
