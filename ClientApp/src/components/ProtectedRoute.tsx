import * as React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute