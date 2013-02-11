
// simple 2d vector class with arithmetic operations.
IsoBlock.Vector = function(x,y) {
	this.x = x;
	this.y = y;
};

IsoBlock.Vector.prototype = {
	copy: function() {
		return new IsoBlock.Vector(this.x,this.y);
	},
	set: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	},
	add: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	sub: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	mul: function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	},
};
