package middleware

import (
	"context"
	"net/http"
)

type Auth struct{}

func (a *Auth) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(""))

			return
		}

		namedRequest := r.WithContext(context.WithValue(r.Context(), "name", "thomas"))

		next(w, namedRequest)
	}
}
