package dist

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist
var embeddedFiles embed.FS

func DistHandler() (http.Handler, error) {

	fsys, err := fs.Sub(embeddedFiles, "static")
	if err != nil {
		return nil, err
	}

	return http.FileServer(http.FS(fsys)), nil
}
