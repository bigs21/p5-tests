var nCircles = 50;
var maxCollisions;
var objs = [];
var bgColors = [0, 255];
var b = 0;
var regenerated = 0;
var initialized = false;
var looping = true;
var cor = 0.9999; // coefficient of restitution (COR): 1 means no kinetic energy lost 


function setup() {
	createCanvas(800, 600);
	initColors();
	maxCollisions = nCircles * 2;
	for (var i = 0; i < nCircles; i++) {
		objs[i] = createCircle(i);
		if (regenerated >= maxCollisions) {
			console.log("Stop generating in circle " + i);
			nCircles = i+1;
			break;
		}
	}
	console.log("Avoided "+ regenerated + " collisions.");
	regenerated = 0;
	initialized = true;
	// frameRate(30);
	textSize(22);
}

function draw() {
	background(bgColors[b]);
	text(nCircles + " @" + round(getFrameRate()), 10, 30);
	noStroke();
	var collided = false;
	
	for (var i = 0; i < objs.length; i++) {
		detectCollisions(i, objs);
		collided = objs[i].updatePosition(i) || collided;
	}
	for (var i = 0; i < objs.length; i++) {
		objs[i].draw();
	}
	if (collided) {
		//noLoop();
	}
}

function initColors()
{
	bgColors[0] = color(random(128, 255), random(128, 255), random(128, 255));
	bgColors[1] = color(random(0, 127), random(0, 127), random(0, 127));
	console.log("setup bgColor: " + bgColors[b]);
}

function detectCollisions(j, obj)
{
	for (var i = 0; i < objs.length; i++) {
		if (i != j) {
			if (objs[i].intersects(objs[j])) {
				objs[j].updateSpeeds(objs[i]);
			}
		}
	}
}

function intersectsOtherCircles(c1)
{
	for (i = 0; i < objs.length; i++) {
		if (objs[i].intersects(c1)) {
			return true;
		}
	}
	
	return false;
}

function createCircle(i)
{
	var circle;
	console.log("New circle " + i + " after " + regenerated + " regenerations");
	while (intersectsOtherCircles(circle = new Circle(i)) && regenerated < maxCollisions) {
		console.log("New collision: generate new " + i);
		regenerated++;
	}
	if (regenerated >= maxCollisions) {
		console.log("Too many circles regenerated");
		//noLoop();
	}
	return circle;
}

function mouseClicked()
{
	var d;
	var cIn = false;
	for (i = 0; i < objs.length; i++) {
		//console.log("mouseClicked, calc dist");
		d = dist(mouseX, mouseY, objs[i].pos.x, objs[i].pos.y);
		if (d < objs[i].r) {
			objs[i].c = objs[i].toggleColor();
			cIn = true;
		}
	}
	if (!cIn) {
		for (i = 0; i < objs.length; i++) {
			objs[i].c = objs[i].toggleColor();
		}
		b = 1 - b;
	}
}

function keyPressed()
{
	//console.log("keyCode: "+keyCode);
	switch (keyCode) {
		case 171: // '+'
			nCircles++;
			console.log("New Circle!");
			objs[nCircles-1] = createCircle(nCircles-1);
			break;
		case 173: // '-'
			nCircles--;
			objs.pop();
			//console.log("Remove Circle :(");
			break;
		case 32: // ' '
			looping ? noLoop() : loop();
			looping = !looping;
			break;

	}
}