"use client"
import { useState } from 'react'
import Styles from '@/styles/Register.module.css'
import { Mulish } from "next/font/google";
import Link from 'next/link';
import { redirect } from "next/navigation";
const mulish = Mulish({ subsets: ["latin"] });

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All Fields are necessary to filled')
            return;
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                redirect("/");
            } else {
                console.log("User registration failed.");
            }
        }
        catch (error) {
            console.log("Error during registration: ", error);
        }
    };
    return (
        <div className={Styles.form_container}>
            <form onSubmit={handleSubmit} id='mulish' className={Styles.Signup_form}>
                <h1 className={mulish.className}>Sign Up</h1>
                <label id="label" htmlFor="email" className={Styles.input_box}>
                    <input onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter Your email'
                        required />
                    <svg id={Styles.svg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </label>
                <label id="label" htmlFor="name" className={Styles.input_box}>
                    <input onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Enter Your name'
                        required />
                    <svg id={Styles.svg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </label>


                <label id="label" htmlFor="password" className={Styles.input_box}>
                    <input onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Create your password'
                        required />

                    <svg id={Styles.svg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </label>

                <div className={Styles.Remember}>
                    <input type='checkbox' />Remember Me
                    <p>Forgot password ?</p>
                </div>
                {error && (
                    <div className={Styles.error}>
                        {error}
                    </div>
                )}
                
                <button className={mulish.className}>SignUp</button>
            

                <div id={Styles.donot} className={mulish.className}>Already have an account ?
                    <Link className={Styles.login} href={'/'}> Login</Link>
                </div>
            </form>
        </div >
    )
}


export default SignUp;
