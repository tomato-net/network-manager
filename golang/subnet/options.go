package subnet

type Options struct {
	Fuzzy bool
	CIDR  *string
	ID    *string
	Limit int
}

type Option func(*Options)

func FuzzyMatch() Option {
	return func(args *Options) {
		args.Fuzzy = true
	}
}

func MatchingCIDR(CIDR string) Option {
	return func(args *Options) {
		args.CIDR = &CIDR
	}
}

func ID(id string) Option {
	return func(args *Options) {
		args.ID = &id
	}
}

func Limit(limit int) Option {
	return func(args *Options) {
		args.Limit = limit
	}
}
