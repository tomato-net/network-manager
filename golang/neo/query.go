package neo

import (
	"fmt"
	"strings"
)

type QueryOptions struct {
	Limit      int
	MatchTypes map[string]string
	Returns    []string
	Condition  *Condition
}

func Returns(returns []string) QueryOption {
	return func(opts *QueryOptions) {
		opts.Returns = returns
	}
}

func Limit(limit int) QueryOption {
	return func(opts *QueryOptions) {
		opts.Limit = limit
	}
}

func Match(matchTypes map[string]string) QueryOption {
	return func(opts *QueryOptions) {
		opts.MatchTypes = matchTypes
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
		matchParts = append(matchParts, fmt.Sprintf("(%s:%s)", k, v))
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