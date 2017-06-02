from DNA import * 
from PIL import Image, ImageDraw
import settings
from random import uniform, random
import Population
import pdb

settings.init();
settings.loadSourcePixels();

pop = Population.Population();
pop.calculateFitness();


while(1):
	pop.population[0].saveImage();
	pop.selection();
# pdb.set_trace()
