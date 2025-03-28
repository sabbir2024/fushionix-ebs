import useAuth from "../../hooks/useAuth";
import Profile from "./Profile";

const Navbar = () => {
    const { user, logOut } = useAuth();

    return (
        <div className="navbar  shadow-sm fixed">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default Navbar;