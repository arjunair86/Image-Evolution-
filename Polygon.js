var vertices = 3;
var noOfPolygons = 125;
var geneSize = 4 + (vertices * 2);
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
				for(var j = i+4; j < i+geneSize; j+=2){
					vertex(this.dna.genes[j], this.dna.genes[j+1]);
				}
				noStroke();
				fill(this.dna.genes[i], this.dna.genes[i+1], this.dna.genes[i+2], this.dna.genes[i+3])
			endShape();
		}
	}

	this.calculateFitness = function(){
		var diff = 0;
		workingCtx.clearRect(0, 0, 200, 200);
		this.show();
		loadPixels();
		var diff = 0;
		for(var i = 0; i < 200*200*4; i++){
			var dp = data.data[i] - pixels[i];
			diff += dp * dp;
		}
		this.fitness = 1 - diff / (200 * 200 * 4 * 255 * 255);
	}

	this.drawToASpecificContext = function(context){
		context.clearRect(0, 0, 200, 200);
		// context.fillStyle = "#FFF";
		// context.fillRect(0, 0, 200, 200);
		for(var i = 0; i < dnaLength; i+=geneSize){
			context.beginPath();
			context.moveTo(this.dna.genes[i + 4], this.dna.genes[i + 5]);

			for(var j = i+6; j < i+geneSize; j+=2){
				context.lineTo(this.dna.genes[j], this.dna.genes[j+1]);
			}
			context.closePath();	

			var styleString = 'rgba(' + 
				((this.dna.genes[i]) >> 0) + ',' + 
		        ((this.dna.genes[i+1]) >> 0) + ',' + 
		        ((this.dna.genes[i+2]) >> 0) + ',' +
		        (map(this.dna.genes[i+3], 0, 255, 0, 1)) + ')';
		    context.fillStyle = styleString;
		    context.fill();
		}
	}

	this.copy = function(){
		var copyDna = this.dna;
		var copyFitness = this.fitness;
		var clonedObject = new Polygon(copyDna, copyFitness);
		return clonedObject;
	}
}