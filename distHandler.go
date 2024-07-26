package svgview

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed all:dist
var embeddedFiles embed.FS

func StaticHandler() (http.Handler, error) {

	fsys, err := fs.Sub(embeddedFiles, "dist")
	if err != nil {
		return nil, err
	}

	return http.FileServer(http.FS(fsys)), nil
}

func IndexHandler() (http.HandlerFunc, error) {

	contents, err := embeddedFiles.ReadFile("dist/index.html")
	if err != nil {
		return nil, err
	}
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Write(contents)
	}, nil
}
