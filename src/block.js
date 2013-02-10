
IsoBlock.Block = function(pos,size,color) {
	this.pos = pos;
	this.size = size;
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
