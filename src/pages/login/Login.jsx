import { useState } from 'react';
import useAuth from '../../hooks/useAuth'


const Login = ({ setLoginSignup, loginSignup }) => {
    const { signin, loading } = useAuth();
    const [isDisablel, setDesablel] = useState(false)

    const handelsubmit = async (e) => {
        e.preventDefault();
        setDesablel(true);

        const form = e.target;
        const email = form.emailAddress.value;
        const password = form.password.value;
        console.log(email, password)

        try {
            const signinUser = await signin(email, password);
            console.log(signinUser)
        } catch (error) {
            console.log(error)
            setDesablel(false)
        }
    }

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center"><button className={loginSignup ? `text-2xl btn btn-info` : ''}
                    onClick={() => setLoginSignup(!loginSignup)}>Log In</button>
                    <button className={!loginSignup ? `text-2xl btn btn-info` : ''} onClick={() => setLoginSignup(!loginSignup)}>Sign Up</button></h2>

                <form onSubmit={handelsubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">


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


                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            disabled={isDisablel}
                            type="submit"
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            {loading ? 'Please Wait' : "Submit"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;