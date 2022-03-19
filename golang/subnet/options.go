package subnet

type Options struct {
	CIDR  *string
	Limit int
}

type Option func(*Options)

func MatchingCIDR(CIDR string) Option {
	return func(args *Options) {
		args.CIDR = &CIDR
	}
}

func Limit(limit int) Option {
	return func(args *Options) {
		args.Limit = limit
	}
}
