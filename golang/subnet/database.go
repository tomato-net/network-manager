package subnet

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

func (c *Database) Query(opts ...Option) ([]Subnet, error) {
	args := &Options{}
	for _, opt := range opts {
		opt(args)
	}

	queryOpts := []neo.QueryOption{
		neo.Match("s", "Subnet"),
		neo.InwardsRelated("s", "(i:Interface)-[:HAS_SUBNET]->"),
		neo.Returns("s", "i"),
	}

	conditions := make([]*neo.Condition, 0)
	if args.CIDR != nil {
		cidr := *args.CIDR
		if args.Fuzzy {
			cidr = fmt.Sprintf(".*%s.*", cidr)
		}
		conditions = append(conditions, neo.FuzzyEquals("s.cidr", fmt.Sprintf("'%s'", cidr)))
	}

	if args.ID != nil {
		conditions = append(conditions, neo.Equals("id(s)", *args.ID))
	}

	if len(conditions) > 0 {
		queryOpts = append(queryOpts, neo.Where(conditions...))
	}

	query := neo.NewQuery(queryOpts...).Build()

	session := c.Driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close()

	result, err := session.Run(query, map[string]interface{}{})
	if err != nil {
		return nil, err
	}

	subnets := make(map[string]Subnet, 0)
	for result.Next() {
		record := result.Record()
		parseRecord(subnets, record)
	}

	ret := make([]Subnet, 0)
	for _, v := range subnets {
		ret = append(ret, v)
	}

	return ret, nil
}

func (c *Database) List() ([]Subnet, error) {
	return c.Query()
}

func (c *Database) Get(id string) (Subnet, error) {
	subnets, err := c.Query(ID(id))
	if err != nil {
		return Subnet{}, err
	}

	if len(subnets) == 0 {
		return Subnet{}, errors.New("not found")
	}

	return subnets[0], nil
}

func parseRecord(result map[string]Subnet, record *neo4j.Record) {
	var id string
	for _, v := range record.Values {
		if node, ok := v.(dbtype.Node); ok {
			switch node.Labels[0] {
			case "Subnet":
				id = strconv.Itoa(int(node.Id))
			}
		}
	}

	subnet, found := result[id]
	if !found {
		subnet = Subnet{ID: id, Interfaces: make([]Interface, 0)}
	}

	for _, v := range record.Values {
		if node, ok := v.(dbtype.Node); ok {
			switch node.Labels[0] {
			case "Subnet":
				if cidr, ok := node.Props["cidr"]; ok {
					subnet.CIDR = cidr.(string)
				}

				if netClass, ok := node.Props["net_class"]; ok {
					subnet.NetClass = netClass.(string)
				}
			case "Interface":
				found := false
				iid := strconv.Itoa(int(node.Id))
				for _, i := range subnet.Interfaces {
					if i.ID == iid {
						found = true
						break
					}
				}

				if !found {
					subnet.Interfaces = append(subnet.Interfaces, Interface{ID: strconv.Itoa(int(node.Id))})
				}
			}
		}
	}

	result[id] = subnet
}
