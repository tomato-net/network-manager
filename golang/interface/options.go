package _interface

type Options struct {
	Fuzzy bool
	Name  *string
	ID    *string
	Limit int
}

type Option func(*Options)

func FuzzyMatch() Option {
	return func(args *Options) {
		args.Fuzzy = true
	}
}

func Name(name string) Option {
	return func(args *Options) {
		args.Name = &name
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
