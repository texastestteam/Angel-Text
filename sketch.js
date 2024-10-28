let fontSize, circleSize, speed, kerning;
let fontColor, bandColor, backgroundColor;
let font, angleSlider, transparencySlider;
let angle = 0;

let fonts = {};
let selectedFont;
let textInputs = []; // Array to store text inputs
let baseCircleSize = 200; // Base size for the first ring
let ringSpacing = 30; // Spacing between rings for concentric layout
let layoutMode = 'concentric'; // Track layout mode

function preload() {
    fonts['Arial'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Courier New'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Georgia'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Times New Roman'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Verdana'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    // Initialize controls
    fontSize = select('#font-size');
    circleSize = select('#circle-size');
    speed = select('#speed');
    kerning = select('#kerning');
    fontColor = select('#font-color');
    bandColor = select('#band-color');
    backgroundColor = select('#background-color');
    font = select('#font');
    angleSlider = select('#angle');
    transparencySlider = select('#transparency');

    // Add initial text input
    textInputs.push(select('#text-input-0'));
    select('#add-ring-button').mousePressed(addNewRing);
    select('#toggle-layout-button').mousePressed(toggleLayout);

    selectedFont = fonts['Arial']; // Default font
}

function addNewRing() {
    const textInputContainer = select('#text-input-container'); // Container for all text inputs
    const newRingIndex = textInputs.length;
    
    // Label for new ring
    createElement('label', `Text Input for Ring ${newRingIndex + 1}:`).parent(textInputContainer);
    
    // Create new text area under the previous one
    const newTextArea = createElement('textarea');
    newTextArea.attribute('rows', 2);
    newTextArea.attribute('cols', 30);
    newTextArea.id(`text-input-${newRingIndex}`);
    newTextArea.parent(textInputContainer);

    textInputs.push(newTextArea); // Add to text input array
}

function toggleLayout() {
    layoutMode = layoutMode === 'concentric' ? 'stacked' : 'concentric';
}

function draw() {
    background(backgroundColor.value());

    let txtSize = fontSize.value();
    let angleTilt = angleSlider.value();
    let transparency = transparencySlider.value();

    selectedFont = fonts[font.value()] || selectedFont;

    // Draw each ring based on layout mode
    for (let i = 0; i < textInputs.length; i++) {
        let txt = textInputs[i].value();
        let circSize = baseCircleSize + (layoutMode === 'concentric' ? i * ringSpacing : 0); // Adjust size per ring for concentric
        let verticalOffset = layoutMode === 'stacked' ? i * (txtSize + ringSpacing) : 0; // Stack rings vertically if in "stacked" mode

        // Draw the rotating band and text as a whole
        push();
        translate(0, verticalOffset, 0); // Adjust vertical position for stacked layout
        rotateX(radians(angleTilt));

        // Draw the band as a series of rectangles
        let bandAlpha = color(bandColor.value());
        bandAlpha.setAlpha(transparency);
        fill(bandAlpha);
        noStroke();

        let bandHeight = txtSize + 10;
        for (let j = 0; j < 360; j += 1) {
            let angle = radians(j);
            let x = circSize * cos(angle);
            let z = circSize * sin(angle);
            push();
            translate(x, 0, z);
            rotateY(-angle);
            rotateY(HALF_PI); // Rotate the rectangles on the Y-axis to connect seamlessly
            rectMode(CENTER);
            rect(0, 0, circSize * TWO_PI / 360, bandHeight);
            pop();
        }

        // Draw the text on the circular path
        fill(fontColor.value());
        textSize(txtSize);
        textFont(selectedFont);
        textAlign(CENTER, CENTER);

        let textW = textWidth(txt);
        let arcLength = TWO_PI * circSize;
        let xStart = (frameCount * speed.value()) % (textW + arcLength);

        for (let k = txt.length - 1; k >= 0; k--) {
            let theta = (xStart + (txt.length - 1 - k) * kerning.value()) / circSize;
            let x = circSize * cos(theta);
            let z = circSize * sin(theta);

            push();
            translate(x, 0, z);
            rotateY(-theta + HALF_PI); // Rotate each letter to match the flow of the band
            text(txt.charAt(k), 0, 0);
            pop();
        }

        pop();
    }
}
