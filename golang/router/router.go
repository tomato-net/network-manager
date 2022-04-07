package router

import (
	"net/http"
)

type Router struct {
	Routes []Handler
}

func (r *Router) SetupRoutes(mux *http.ServeMux) {
	for _, r := range r.Routes {
		r.Handle(mux)
	}
}
