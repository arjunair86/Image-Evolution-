var pop;
var maxpop = 50;
var c, ctx, data, workingCtx, fittestCtx;
var fit;
var lastBestFitness = 0;
var lastBestFitPolygon = null;

function preload(){
	c = document.getElementById("refCanvas");
	ctx = c.getContext("2d");
	data = ctx.getImageData(0, 0, 200, 200);
}

function setup(){
	createCanvas(200, 200);
	
	c = document.getElementById("defaultCanvas0");
	workingCtx = c.getContext("2d");
	c.style.display = "none"

	c = document.getElementById("fittestCanvas");
	fittestCtx = c.getContext("2d");

	pop = new Population(maxpop);

	fit = createP();

}


function draw(){
	pop.calculateFitness();
	pop.sortFitness();
	if(pop.population[0].fitness < lastBestFitness){
		pop.population[0] = lastBestFitPolygon;
	}
	lastBestFitPolygon = pop.population[0];
	lastBestFitness = pop.population[0].fitness;
	pop.population[0].drawToASpecificContext(fittestCtx);
	
	fit.html(Math.round(pop.population[0].fitness*10000)/100);
	
	pop.selection();
}