package subnet

type Interface struct {
	ID string `json:"id"`
}

type Subnet struct {
	ID         string      `json:"id"`
	CIDR       string      `json:"cidr"`
	NetClass   string      `json:"net_class"`
	Interfaces []Interface `json:"interfaces"`
}
