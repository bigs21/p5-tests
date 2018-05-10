let values = [];
let cols = 800;
let colScale = 1;
let rows = 300;
let rowScale = 2;
let speed = 2000;
let mincolScale = Infinity;
let maxcolScale = -Infinity;
let scaleChanges = 0;

function setup()
{
	createCanvas(cols * colScale, rows * rowScale);

	for (let i = 0; i < width; i++) {
		values[i] = 0;
	}
}

function draw()
{
	background(51);

	for (i = 0; i < speed; i++) {
		if (updateValues() >= rows) {
			if (scaleChanges < 30) {
				let inc = 0.85;
				rows = rows / inc;
				rowScale = rowScale * inc;
				speed = min(5000, speed / ((inc+1)/2));
				scaleChanges++;
				console.log("Scale update " + scaleChanges);
				console.log(rows, rowScale, speed);

			} else {
				console.log("Between: " + mincolScale + " and " + maxcolScale);
				noLoop();
				break;
			}
		}
	}

	noStroke();
	fill(200);
	for (let i = 0; i < width; i++) {
		rect(i*colScale, height - values[i]*rowScale, colScale, values[i]*rowScale);
	}
}

function updateValues()
{
	let index = floor(randomGaussian(cols / 2, cols/8));
	values[index] += 1;
	//console.log(index, values[index]);
	if (index > maxcolScale) {
		maxcolScale = index;
		console.log("Max: " + maxcolScale)
	}
	if (index < mincolScale) {
		mincolScale = index;
		console.log("Min: " + mincolScale)
	}
	return values[index];
}
