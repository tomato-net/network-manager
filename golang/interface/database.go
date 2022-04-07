package _interface

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

func (d *Database) Query(opts ...Option) ([]Interface, error) {
	args := &Options{}
	for _, opt := range opts {
		opt(args)
	}

	queryOpts := []neo.QueryOption{
		neo.Match("i", "Interface"),
		neo.InwardsRelated("i", "(p:Package)-[:HAS_INTERFACE]->"),
		neo.OutwardsRelated("i", "-[:HAS_SUBNET]->(s:Subnet)"),
		neo.Returns("i", "p", "s"),
	}

	conditions := make([]*neo.Condition, 0)
	if args.Name != nil {
		name := *args.Name
		if args.Fuzzy {
			name = fmt.Sprintf("(?i).*%s.*", name)
		}
		conditions = append(conditions, neo.FuzzyEquals("i.name", fmt.Sprintf("'%s'", name)))
	}

	if args.ID != nil {
		conditions = append(conditions, neo.In("id(i)", args.ID))
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

	ifaces := make(map[string]Interface, 0)
	for result.Next() {
		record := result.Record()
		parseRecord(ifaces, record)
	}

	ret := make([]Interface, 0)
	for _, v := range ifaces {
		ret = append(ret, v)
	}

	return ret, nil
}

func (d *Database) Get(id string) (Interface, error) {
	ifaces, err := d.Query(ID([]string{id}))
	if err != nil {
		return Interface{}, err
	}

	if len(ifaces) == 0 {
		return Interface{}, errors.New("not found")
	}

	return ifaces[0], nil
}

func (d *Database) List() ([]Interface, error) {
	return d.Query()
}

// TODO: Make this not absolutely horrid
func parseRecord(result map[string]Interface, record *neo4j.Record) {
	var id string
	for _, v := range record.Values {
		if node, ok := v.(dbtype.Node); ok {
			switch node.Labels[0] {
			case "Interface":
				id = strconv.Itoa(int(node.Id))
			}
		}
	}

	iface, found := result[id]
	if !found {
		iface = Interface{ID: id, Subnets: make([]Subnet, 0), Packages: make([]Package, 0)}
	}

	for _, v := range record.Values {
		if node, ok := v.(dbtype.Node); ok {
			switch node.Labels[0] {
			case "Interface":
				if name, ok := node.Props["name"]; ok {
					iface.Name = name.(string)
				}

				result[id] = iface
			case "Subnet":
				found := false
				sid := strconv.Itoa(int(node.Id))
				for _, s := range iface.Subnets {
					if s.ID == sid {
						found = true
						break
					}
				}

				if !found {
					iface.Subnets = append(iface.Subnets, Subnet{ID: strconv.Itoa(int(node.Id))})
				}
			case "Package":
				found := false
				pid := strconv.Itoa(int(node.Id))
				for _, p := range iface.Packages {
					if p.ID == pid {
						found = true
						break
					}
				}

				if !found {
					iface.Packages = append(iface.Packages, Package{ID: strconv.Itoa(int(node.Id))})
				}
			}
		}
	}

	result[id] = iface

	return
}
