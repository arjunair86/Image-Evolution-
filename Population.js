var selectionCutOff = 0.15// 15%

function Population(maxpop){
	this.population = [];

	for(var i = 0; i < maxpop; i++){
		this.population[i] = new Polygon();
	}

	this.calculateFitness = function(){
		for(var i = 0; i < this.population.length; i++)
			this.population[i].calculateFitness();
	}

	this.sortFitness = function(){
		this.population.sort(compare);
	}

	this.selection = function(){
		//truncation selection
		var newPopulation = [];
		// (this.population[0].fitness < 95) ? selectionCutOff = 0.15: selectionCutOff = 0.10;
		for(var i = 0; i < (maxpop * selectionCutOff); i++){
			var partnerA = this.population[i];
			for(var j = 0; j < ceil(1 / selectionCutOff); j++){
				var randInd = i;
				while(partnerB == i)
					randInd = (random(maxpop) * selectionCutOff) >> 0;
				var partnerB = this.population[randInd];
				var child = partnerA.dna.breed(partnerB.dna);
				newPopulation.push(child);	
			}
		}
		this.population = newPopulation;
	}
}

function compare(a,b) {
  if (a.fitness < b.fitness)
    return 1;
  if (a.fitness > b.fitness)
    return -1;
  return 0;
}