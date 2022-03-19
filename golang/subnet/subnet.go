package subnet

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
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
	CIDR string `json:"cidr"`
}

type Controller struct {
	Database *Database
}

func (c *Controller) Get(id string) (interface{}, error) {
	for _, s := range subnets {
		if id == s.ID {
			return s, nil
		}
	}

	return nil, errors.New("Not found")
}

func (c *Controller) List(listOpts map[string]string) ([]interface{}, error) {
	options := make([]Option, 0)
	if cidr, ok := listOpts["cidr"]; ok {
		options = append(options, MatchingCIDR(cidr))
	}

	a_subnets, err := c.Database.Query(options...)
	if err != nil {
		return nil, err
	}

	list := make([]interface{}, 0)
	for _, s := range a_subnets {
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

func (c *Controller) FilterQuery(values url.Values) map[string]string {
	filteredQuery := make(map[string]string, 0)
	if values.Has("cidr") {
		filteredQuery["cidr"] = values.Get("cidr")
	}

	return filteredQuery
}
