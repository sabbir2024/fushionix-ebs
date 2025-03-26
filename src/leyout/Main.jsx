import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import useAuth from '../hooks/useAuth';

const Main = () => {
    const { user } = useAuth()
    return (
        <div>
            {user && <Navbar />}
            <Outlet />
        </div>
    );
};

export default Main;