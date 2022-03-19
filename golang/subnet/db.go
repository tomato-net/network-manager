package subnet

import (
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
		neo.Match(map[string]string{"s": "Subnet"}),
		neo.Returns([]string{"s"}),
	}

	conditions := make([]*neo.Condition, 0)
	if args.CIDR != nil {
		conditions = append(conditions, neo.FuzzyEquals("s.cidr", fmt.Sprintf("'.*%s.*'", *args.CIDR)))
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

	subnets := make([]Subnet, 0)
	for result.Next() {
		record := result.Record()
		subnets = append(subnets, convertRecordToSubnet(record))
	}

	return subnets, nil
}

func (c *Database) List() ([]Subnet, error) {
	return c.Query()
}

func convertRecordToSubnet(record *neo4j.Record) (subnet Subnet) {
	node := record.Values[0].(dbtype.Node)
	subnet.ID = strconv.Itoa(int(node.Id))

	if cidr, ok := node.Props["cidr"]; ok {
		subnet.CIDR = cidr.(string)
	}

	return
}
