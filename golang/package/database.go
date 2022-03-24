package _package

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j/dbtype"

	"network-manager/neo"
)

type Database struct {
	Driver neo4j.Driver
}

func (d *Database) Query(opts ...Option) ([]Package, error) {
	args := &Options{}
	for _, opt := range opts {
		opt(args)
	}

	queryOpts := []neo.QueryOption{
		neo.Match("p", "Package"),
		neo.OutwardsRelated("p", "-[:HAS_INTERFACE]->(i:Interface)"),
		neo.Returns("p", "i"),
	}

	conditions := make([]*neo.Condition, 0)
	if args.Name != nil {
		name := *args.Name
		if args.Fuzzy {
			name = fmt.Sprintf("(?i).*%s.*", name)
		}
		conditions = append(conditions, neo.FuzzyEquals("p.name", fmt.Sprintf("'%s'", name)))
	}

	if args.ID != nil {
		conditions = append(conditions, neo.Equals("id(p)", *args.ID))
	}

	if len(conditions) > 0 {
		queryOpts = append(queryOpts, neo.Where(conditions...))
	}

	query := neo.NewQuery(queryOpts...).Build()

	session := d.Driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close()

	result, err := session.Run(query, map[string]interface{}{})
	if err != nil {
		return nil, err
	}

	packages := make(map[string]Package, 0)
	for result.Next() {
		record := result.Record()
		parseRecord(packages, record)
	}

	ret := make([]Package, 0)
	for _, v := range packages {
		ret = append(ret, v)
	}

	return ret, nil
}

func (d *Database) Get(id string) (Package, error) {
	packages, err := d.Query(ID(id))
	if err != nil {
		return Package{}, err
	}

	if len(packages) == 0 {
		return Package{}, errors.New("not found")
	}

	return packages[0], nil
}

func (d *Database) List() ([]Package, error) {
	return d.Query()
}

// TODO: Make this not absolutely horrid
func parseRecord(result map[string]Package, record *neo4j.Record) {
	var id string
	for _, v := range record.Values {
		if node, ok := v.(dbtype.Node); ok {
			switch node.Labels[0] {
			case "Package":
				id = strconv.Itoa(int(node.Id))
			}
		}
	}

	p, found := result[id]
	if !found {
		p = Package{ID: id}
	}

	for _, v := range record.Values {
		if node, ok := v.(dbtype.Node); ok {
			switch node.Labels[0] {
			case "Package":
				if name, ok := node.Props["name"]; ok {
					p.Name = name.(string)
				}

				result[id] = p
			case "Interface":
				found := false
				sid := strconv.Itoa(int(node.Id))
				for _, p := range p.Interfaces {
					if p.ID == sid {
						found = true
						break
					}
				}

				if !found {
					p.Interfaces = append(p.Interfaces, Interface{ID: strconv.Itoa(int(node.Id))})
				}
			}
		}
	}

	result[id] = p

	return
}
