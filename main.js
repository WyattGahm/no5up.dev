function onload(){
	init();
	var intervals = setIntervals();
	
};

function hexToRGB(hexa){
    var chunks = [];
    var tmp,i;
    hexa = hexa.substr(1); // remove the pound 
    if ( hexa.length === 3){
        tmp = hexa.split("");
        for(i=0;i<3;i++){
            chunks.push(parseInt(tmp[i]+""+tmp[i],16));
        }
    }else if (hexa.length === 6){
        tmp = hexa.match(/.{2}/g);
        for(i=0;i<3;i++){
            chunks.push(parseInt(tmp[i],16));
        }
    }else {
        throw new Error("'"+hexa+"' is not a valid hex format");
    }

    return chunks;
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var background, ctx, columns;
var red, redv, blue, bluev, green, greenv;
var fontsize = 12;
var matrix = "abcdefghijklmnopqrstuvwxyz".split("");
var drops = [];
function init() {
	var a = "#115599"; //config.colorA;
	var b = "#505050"; //config.colorB;
	var red = hexToRGB(a)[0], redv = hexToRGB(b)[0], blue = hexToRGB(a)[1], bluev = hexToRGB(b)[1], green = hexToRGB(a)[2], greenv = hexToRGB(b)[2];
	background = document.getElementById("background");
	ctx = background.getContext("2d");
	background.height = window.innerHeight;
	background.width = window.innerWidth;
	columns = background.width / fontsize;
	drops = [];
	for (var x = 0; x < columns; x++) drops[x] = 1;
	for (var i = 0; i < drops.length; i++) {
		drops[i] = Math.floor(Math.random() * Math.floor(background.height / fontsize) - 10);
	}
}



function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, background.width, background.height);
	ctx.font = fontsize + "px minecraftEnchanting";
	for (var i = 0; i < drops.length; i++) {
		ctx.fillStyle = rgbToHex(0,255,0);//hexToRGB(a)[0]+ Math.floor(Math.random() * hexToRGB(b)[0]), green + Math.floor(Math.random() * greenv), blue + Math.floor(Math.random() * bluev));
		var text = matrix[Math.floor(Math.random() * matrix.length)];
		ctx.fillText(text, i * fontsize, drops[i] * fontsize);
		if (drops[i] * fontsize > background.height && Math.random() > 0.9) drops[i] = 0;
		drops[i]++;
	}
}
function randomizeOne(text) {
	const randomChar = matrix[Math.floor(Math.random() * matrix.length)];
	const randomIndex = Math.floor(Math.random() * text.length);
	text = text.substr(0, randomIndex) + randomChar + text.substr(randomIndex + 1, text.length - 1);
	return text;
}

function setIntervals() {
	return {
		matrixInterval: setInterval(draw, 33),
	};
}
function clearIntervals({ matrixInterval}) {
	clearInterval(matrixInterval);
}
