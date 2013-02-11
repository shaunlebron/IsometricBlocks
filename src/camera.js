
IsoBlock.Camera = function(origin,scale) {

	// the pixel location of the isometric origin.
	this.origin = origin;

	// number of pixels per isometric unit.
	this.scale = scale;

	// create the unit axis vectors in the canvas coordinate frame (x+ right, y+ down).
	var a = Math.PI/6;
	this.xaxis = new IsoBlock.Vector(Math.cos(a), -Math.sin(a));
	this.yaxis = new IsoBlock.Vector(-Math.cos(a), -Math.sin(a));
	this.zaxis = new IsoBlock.Vector(0, -1);

};

IsoBlock.Camera.prototype = {
	spaceToScreen: function(spacePos) {

		// start at origin
		var screenPos = new IsoBlock.Vector(0,0);

		// add screen displacements for each axis.
		var a = this.xaxis.copy().mul(spacePos.x);
		var b = this.yaxis.copy().mul(spacePos.y);
		var c = this.zaxis.copy().mul(spacePos.z);
		screenPos.add(a).add(b).add(c);

		// apply scale
		screenPos.mul(this.scale);

		// apply translate
		screenPos.add(this.origin);

		return screenPos;
	},
	isBlockInFront: function(block1, block2) {

		// get the bounds for each block.
		var b1 = block1.getBounds();
		var b2 = block2.getBounds();

		// test for intersection x-axis
		// lower x value is in front
		if (b1.xmin >= b2.xmax) { return false; }
		else if (b2.xmin >= b1.xmax) { return 'x'; }

		// test for intersection y-axis
		// lower y value is in front
		if (b1.ymin >= b2.ymax) { return false; }
		else if (b2.ymin >= b1.ymax) { return 'y'; }

		// test for intersection z-axis
		// higher z value is in front
		if (b1.zmin >= b2.zmax) { return 'z'; }
		else if (b2.zmin >= b1.zmax) { return false; }

		// throw exception if the blocks intersect.
		throw "blocks must be non-intersecting to determine which is in front";
	},
};
