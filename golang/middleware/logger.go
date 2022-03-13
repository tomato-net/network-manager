package middleware

import (
	"context"
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

		loggingRequest := r.WithContext(context.WithValue(r.Context(), "logger", l.Logger))

		res, err := next(w, loggingRequest)

		if err != nil {
			l.Logger.Printf("error processing request: %v", err)
		}

		l.Logger.Printf("request processed in %s ms\n", time.Now().Sub(startTime)*time.Millisecond)

		return res, err
	}
}
