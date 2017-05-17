var mutationChance = 0.01;

function DNA(genes){
	if(genes){
		this.genes = genes;
	} else {
		this.genes = [];
		for(var i = 0; i < noOfPolygons; i++){
			/*var rgba = {r: 0, g: 0, b: 0, a: 0};
			rgba.r = random(255);
			rgba.g = random(255);
			rgba.b = random(255);
			rgba.a = random(255);
*/
			this.genes.push(random(255));
			this.genes.push(random(255));
			this.genes.push(random(255));
			this.genes.push(random(255));

			for(var j = 0; j < vertices; j++){
				this.genes.push(random(200), random(200));
			}
		}
	}

	this.crossover = function(parent){
		var newgenes = [];
		var mid = floor(this.genes.length/2);
		for(var i = 0; i < this.genes.length; i++){
			if(i > mid){
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = parent.genes[i];
			}
		}
		return new Polygon(new DNA(newgenes));
	}

	this.mutate = function(){
		for(var i = 0; i < this.genes.length; i++){
			if(random(100) < 10){
				if(i%geneSize == 0){
					this.genes[i].r = random(255);
					this.genes[i].g = random(255);
					this.genes[i].b = random(255);
					this.genes[i].a = random(255);
				} else {
					this.genes[i] = random(200);
				}
			}
		}
	}

	this.breed = function(parent){
		var newgenes = [];
		for(var i = 0; i < dnaLength; i += geneSize){
			var inheritedGene = (random() < 0.5) ? this.genes : parent.genes;
			for(var j = 0; j < geneSize; j++){
				var chromosome = inheritedGene[i + j];
				if(random() < mutationChance){
					chromosome = random(200);
				}
				newgenes.push(chromosome);
			}
		}
		return new Polygon(new DNA(newgenes));
	}
}

function randomRGBA(){
	if(ceil(random() * 4) == 1){
		return 'r';
	} else if(ceil(random() * 4) == 2){
		return 'g';
	} else if (ceil(random() * 4) == 3){
		return 'b';
	} else {
		return 'a';
	}
}