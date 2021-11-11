import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Loading from '../Components/Loading/Loading';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return <Loading />
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email && isAdmin ? (
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

export default AdminRoute;