import React, { useState, useEffect } from 'react';
import { Alert, Button, FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../firebase';
import axios from 'axios';
import Swal from 'sweetalert2';
    function Signin() {
        const backendUrl = import.meta.env.VITE_BACKENDURL;
        const navigate = useNavigate();
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
    
            const name = e.target.name.value.trim();
            const email = e.target.email.value.trim();
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;
    
            if (password.length < 6) {
                setLoading(false);
                return setError('Password length must be 6 or more characters');
            }
            if (password !== confirmPassword) {
                setLoading(false);
                return setError('Passwords do not match!');
            }
    
            try {
                const res = await axios.post(`${backendUrl}/user/signin`, { name, email, password });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sign in Successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/login');
            } catch (err) {
                setError(err.response?.data?.message || 'Something went wrong!');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to sign in. Please try again.",
                });
            } finally {
                setLoading(false);
            }
        };
    
        const handleGoogleClick = async () => {
            setError(null);
            setLoading(true);
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
    
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                const res = await axios.post(`${backendUrl}/user/signin`, {
                    name: user.displayName,
                    email: user.email,
                    password: '123456',
                });
    
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sign in Successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/url', { state: { name: user.displayName, email: user.email } });
            } catch (err) {
                setError('Google sign-in failed. Please try again.');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to sign in with Google.",
                });
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="min-h-[85vh] flex justify-center items-center lg:px-0 px-4 bg-slate-50">
            <div className="lg:w-96 w-full px-6 bg-white shadow-lg rounded-lg">
                <form className="my-4 flex flex-col gap-1" onSubmit={handleSubmit}>
                    <div className="text-center font-bold text-2xl m-4">Sign In</div>
                    {error ? <Alert color="red">{error}</Alert> : ''}
                    <Label value="Name" />
                    <TextInput type="text" placeholder="Enter Your Name" name="name" required />
                    <Label value="Email" />
                    <TextInput type="email" placeholder="Enter Your Email" name="email" required />
                    <Label value="Password" />
                    <TextInput type="password" className="mb-2" placeholder="Enter a Password" name="password" required />
                    <TextInput type="password" className="mb-2" placeholder="Confirm Password" name="confirmPassword" required />
                    <Button color="dark" type="submit" className="w-full my-2 mb-4" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> &nbsp;<span> Processing..</span>
                            </>
                        ) : (
                            'SIGN IN'
                        )}
                    </Button>
                    <Button color="dark" className="w-full my-2 mb-4" disabled={loading} outline onClick={handleGoogleClick}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> &nbsp;<span> Processing..</span>
                            </>
                        ) : (
                            <>   <FaGoogle size={'20px'} /> &nbsp; SIGN IN WITH GOOGLE </>
                        )}
                    </Button>
                </form>
                <div className='mb-1'>Have an Account? <Link to='/login' className='text-blue-700 hover:text-blue-600'>LOG IN</Link></div>
            </div>
        </div>
    );
}

export default Signin;
