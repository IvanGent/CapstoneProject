import React from 'react';
import {Route, Redirect} from 'react-router-dom';
// import { authenticate } from '../../services/auth';

const ProtectedRoute = (props) => {
    if(!props.authenticated) {
        return <Redirect to ="/login"/>
    }

    return (
        <Route {...props}/>
    );
};

export default ProtectedRoute;