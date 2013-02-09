
IsoBlock.Camera = function(origin,scale) {
	this.origin = origin;
	this.scale = scale;
	var a = Math.PI/6;
	this.xaxis = { x: -Math.cos(a), y: Math.sin(a) };
	this.yaxis = { x: Math.cos(a), y: Math.sin(a) };
	this.zaxis = { x: 0, y: 1 };
};

IsoBlock.Camera.prototype = {
	spaceToScreen: function(spacePos) {
		var screenPos = new IsoBlock.Vector(0,0);
		var a = this.xaxis.copy().mul(spacePos.x);
		var b = this.yaxis.copy().mul(spacePos.y);
		var c = this.zaxis.copy().mul(spacePos.z);
		screenPos.add(a).add(b).add(c);
		screenPos.mul(this.scale);
		screenPos.add(this.origin);
		return screenPos;
	},
	isBlockInFront: function(block1, block2) {
		var b1 = block1.getBounds();
		var b2 = block2.getBounds();

		if (b1.xmin >= b2.xmax) { return false; }
		else if (b2.xmin >= b1.xmax) { return true; }

		if (b1.ymin >= b2.ymax) { return false; }
		else if (b2.ymin >= b1.ymax) { return true; }

		if (b1.zmin >= b2.zmax) { return true; }
		else if (b2.zmin >= b1.zmax) { return false; }

		throw "blocks must be non-intersecting to determine which is in front";
	},
};
