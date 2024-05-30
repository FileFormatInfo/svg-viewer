package main

import (
	"net/http"
	"os"
	"strconv"

	dist "github.com/VectorLogoZone/svgview"
)

func main() {

	var listenPort, portErr = strconv.Atoi(os.Getenv("PORT"))

	if portErr != nil {
		listenPort = 4000
	}
	var listenAddress = os.Getenv("ADDRESS")

	staticHandler, staticErr := dist.StaticHandler()
	if staticErr != nil {
		logger.Error("unable to create asset handler", "error", staticErr)	
		os.Exit(1)
	}
	indexHandler, indexErr := dist.IndexHandler()
	if indexErr != nil {
		logger.Error("unable to create index handler", "error", indexErr)
		os.Exit(2)
	}

	http.HandleFunc("/status.json", statusHandler)
	http.HandleFunc("/assets/", staticHandler.ServeHTTP)
	http.HandleFunc("/images/", staticHandler.ServeHTTP)
	http.HandleFunc("/favicon.ico", staticHandler.ServeHTTP)
	http.HandleFunc("/favicon.svg", staticHandler.ServeHTTP)
	http.HandleFunc("/", indexHandler)

	logger.Info("starting server", "address", listenAddress, "port", listenPort)
	err := http.ListenAndServe(listenAddress+":"+strconv.Itoa(listenPort), nil)
	if err != nil {
		logger.Error("unable to listen", "address", listenAddress, "port", listenPort, "error", err)
	}
}
