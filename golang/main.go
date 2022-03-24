package main

import (
	"log"
	"net/http"
	"os"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"

	_interface "network-manager/interface"
	"network-manager/middleware"
	_package "network-manager/package"
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

	dbUri := "neo4j://localhost:7687"
	driver, err := neo4j.NewDriver(dbUri, neo4j.NoAuth())
	if err != nil {
		panic(err)
	}

	defer driver.Close()

	rtr := &router.Router{
		Handlers: []router.Handler{
			&router.HTTPRoute{
				Route: &router.Route{
					Path: "/",
				},
				HandlerFunc: errorHandler,
			},
			&router.RESTRoute{
				Route: &router.Route{
					Path: "/subnets/",
					Middleware: []middleware.Handler{
						JSONMiddleware,
						loggerMiddleware,
						&middleware.FeatureGate{EnvSource: "FEATURE_SUBNET"},
					},
				},
				RESTController: &subnet.Controller{Database: &subnet.Database{Driver: driver}},
			},
			&router.RESTRoute{
				Route: &router.Route{
					Path: "/interfaces/",
					Middleware: []middleware.Handler{
						JSONMiddleware,
						loggerMiddleware,
					},
				},
				RESTController: &_interface.Controller{Database: &_interface.Database{Driver: driver}},
			},
			&router.RESTRoute{
				Route: &router.Route{
					Path: "/packages/",
					Middleware: []middleware.Handler{
						JSONMiddleware,
						loggerMiddleware,
					},
				},
				RESTController: &_package.Controller{Database: &_package.Database{Driver: driver}},
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
