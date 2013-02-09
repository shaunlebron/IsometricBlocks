
IsoBlock.Block = function(pos,size) {
	this.pos = pos;
	this.size = size;
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
