
//
IsoBlock.Block = function(pos,size,color) {

	// position in 3d space (obj with attrs x,y,z)
	this.pos = pos;

	// size of each dimension (obj with attrs x,y,z)
	this.size = size;

	// an array of 3 color shades (light,medium,dark - see colors.js)
	// (used for pseudo lighting)
	this.color = color || IsoBlock.colors.red;
};

IsoBlock.Block.prototype = {
	getBounds: function() {
		var p = this.pos;
		var s = this.size;

		return {

			// create aliases for the axis ranges.
			xmin: p.x,
			xmax: p.x + s.x,
			ymin: p.y,
			ymax: p.y + s.y,
			zmin: p.z,
			zmax: p.z + s.z,

			// create aliases for each corner of this block.
			// (this is assuming a specific camera configuration)
			leftDown:  {x:p.x+s.x, y:p.y,     z:p.z},
			rightDown: {x:p.x,     y:p.y+s.y, z:p.z},
			backDown:  {x:p.x+s.x, y:p.y+s.y, z:p.z},
			frontDown: {x:p.x,     y:p.y,     z:p.z},
			leftUp:    {x:p.x+s.x, y:p.y,     z:p.z+s.z},
			rightUp:   {x:p.x,     y:p.y+s.y, z:p.z+s.z},
			backUp:    {x:p.x+s.x, y:p.y+s.y, z:p.z+s.z},
			frontUp:   {x:p.x,     y:p.y,     z:p.z+s.z},
		};
	},
};
