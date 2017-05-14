function DNA(genes){
	if(genes){
		this.genes = genes;
	} else {
		this.genes = [];
		for(var i = 0; i < noOfPolygons; i++){
			var rgba = {r: 0, g: 0, b: 0, a: 0};
			rgba.r = random(255);
			rgba.g = random(255);
			rgba.b = random(255);
			rgba.a = random(255);

			this.genes.push(rgba);

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
			if(random(100) < 1){
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
}