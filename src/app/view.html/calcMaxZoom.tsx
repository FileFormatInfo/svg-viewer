/* eslint-disable no-console */
"use client";
import React from "react";


function calcMaxZoom(
	naturalWidth: number,
	naturalHeight: number,
	containerRef: React.RefObject<HTMLDivElement>
) {
	if (containerRef.current != null && naturalHeight > 0 && naturalWidth > 0) {
		// -4 so there is room for the border to be visible
		const rect = containerRef.current.getBoundingClientRect();
		const height = rect.height - 4;
		const maxZoom = Math.min(
			(window.innerWidth - 4) / naturalWidth,
			(height) / naturalHeight
		);
		console.log(`calcMaxZoom: ${maxZoom} (height=${height}, naturalHeight=${naturalHeight})`);
		return maxZoom;
	}
	console.log('calcMaxZoom: 1');
	return 1;
}

export {
	calcMaxZoom,
}