

class Wave{

	constructor(x,y,w,h){
		console.log("In constructor")
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color(0,0,0)
		this.lineWidth = 10
        this.amplitude = 1
		this.waveNumber = 2
        this.pulse = TWO_PI*0.0   // 2 * PI * nombre de pulsation par seconde
		this.phase = 3*PI/2
		this.lastUpdate = this.getTime()
		this.fill = false
		this.fillH = 0
	}

	getTime(){
		let d = new Date()
		return d.getTime()
	}

	getAngle(x){
		return map(x,0,this.w,this.phase,(TWO_PI * this.waveNumber) + this.phase)
	}

	getWaveValue(angle){
		return this.amplitude*sin(angle)
	}

	getYValue(waveValue){
		return map(waveValue,-1,1,0,this.h)
	}

	update(){
		let now = this.getTime()
		let elapsed = now - this.lastUpdate
		this.lastUpdate = now
		this.phase += this.pulse*(elapsed/1000) 
		this.phase %= TWO_PI
	}

	display(){
		this.update()
		push()
		translate(this.x,this.y)
		
		if(!this.fill){
			noFill()
			stroke(this.color)
			strokeWeight(this.lineWidth)
		}else{
			noStroke()
			fill(this.color)
		}
		beginShape()
		for(let x = 0; x < this.w; x++){
			vertex(x,this.getYValue(this.getWaveValue(this.getAngle(x))))
		}
		if(this.fill){
			vertex(this.w,this.fillH)
			vertex(0,this.fillH)
			endShape(CLOSE)
		}else{
			endShape()
		}
		noFill()
		pop()
	}
}


//======================================================================


class SineWave extends Wave{

	getWaveValue(angle){
		return this.amplitude*sin(angle)
	}
}


//======================================================================


class SquareWave  extends Wave{
    
    constructor(x,y,w,h){
        super(x,y,w,h)
		this.phase = -0.005
	}

	getWaveValue(angle){
		let newAngle = (angle) % TWO_PI
		if(newAngle > PI || newAngle < 0 && newAngle > -PI){
			return -1 * this.amplitude
		}else{
			return 1 * this.amplitude
		}
	}
}


//======================================================================



class TriangleWave  extends Wave{
    
    constructor(x,y,w,h){
        super(x,y,w,h)
		this.phase = PI/2 - 0.01
	}
    
    getWaveValue(angle){ //LA FONCTION DE L'ONDE QUI VA DEFINIR onde, PRENDS UN ANGLE EN PARAMETRE ET RETOURNE UNE VALEURE ENTRE -1 ET 1 
        return (2*this.amplitude/PI)*asin(sin(angle))
    }
}


//======================================================================


class SawtoothWave  extends Wave{

	constructor(x,y,w,h){
        super(x,y,w,h)
		this.phase = -0.01
	}
    
    getWaveValue(angle){
		return (2*this.amplitude/PI)*atan(1/tan((angle)/2))
	}
}


//======================================================================



