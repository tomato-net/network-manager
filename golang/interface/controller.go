package _interface

import (
	"encoding/json"
	"errors"
	"net/url"
	"strings"
)

type ListOptions struct {
	Name *string
	ID   []string
}

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

func (c *Controller) List(m interface{}) ([]interface{}, error) {
	opts, ok := m.(ListOptions)
	if !ok {
		return nil, errors.New("invalid options")
	}

	options := make([]Option, 0)
	if opts.Name != nil {
		options = append(options, Name(*opts.Name))
		options = append(options, FuzzyMatch())
	}

	if len(opts.ID) > 0 {
		options = append(options, ID(opts.ID))
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

func (c *Controller) FilterQuery(values url.Values) interface{} {
	options := ListOptions{}
	if values.Has("name") {
		name := values.Get("name")
		options.Name = &name
	}

	if values.Has("id") {
		id := values.Get("id")
		options.ID = strings.Split(id, "|")
	}

	return options
}
