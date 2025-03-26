import { useState } from 'react';
import home from '../../assets/home.jpg'
import Login from '../login/Login';
import Signin from '../signIn/Signin';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';


const Home = () => {
    const [loginSignup, setLoginSignup] = useState(true);
    const { user } = useAuth();
    console.log(user)
    return (
        <div style={{
            backgroundImage: `url(${home})`,
            backgroundSize: 'cover', // Ensures the image covers the entire div
            backgroundPosition: 'center', // Centers the image
            height: '100vh', // Full viewport height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div>
                <h1 className="text-3xl font-bold text-blue-600 animate-bounce">Welcome to fushionix Wold</h1>
                {
                    user ?
                        (<Link to={'/dashbord'}>
                            <button className='btn btn-primary flex justify-center mx-auto'> Dashbord</button></Link>) :
                        (
                            loginSignup ?
                                <Login setLoginSignup={setLoginSignup} loginSignup={loginSignup} />
                                :
                                <Signin setLoginSignup={setLoginSignup} loginSignup={loginSignup} />
                        )


                }
            </div>
        </div>
    );
};

export default Home;