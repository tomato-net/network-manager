package middleware

import (
	"net/http"
)

type Handler interface {
	Handle(http.HandlerFunc) http.HandlerFunc
}
