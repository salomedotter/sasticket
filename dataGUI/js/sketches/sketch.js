let freq;
let amp;
let waveLength;
let mic;

const RECT = {
    width: 200,
    height: 500,
    x: 100,
    x1: 0,
    x2: undefined,
    offsetx: 0,
    y: 0,
    selected: false,
}

const PARAMS = {
  freq: 0.2,
  amp: 10,
  strokeWeight: 6,
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();

    const micButton = createButton('Enable Microphone');
    micButton.center();

    micButton.mouseClicked(() => {
        getAudioContext().resume().then(() => {
            mic.start();
            micButton.hide();
            console.log('Recording Audio');
        }).catch((e) => {});
    });

    RECT.x2 = RECT.x + RECT.width;
    RECT.x1 = RECT.x;


    let gui = new dat.GUI();

    gui.add(PARAMS, 'freq').min(0).max(1);
    gui.add(PARAMS, 'amp').min(0).max(50);
    gui.add(PARAMS,'strokeWeight').min(0).max(20);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {

    var vol = mic.getLevel();
    // console.log(vol);
    background(255);
    stroke(4);
    noFill();


    //freq = map(mouseX, 0, width, 1, 0); //nombre d'ondes
    // freq = map(mouseX, 0, width, 1, 0); //nombre d'ondes
    //amp = map(mouseY, 0, height, 100, 0);
    // amp = map(vol * 200, 0, height, 100, 0);

    freq = PARAMS.freq;
    amp = PARAMS.amp;


    waveLength = width / (freq * width) * TWO_PI; //i dont know how i found that haha

    push();

    translate(0, height / 5);

    push();
    stroke(255, 0, 255);
    // line(0, 0, width, 0);

    pop();
    strokeWeight(PARAMS.strokeWeight);
    drawSine(amp, freq);
    pop();
    drawRectLogo();


}

function drawRectLogo() {

    push();

    stroke(0);
    noFill();

    translate(RECT.x, RECT.y);
    rect(0, 0, RECT.width, RECT.height);


    pop();
}

function flattenWave(diameter, x1, offsetX) {

    let radius = diameter / 2;
    let angle = map(offsetX, x1, x1 + diameter, 0, TWO_PI);
    let flattenAmt = Math.cos(angle) - 1;

    return flattenAmt;
}

function mousePressed() {

    RECT.x1 = RECT.x;
    RECT.x2 = RECT.x + RECT.width;
    let y1 = RECT.y;
    let y2 = RECT.y + RECT.height;

    RECT.offsetx = RECT.x - mouseX;

    // let coteDroit = 
    if (mouseX > RECT.x1 && mouseX < RECT.x2) {
        if (mouseY > y1 && mouseY < y2) {
            RECT.selected = true;
        }
    }
}

function mouseReleased() {
    RECT.selected = false;
}

function mouseDragged() {

    if (RECT.selected) {
        RECT.x = mouseX + RECT.offsetx;
        RECT.x1 = RECT.x;
        RECT.x2 = RECT.x + RECT.width;
    }

    // RECT.x = mouseX;
}

function drawSine(amp, freq) {

    beginShape();
    for (let x = 0; x <= width; x++) {
        const angle = x * freq;
        let y = 0;

        if (x < RECT.x1 || x > RECT.x2) {
            y = 0;
        } else {

            let flatten = flattenWave(RECT.width, RECT.x1, x);

            y = sin(angle) * amp * flatten;
        }

        vertex(x, y);
    }
    endShape();
    


function drawSquare(amp, freq, waveLength) {

    let HWaveLength = waveLength/2;
    beginShape();
  
    for (let x = 0; x <= width; x+=waveLength) {
      vertex(x,amp);
      vertex(x+HWaveLength, amp);
      vertex(x+HWaveLength, -amp);
      vertex(x+waveLength, -amp);
    }
  
    endShape();
  }


    // for (let x = 0; x <= width; x++) {
    //     const angle = x * freq;
    //     let y = 0;

    //     if (x < RECT.x1 || x > RECT.x2) {
    //         y = 0;
    //     } else {

    //         let flatten = flattenWave(RECT.width, RECT.x1, x);

    //         y = sin(angle) * amp * flatten;
    //     }

    //     ellipse(x, y, 1);
    // }

}
