package middleware

import (
	"net/http"
)

type Handler interface {
	Handle(HandlerFunc) HandlerFunc
}

// TODO: Return object with status code, error, and payload?
type HandlerFunc func(http.ResponseWriter, *http.Request) (interface{}, error)
