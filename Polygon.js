var vertices = 6;
var noOfPolygons = 50;
var geneSize = 4 + (vertices * 2);
var dnaLength = noOfPolygons * geneSize;

function Polygon(dna, fitness){

	if(dna && fitness){
		this.dna = dna;
		this.fitness = fitness;
	} else if(dna){
		this.dna = dna;
	} else{
		this.dna = new DNA();
	}

	this.show = function(){
		for(var i = 0; i < dnaLength; i+=geneSize){
			beginShape();
				for(var j = i+4; j < i+geneSize; j+=2){
					vertex((this.dna.genes[j] * 200) >> 0, (this.dna.genes[j+1] * 200) >> 0);
				}
				noStroke();
				fill((this.dna.genes[i] * 255) >> 0, (this.dna.genes[i+1] * 255) >> 0, (this.dna.genes[i+2] * 255) >> 0, (this.dna.genes[i+3] * 255) >> 0);
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

	/*this.breed = function(parent){
		var child = this.dna.breed(parent.dna);
		return (new Polygon(child));
	}*/
	this.breed = function(){
		var cloneParent = this.clone();
		var child = this.dna.breed();
		var childPolygon = new Polygon(child);
		childPolygon.calculateFitness();
		if(childPolygon.fitness > this.fitness){
			return childPolygon;
		} else {
			return cloneParent;
		}
	}
	this.clone = function(){
		var cloneDNA = this.dna;
		var cloneFitness = this.fitness;
		return (new Polygon(cloneDNA, cloneFitness));
	}

	this.drawToASpecificContext = function(context){
		context.clearRect(0, 0, 200, 200);
		for(var i = 0; i < dnaLength; i+=geneSize){
			context.beginPath();
			context.moveTo((this.dna.genes[i + 4] * 200) >> 0, (this.dna.genes[i + 5] * 200) >> 0);

			for(var j = i+6; j < i+geneSize; j+=2){
				context.lineTo((this.dna.genes[j] * 200) >> 0, (this.dna.genes[j+1] * 200) >> 0);
			}
			context.closePath();	

			var styleString = 'rgba(' + 
				((this.dna.genes[i] * 255) >> 0) + ',' + 
		        ((this.dna.genes[i+1] * 255) >> 0) + ',' + 
		        ((this.dna.genes[i+2] * 255) >> 0) + ',' +
		        (this.dna.genes[i+3]) + ')';
		    context.fillStyle = styleString;
		    context.fill();
		}
	}
}