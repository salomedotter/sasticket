class TicketText{
    
    constructor(x,y,w){
        this.x = x
        this.y = y
        this.w = w
        this.computeDims()
        this.text = "\nSpace Art Salomé\nJune 16, 10:00 AM\n1200.00 SEK\nStudent"
        this.font = textFont("Georgia")
	}
    
    
    
    computeDims(){
		this.h = this.w/2
		this.delta = this.w*0.05
		this.textW = this.w - 2*this.delta
		this.textH = this.h - 2*this.delta
		this.textX = this.delta
		this.textY = this.delta
	}
    
    
    
    display(){
		push()
		translate(this.x,this.y)
		textFont(this.font)
		textSize(this.h*0.17) // 1.13
		//textAlign(CENTER,CENTER)
        strokeWeight(1)
		text(this.text,this.textX,this.textY/3,this.w,this.h) // 0.0123  0.047
		
		noFill()
		pop()
	}
    
}
