
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
};
