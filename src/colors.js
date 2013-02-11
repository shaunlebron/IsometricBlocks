
// Tango Color Palette
// http://en.wikipedia.org/wiki/Tango_Desktop_Project#Palette
IsoBlock.colors = {
	yellow: ["#fce94f", "#edd400", "#c4a000"],
	orange: ["#fcaf3e", "#f57900", "#ce5c00"],
	brown: ["#e9b96e", "#c17d11", "#8f5902"],
	green: ["#8ae234", "#73d216", "#4e9a06"],
	blue: ["#729fcf", "#3465a4", "#204a87"],
	purple: ["#ad7fa8", "#75507b", "#5c3566"],
	red: ["#ef2929", "#cc0000", "#a40000"],
	white: ["#eeeeec", "#d3d7cf", "#babdb6"],
	black: ["#888a85", "#555753", "#2e3436"],
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
