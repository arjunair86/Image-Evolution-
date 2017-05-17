var pop;
var maxpop = 50;
var pop = [];
var pix;
var i, c,ctx,data, workingCtx, fittestCtx;
var fit;

function preload(){
	c = document.getElementById("refCanvas");
	ctx = c.getContext("2d");
	ctx.scale(2,2)
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

	// pop = new Population(maxpop);
	// pop.calculateFitness();

	fit = createP();

}


function draw(){
	// pop.produceChild();
	// pop.population[0].drawToASpecificContext(fittestCtx);


	pop.calculateFitness();
	pop.sortFitness();
	pop.population[0].drawToASpecificContext(fittestCtx);
	
	fit.html(Math.round(pop.population[0].fitness*10000)/100);
	
	pop.selection();
}