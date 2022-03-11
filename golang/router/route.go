package router

import (
	"net/http"

	"network-manager/middleware"
)

type Route struct {
	Path        string
	HandlerFunc http.HandlerFunc
	Middleware  []middleware.Handler
}

func (r *Route) Setup(mux *http.ServeMux) {
	mux.HandleFunc(r.Path, r.process(r.Middleware...))
}

func (r *Route) process(middleware ...middleware.Handler) http.HandlerFunc {
	if len(middleware) == 0 {
		return r.HandlerFunc
	}

	next := middleware[0]
	if len(middleware) == 1 {
		return next.Handle(r.HandlerFunc)
	}

	return next.Handle(r.process(middleware[1:]...))
}
