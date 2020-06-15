

let freq
let amp
let logo
let gui
let logoFont
let bgSine
let bgSquare
let bgTriangle
let bgSawtooth
let bgWaveHeight
let waveDistance
let saveImg
let floatDelta = 0.5





time = 0


const PARAMS = {
  Amplitude: 0.84,
  WaveNumber: 2.01,
  Pulsation: 0.0,
  strokeWeight: 6,
  WaveDistance: 1,
  Save: saveClicked,
}


//======================================================================
function setupGui(){
	gui = new dat.GUI();
    
	gui.add(PARAMS, 'Amplitude').min(0).max(1)
	gui.add(PARAMS, 'WaveNumber').min(0).max(10)
	gui.add(PARAMS, 'Pulsation').min(-5).max(5)
	gui.add(PARAMS, 'strokeWeight').min(0).max(20)
    gui.add(PARAMS, 'WaveDistance').min(0).max(1.5)
	gui.add(PARAMS, 'Save')
}


function setupLogo(){
	logo = new Logo(0,0,width)
	logo.font = logoFont
}



function saveClicked(){
	console.log("Hoooooray!")
	saveCanvas("ticketSAS", "png")
}

function setupBGWaves(){
	bgWaveHeight = 1/6*height
	waveDistance = 1/6*height
	let alpha = 255
	bgSine = new SineWave(0,1/3*height,width,bgWaveHeight)
	bgSine.fill = true
	bgSine.fillH = height - 1/3*height
	bgSine.color = color(255, 0, 0,alpha)
	bgSquare = new SquareWave(0,1/3*height + waveDistance,width,bgWaveHeight)
	bgSquare.fill = true
	bgSquare.fillH = height - 1/3*height
	bgSquare.color = color(255,0,255,alpha)
	bgTriangle = new TriangleWave(0,1/3*height + waveDistance*2,width,bgWaveHeight)
	bgTriangle.fill = true
	bgTriangle.fillH = height - 1/3*height
	bgTriangle.color = color(0,255,255,alpha)
	bgSawtooth = new SawtoothWave(0,1/3*height + waveDistance*3,width,bgWaveHeight)
	bgSawtooth.fill = true
	bgSawtooth.fillH = height - 1/3*height
	bgSawtooth.color = color(255,255,255,alpha)


}

function setup() {   
	createCanvas(2/3*windowHeight,windowHeight)
	setupGui()
    setupBGWaves()
	setupLogo()
	ticketText = new TicketText(0,width/2,width)
	ticketText.font = logoFont
	barCode = new BarCode(0,width,width)

}


function preload() {
	logoFont = loadFont("./assets/HeadingProUltracomp-Light.otf");
}


//======================================================================




function checkParams(){
	if(abs(PARAMS.Pulsation) <= floatDelta){
		PARAMS.Pulsation = 0
	}
}
function setWaveParams(wave){
	wave.amplitude = PARAMS.Amplitude
	wave.waveNumber = PARAMS.WaveNumber
	wave.pulse = TWO_PI*PARAMS.Pulsation
	wave.lineWidth = PARAMS.strokeWeight
}

function setBGWaveParams(wave){
	wave.amplitude = PARAMS.Amplitude
	wave.waveNumber = PARAMS.WaveNumber
	wave.pulse = TWO_PI*PARAMS.Pulsation
    //wave.y = PARAMS.WaveDistance
}

function setBGWaveDist(){
    bgSquare.y = 1/3*height + waveDistance*PARAMS.WaveDistance
    bgTriangle.y = 1/3*height + 2*waveDistance*PARAMS.WaveDistance
    bgSawtooth.y = 1/3*height + 3*waveDistance*PARAMS.WaveDistance
}


function setLogoParams(){
	setWaveParams(logo.sineWave)
	setWaveParams(logo.squareWave)
	setWaveParams(logo.sawtoothWave)
	setWaveParams(logo.triangleWave)
}


function updateBGWaves(){
	setBGWaveParams(bgSine)
	setBGWaveParams(bgSquare)
	setBGWaveParams(bgTriangle)
	setBGWaveParams(bgSawtooth)
    setBGWaveDist()
}

function displayBGWaves(){
	bgSine.display()
	bgSquare.display()
	bgTriangle.display()
	bgSawtooth.display()
}

function draw() {
	background(255,255,255)
	updateBGWaves()
	checkParams()
	setLogoParams()
	displayBGWaves()
	logo.display()
	ticketText.display()
	barCode.display()
}


