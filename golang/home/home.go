package home

import (
	"fmt"
	"net/http"
)

const message = "Hello, World!"

type Response struct {
	Message string `json:"message"`
}

func Handler(_ http.ResponseWriter, r *http.Request) (interface{}, error) {
	name := r.Context().Value("name")

	return &Response{
		Message: fmt.Sprintf("%s %s", message, name),
	}, nil
}
