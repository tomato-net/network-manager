package _interface

import (
	"encoding/json"
	"net/url"
)

type Controller struct {
	Database *Database
}

func (c *Controller) Create(i interface{}) (interface{}, error) {
	// TODO implement me
	panic("implement me")
}

func (c *Controller) Get(s string) (interface{}, error) {
	iface, err := c.Database.Get(s)
	if err != nil {
		return nil, err
	}

	return iface, nil
}

func (c *Controller) List(m map[string]string) ([]interface{}, error) {
	options := make([]Option, 0)
	if name, ok := m["name"]; ok {
		options = append(options, Name(name))
		options = append(options, FuzzyMatch())
	}

	ifaces, err := c.Database.Query(options...)
	if err != nil {
		return nil, err
	}

	list := make([]interface{}, 0)
	for _, i := range ifaces {
		list = append(list, interface{}(i))
	}

	return list, nil
}

func (c *Controller) Update(s string, i interface{}) (interface{}, error) {
	// TODO implement me
	panic("implement me")
}

func (c *Controller) Delete(s string) (interface{}, error) {
	// TODO implement me
	panic("implement me")
}

func (c *Controller) Unmarshal(bytes []byte) (interface{}, error) {
	// TODO implement me
	iface := &Interface{}
	if err := json.Unmarshal(bytes, iface); err != nil {
		return nil, err
	}

	return iface, nil
}

func (c *Controller) FilterQuery(values url.Values) map[string]string {
	filteredQuery := make(map[string]string, 0)
	if values.Has("name") {
		filteredQuery["name"] = values.Get("name")
	}

	return filteredQuery
}
