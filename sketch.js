let fontSize, circleSize, speed, kerning;
let fontColor, bandColor, backgroundColor;
let selectedFont;
let xAngle = 0;  // Rotation angle around the X-axis
let mouseStartY; // Starting mouse Y position when clicked
let lastMouseY;  // Tracks the last Y position to detect movement

let fonts = {};
let ringSettings = [];
let ringSpacing = 30;  // Default ring spacing

const greetings = [
    "hi", "hola", "bonjour", "hallo", "ciao", "こんにちは", "안녕하세요", "你好", "привет", "olá",
    "hei", "hej", "สวัสดี", "merhaba", "sveiki", "salam", "xin chào", "aloha", "habari", "sawubona"
];

function preload() {
    fonts['Arial'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Courier New'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Georgia'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Times New Roman'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fonts['Verdana'] = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // Select a random font if fonts loaded successfully
    selectedFont = random(Object.values(fonts));

    // Initialize the first ring with random settings and text
    ringSettings[0] = {
        text: random(greetings),
        fontSize: 20,
        circleSize: 200,
        speed: 2,
        kerning: 10,
        fontColor: color(random(255), random(255), random(255)),
        bandColor: color(random(255), random(255), random(255))
    };

    // Sync initial values with the HTML controls
    document.getElementById("text-input-0").value = ringSettings[0].text;
    document.getElementById("ring-spacing").value = ringSpacing;

    // Set a random background color
    backgroundColor = color(random(255), random(255), random(255));
    document.getElementById("background-color").value = backgroundColor.toString('#rrggbb');

    // Initialize the X-axis rotation angle
    xAngle = parseInt(document.getElementById("x-angle-control").value);

    // Capture the initial mouse Y position on mouse press
    canvas.addEventListener("mousedown", () => {
        mouseStartY = mouseY;
        lastMouseY = mouseY; // Set initial last Y position
    });
}

function draw() {
    background(backgroundColor);
    textFont(selectedFont);

    // Retrieve the X-axis angle from the slider
    xAngle = parseInt(document.getElementById("x-angle-control").value);

    // Adjust the slider value only when there’s a noticeable change in mouse movement
    if (mouseIsPressed) {
        if (mouseY < lastMouseY) {  // Mouse moved up
            xAngle = (xAngle + 1) % 360;  // Increase angle smoothly, wrap around at 360
        } else if (mouseY > lastMouseY) {  // Mouse moved down
            xAngle = (xAngle - 1 + 360) % 360;  // Decrease angle, wrap around at 0
        }
        document.getElementById("x-angle-control").value = xAngle;
        lastMouseY = mouseY;  // Update the last known Y position
    }

    // Apply a single X-axis rotation to all rings together
    push();
    rotateX(radians(xAngle));
    ringSettings.forEach((ring, index) => {
        push();
        translate(0, index * ringSpacing - (ringSettings.length * ringSpacing) / 2, 0);
        drawRing(ring);
        pop();
    });
    pop();
}

function drawRing(ring) {
    let txt = ring.text;
    let circSize = ring.circleSize;
    let txtSize = ring.fontSize;

    fill(ring.bandColor);
    noStroke();

    // Draw the circular band as rectangles
    let bandHeight = txtSize + 10;
    for (let j = 0; j < 360; j += 1) {
        let angle = radians(j);
        let x = circSize * cos(angle);
        let z = circSize * sin(angle);
        push();
        translate(x, 0, z);
        rotateY(-angle);
        rotateY(HALF_PI);
        rectMode(CENTER);
        rect(0, 0, circSize * TWO_PI / 360, bandHeight);
        pop();
    }

    fill(ring.fontColor);
    textSize(txtSize);
    textAlign(CENTER, CENTER);

    // Calculate the starting position for the text
    let textW = textWidth(txt);
    let arcLength = TWO_PI * circSize;
    let xStart = (frameCount * ring.speed) % (textW + arcLength);

    // Draw the text characters along the circular path
    for (let k = txt.length - 1; k >= 0; k--) {
        let theta = (xStart + (txt.length - 1 - k) * ring.kerning) / circSize;
        let x = circSize * cos(theta);
        let z = circSize * sin(theta);

        push();
        translate(x, 0, z);
        rotateY(-theta + HALF_PI);
        text(txt.charAt(k), 0, 0);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateRingText(index) {
    const text = document.getElementById(`text-input-${index}`).value;
    ringSettings[index].text = text;
}

function updateRingSettings(index) {
    ringSettings[index].fontSize = parseInt(document.getElementById(`font-size-${index}`).value);
    ringSettings[index].circleSize = parseInt(document.getElementById(`circle-size-${index}`).value);
    ringSettings[index].speed = parseFloat(document.getElementById(`speed-${index}`).value);
    ringSettings[index].kerning = parseFloat(document.getElementById(`kerning-${index}`).value);
    ringSettings[index].fontColor = color(document.getElementById(`font-color-${index}`).value);
    ringSettings[index].bandColor = color(document.getElementById(`band-color-${index}`).value);
}

function updateRingSpacing() {
    ringSpacing = parseInt(document.getElementById("ring-spacing").value);
}

function updateBackgroundColor() {
    backgroundColor = color(document.getElementById("background-color").value);
}

// Update the global xAngle based on the slider's value
function updateRingRotation() {
    xAngle = parseInt(document.getElementById("x-angle-control").value);
}

function toggleRingControls(index) {
    const content = document.getElementById(`ring-${index}-content`);
    content.style.display = content.style.display === "none" ? "block" : "none";
}

function addNewRing() {
    const newRingIndex = ringSettings.length;

    ringSettings.push({
        text: random(greetings),
        fontSize: 20,
        circleSize: 200,
        speed: 2,
        kerning: 10,
        fontColor: color(random(255), random(255), random(255)),
        bandColor: color(random(255), random(255), random(255))
    });

    const controlsContainer = document.getElementById('controls-container');
    const newRingControl = document.createElement('div');
    newRingControl.classList.add('ring-control');
    newRingControl.id = `ring-${newRingIndex}-controls`;

    newRingControl.innerHTML = `
        <div class="ring-toggle" onclick="toggleRingControls(${newRingIndex})">
            Ring ${newRingIndex + 1} +
        </div>
        <div class="toggle-content" id="ring-${newRingIndex}-content" style="display: none;">
            <label for="text-input-${newRingIndex}">Text Input for Ring ${newRingIndex + 1}:</label>
            <textarea id="text-input-${newRingIndex}" rows="2" cols="30" onchange="updateRingText(${newRingIndex})"></textarea><br>

            <label for="font-size-${newRingIndex}">Font Size:</label>
            <input type="range" id="font-size-${newRingIndex}" min="10" max="100" value="20" onchange="updateRingSettings(${newRingIndex})"><br>

            <label for="circle-size-${newRingIndex}">Base Circle Size:</label>
            <input type="range" id="circle-size-${newRingIndex}" min="100" max="500" value="200" onchange="updateRingSettings(${newRingIndex})"><br>

            <label for="speed-${newRingIndex}">Speed:</label>
            <input type="range" id="speed-${newRingIndex}" min="1" max="10" value="2" onchange="updateRingSettings(${newRingIndex})"><br>

            <label for="kerning-${newRingIndex}">Kerning:</label>
            <input type="range" id="kerning-${newRingIndex}" min="5" max="20" value="10" onchange="updateRingSettings(${newRingIndex})"><br>

            <label for="font-color-${newRingIndex}">Font Color:</label>
            <input type="color" id="font-color-${newRingIndex}" value="#000000" onchange="updateRingSettings(${newRingIndex})"><br>

            <label for="band-color-${newRingIndex}">Band Color:</label>
            <input type="color" id="band-color-${newRingIndex}" value="#FFFFFF" onchange="updateRingSettings(${newRingIndex})"><br>
        </div>
    `;

    controlsContainer.insertBefore(newRingControl, document.getElementById('add-ring-button'));
    document.getElementById(`text-input-${newRingIndex}`).value = ringSettings[newRingIndex].text;
}
