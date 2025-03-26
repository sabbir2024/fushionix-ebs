import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Signin = ({ setLoginSignup, loginSignup }) => {

    const [isDisabled, setIsDisabled] = useState(false)
    const { createUser, loading, updateUser } = useAuth()


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisabled(true);

        const form = e.target;
        const name = form.username.value;
        const email = form.emailAddress.value;
        const password = form.password.value;
        const photo = form.photoUrl.value;

        createUser(email, password)
            .then((userCredential) => {
                return updateUser(name, photo); // Update user profile
            })
            .then(() => {
                console.log("User created and profile updated successfully!");
                // Optionally, you can redirect the user or show a success message here
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                alert("An error occurred during signup. Please try again.");
            })
            .finally(() => {
                setIsDisabled(false); // Re-enable the submit button
            });
    };
    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center"><button className={loginSignup ? `text-2xl btn btn-info` : ''}
                    onClick={() => setLoginSignup(!loginSignup)}>Log In</button>
                    <button className={!loginSignup ? `text-2xl btn btn-info` : ''} onClick={() => setLoginSignup(!loginSignup)}>Sign Up</button></h2>


                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                            <input
                                id="emailAddress"
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="photoUrl">Photo Url</label>
                            <input
                                id="photoUrl"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            disabled={isDisabled}
                            type="submit"
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            {loading ? "loading" : "Submit"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Signin;