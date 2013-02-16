
IsoBlock.Camera = function(origin,scale) {

	// the pixel location of the isometric origin.
	this.origin = origin;

	// number of pixels per isometric unit.
	this.scale = scale;

};

/*

We have three separate coordinate systems used for different things:

1. Space (3D)

	We apply the usual 3D coordinates to define the boxes using x,y,z.

2. Isometric (2D)

	When the 3D space is flattened into an isometric view, we use oblique x and y
	axes separated by 120 degrees.

	All this does is treat all 3d coordinates as if they are at z=0.

	For example, if use have a box at (0,0,0) and we raised it to (0,0,1), it would
	look to be in the exact same position as a box at (1,1,0), so the 2d isometric
	coordinates are (1,1).  This is a side effect of the isometric perspective.  So
	the isometric 2D coordinates gets the "apparent" coordinates for all boxes if
	they were at z=0.

	This is accomplished by adding z to x and y.  That is all.

	(Isometric coordinates are useful for determining when boxes overlap on the
	screen.)

3. Screen (2D)

	Before drawing, we convert the isometric coordinates to the usual x,y screen
	coordinates.

	This is done by multiplying each isometric 2D coordinate by its respective
	oblique axis vector and taking the sum.

	We then multiply this position by "scale" value to implement zoom in/out
	features for the camera.

	Then we add to an "origin" to implement panning features for the camera.

*/

IsoBlock.Camera.prototype = {

	// Determine if the given ranges are disjoint (i.e. do not overlap).
	// For determining drawing order, this camera considers two
	// ranges to be disjoint even if they share an endpoint.
	// Thus, we use less-or-equal (<=) instead of strictly less (<).
	areRangesDisjoint: function(amin,amax,bmin,bmax) {
		return (amax <= bmin || bmax <= amin);
	},

	// Convert 3D space coordinates to flattened 2D isometric coordinates.
	// x and y coordinates are oblique axes separated by 120 degrees.
	// h,v are the horizontal and vertical distances from the origin.
	spaceToIso: function(spacePos) {
		var z = (spacePos.z == undefined) ? 0 : spacePos.z;

		var x = spacePos.x + z;
		var y = spacePos.y + z;

		return {
			x: x,
			y: y,
			h: (x-y)*Math.sqrt(3)/2, // Math.cos(Math.PI/6)
			v: (x+y)/2,              // Math.sin(Math.PI/6)
		};
	},

	// Convert the given 2D isometric coordinates to 2D screen coordinates.
	isoToScreen: function(isoPos) {
		return {
			x: isoPos.h * this.scale + this.origin.x,
			y: -isoPos.v * this.scale + this.origin.y,
		};
	},

	// Convert the given 3D space coordinates to 2D screen coordinates.
	spaceToScreen: function(spacePos) {
		return this.isoToScreen(this.spaceToIso(spacePos));
	},
	
	// Get a block's vertices with helpful aliases.
	// Each vertex is named from its apparent position in an isometric view.
	getIsoNamedSpaceVerts: function(block) {
		var p = block.pos;
		var s = block.size;
		
		return {
			rightDown: {x:p.x+s.x, y:p.y,     z:p.z},
			leftDown:  {x:p.x,     y:p.y+s.y, z:p.z},
			backDown:  {x:p.x+s.x, y:p.y+s.y, z:p.z},
			frontDown: {x:p.x,     y:p.y,     z:p.z},
			rightUp:   {x:p.x+s.x, y:p.y,     z:p.z+s.z},
			leftUp:    {x:p.x,     y:p.y+s.y, z:p.z+s.z},
			backUp:    {x:p.x+s.x, y:p.y+s.y, z:p.z+s.z},
			frontUp:   {x:p.x,     y:p.y,     z:p.z+s.z},
		};
	},

	// Get the given block's vertices in flattened 2D isometric coordinates.
	getIsoVerts: function(block) {
		var verts = this.getIsoNamedSpaceVerts(block);
		return {
			leftDown:  this.spaceToIso(verts.leftDown),
			rightDown: this.spaceToIso(verts.rightDown),
			backDown:  this.spaceToIso(verts.backDown),
			frontDown: this.spaceToIso(verts.frontDown),
			leftUp:    this.spaceToIso(verts.leftUp),
			rightUp:   this.spaceToIso(verts.rightUp),
			backUp:    this.spaceToIso(verts.backUp),
			frontUp:   this.spaceToIso(verts.frontUp),
		};
	},

	// For the given block, get the min and max values on each isometric axis.
	getIsoBounds: function(block) {
		var verts = this.getIsoVerts(block);
		return {
			xmin: verts.frontDown.x,
			xmax: verts.backUp.x,
			ymin: verts.frontDown.y,
			ymax: verts.backUp.y,
			hmin: verts.leftDown.h,
			hmax: verts.rightDown.h,
		};
	},

	// Try to find an axis in 2D isometric that separates the two given blocks.
	// This helps identify if the the two blocks are overlap on the screen.
	getIsoSepAxis: function(block_a, block_b) {
		var a = this.getIsoBounds(block_a);
		var b = this.getIsoBounds(block_b);

		var sepAxis = null;
		if (this.areRangesDisjoint(a.xmin,a.xmax,b.xmin,b.xmax)) {
			sepAxis = 'x';
		}
		if (this.areRangesDisjoint(a.ymin,a.ymax,b.ymin,b.ymax)) {
			sepAxis = 'y';
		}
		if (this.areRangesDisjoint(a.hmin,a.hmax,b.hmin,b.hmax)) {
			sepAxis = 'h';
		}
		return sepAxis;
	},

	// Try to find an axis in 3D space that separates the two given blocks.
	// This helps identify which block is in front of the other.
	getSpaceSepAxis: function(block_a, block_b) {

		var sepAxis = null;

		var a = block_a.getBounds();
		var b = block_b.getBounds();

		if (this.areRangesDisjoint(a.xmin,a.xmax,b.xmin,b.xmax)) {
			sepAxis = 'x';
		}
		else if (this.areRangesDisjoint(a.ymin,a.ymax,b.ymin,b.ymax)) {
			sepAxis = 'y';
		}
		else if (this.areRangesDisjoint(a.zmin,a.zmax,b.zmin,b.zmax)) {
			sepAxis = 'z';
		}
		return sepAxis;
	},

	// In an isometric perspective of the two given blocks, determine
	// if they will overlap each other on the screen. If they do, then return
	// the block that will appear in front.
	getFrontBlock: function(block_a, block_b) {

		// If no isometric separation axis is found,
		// then the two blocks do not overlap on the screen.
		// This means there is no "front" block to identify.
		if (this.getIsoSepAxis(block_a, block_b)) {
			return null;
		}

		// Find a 3D separation axis, and use it to determine
		// which block is in front of the other.
		var a = block_a.getBounds();
		var b = block_b.getBounds();
		switch(this.getSpaceSepAxis(block_a, block_b)) {
			case 'x': return (a.xmin < b.xmin) ? block_a : block_b;
			case 'y': return (a.ymin < b.ymin) ? block_a : block_b;
			case 'z': return (a.zmin < b.zmin) ? block_b : block_a;
			default: throw "blocks must be non-intersecting";
		}
	},
};
