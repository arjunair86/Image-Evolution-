var vertices = 3;
var noOfPolygons = 125;
var geneSize = 1 + (vertices * 2);
var dnaLength = noOfPolygons * geneSize;

function Polygon(dna){

	if(dna){
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}

	this.show = function(){
		for(var i = 0; i < dnaLength; i+=geneSize){
			beginShape();
				for(var j = i+1; j < i+geneSize; j+=2){
					vertex(this.dna.genes[j], this.dna.genes[j+1]);
				}
				noStroke();
				fill(this.dna.genes[i].r, this.dna.genes[i].g, this.dna.genes[i].b, this.dna.genes[i].a)
			endShape();
		}
	}

	this.calculateFitness = function(){
		var diff = 0;
		workingCtx.clearRect(0, 0, 200, 200);
		this.show();
		loadPixels();
		var diff = 0;
		this.fitness;
		for(var i = 0; i < 200*200*4; i++){
			var dp = data.data[i] - pixels[i];
			diff += dp * dp;
		}
		this.fitness = 1 - diff / (200 * 200 * 4 * 200 * 200);
		// this.fitness = map(diff, 0, 200*200*4*200*200*4, 1, 0);
	}

	this.drawToASpecificContext = function(context){
		context.clearRect(0, 0, 200, 200);
		// context.fillStyle = "#FFF";
		// context.fillRect(0, 0, 200, 200);
		for(var i = 0; i < dnaLength; i+=geneSize){
			context.beginPath();
			context.moveTo(this.dna.genes[i + 1], this.dna.genes[i + 2]);

			for(var j = i+3; j < i+geneSize; j+=2){
				context.lineTo(this.dna.genes[j], this.dna.genes[j+1]);
			}
			context.closePath();	

			var styleString = 'rgba(' + 
				((this.dna.genes[i].r) >> 0) + ',' + 
		        ((this.dna.genes[i].g) >> 0) + ',' + 
		        ((this.dna.genes[i].b) >> 0) + ',' +
		        (map(this.dna.genes[i].a, 0, 255, 0, 1)) + ')';
		    context.fillStyle = styleString;
		    context.fill();
		}
	}
}