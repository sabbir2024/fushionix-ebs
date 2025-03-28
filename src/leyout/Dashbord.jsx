import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import Profile from "../pages/shared/Profile";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";


const Dashbord = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2] || 'Dashbord';
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl uppercase">{path}</a>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Manu</label>
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <div className="dropdown dropdown-end">
                        <Profile />
                    </div>
                </div>
            </div>

            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <Outlet />
                </div>
                <Sidebar />
            </div>

        </div>
    );
};

export default Dashbord;