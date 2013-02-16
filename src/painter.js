
// Allows us to paint shapes using isometric coordinates transformed by a given camera.
// It's basically a wrapper for the canvas context.
IsoBlock.Painter = function(camera) {
	this.camera = camera;
};

IsoBlock.Painter.prototype = {

	// This function allows us to draw using different coordinate systems.
	// It accepts a nondescript position vector and tries to detect
	// what coordinate system it is in by looking at its properties.
	//		(x,y,z)   <- treated as a space coordinate
	//		(x,y)     <- treated as a space coordinate at z=0
	//                   (same as 2D isometric XY)
	//		(h,v)     <- treated as a special 2D isometric coordinate
	//                   (with horizontal and vertical distance from origin)
	transform: function(pos) {
		var x,y,z;
		if (pos.x != undefined && pos.y != undefined) {
			x = pos.x;
			y = pos.y;
			z = (pos.z == undefined) ? 0 : pos.z;
			return this.camera.spaceToScreen({x:x, y:y, z:z});
		}
		else if (pos.h != undefined && pos.v != undefined) {
			return this.camera.isoToScreen(pos);
		}
		else {
			console.log("x",pos.x,"y",pos.y,"z",pos.z,"h",pos.h,"v",pos.v);
			throw "painter.transform: Unable to detect coordinate system of given vector";
		}
	},
	moveTo: function(ctx, pos) {
		var v = this.transform(pos);
		ctx.moveTo(v.x,v.y);
	},
	lineTo: function(ctx, pos) {
		var v = this.transform(pos);
		ctx.lineTo(v.x,v.y);
	},
	quad: function(ctx, p1, p2, p3, p4) {
		this.moveTo(ctx, p1);
		this.lineTo(ctx, p2);
		this.lineTo(ctx, p3);
		this.lineTo(ctx, p4);
	},
	fillQuad: function(ctx, p1, p2, p3, p4, color, lineWidth) {
		ctx.beginPath();
		this.quad(ctx,p1,p2,p3,p4);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
		if (lineWidth) {
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			ctx.stroke();
		}
	},
	fillQuadGradient: function(ctx, p1, p2, p3, p4, color1, color2) {
		var v1 = this.transform(p1);
		var v4 = this.transform(p4);
		var v2 = this.transform(p2);
		var dx = v4.x-v1.x;
		var dy = v4.y-v1.y;
		var dist = Math.sqrt(dx*dx+dy*dy);
		dx /= dist;
		dy /= dist;
		var dx2 = v2.x-v1.x;
		var dy2 = v2.y-v1.y;
		dist = Math.sqrt(dx2*dx2+dy2*dy2);
		dx *= dist;
		dy *= dist;
		
		
		//var grad = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
		var grad = ctx.createLinearGradient(v1.x,v1.y, v1.x-dy, v1.y+dx);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		this.fillQuad(ctx, p1,p2,p3,p4, grad);
	},
	strokeQuad: function(ctx, p1, p2, p3, p4, color, lineWidth) {
		ctx.beginPath();
		this.quad(ctx,p1,p2,p3,p4);
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.lineJoin = "round";
		ctx.stroke();
	},
	line: function(ctx, p1, p2, color, lineWidth) {
		ctx.beginPath();
		this.moveTo(ctx, p1);
		this.lineTo(ctx, p2);
		ctx.strokeStyle = color;
		ctx.lineCap = 'butt';
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	},
	fillCircle: function(ctx, p1, radius, color) {
		var v = this.transform(p1);
		ctx.beginPath();
		ctx.arc(v.x,v.y,radius,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	},
	strokeCircle: function(ctx, p1, radius, color) {
		var v = this.transform(p1);
		ctx.beginPath();
		ctx.arc(v.x,v.y,radius,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	},
};
