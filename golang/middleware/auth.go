package middleware

import (
	"context"
	"errors"
	"net/http"
)

const ErrUnauthorized = "unauthorized"

type Auth struct{}

func (a *Auth) Handle(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) (interface{}, error) {
		token := r.Header.Get("Authorization")
		if token == "" {
			return nil, errors.New(ErrUnauthorized)
		}

		namedRequest := r.WithContext(context.WithValue(r.Context(), "name", "thomas"))

		return next(w, namedRequest)
	}
}
