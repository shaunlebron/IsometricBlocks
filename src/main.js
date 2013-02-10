
var IsoBlock = IsoBlock || {};

IsoBlock.makeFigure = function(options) {

	var canvasId = options.canvas;
	var blocks = options.blocks;
	var shouldSortBlocks = options.sortBlocks;
	var shouldDrawAxes = options.drawAxis;

	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');

	var scale = canvas.height / 8;
	var origin = {x: canvas.width/2, y: canvas.height*0.95 };
	var camera = new IsoBlock.Camera(origin, scale);
	var painter = new IsoBlock.Painter(camera);

	function drawGrid() {
		var step = 1;
		var maxx = 11;
		var maxy = 11;

		ctx.beginPath();
		for (x=-maxx; x<=maxx; x+=step) {
			painter.moveTo(ctx, {x:x, y:-maxy, z:0});
			painter.lineTo(ctx, {x:x, y:maxy, z:0});
		}
		for (y=-maxy; y<=maxy; y+=step) {
			painter.moveTo(ctx, {x:-maxx, y:y, z:0});
			painter.lineTo(ctx, {x:maxx, y:y, z:0});
		}
		ctx.strokeStyle = "#CCC";
		ctx.lineWidth = 1;
		ctx.stroke();

	};

	function drawAxes() {

		var axisColor = "#444";
		ctx.lineWidth = 1;
		ctx.strokeStyle = axisColor;
		ctx.fillStyle = axisColor;
		var arrowLen = 7;
		var arrowSize = 0.3;

		ctx.beginPath();
		painter.moveTo(ctx, {x:-arrowLen, y:0, z:0});
		painter.lineTo(ctx, {x:arrowLen, y:0, z:0});
		painter.moveTo(ctx, {x:0, y:-arrowLen, z:0});
		painter.lineTo(ctx, {x:0, y:arrowLen, z:0});
		ctx.stroke();

		ctx.beginPath();
		painter.moveTo(ctx, {x:arrowLen, y:0, z:0});
		painter.lineTo(ctx, {x:arrowLen-arrowSize, y:-arrowSize, z:0});
		painter.lineTo(ctx, {x:arrowLen-arrowSize, y:arrowSize, z:0});
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		painter.moveTo(ctx, {y:arrowLen, x:0, z:0});
		painter.lineTo(ctx, {y:arrowLen-arrowSize, x:-arrowSize, z:0});
		painter.lineTo(ctx, {y:arrowLen-arrowSize, x:arrowSize, z:0});
		ctx.closePath();
		ctx.fill();
	}

	function drawBlock(block) {
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
		var color = block.color;
		painter.fillQuad(ctx, frontDown, leftDown, leftUp, frontUp, color[0], lineWidth);
		painter.fillQuad(ctx, frontUp, leftUp, backUp, rightUp, color[1], lineWidth);
		painter.fillQuad(ctx, frontDown, frontUp, rightUp, rightDown, color[2], lineWidth);
	};

	drawGrid();

	if (shouldDrawAxes) {
		drawAxes();
	}

	if (shouldSortBlocks) {
		blocks = IsoBlock.sortBlocks(blocks, camera);
	}

	var i,len;
	for(i=0,len=blocks.length; i<len; i++) {
		drawBlock(blocks[i]);
	}
};

