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
		var newPopulation = [];
		for(var i = 0; i < floor(maxpop*0.15); i++){
			var partnerA = this.population[i];
			for(var j = 0; j < ceil(1/0.15); j++){
				var randInd = i;
				while(partnerB == i)
					randInd = (random(maxpop) * 0.15) >> 0;
				var partnerB = this.population[randInd];
				var child = partnerA.dna.breed(partnerB.dna);
				newPopulation.push(child);	
			}
		}
		this.population = newPopulation;
	}

	this.acceptReject = function(maxFitness){
		while(true){
			var index = floor(random(this.population.length))
			var partner = this.population[index];
			var r = random(maxFitness);
			if(r < partner.fitness){
				return partner;
			}
		}
	}

}

function compare(a,b) {
  if (a.fitness < b.fitness)
    return 1;
  if (a.fitness > b.fitness)
    return -1;
  return 0;
}