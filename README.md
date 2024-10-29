# 🌐 Circular Text Display Project

Welcome to the **Circular Text Display** project! This interactive application, powered by **p5.js**, lets users create vibrant, rotating text on dynamic circular rings. It's a fun, visually captivating way to display text, providing various customization options for each ring.

## ✨ Overview

This project allows you to:
- 🌀 Display text in rotating circular rings.
- 🎨 Customize font size, circle size, rotation speed, color, and more.
- ➕ Add multiple rings, each with unique properties.
- 🖌️ Control the appearance and arrangement of rings for a creative, personalized display.

## 🔑 Key Features

- **Dynamic Circular Rings**: The text rotates infinitely around each ring, creating an eye-catching display.
- **User-Friendly Controls**:
  - Adjust font size, circle size, rotation speed, kerning (character spacing), font color, and band color.
  - Control ring spacing with a slider to set vertical distance between rings.
  - Pick a background color with a color picker or let it start with a random color each time you load the project.
- **Multiple Rings**: Easily add new rings and control each one independently.
- **Click-and-Drag Rotation**: Use click-and-drag to tilt the rings, or double-click to reset them horizontally.
  
## 🛠️ How to Use

1. **Add Rings**: Start with one circular ring with text in various languages. Click "Add New Ring" to add more.
2. **Customize Rings**: Each ring has a control panel where you can:
   - Input text, adjust font size, change circle size, set speed, adjust kerning, and pick font and band colors.
   - Delete any ring when it’s no longer needed.
3. **Adjust Background and Spacing**:
   - Set the background color with the color picker or refresh for a random start color.
   - Adjust the ring spacing to set the vertical distance between rings.
4. **Rotate Rings**: 
   - Use click-and-drag to adjust the tilt of all rings.
   - Double-click anywhere on the canvas to reset to horizontal.

## 📁 Code Structure

- **HTML**: Contains the controls for user interaction (sliders, color pickers, add/delete buttons).
- **JavaScript (p5.js)**:
  - `setup()`: Initializes the canvas, selects a random background color, and loads fonts.
  - `draw()`: Renders the rotating rings based on user settings.
  - `addNewRing()`: Adds a new ring with independent controls.
  - `deleteRing()`: Removes a ring and re-indexes remaining rings.
  - `updateRingSettings()`: Updates ring appearance and behavior based on slider and color picker inputs.
  - `toggleRingControls()`: Collapses or expands ring settings.

## ⚠️ Known Issues

- **Ring Control Sync**: Some ring settings may not sync immediately with visuals. Adjusting the slider again typically corrects this.
- **Multiple Rings Display**: Adding several rings can cause overlapping. Adjust ring spacing to resolve.

## 🚀 Planned Improvements

- **Advanced Customization**: Add options for transparency and animated effects on rings.
- **Enhanced Layout Options**: Improve the layout toggle for more arrangement possibilities.
- **Performance Optimization**: Refactor the code to ensure smoother transitions and better efficiency.
  
## 🌈 Technologies Used

- **p5.js**: JavaScript library for creative coding and visual interactions.
- **HTML/CSS**: Provides the user interface and styling for the controls.

## 📜 License

This project is open-source and available for personal or educational use. Feel free to fork it and build upon it for creative projects!

--- 

This README should be a comprehensive guide, capturing the core functionality and user interaction in a friendly format with emojis! Let me know if there’s anything else you'd like to add.
