Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// Sort blocks in the order that they should be drawn for the given camera.
IsoBlock.sortBlocks = function(blocks, camera) {

	var i, j, numBlocks=blocks.length;

	// Initialize the list of blocks that each block is behind.
	for (i=0; i<numBlocks; i++) {
		blocks[i].blocksBehind = [];
		blocks[i].blocksInFront = [];
	}
	
	// For each pair of blocks, determine which is in front and behind.
	var b1,b2;
	for (i=0; i<numBlocks; i++) {
		b1 = blocks[i];
		for (j=i+1; j<numBlocks; j++) {
			b2 = blocks[j];
			if (camera.isBlockInFront(b1,b2)) {
				b1.blocksBehind.push(b2);
				b2.blocksInFront.push(b1);
			}
			else {
				b2.blocksBehind.push(b1);
				b1.blocksInFront.push(b2);
			}
		}
	}

	// Get list of blocks we can safely draw right now.
	// These are the blocks with nothing behind them.
	var blocksToDraw = [];
	for (i=0; i<numBlocks; i++) {
		if (blocks[i].blocksBehind.length == 0) {
			blocksToDraw.push(blocks[i]);
		}
	}

	// While there are still blocks we can draw...
	var blocksDrawn = [];
	while (blocksToDraw.length > 0) {

		// Draw block by removing one from "to draw" and adding
		// it to the end of our "drawn" list.
		var block = blocksToDraw.pop();
		blocksDrawn.push(block);

		// Tell blocks in front of the one we just drew
		// that they can stop waiting on it.
		for (j=0; j<block.blocksInFront.length; j++) {
			var frontBlock = block.blocksInFront[j];

			// Add this front block to our "to draw" list if there's
			// nothing else behind it waiting to be drawn.
			frontBlock.blocksBehind.remove(block);
			if (frontBlock.blocksBehind.length == 0) {
				blocksToDraw.push(frontBlock);
			}
		}
	}

	return blocksDrawn;
};
