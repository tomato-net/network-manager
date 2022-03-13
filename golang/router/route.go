package router

import (
	"net/http"

	"network-manager/middleware"
)

type Route struct {
	Path       string
	Middleware []middleware.Handler
}

type Handler interface {
	Handle(mux *http.ServeMux)
}

func (r *Route) process(handlerFunc middleware.HandlerFunc, middleware ...middleware.Handler) middleware.HandlerFunc {
	if len(middleware) == 0 {
		return handlerFunc
	}

	next := middleware[0]
	if len(middleware) == 1 {
		return next.Handle(handlerFunc)
	}

	return next.Handle(r.process(handlerFunc, middleware[1:]...))
}

func toHTTPHandlerFunc(m middleware.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m(w, r)
	}
}
