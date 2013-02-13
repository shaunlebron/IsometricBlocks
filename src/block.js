
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
			xmin: p.x,
			xmax: p.x + s.x,
			ymin: p.y,
			ymax: p.y + s.y,
			zmin: p.z,
			zmax: p.z + s.z,
		};
	},
};
