package middleware

import (
	"log"
	"net/http"
	"time"
)

type Logger struct {
	Logger *log.Logger
}

func (l *Logger) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()
		l.Logger.Printf("processing request")

		next(w, r)

		l.Logger.Printf("request processed in %s ms\n", time.Now().Sub(startTime)*time.Millisecond)
	}
}
