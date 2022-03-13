package router

import (
	"net/http"
)

type Router struct {
	Handlers []Handler
}

func (r *Router) SetupRoutes(mux *http.ServeMux) {
	for _, r := range r.Handlers {
		r.Handle(mux)
	}
}
