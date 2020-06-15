let freq;
let amp;
let waveLength;

var mic;

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



  


}

function windowResized() { 
  resizeCanvas(windowWidth, windowHeight);
}

function draw() { 

  var vol = mic.getLevel();
  console.log(vol);
  background(255);
  stroke(4);
  noFill();

  
  //freq = map(mouseX, 0, width, 1, 0); //nombre d'ondes
  freq = map(mouseX, 0, width, 1, 0); //nombre d'ondes
  //amp = map(mouseY, 0, height, 100, 0);
  amp = map(vol * 200, 0, height, 100, 0);
  waveLength = width/( freq * width ) * TWO_PI; //i dont know how i found that haha
  
  
  translate(0, height/5);
  push();
  stroke(255,0,255);
  line(0, 0, width, 0);
  pop();
  drawSine(amp, freq);

  translate(0,height/5);
  line(0,0, width, 0);
  drawTriangle(amp, freq, waveLength);

  translate(0,height/5);
  line(0,0, width, 0);
  drawSquare(amp, freq, waveLength);

  translate(0,height/5);
  line(0,0, width, 0);
  drawSawtooth(amp, freq, waveLength);

}

function drawSawtooth(amp, freq, waveLength) {
  beginShape();
  for (let x = 0; x <= width; x+=waveLength) {
    vertex(x, amp);
    vertex(x+waveLength, -amp);
  }
  endShape();
}

function drawTriangle(amp, freq, waveLength) {

  let HWaveLength = waveLength/2; //hal wave length
  beginShape();

  let way = -1; //up or down
  for (let x = -HWaveLength/2; x <= width+HWaveLength; x+=HWaveLength) {
    vertex(x,amp*way);
    way *=-1;
  }

  endShape();
}

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

function drawSine(amp, freq) {
  //sine
  beginShape();
  for(let x = 0; x <= width; x++){

    const angle = x * freq;
    const y = sin(angle)*amp;

    vertex(x, y);
  }
  endShape();
}