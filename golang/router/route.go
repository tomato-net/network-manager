package router

import (
	"fmt"
	"net/http"

	"network-manager/middleware"
)

// TODO: Have multiple Route types, for REST, GQL, etc that implement Setup
type Route struct {
	Path           string
	HandlerFunc    middleware.HandlerFunc
	RESTController RESTController
	Middleware     []middleware.Handler
}

func (r *Route) Setup(mux *http.ServeMux) {
	if r.HandlerFunc != nil {
		mux.HandleFunc(r.Path, toHTTPHandlerFunc(r.process(r.HandlerFunc, r.Middleware...)))
		return
	}

	if r.RESTController != nil {
		mux.HandleFunc(r.Path, toHTTPHandlerFunc(r.process(RESTMiddleware(r.RESTController), r.Middleware...)))
		// TODO: Setup other RESTful ops
		return
	}

	panic(fmt.Sprintf("Neither HandlerFunc or RESTHandler provided for path %s", r.Path))
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
