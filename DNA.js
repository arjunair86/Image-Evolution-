var mutationChance = 0.01;

function DNA(genes){
	if(genes){
		this.genes = genes;
	} else {
		this.genes = [];
		for(var i = 0; i < noOfPolygons; i++){

			this.genes.push(random());
			this.genes.push(random());
			this.genes.push(random());
			this.genes.push(random());

			for(var j = 0; j < vertices; j++){
				this.genes.push(random(), random());
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
					chromosome = random();
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