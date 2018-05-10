class GridColor
{
	constructor(r, g, b, a)
	{
		if (r == undefined) {
			r = random(0,255);
			console.log("undefined r");
		}
		console.log("r: "+ r);
		this.r = Math.floor(r);
		if (g == undefined) {
			this.g = Math.floor(r);
			this.b = Math.floor(r);
			console.log("undefined g");
		} else {
			this.g = Math.floor(g);
			this.b = Math.floor(b);
		}
		if (a == undefined) {
			this.a = 255;
		} else {
			this.a = Math.floor(a);
		}

		console.log("GridColor: (" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")");

	}

	toString() {
		return "r: " + this.r + ", g: " + this.g + ", b: " + this.b + ", a: " + this.a;
	}
}
