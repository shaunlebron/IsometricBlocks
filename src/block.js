
IsoBlock.Block = function(pos,size,color) {
	this.pos = pos;
	this.size = size;
	this.color = color || IsoBlock.colors.red;
};

IsoBlock.Block.prototype = {
	getBounds: function() {
		return {
			xmin: this.pos.x,
			xmax: this.pos.x + this.size.x,
			ymin: this.pos.y,
			ymax: this.pos.y + this.size.y,
			zmin: this.pos.z,
			zmax: this.pos.z + this.size.z,
		};
	},
};
