var nCircles = 10;
var objs = [];
var bgColors = [0, 255];
var b = 0;

function setup() {
	createCanvas(800, 600);
	bgColors[0] = color(random(0, 255), random(0, 255), random(0, 255));
	bgColors[1] = color(random(0, 255), random(0, 255), random(0, 255));
	console.log("setup bgColor: " + bgColors[b]);
	for (i = 0; i < nCircles; i++) {
		objs[i] = new Circle();
		//console.log(objs[i]);
	}
	frameRate(30);
	textSize(20);
}

function draw() {
	background(bgColors[b]);
	text(frameCount + " @" + round(getFrameRate()), 10, 30);
	noStroke();
	for (i = 0; i < objs.length; i++) {
		objs[i].draw();
		objs[i].updatePosition();
	}
}

function mouseClicked()
{
	var d;
	var cIn = false;
	for (i = 0; i < objs.length; i++) {
		d = distance(mouseX, mouseY, objs[i].x, objs[i].y);
		if (d < objs[i].r) {
			//console.log("Obj " + i + ", distance " + d + ", radius " + objs[i].r);
			objs[i].c = objs[i].toggleColor();
			cIn = true;
		}
	}
	if (!cIn) {
		console.log("Toggle ALL!");
		for (i = 0; i < objs.length; i++) {
			objs[i].c = objs[i].toggleColor();
		}
		b = 1 - b;
		//console.log("update bgColor: " + bgColors[b]);
	}
}

function distance(p1x, p1y, p2x, p2y)
{
	return sqrt((p2x - p1x)*(p2x - p1x) + (p2y - p1y)*(p2y - p1y));
}