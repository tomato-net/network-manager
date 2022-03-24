package neo

import (
	"fmt"
	"strings"
)

type QueryOptions struct {
	Limit                int
	MatchTypes           map[string]string
	Returns              []string
	Condition            *Condition
	OutwardsRelationship map[string]string
	InwardsRelationship  map[string]string
}

func Returns(returns ...string) QueryOption {
	return func(opts *QueryOptions) {
		opts.Returns = returns
	}
}

func Limit(limit int) QueryOption {
	return func(opts *QueryOptions) {
		opts.Limit = limit
	}
}

func Match(matchTypes ...string) QueryOption {
	return func(opts *QueryOptions) {
		opts.MatchTypes = parseKVSlice(matchTypes)
	}
}

func Where(conditions ...*Condition) QueryOption {
	return func(opts *QueryOptions) {
		if len(conditions) > 1 {
			opts.Condition = And(conditions[0], conditions[1:]...)
		} else {
			opts.Condition = conditions[0]
		}
	}
}

func OutwardsRelated(relationships ...string) QueryOption {
	return func(opts *QueryOptions) {
		opts.OutwardsRelationship = parseKVSlice(relationships)
	}
}

func InwardsRelated(relationships ...string) QueryOption {
	return func(opts *QueryOptions) {
		opts.InwardsRelationship = parseKVSlice(relationships)
	}
}

func parseKVSlice(KV []string) map[string]string {
	parsed := make(map[string]string, 0)
	for i := 0; i < len(KV); i += 2 {
		k := KV[i]
		v := KV[i+1]
		parsed[k] = v
	}

	return parsed
}

type QueryOption func(*QueryOptions)

type Condition struct {
	Left     string
	Right    string
	Operator string
	Group    bool
}

func (c *Condition) Build() string {
	condition := fmt.Sprintf("%s %s %s", c.Left, c.Operator, c.Right)
	if c.Group {
		condition = fmt.Sprintf("(%s)", condition)
	}

	return condition
}

func FuzzyEquals(key, value string) *Condition {
	return &Condition{Left: key, Right: value, Operator: "=~"}
}

func Equals(key, value string) *Condition {
	return &Condition{Left: key, Right: value, Operator: "="}
}

func In(key string, values []string) *Condition {
	inValues := fmt.Sprintf("[%s]", strings.Join(values, ", "))
	return &Condition{Left: key, Right: inValues, Operator: "IN"}
}

func And(left *Condition, right ...*Condition) *Condition {
	if len(right) == 1 {
		return &Condition{Left: left.Build(), Right: right[0].Build(), Operator: "AND"}
	}

	return And(left, And(right[0], right[1:]...))
}

func GroupedAnd(left *Condition, right ...*Condition) *Condition {
	condition := And(left, right...)
	condition.Group = true

	return condition
}

func Or(left *Condition, right ...*Condition) *Condition {
	if len(right) == 1 {
		return &Condition{Left: left.Build(), Right: right[0].Build(), Operator: "OR"}
	}

	return Or(left, And(right[0], right[1:]...))
}

func GroupedOr(left *Condition, right ...*Condition) *Condition {
	condition := Or(left, right...)
	condition.Group = true

	return condition
}

type Query struct {
	opts *QueryOptions
}

func (q *Query) Build() string {
	queryParts := []string{
		"MATCH",
	}

	matchParts := make([]string, 0)
	for k, v := range q.opts.MatchTypes {
		matchPart := fmt.Sprintf("(%s:%s)", k, v)

		if or, ok := q.opts.OutwardsRelationship[k]; ok {
			matchPart = fmt.Sprintf("%s%s", matchPart, or)
		}

		if ir, ok := q.opts.InwardsRelationship[k]; ok {
			matchPart = fmt.Sprintf("%s%s", ir, matchPart)
		}

		matchParts = append(matchParts, matchPart)
	}
	queryParts = append(queryParts, strings.Join(matchParts, ", "))

	if q.opts.Condition != nil {
		conditionPart := fmt.Sprintf("WHERE %s", q.opts.Condition.Build())
		queryParts = append(queryParts, conditionPart)
	}

	returnPart := fmt.Sprintf("RETURN %s", strings.Join(q.opts.Returns, ", "))
	queryParts = append(queryParts, returnPart)

	return strings.Join(queryParts, " ")
}

func NewQuery(setters ...QueryOption) *Query {
	opts := &QueryOptions{}

	for _, setter := range setters {
		setter(opts)
	}

	return &Query{
		opts: opts,
	}
}
