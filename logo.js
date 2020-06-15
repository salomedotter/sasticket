class Logo{
    
	constructor(x,y,w){
		this.x = x
		this.y = y
		this.w = w
		this.computeDims()
		this.createWaves()
		this.text = "SAS"
		this.font = textFont("Georgia")
		
	}
    
    
    
	getWaveX(waveNum){
		return this.delta
	}
    
    
    
	getWaveY(waveNum){
		return this.delta*(waveNum + 1) + this.waveH*waveNum 
	}
    
    
    
	computeDims(){
		this.h = this.w/2
		this.delta = this.w*0.05
		this.waveW = this.w/2 - 3*this.delta/2
		this.waveH = (this.h - 5*this.delta)/4
		this.textW = this.w/2 - 3*this.delta/2
		this.textH = this.h - 2*this.delta
		this.textX = this.w/2 + this.delta/2
		this.textY = this.delta
	}
    
    
    
	createWaves(){
		this.sineWave = new SineWave(this.getWaveX(0),this.getWaveY(0),this.waveW,this.waveH)
		this.squareWave = new SquareWave(this.getWaveX(1),this.getWaveY(1),this.waveW,this.waveH)
		this.triangleWave = new TriangleWave(this.getWaveX(2),this.getWaveY(2),this.waveW,this.waveH)
		this.sawtoothWave = new SawtoothWave(this.getWaveX(3),this.getWaveY(3),this.waveW,this.waveH)
	}
    
    
    
	display(){
		push()
		translate(this.x,this.y)
		this.sineWave.display()
		this.squareWave.display()
		this.triangleWave.display()
		this.sawtoothWave.display()
		textFont(this.font)
		textSize(this.textH*1.325) // 1.26 1.205 1.13
		//textAlign(CENTER,CENTER)
        strokeWeight(1)
		text(this.text, this.textX - (this.h+this.textH)*0.0164, this.textY - (this.h+this.textH)*0.077, this.w*2, this.h*2) // 0.0183  0.067      0.0123  0.047
		noFill()
		pop()
	}
}
