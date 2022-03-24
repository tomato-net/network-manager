package _package

import (
	"encoding/json"
	"net/url"
)

type Controller struct {
	Database *Database
}

func (c Controller) Create(i interface{}) (interface{}, error) {
	// TODO implement me
	panic("implement me")
}

func (c Controller) Get(s string) (interface{}, error) {
	p, err := c.Database.Get(s)
	if err != nil {
		return nil, err
	}

	return p, nil
}

func (c Controller) List(i interface{}) ([]interface{}, error) {
	m := i.(map[string]string)
	options := make([]Option, 0)
	if name, ok := m["name"]; ok {
		options = append(options, Name(name))
		options = append(options, FuzzyMatch())
	}

	packages, err := c.Database.Query(options...)
	if err != nil {
		return nil, err
	}

	list := make([]interface{}, 0)
	for _, p := range packages {
		list = append(list, interface{}(p))
	}

	return list, nil
}

func (c Controller) Update(s string, i interface{}) (interface{}, error) {
	// TODO implement me
	panic("implement me")
}

func (c Controller) Delete(s string) (interface{}, error) {
	// TODO implement me
	panic("implement me")
}

func (c Controller) Unmarshal(bytes []byte) (interface{}, error) {
	p := &Package{}
	if err := json.Unmarshal(bytes, p); err != nil {
		return nil, err
	}

	return p, nil
}

func (c Controller) FilterQuery(values url.Values) interface{} {
	filteredQuery := make(map[string]string, 0)
	if values.Has("name") {
		filteredQuery["name"] = values.Get("name")
	}

	return filteredQuery
}
