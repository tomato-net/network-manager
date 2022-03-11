package router

import (
	"net/http"
)

type Router struct {
	Routes []Route
}

func (r *Router) SetupRoutes(mux *http.ServeMux) {
	for _, r := range r.Routes {
		r.Setup(mux)
	}
}
