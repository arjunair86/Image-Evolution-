import DNA
import settings
from PIL import Image, ImageDraw


class Polygon(object):

	def __init__(self, dna=None, fitness=None):
		if(dna and fitness):
			self.dna = dna;
			self.fitness = fitness;
		elif(dna):
			self.dna = dna;
		else:
			self.dna = DNA.DNA();

	def createImageFromGenes(self):
		img = []
		draw = []
		temp = self.dna.genes
		for i in range(0, settings.dnaLength, settings.geneSize):
			tempIMG = Image.new('RGBA', (200, 200));
			img.append(tempIMG);
			tempDRAW = ImageDraw.Draw(tempIMG);
			draw.append(tempDRAW);
			tempDRAW.polygon([(int(temp[i+4]*200), int(temp[i+5]*200)),(int(temp[i+6]*200), int(temp[i+7]*200)),
						(int(temp[i+8]*200), int(temp[i+9]*200))], 
						fill = (int(temp[i]*255),int(temp[i+1]*255),int(temp[i+2]*255),int(temp[i+3]*255)));

		settings.finalIMG = Image.new('RGBA', (200, 200));
		for i in range(settings.noOfPolygons):
			settings.finalIMG = Image.alpha_composite(settings.finalIMG, img[i])
		return settings.finalIMG.load()


	def calculateFitness(self):
		diff = 0;
		dp = 0;
		pixels = self.pix_to_seq(self.createImageFromGenes(), 0)
		for i in range(200*200*4):
			dp = settings.sourcePIX[i] - pixels[i]
			diff += dp * dp
		self.fitness = 1 - diff / (200 * 200 * 4 * 255 * 255)

	def breed(self):
		cloneParent = Polygon(self.dna, self.fitness);
		child = self.dna.breed();
		childPolygon = Polygon(child);
		childPolygon.calculateFitness();
		if(childPolygon.fitness > self.fitness):
			return childPolygon;
		else:
			return cloneParent;

	def saveImage(self):
		result = Image.new('RGBA', (200, 200));
		result.putdata(data=self.pix_to_seq(settings.finalIMG.load(), 1));
		result.save("result.png");

	def pix_to_seq(self, pix, opt):
		seq1 = []
		seq2 = []
		for i in range(200):
			for j in range(200):
				seq2.append(pix[i,j])
				for k in range(4):
					seq1.append(pix[i,j][k])
		if(opt == 0):
			return seq1
		else:
			return seq2