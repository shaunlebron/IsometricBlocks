
var IsoBlock = IsoBlock || {};

window.addEventListener("load", function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var scale = canvas.height / 10;
	var origin = {x: canvas.width/2, y: canvas.height };
	var camera = new IsoBlock.Camera(origin, scale);

	var block1 = new IsoBlock.Block({x:2,y:0,z:0},{x:2,y:2,z:2});
	var block2 = new IsoBlock.Block({x:1,y:1,z:0},{x:1,y:1,z:1});
	var block3 = new IsoBlock.Block({x:0,y:2,z:0},{x:4,y:1,z:1});

	function drawGrid() {
		var step = 1;
		var maxx = 10;
		var maxy = 10;
		var p = {x:0,y:0,z:0};
		var s;

		ctx.beginPath();
		for (p.x=0; p.x<=maxx; p.x+=step) {
			p.y = 0;
			s = camera.spaceToScreen(p); ctx.moveTo(s.x,s.y);
			console.log(s);
			p.y = maxy;
			s = camera.spaceToScreen(p); ctx.lineTo(s.x,s.y);
			console.log(s);
		}
		for (p.y=0; p.y<=maxy; p.y+=step) {
			p.x = 0;
			s = camera.spaceToScreen(p); ctx.moveTo(s.x,s.y);
			console.log(s);
			p.x = maxx;
			s = camera.spaceToScreen(p); ctx.lineTo(s.x,s.y);
			console.log(s);
		}
		ctx.strokeStyle = "#555";
		ctx.lineWidth = 1;
		ctx.stroke();

	};
	drawGrid();

	// TODO: draw grid and axes
	// TODO: draw blocks


});
