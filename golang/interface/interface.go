package _interface

type Subnet struct {
	ID string `json:"id"`
}

type Package struct {
	ID string `json:"id"`
}

type Interface struct {
	ID       string    `json:"id"`
	Name     string    `json:"name"`
	Subnets  []Subnet  `json:"subnets"`
	Packages []Package `json:"packages"`
}
