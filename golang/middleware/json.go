package middleware

import (
	"encoding/json"
	"net/http"
)

type JSON struct{}

func (j *JSON) Handle(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) (interface{}, error) {
		w.Header().Set("Content-Type", "application/json")
		// TODO: Sort this into another middleware?
		w.Header().Set("Access-Control-Allow-Origin", "*")

		res, err := next(w, r)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(""))
			return res, err
		}

		resJSON, err := json.Marshal(res)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(""))
			return res, err
		}

		w.WriteHeader(http.StatusOK)
		w.Write(resJSON)

		return nil, nil
	}
}
