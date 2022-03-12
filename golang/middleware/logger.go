package middleware

import (
	"log"
	"net/http"
	"time"
)

type Logger struct {
	Logger *log.Logger
}

func (l *Logger) Handle(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) (interface{}, error) {
		startTime := time.Now()
		l.Logger.Printf("processing request")

		res, err := next(w, r)

		l.Logger.Printf("request processed in %s ms\n", time.Now().Sub(startTime)*time.Millisecond)

		return res, err
	}
}
