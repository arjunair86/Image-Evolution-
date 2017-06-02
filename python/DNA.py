import settings
import random

class DNA(object):

	def __init__(self, genes=None):
		if(genes):
			self.genes = genes;
		else:
			self.genes = [];
			for i in range(settings.noOfPolygons):
				self.genes.append(random.random());
				self.genes.append(random.random());
				self.genes.append(random.random());
				self.genes.append(random.random());
				for j in range(settings.vertices):
					self.genes.append(random.random());
					self.genes.append(random.random());

	def breed(self):
		newgenes = [];
		for i in range(0, settings.dnaLength, settings.geneSize):
			inheritedGene = self.genes;
			for j in range(settings.geneSize):
				chromosome = inheritedGene[i + j]
				if(random.random() < settings.mutationChance):
					chromosome += random.uniform(-0.5,0.5);
					if(chromosome > 1):
						chromosome = 1;
					elif(chromosome < 0):
						chromosome = 0;
				newgenes.append(chromosome);
		return DNA(newgenes);