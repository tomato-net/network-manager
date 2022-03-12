package middleware

import (
	"errors"
	"net/http"
	"os"
)

type FeatureGate struct {
	EnvSource string
}

func (f *FeatureGate) Handle(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) (interface{}, error) {
		enabled := os.Getenv(f.EnvSource) == "true"

		if !enabled {
			return nil, errors.New(ErrUnauthorized)
		}

		return next(w, r)
	}
}
