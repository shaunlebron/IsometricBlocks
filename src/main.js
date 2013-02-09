
var IsoBlock = IsoBlock || {};

window.addEventListener("load", function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var scale = canvas.height / 8;
	var origin = {x: canvas.width/2, y: canvas.height*0.75 };
	var camera = new IsoBlock.Camera(origin, scale);
	var painter = new IsoBlock.Painter(camera);

	function drawGrid() {
		var step = 1;
		var maxx = 10;
		var maxy = 10;

		ctx.beginPath();
		for (x=-maxx; x<=maxx; x+=step) {
			painter.moveTo(ctx, {x:x, y:-maxy, z:0});
			painter.lineTo(ctx, {x:x, y:maxy, z:0});
		}
		for (y=-maxy; y<=maxy; y+=step) {
			painter.moveTo(ctx, {x:-maxx, y:y, z:0});
			painter.lineTo(ctx, {x:maxx, y:y, z:0});
		}
		ctx.strokeStyle = "#BBB";
		ctx.lineWidth = 1;
		ctx.stroke();
	};

	function drawBlock(block,color) {
		// alias the position and size
		var p = block.pos;
		var s = block.size;

		// alias each vertex of the block.
		var leftDown =  {x:p.x+s.x, y:p.y,     z:p.z};
		var rightDown = {x:p.x,     y:p.y+s.y, z:p.z};
		var backDown =  {x:p.x+s.x, y:p.y+s.y, z:p.z};
		var frontDown = {x:p.x,     y:p.y,     z:p.z};
		var leftUp =    {x:p.x+s.x, y:p.y,     z:p.z+s.z};
		var rightUp =   {x:p.x,     y:p.y+s.y, z:p.z+s.z};
		var backUp =    {x:p.x+s.x, y:p.y+s.y, z:p.z+s.z};
		var frontUp =   {x:p.x,     y:p.y,     z:p.z+s.z};

		// fill each visible face of the block.
		var lineWidth = 1;
		painter.fillQuad(ctx, frontDown, leftDown, leftUp, frontUp, color[0], lineWidth);
		painter.fillQuad(ctx, frontUp, leftUp, backUp, rightUp, color[1], lineWidth);
		painter.fillQuad(ctx, frontDown, frontUp, rightUp, rightDown, color[2], lineWidth);
	};

	drawGrid();

	var block1 = new IsoBlock.Block({x:0,y:2,z:0},{x:2,y:2,z:2.5});
	var block2 = new IsoBlock.Block({x:1,y:1,z:0},{x:1,y:1,z:1.5});
	var block3 = new IsoBlock.Block({x:2,y:0,z:0},{x:1,y:4,z:1});

	drawBlock(block3, IsoBlock.colors.blue);
	drawBlock(block1, IsoBlock.colors.black);
	drawBlock(block2, IsoBlock.colors.purple);

});
