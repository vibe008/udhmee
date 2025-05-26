"use client"
import Image from "next/image";
import React, { useState } from "react";
import {  auth, signInWithGoogle } from "../../../../firebase/firebase"
import loginImage from '../../../public/login.png';
import GoogleIcon from '@mui/icons-material/Google';
import { registerUser } from "../../../../services/authservice";
import Link from "next/link";
import { toast } from 'react-toastify';
import Tost from "../../../../components/ui/tost/Tost";
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../Redux/store/authSlice';
import { useRouter } from "next/navigation";
export default function page() {
    const dispache = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
     const router = useRouter()
    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        passward: '',
    })
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle();
            const user = auth.currentUser;
            if (user) {

                const userdata = {
                    username: user.displayName,
                    email: user.email,
                    passward: '',
                    fromGoogle: true,
                }
                const res = await registerUser(userdata);
                if (res?.status === 201) {
                    dispache(setUser(user.email))
                    console.log("User registered with Google");
                    toast(res.data.message);
                     router.push("/")
                } else {
                    console.log("Google user registration failed");
                    toast(res.data.message);
                }
            }
            // alert.success("User signed in with Google successfully.");
            // setShouldNavigateBack(true)
            console.log("User signed in with Google successfully.");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("dfdf")
        try {
            const res = await registerUser(formdata);
            console.log("res?.status", res?.status)
            if (res?.status === 201) {
                console.log('done')
                toast(res.data.message);
            } else {
                console.log("Registration failed")
                toast(res.data.message);
                // setMessage('Registration failed.');
            }
        } catch (error) {
            // setMessage('Registration failed.');
            console.log(error)
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Tost />
            <div className="bg-white shadow-2xl rounded-xl grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full overflow-hidden">
                {/* Left Side - Form */}
                <div className="p-10 relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        {/* <Image src="/profile-placeholder.png" alt="Profile Icon" width={80} height={80} className="rounded-full shadow-md" /> */}
                    </div>

                    <h2 className="text-3xl font-bold text-center mt-10">Sign Up</h2>
                    <p className="text-sm text-gray-500 text-center mt-1">And enjoy life during the time you just saved!</p>

                    <div className="flex gap-4 mt-6">
                        <button onClick={handleSignInWithGoogle} className="flex-1 border border-gray-300 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                            <GoogleIcon style={{ color: "blue" }} />
                            <span>Sign up with Google</span>
                        </button>
                    </div>

                    <form className="mt-6 space-y-4">
                        <div className="flex gap-4">
                            <input type="text" name="username" onChange={handleChange} placeholder="Name" className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <input type="password" name="passward" onChange={handleChange} placeholder="Create Your Passward" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        {/* <label className="flex items-start text-sm text-gray-600">
              <input type="checkbox" className="mt-1 mr-2" />
              Creating an account means you're okay with our <a href="#" className="underline ml-1">Terms of Service</a> and our <a href="#" className="underline ml-1">Privacy Policy</a>
            </label> */}
                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create an Account</button>
                    </form>

                    <p className="text-center text-sm mt-4 text-gray-500">
                        Already have an account? <Link href={"/signin"} className="text-blue-600 hover:underline" >Sign In</Link>
                    </p>
                </div>

                {/* Right Side - Illustration */}
                <div className="hidden md:flex items-center justify-center bg-gray-100">

                    <Image src={loginImage} alt="Illustration" width={600} height={400} className="object-contain" />
                </div>
            </div>
        </div>
    );
}
