package home

import (
	"fmt"
	"net/http"
)

const message = "Hello, World!"

func Handler(w http.ResponseWriter, r *http.Request) {
	name := r.Context().Value("name")

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("%s %s", message, name)))
}
