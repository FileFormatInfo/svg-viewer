/* eslint-disable no-console */


function calcMaxZoom(
	naturalWidth: number,
	naturalHeight: number,
	containerWidth: number,
	containerHeight: number,
) {
	if (containerWidth > 0 && containerHeight > 0 && naturalHeight > 0 && naturalWidth > 0) {
		// -4 so there is room for the border to be visible
		const height = containerHeight - 4;
		const maxZoom = Math.min(
			(containerWidth - 4) / naturalWidth,
			(height) / naturalHeight
		);
		console.log(`calcMaxZoom: ${maxZoom} (height=${height}, naturalHeight=${naturalHeight}, containerHeight=${containerHeight})`);
		return maxZoom;
	}
	console.log('calcMaxZoom: 1');
	return 1;
}

function calcZoomIn(currentZoom: number):number {
	return currentZoom + 1;
}

function calcZoomOut(currentZoom: number):number {
	return (currentZoom > 1 ? currentZoom - 1 : currentZoom * 0.5);
}

export {
	calcMaxZoom,
	calcZoomIn,
	calcZoomOut,
}
