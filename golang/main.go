package main

import (
	"log"
	"net/http"
	"os"

	"network-manager/middleware"
	"network-manager/router"
	"network-manager/server"
	"network-manager/subnet"
)

var (
	ServiceAddress = os.Getenv("SERVICE_ADDR")
)

func main() {
	logger := log.New(os.Stdout, "network-manager", log.LstdFlags|log.Lshortfile)

	JSONMiddleware := &middleware.JSON{}
	loggerMiddleware := &middleware.Logger{
		Logger: logger,
	}

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
				Path:           "/subnets/",
				RESTController: &subnet.Controller{},
				Middleware: []middleware.Handler{
					JSONMiddleware,
					loggerMiddleware,
					&middleware.FeatureGate{EnvSource: "FEATURE_SUBNET"},
				},
			},
		},
	}

	mux := http.NewServeMux()
	rtr.SetupRoutes(mux)

	// TODO: TLS
	srv := server.New(mux, ServiceAddress)
	logger.Println("setting up server")
	if err := srv.ListenAndServe(); err != nil {
		logger.Fatalf("server failed to start: %v", err)
	}
}
