package router

import (
	"net/http"

	"network-manager/middleware"
)

type Route struct {
	Path        string
	HandlerFunc middleware.HandlerFunc
	Middleware  []middleware.Handler
}

func (r *Route) Setup(mux *http.ServeMux) {
	mux.HandleFunc(r.Path, toHTTPHandlerFunc(r.process(r.Middleware...)))
}

func toHTTPHandlerFunc(m middleware.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m(w, r)
	}
}

func (r *Route) process(middleware ...middleware.Handler) middleware.HandlerFunc {
	if len(middleware) == 0 {
		return r.HandlerFunc
	}

	next := middleware[0]
	if len(middleware) == 1 {
		return next.Handle(r.HandlerFunc)
	}

	return next.Handle(r.process(middleware[1:]...))
}
