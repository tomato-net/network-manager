import * as React from 'react';

export type AuthContextProps = {
   token?: string;
   isAuthenticated: boolean;
   handleAuthentication: () => void;
   login: () => void;
   logout: () => void;
};

export const AuthContextPropsDefaults: AuthContextProps = {
    token: undefined,
    isAuthenticated: false,
    handleAuthentication: () => null,
    login: () => null,
    logout: () => null,
};

export const AuthContext = React.createContext<AuthContextProps>(AuthContextPropsDefaults);
export const useAuth = () => React.useContext(AuthContext);