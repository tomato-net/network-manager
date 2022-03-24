package subnet

import (
	"encoding/json"
	"net/url"
)

type Controller struct {
	Database *Database
}

func (c *Controller) Get(id string) (interface{}, error) {
	subnet, err := c.Database.Get(id)
	if err != nil {
		return nil, err
	}

	return subnet, nil
}

func (c *Controller) List(i interface{}) ([]interface{}, error) {
	listOpts := i.(map[string]string)
	options := make([]Option, 0)
	if cidr, ok := listOpts["cidr"]; ok {
		options = append(options, MatchingCIDR(cidr))
		options = append(options, FuzzyMatch())
	}

	subnets, err := c.Database.Query(options...)
	if err != nil {
		return nil, err
	}

	list := make([]interface{}, 0)
	for _, s := range subnets {
		list = append(list, interface{}(s))
	}

	return list, nil
}

func (c *Controller) Create(obj interface{}) (interface{}, error) {
	return nil, nil
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

func (c *Controller) FilterQuery(values url.Values) interface{} {
	filteredQuery := make(map[string]string, 0)
	if values.Has("cidr") {
		filteredQuery["cidr"] = values.Get("cidr")
	}

	return filteredQuery
}
