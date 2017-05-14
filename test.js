var img2;
function preload(){
	createCanvas(500,200);
	img = loadImage("download.png");
	img2 = loadImage("download (1).png");
}

function setup(){
	image(img, 0, 0);
	loadPixels();
	var pixImage1 = pixels;
	console.log(pixImage1);
	image(img2, 0, 0);
	loadPixels();
	var pixImage2 = pixels
	console.log(pixImage2);
	var same = 0;
	for(var i = 0; i < 400000; i++){
		if(pixImage1[i] == pixImage2[i])
			same = same + 1;
	}
	console.log(same/4000);
}

function draw(){

}