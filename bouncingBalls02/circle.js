function Circle(i)
{
	this.r = floor(random(10, 30));
	this.mass = this.r * this.r * PI;
	this.pos = createVector(random(this.r, width-this.r), random(this.r, height-this.r));
	this.vel = createVector(random(-2, 2), random(-2, 2));
	this.emptyColor = color(random(0, 127), random(0, 127), random(0, 127));
	this.fillColor = color(random(128, 255), random(128, 255), random(128, 255));
	this.c = this.emptyColor;
	this.i = i;

	this.toggleColor = function() {
		if (this.c == this.fillColor) {
			this.c = this.emptyColor;
		} else {
			this.c = this.fillColor;
		}
		
		return this.c;
	};

	this.updatePosition = function() {
		var collided = false;
		
		if (this.pos.x + this.r + this.vel.x > width || this.pos.x - this.r + this.vel.x < 0) {
			this.vel.x *= (0 - cor);
		}
		if (this.pos.y + this.r + this.vel.y > height || this.pos.y - this.r + this.vel.y < 0) {
			this.vel.y *= (0 - cor);
		}

		// var o;
		// if ((o = this.intersectsOther()) !== false) {
			// console.log("circle " + this.i + " collides " + o);			
			// this.updateSpeeds(objs[o]);
			// collided = true;
		// }
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		return collided;
	};
	
	this.draw = function() {
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.r*2);
	};
	
	this.updateSpeeds = function(other) {
        // d = dist(Balls[i].position.x,Balls[i].position.y, Balls[j].position.x, Balls[j].position.y);
        // r = Balls[i].r+Balls[j].r;
		var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
		var r = this.r + other.r;
		
		var mass = this.mass + other.mass;
		
		// Calculate new velocity
		var ui = this.vel.x;
		var uj = other.vel.x;
		
		//Balls[i].direction.x = (CRestitution*Balls[j].mass*(uj-ui) + Balls[i].mass*ui + Balls[j].mass*uj)/( Balls[i].mass + Balls[j].mass);
		this.vel.x = (cor*other.mass*(uj-ui) + this.mass*ui + other.mass*uj) / mass;
		// Balls[j].direction.x = (CRestitution*Balls[i].mass*(ui-uj) + Balls[i].mass*ui + Balls[j].mass*uj)/( Balls[i].mass + Balls[j].mass);
		other.vel.x = (cor*this.mass*(ui-uj) + this.mass*ui + other.mass*uj) / mass;
		// ui = Balls[i].direction.y;
		// uj = Balls[j].direction.y;
		
		ui = this.vel.y;
		uj = other.vel.y;
		// Balls[i].direction.y = (CRestitution*Balls[j].mass*(uj-ui) + Balls[i].mass*ui + Balls[j].mass*uj)/( Balls[i].mass + Balls[j].mass);
		this.vel.y = (cor * other.mass * (uj-ui) + this.mass*ui + other.mass*uj) / mass;
		// Balls[j].direction.y = (CRestitution*Balls[i].mass*(ui-uj)+ Balls[i].mass*ui + Balls[j].mass*uj)/( Balls[i].mass + Balls[j].mass);
		other.vel.y = (cor * this.mass * (ui-uj) + this.mass*ui + other.mass*uj) / mass;
	}
	
	// Do 2 circles intersect?
	this.intersects = function(other) {
		return dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) <= this.r + other.r;
	};
	
	this.intersectsOther = function() {
		for (i = 0; i < objs.length; i++) {
			if (i != this.i && this.intersects(objs[i])) {
				return i;
			}
		}
		return false;
	};
	
	this.getMass = function() {
		if (this.mass == undef) {
		}
		
		return this.mass;
	}
};