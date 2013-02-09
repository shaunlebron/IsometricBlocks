
var IsoBlock = IsoBlock || {};

window.addEventListener("load", function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var scale = canvas.getHeight() / 10;
	var origin = {x: canvas.getWidth()/2, y: canvas.getHeight() };
	var camera = new IsoBlock.Camera(origin, scale);

	var block1 = new IsoBlock.Block({x:2,y:0,z:0},{x:2,y:2,z:2});
	var block2 = new IsoBlock.Block({x:1,y:1,z:0},{x:1,y:1,z:1});
	var block3 = new IsoBlock.Block({x:0,y:2,z:0},{x:4,y:1,z:1});

	// TODO: draw grid and axes
	// TODO: draw blocks


});
