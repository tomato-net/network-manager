package subnet

import (
	"encoding/json"
	"errors"
	"fmt"
)

var (
	subnets = []Subnet{
		{
			ID:   "1",
			CIDR: "10.0.0.1/32",
		},
		{
			ID:   "2",
			CIDR: "192.168.1.1/32",
		},
		{
			ID:   "3",
			CIDR: "172.10.120.4/32",
		},
	}
)

type Subnet struct {
	ID   string `json:"id"`
	CIDR CIDR   `json:"cidr"`
}

type CIDR string

type Controller struct{}

func (c *Controller) Get(id string) (interface{}, error) {
	for _, s := range subnets {
		if id == s.ID {
			return s, nil
		}
	}

	return nil, errors.New("Not found")
}

func (c *Controller) List() ([]interface{}, error) {
	list := make([]interface{}, 0)
	for _, s := range subnets {
		list = append(list, interface{}(s))
	}

	return list, nil
}

func (c *Controller) Create(obj interface{}) (interface{}, error) {
	s, ok := obj.(*Subnet)
	if !ok {
		return nil, errors.New(fmt.Sprintf("invalid subnet %v", obj))
	}

	subnets = append(subnets, *s)

	return s, nil
}

func (c *Controller) Update(id string, obj interface{}) (interface{}, error) {
	return nil, nil
}

func (c *Controller) Delete(id string) (interface{}, error) {
	return nil, nil
}

func (c *Controller) Unmarshal(obj []byte) (interface{}, error) {
	subnet := &Subnet{}
	if err := json.Unmarshal(obj, subnet); err != nil {
		return nil, err
	}

	return subnet, nil
}
