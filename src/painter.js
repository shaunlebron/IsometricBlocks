
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
