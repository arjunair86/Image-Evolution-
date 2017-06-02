from PIL import Image

def init():
	global noOfPolygons;
	global vertices;
	global dnaLength;
	global geneSize;
	global mutationChance;
	global selectionCutOff;
	global maxPopulation;
	global finalIMG
	noOfPolygons = 50;
	vertices = 3;
	geneSize = 4 + (2 * vertices);
	dnaLength = noOfPolygons * geneSize;
	mutationChance = 0.01;
	selectionCutOff = 0.15;
	maxPopulation = 1;

def loadSourcePixels():
	global sourceIMG;
	sourceIMG = Image.open("chrome.png");
	global sourcePIX;
	sourcePIX = convert_pix_seq(sourceIMG.load());

def convert_pix_seq(pix):
	array = []
	for i in range(200):
		for j in range(200):
			for k in range(4):
				array.append(pix[i,j][k])
	return array