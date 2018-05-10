function Circle()
{
	this.r = floor(random(10, 50));
	this.x = random(this.r, width-this.r);
	this.y = random(this.r, height-this.r);
	this.speedX = random(-2, 2);
	this.speedY = random(-2, 2);
	this.emptyColor = color(random(0, 255), random(0, 255), random(0, 255));
	this.fillColor = color(random(0, 255), random(0, 255), random(0, 255));
	this.c = this.emptyColor;
	
	this.toggleColor = function() {
		if (this.c == this.fillColor) {
			this.c = this.emptyColor;
		} else {
			this.c = this.fillColor;
		}
		
		return this.c;
	};

	this.updatePosition = function() {
		if (this.x + this.r + this.speedX > width || this.x - this.r + this.speedX < 0) {
			this.speedX *= -1;
		}
		if (this.y + this.r + this.speedY > height || this.y - this.r + this.speedY < 0) {
			this.speedY *= -1;
		}
		this.x += this.speedX;
		this.y += this.speedY;
	};
	
	this.draw = function() {
		fill(this.c);
		ellipse(this.x, this.y, this.r*2);
	};
};