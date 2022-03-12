package main

import (
	"log"
	"net/http"
	"os"

	"network-manager/home"
	"network-manager/middleware"
	"network-manager/router"
	"network-manager/server"
)

var (
	ServiceAddress = os.Getenv("SERVICE_ADDR")
)

func main() {
	logger := log.New(os.Stdout, "network-manager", log.LstdFlags|log.Lshortfile)

	authMiddleware := &middleware.Auth{}
	loggerMiddleware := &middleware.Logger{
		Logger: logger,
	}
	JSONMiddleware := &middleware.JSON{}

	errorHandler := func(w http.ResponseWriter, r *http.Request) (interface{}, error) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(""))

		return nil, nil
	}

	rtr := &router.Router{
		Routes: []router.Route{
			{
				Path:        "/",
				HandlerFunc: errorHandler,
			},
			{
				Path:        "/home",
				HandlerFunc: home.Handler,
				Middleware: []middleware.Handler{
					JSONMiddleware,
					loggerMiddleware,
					authMiddleware,
				},
			},
			{
				Path:        "/noauth",
				HandlerFunc: home.Handler,
				Middleware: []middleware.Handler{
					JSONMiddleware,
					loggerMiddleware,
				},
			},
		},
	}

	mux := http.NewServeMux()
	rtr.SetupRoutes(mux)

	srv := server.New(mux, ServiceAddress)
	logger.Println("setting up server")
	if err := srv.ListenAndServe(); err != nil {
		logger.Fatalf("server failed to start: %v", err)
	}
}
