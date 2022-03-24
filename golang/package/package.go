package _package

type Interface struct {
	ID string `json:"id"`
}

type Package struct {
	ID         string      `json:"id"`
	Name       string      `json:"name"`
	Interfaces []Interface `json:"interfaces"`
}
