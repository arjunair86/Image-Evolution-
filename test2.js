var obj;
function setup(){
	createCanvas(200,200);
	var fiftyPolygons = ex(50);
}

function draw(){
	
}

function ex(repeat){
	for(var i = 0; i < repeat; i++){
		beginShape();
			for(var i = 0; i < 5; i++){
				vertex(random(200), random(200));
			}
			noStroke();
			for(var i = 0; i < 5; i++){
				fill(random(255), random(255), random(255), random(180));
			}
		endShape();
	}
}