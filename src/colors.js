
// Tango Color Palette
// http://en.wikipedia.org/wiki/Tango_Desktop_Project#Palette
IsoBlock.colors = {
	yellow: {light:"#fce94f", medium:"#edd400", dark:"#c4a000"},
	orange: {light:"#fcaf3e", medium:"#f57900", dark:"#ce5c00"},
	brown:  {light:"#e9b96e", medium:"#c17d11", dark:"#8f5902"},
	green:  {light:"#8ae234", medium:"#73d216", dark:"#4e9a06"},
	blue:   {light:"#729fcf", medium:"#3465a4", dark:"#204a87"},
	purple: {light:"#ad7fa8", medium:"#75507b", dark:"#5c3566"},
	red:    {light:"#ef2929", medium:"#cc0000", dark:"#a40000"},
	white:  {light:"#eeeeec", medium:"#d3d7cf", dark:"#babdb6"},
	black:  {light:"#888a85", medium:"#555753", dark:"#2e3436"},
};

// from David at http://stackoverflow.com/a/11508164/142317
function hexToRgb(hex) {

	// strip out "#" if present.
	if (hex[0] == "#") {
		hex = hex.substring(1);
	}

    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}
