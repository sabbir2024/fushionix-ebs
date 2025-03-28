import useAuth from "../../hooks/useAuth";

const Profile = () => {
    const { user, logOut } = useAuth();

    return (
        <>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                    <a className="justify-between">
                        {user?.displayName}
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <button onClick={() => logOut()}>Logout</button>
            </ul>
        </>
    );
};

export default Profile;