var mutationChance = 0.01;

function DNA(genes){
	if(genes){
		this.genes = genes;
	} else {
		this.genes = [];
		for(var i = 0; i < noOfPolygons; i++){

			this.genes.push(0);
			this.genes.push(0);
			this.genes.push(0);
			this.genes.push(random());

			for(var j = 0; j < vertices; j++){
				this.genes.push(random(), random());
			}
		}
	}

	/*this.breed = function(parent){
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
		return (new DNA(newgenes));
	}*/
	this.breed = function(){
		var newgenes = [];
		for(var i = 0; i < dnaLength; i+=geneSize){
			var inheritedGene = this.genes;
			for(var j = 0; j < geneSize; j++){
				var chromosome = inheritedGene[i + j]
				if(random() < mutationChance){
					chromosome += random(-0.5,0.5);
					if(chromosome > 1) chromosome = 1;
					else if(chromosome < 0) chromosome = 0;
				}
				newgenes.push(chromosome);
			}
		}
		return (new DNA(newgenes));
	}
}
