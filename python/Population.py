import Polygon
import settings

class Population(object):
	
	def __init__(self):
		self.population = [];

		for i in range(settings.maxPopulation):
			self.population.append(Polygon.Polygon());

	def calculateFitness(self):
		for i in range(settings.maxPopulation):
			self.population[i].calculateFitness();

	def selection(self):
		self.population[0] = self.population[0].breed();

