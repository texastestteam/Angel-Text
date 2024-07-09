let textInput, fontSize, circleSize, speed, kerning;
let fontColor, bandColor, backgroundColor;
let font, angleSlider, transparencySlider;
let angle = 0;

let fonts = {};
let selectedFont;

function preload() {
    fonts['Arial'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Courier New'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Georgia'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Times New Roman'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Verdana'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    textInput = select('#text-input');
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
    
    selectedFont = fonts['Arial']; // Default font
}

function draw() {
    background(backgroundColor.value());

    let txt = textInput.value();
    let txtSize = fontSize.value();
    let circSize = circleSize.value();
    let spd = speed.value();
    let kern = kerning.value();
    let fnt = font.value();
    let angleTilt = angleSlider.value();
    let transparency = transparencySlider.value();

    selectedFont = fonts[fnt] || selectedFont;

    // Draw the rotating band and text as a whole
    push();
    translate(0, 0, 0);
    rotateX(radians(angleTilt)); // Adjust the band and text rotation on the X-axis

    // Draw the band as a series of rectangles
    let bandAlpha = color(bandColor.value());
    bandAlpha.setAlpha(transparency);
    fill(bandAlpha);
    noStroke();

    let bandHeight = txtSize + 10;
    for (let i = 0; i < 360; i += 1) {
        let angle = radians(i);
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

    // Draw the text on the slightly larger circular path
    let textCircSize = circSize + 3; // Increase the radius of the text band by 3 pixels
    fill(fontColor.value());
    textSize(txtSize);
    textFont(selectedFont);
    textAlign(CENTER, CENTER);

    let textW = textWidth(txt);
    let arcLength = TWO_PI * textCircSize;
    let xStart = (frameCount * spd) % (textW + arcLength);

    // Reverse the text to display correctly
    for (let i = txt.length - 1; i >= 0; i--) {
        let theta = (xStart + (txt.length - 1 - i) * kern) / textCircSize;
        let x = textCircSize * cos(theta);
        let z = textCircSize * sin(theta);

        push();
        translate(x, 0, z);
        rotateY(-theta + HALF_PI); // Rotate each letter to match the flow of the band
        text(txt.charAt(i), 0, 0);
        pop();
    }

    pop();

    angle += spd / 10; // Rotate the text band in the opposite direction
}
