package main

import (
	"net/http"
	"os"
	"strconv"

	"github.com/VectorLogoZone/svgpreview/dist"
)

func main() {

	var listenPort, portErr = strconv.Atoi(os.Getenv("PORT"))
	if portErr != nil {
		listenPort = 4000
	}
	var listenAddress = os.Getenv("ADDRESS")

	distHandler, distErr := dist.DistHandler()
	if distErr != nil {
		logger.Error("unable to create static handler", "error", distErr)	
		os.Exit(1)
	}

	http.HandleFunc("/status.json", statusHandler)
	http.HandleFunc("/", distHandler.ServeHTTP)

	err := http.ListenAndServe(listenAddress+":"+strconv.Itoa(listenPort), nil)
	if err != nil {
		logger.Error("unable to listen", "address", listenAddress, "port", listenPort, "error", err)
	}
}
