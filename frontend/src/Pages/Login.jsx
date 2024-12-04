import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../firebase';
import axios from 'axios';
import Swal from 'sweetalert2'
function Login() {
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setLoading(false);
            return setError('Password length must be 6 or more characters');
        }

        try {
            const res = await axios.post(`${backendUrl}/user/login`, { email, password });
            const user = res.data.userData;
            if (res.status === 200 || 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log in Successfull!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/url', { state: {user} });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleClick = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        setLoading(true);
        setError(null);

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const user = resultFromGoogle.user;

            const googleData = { email: user.email, password: '123456' }; // Placeholder password

            try {
                const res = await axios.post(`${backendUrl}/user/login`, googleData);
                const user = res.data.userData;
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log in Successfull!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    navigate('/url', { state: user });
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Google login failed. Please try again.');
            }
        } catch (err) {
            setError('Failed to authenticate with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex justify-center items-center lg:px-0 px-4 bg-slate-50">
            <div className="lg:w-96 w-full px-6 bg-white shadow-lg rounded-lg">
                <form className="my-4 flex flex-col gap-1" onSubmit={handleSubmit}>
                    <div className="text-center font-bold text-2xl m-4">Log In</div>
                    {error && <Alert color="red">{error}</Alert>}
                    <Label value="Email" />
                    <TextInput type="email" placeholder="Enter Your Email" name="email" required />
                    <Label value="Password" />
                    <TextInput type="password" className="mb-2" placeholder="Enter a Password" name="password" required />
                    <Button color="dark" type="submit" className="w-full my-2 mb-4" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> &nbsp;Processing...
                            </>
                        ) : (
                            'LOG IN'
                        )}
                    </Button>
                    <Button color="dark" className="w-full my-2 mb-4" outline onClick={handleGoogleClick} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> &nbsp;Processing...
                            </>
                        ) : (
                            <>
                                <FaGoogle size="20px" /> &nbsp;LOG IN WITH GOOGLE
                            </>
                        )}
                    </Button>
                </form>
                <div className='mb-1'>
                    Don't have an account?{' '}
                    <Link to="/signin" className="text-blue-700 hover:text-blue-600">
                        SIGN IN
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
