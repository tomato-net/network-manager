package router

import (
	"net/http"

	"network-manager/middleware"
)

type HTTPRoute struct {
	*Route

	HandlerFunc middleware.HandlerFunc
}

func (r *HTTPRoute) Handle(mux *http.ServeMux) {
	mux.HandleFunc(r.Path, toHTTPHandlerFunc(r.process(r.HandlerFunc, r.Middleware...)))
}
