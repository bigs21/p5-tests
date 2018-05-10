	let grid = [];
	let next = [];
	let d;
	let initColor;

	function setup()
	{
		createCanvas(200, 200);
		pixelDensity(1);
		let c2;
		let c = initColor = new GridColor(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
		console.log("Initial color: " + c.r + ", " + c.g + ", " + c.b);
		let nextFlip;

		for (let y = 0; y < height; y++) {
			grid[y] = [];
			if (y != 0) {
				c2 = flipColor(grid[y-1][0]);
				// console.log("Flip row " + y + " from " + c + " to " + c2);
				c = c2;
			}
			nextFlip = random(0, 10);
			for (let x = 0; x < width; x++) {
				// console.log(c);
				if (x >= nextFlip) {
					c = flipColor(c, undefined, x, y);
					nextFlip = x + random(0, 10);
				}
				grid[y][x] = c;
			}
		}
		next = grid;
		console.log("Setup done");
		frameRate(2);
		// textSize(22);
	}

	function draw()
	{
		//background(c.r, c.g, c.b);
		loadPixels();
		let i;

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				// loop over pixels
				i = 4 * (y * width + x);
				pixels[i    ] = grid[y][x].r;
				pixels[i + 1] = grid[y][x].g;
				pixels[i + 2] = grid[y][x].b;
				pixels[i + 3] = grid[y][x].a;
			}
		}
		updatePixels();
		console.log("draw");

		morphGrid();

		swap();

		text(round(getFrameRate()), 10, 30);
		if (frameCount > 2) {
			noLoop();
		}
	}

	function morphGrid()
	{
		let x, y;
		// let nextFlip = random(0, 5);
		// let i = 0;
		console.log(grid[0]);
		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				// if (i >= nextFlip) {
					// next[y][x] = grid[y][x];
					next[y][x] = morphPosition(x, y, 20);
					// console.log("Morph next grid cell (" + x + ", " + y + ") from " + grid[y][x] + " to " + next[y][x]);
					// nextFlip = i + random(0, 5);
				// } else {
					// next[y][x] = grid[y][x];
				// }
				// i++;
			}
			console.log("Morph next grid cell (" + x + ", " + y + ") from " + grid[y][x] + " to " + next[y][x]);
		}
	}

	function swap()
	{
		let temp = grid;
		grid = next;
		next = temp;
	}

	function flipColor(c, intensity, x, y)
	{
		if (intensity == undefined) {
			intensity = 20;
		}
		let comp = int(random(3));
		//console.log(comp)
		let r = int(random(-intensity, intensity));
		// console.log("flip " + c + ", intens " + intensity + " @ (" + x + ", " + y + ")");
		c.r += (comp == 0 ? r : 0);
		c.g += (comp == 1 ? r : 0);
		c.b += (comp == 2 ? r : 0);
		return c;
	}

	function morphPosition(x, y, intensity)
	{
		if (intensity == undefined) {
			intensity = 20;
		}
		// console.log("morphPosition intensity " + intensity + " @ (" + x + ", " + y + ")");
		let newColor = grid[y][x];
		newColor.r = morphColorComponent("r", int(random(-intensity, intensity)), x, y);
		newColor.g = morphColorComponent("g", int(random(-intensity, intensity)), x, y);
		newColor.b = morphColorComponent("b", int(random(-intensity, intensity)), x, y);
		return newColor;
	}

	function getComponentAt(comp, x, y)
	{
		let v;
		if (comp == "r") {
			v = grid[y][x].r;
		} else if (comp == "g") {
			v = grid[y][x].g;
		} else if (comp == "b") {
			v = grid[y][x].b;
		} else if (comp == "a") {
			v = grid[y][x].a;
		}

		return v;
	}

	function morphColorComponent(comp, intensity, x, y)
	{
		let dif = 1 - (intensity / 255);
		let newV = getComponentAt(comp, x, y);
		let factor = 0;
		let nx, ny;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				nx = x + i;
				ny = y + j;
				if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
					continue;
				} else if (abs(i) + abs(j) == 0) {
					factor = -1 * dif;
				} else if (abs(i) + abs(j) == 1) {
					factor = 0.2 * dif;
				} else {
					factor = 0.05 * dif;
				}
				newV += factor * getComponentAt(comp, nx, ny);
			}
		}

		return newV;
	}
