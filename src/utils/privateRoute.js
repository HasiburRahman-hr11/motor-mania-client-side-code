import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Loading from '../Components/Loading/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email || user.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;