import { NavLink } from "react-router";

const Sidebar = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li><NavLink className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : ''} to='/dashbord/static'>Static</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : ''} to='/dashbord/add-product'>Add Product</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : ''} to='/dashbord/products'>Products</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : ''} to='/dashbord/gate-pass'>Gate Pass</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : ''} to='/dashbord/add-customer'>Add Customer</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : ''} to='/dashbord/customers'>Customers</NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;