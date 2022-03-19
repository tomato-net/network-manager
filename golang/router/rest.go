package router

import (
	"errors"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"network-manager/middleware"
)

type RESTController interface {
	Create(interface{}) (interface{}, error)
	Get(string) (interface{}, error)
	List(map[string]string) ([]interface{}, error)
	Update(string, interface{}) (interface{}, error)
	Delete(string) (interface{}, error)
	Unmarshal([]byte) (interface{}, error)
	FilterQuery(url.Values) map[string]string
}

type RESTRoute struct {
	*Route

	RESTController RESTController
}

func (r *RESTRoute) handlerFunc(c RESTController) middleware.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) (interface{}, error) {
		switch req.Method {
		case http.MethodGet:
			id := strings.TrimPrefix(req.URL.Path, r.Path)
			if id != "" {
				return c.Get(id)
			}

			query := req.URL.Query()

			filteredQuery := c.FilterQuery(query)

			return c.List(filteredQuery)
		case http.MethodPost:
			body, err := ioutil.ReadAll(req.Body)
			if err != nil {
				return nil, err
			}

			obj, err := c.Unmarshal(body)
			if err != nil {
				return nil, err
			}

			return c.Create(obj)
		}

		return nil, errors.New("method not supported")
	}
}

func (r *RESTRoute) Handle(mux *http.ServeMux) {
	mux.HandleFunc(r.Path, toHTTPHandlerFunc(r.process(r.handlerFunc(r.RESTController), r.Middleware...)))
}
