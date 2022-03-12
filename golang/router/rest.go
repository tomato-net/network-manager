package router

import (
	"errors"
	"net/http"
	"strings"

	"network-manager/middleware"
)

type RESTController interface {
	Create(interface{}) (interface{}, error)
	Get(string) (interface{}, error)
	List() ([]interface{}, error)
	Update(string, interface{}) (interface{}, error)
	Delete(string) (interface{}, error)
}

func RESTMiddleware(c RESTController) middleware.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) (interface{}, error) {
		switch r.Method {
		case http.MethodGet:
			// TODO: Do this better
			id := strings.Split(r.URL.Path, "/")[2]
			// TODO: Handle errors better like NotFound
			return c.Get(id)
		}

		return nil, errors.New("method not supported")
	}
}
