class BarCode{
    
    constructor(x,y,w){
        this.x = x
        this.y = y
        this.w = w
        this.xPos = []
        this.rectWidth = []
        this.computeDims()
        this.createBarCode()
	}
    
    
    
    computeDims(){
		this.h = this.w/2
		this.delta = this.w*0.05
		this.textW = this.w - 2*this.delta
		this.textH = this.h - 2*this.delta
		this.textX = this.delta
		this.textY = this.delta
	}
    
    
    
    createBarCode(){
        let wPos = this.delta
        let randomWidth
        let randomSpacing
        while (wPos < (this.w-this.delta-10)){
            this.xPos.push(wPos)
            randomWidth = random(2,10)
            this.rectWidth.push(randomWidth)
            randomSpacing = random(2,10)
            wPos = wPos + randomWidth + randomSpacing
        }
    }
    
    
    
    display(){
		push()
		translate(this.x,this.y)
		strokeWeight(1)
        fill(0)
        for (let i=0; i<this.xPos.length; i++){
            rect(this.xPos[i], this.textY, this.rectWidth[i], this.textH)
        }
        rect(this.delta+this.textW-2, this.textY, 2, this.textH)
        
        noFill()
		pop()
	}
    
}
