
var IsoBlock = IsoBlock || {};

IsoBlock.makeFigure = function(options) {

	var canvasId = options.canvas;
	var blocks = options.blocks;
	var shouldSortBlocks = (options.sortBlocks == undefined) ? true : options.sortBlocks;
	var shouldDrawAxes = options.drawAxis;
	var shouldDrawPlane = options.drawPlane;

	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');

	var scale = (options.scale && options.scale(canvas.width,canvas.height)) || (canvas.height / 8);
	var origin = (options.origin && options.origin(canvas.width,canvas.height)) || {x: canvas.width/2, y: canvas.height };

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

		var i,len,bounds,color,rgb,minp,maxp;
		var space = 0.5;
		for (i=0, len=blocks.length; i<len; i++) {
			bounds = blocks[i].getBounds();
			color = blocks[i].color[1];
			rgb = hexToRgb(color);
			tcolor = "rgba("+rgb+",0.8)";
			
			var x = 0;

			minp = {x:x,y:bounds.ymin,z:0};
			maxp = {x:x,y:bounds.ymax,z:0};

			painter.fillCircle(ctx, minp, 4, tcolor);
			painter.fillCircle(ctx, maxp, 4, tcolor);
			painter.line(ctx, minp, maxp, tcolor, 3);

			var y = 0;

			minp = {x:bounds.xmin,y:y,z:0};
			maxp = {x:bounds.xmax,y:y,z:0};

			painter.fillCircle(ctx, minp, 4, tcolor);
			painter.fillCircle(ctx, maxp, 4, tcolor);
			painter.line(ctx, minp, maxp, tcolor, 3);
			
		}

	}

	function drawBlock(block) {
		// fill each visible face of the block.
		var lineWidth = 1;
		var color = block.color;
		var b = block.getBounds();

		// left face
		painter.fillQuad(ctx, b.frontDown, b.leftDown, b.leftUp, b.frontUp, color[1], lineWidth);

		// top face
		painter.fillQuad(ctx, b.frontUp, b.leftUp, b.backUp, b.rightUp, color[0], lineWidth);

		// right face
		painter.fillQuad(ctx, b.frontDown, b.frontUp, b.rightUp, b.rightDown, color[2], lineWidth);
	};

	function drawSeparationPlane(frontBlock, backBlock) {
		if (!backBlock) {
			return;
		}

		var bounds = frontBlock.getBounds();

		var aAxis = camera.isBlockInFront(frontBlock, backBlock);
		var bAxis,cAxis;

		if (aAxis == 'x') {
			a = bounds.xmax;
			bAxis = 'y';
			cAxis = 'z';
		}
		else if (aAxis == 'y') {
			a = bounds.ymax;
			bAxis = 'x';
			cAxis = 'z';
		}
		else if (aAxis == 'z') {
			a = bounds.zmin;
			bAxis = 'x';
			cAxis = 'y';
		}

		var r = 0.7;
		var pts = [
			{ a:a, b: bounds[bAxis+"min"]-r, c: bounds[cAxis+"min"]-r },
			{ a:a, b: bounds[bAxis+"min"]-r, c: bounds[cAxis+"max"]+r },
			{ a:a, b: bounds[bAxis+"max"]+r, c: bounds[cAxis+"max"]+r },
			{ a:a, b: bounds[bAxis+"max"]+r, c: bounds[cAxis+"min"]-r },
		];

		var i;
		var finalPts = [];
		for (i=0; i<4; i++) {
			var p = {};
			p[aAxis] = pts[i].a;
			p[bAxis] = pts[i].b;
			p[cAxis] = pts[i].c;
			finalPts.push(p);
		}

		painter.fillQuad(ctx, finalPts[0], finalPts[1], finalPts[2], finalPts[3], "rgba(0,0,0,0.35)");
		painter.strokeQuad(ctx, finalPts[0], finalPts[1], finalPts[2], finalPts[3], "rgba(0,0,0,0.9)", 1);
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
		if (shouldDrawPlane && i>0 && i==len-1) {
			drawSeparationPlane(blocks[i], blocks[i-1]);
		}
		drawBlock(blocks[i]);
	}
};

