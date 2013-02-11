
// Allows us to paint shapes using isometric coordinates transformed by a given camera.
// It's basically a wrapper for the canvas context.
IsoBlock.Painter = function(camera) {
	this.camera = camera;
};

IsoBlock.Painter.prototype = {
	moveTo: function(ctx, vector3) {
		var v = this.camera.spaceToScreen(vector3);
		ctx.moveTo(v.x,v.y);
	},
	lineTo: function(ctx, vector3) {
		var v = this.camera.spaceToScreen(vector3);
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
		var v1 = this.camera.spaceToScreen(p1);
		var v4 = this.camera.spaceToScreen(p4);
		var v2 = this.camera.spaceToScreen(p2);
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
		var v = this.camera.spaceToScreen(p1);
		ctx.beginPath();
		ctx.arc(v.x,v.y,radius,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	},
	strokeCircle: function(ctx, p1, radius, color) {
		var v = this.camera.spaceToScreen(p1);
		ctx.beginPath();
		ctx.arc(v.x,v.y,radius,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	},
};
