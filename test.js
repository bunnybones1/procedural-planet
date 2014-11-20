var PlanetSampler = require('./');
var clear = require('clear');

var asciiEmpty = "-";
var ascii = "░▒▓▓";
var asciiFull = "█";

var planetSampler = new PlanetSampler();

var rows = 10;
var layers = 10;
var cols = 20;
var scale = .05;
// var high = -Infinity;
// var low = Infinity;
function drawCrossSection(iz) {
	clear();
	for (var iy = -rows; iy < rows; iy++) {
		var outputLine = iy % 2 == 0 ? "." : ",";
		for (var ix = -cols; ix < cols; ix++) {
			var val = planetSampler.sample(ix*scale, iy*scale*2, iz*scale*2);
			// low = low < val ? low : val;
			// high = high > val ? high : val;
			if(val == 0) {
				outputLine += asciiEmpty;
			} else if (val == 1) {
				outputLine += asciiFull;
			} else {
				outputLine += ascii.charAt(~~(val * (ascii.length-1)));
			}
		}
		console.log(outputLine);
	};

}

var iz = -layers; 
function drawNextZ() {
	if(iz < layers) {
		drawCrossSection(iz);
		setTimeout(function() {
			drawNextZ();
		}, 100);
	}
	iz++;
}

drawNextZ();