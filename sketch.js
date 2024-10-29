let fontSize, circleSize, speed, kerning;
let fontColor, bandColor, backgroundColor;
let selectedFont;
let xAngle = 0;
let ringSettings = [];
let ringSpacing = 30;
let lastMouseY;

const greetings = [
    "hi", "hola", "bonjour", "hallo", "ciao", "こんにちは", "안녕하세요", "你好", "привет", "olá",
    "hei", "hej", "สวัสดี", "merhaba", "sveiki", "salam", "xin chào", "aloha", "habari", "sawubona"
];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    selectedFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    ringSettings[0] = createNewRingSettings();

    document.getElementById("text-input-0").value = ringSettings[0].text;
    
    // Initialize random background color
    backgroundColor = color(random(255), random(255), random(255));
    document.getElementById("background-color").value = "#" + hex(backgroundColor.levels[0], 2) 
        + hex(backgroundColor.levels[1], 2) + hex(backgroundColor.levels[2], 2);

    // Initialize mouse tracking for click-and-drag rotation
    canvas.addEventListener("mousedown", () => {
        lastMouseY = mouseY;
    });

    // Add double-click event to reset angle to horizontal
    canvas.addEventListener("dblclick", () => {
        xAngle = 0;
    });
}

function draw() {
    background(backgroundColor);
    textFont(selectedFont);

    // Adjust rotation based on mouse movement during click-and-drag
    if (mouseIsPressed) {
        if (mouseY < lastMouseY) {  // Mouse moved up
            xAngle = (xAngle + 1) % 360;
        } else if (mouseY > lastMouseY) {  // Mouse moved down
            xAngle = (xAngle - 1 + 360) % 360;
        }
        lastMouseY = mouseY;
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

function createNewRingSettings() {
    return {
        text: random(greetings),
        fontSize: 20,
        circleSize: 200,
        speed: 2,
        kerning: 10,
        fontColor: color(random(255), random(255), random(255)),
        bandColor: color(random(255), random(255), random(255))
    };
}

function addNewRing() {
    const newRingIndex = ringSettings.length;
    ringSettings.push(createNewRingSettings());

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

            <div class="delete-button" onclick="deleteRing(${newRingIndex})">Delete Ring</div>
        </div>
    `;

    controlsContainer.insertBefore(newRingControl, document.getElementById('add-ring-button'));
    document.getElementById(`text-input-${newRingIndex}`).value = ringSettings[newRingIndex].text;
}

function deleteRing(index) {
    ringSettings.splice(index, 1);

    const ringControl = document.getElementById(`ring-${index}-controls`);
    ringControl.parentNode.removeChild(ringControl);

    document.querySelectorAll('.ring-control').forEach((control, i) => {
        control.id = `ring-${i}-controls`;
        control.querySelector('.ring-toggle').innerText = `Ring ${i + 1} +`;
        control.querySelector('.delete-button').setAttribute('onclick', `deleteRing(${i})`);
    });
}

function drawRing(ring) {
    let txt = ring.text;
    let circSize = ring.circleSize;
    let txtSize = ring.fontSize;

    fill(ring.bandColor);
    noStroke();

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

    let textW = textWidth(txt);
    let arcLength = TWO_PI * circSize;
    let xStart = (frameCount * ring.speed) % (textW + arcLength);

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

function toggleRingControls(index) {
    const content = document.getElementById(`ring-${index}-content`);
    content.style.display = content.style.display === "none" ? "block" : "none";
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
    // Convert color picker value to p5 color format
    backgroundColor = color(document.getElementById("background-color").value);
}
