/* eslint-disable no-console */
import React from "react";


function calcMaxZoom(
	imageRef: React.RefObject<HTMLImageElement>,
	containerRef: React.RefObject<HTMLDivElement>
) {
	if (imageRef.current != null && containerRef.current != null && imageRef.current.naturalHeight > 0 && imageRef.current.naturalWidth > 0) {
		// -4 so there is room for the border to be visible
		const rect = containerRef.current.getBoundingClientRect();
		const height = rect.height - 4;
		const maxZoom = Math.min(
			(window.innerWidth - 4) / imageRef.current.naturalWidth,
			(height) / imageRef.current.naturalHeight
		);
		console.log(`calcMaxZoom: ${maxZoom} (heights=${height}, ${imageRef.current.naturalHeight})`);
		return maxZoom;
	}
	return 1;
}

function getCurrentZoom() {
	/*const urlZoom = getQueryStringParam("zoom", "1");
	const initialZoom = safeParseFloat(urlZoom, 1);
	return initialZoom;*/
	return 1;
}

export {
	calcMaxZoom,
	getCurrentZoom,
}