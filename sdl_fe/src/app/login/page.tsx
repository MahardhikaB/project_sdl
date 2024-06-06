'use client';
import Image from 'next/image'
import BackgroundBiru from '/public/BackgroundBiru.png'
import Link from 'next/link'
import { useState } from "react";
import { Button } from 'flowbite-react';
import { json } from 'stream/consumers';



export default function Login() {
    async function login()  {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/login`, {'method': 'POST', 'headers': {'Content-Type': 'application/json'} ,'body': JSON.stringify({email: email, password: password})})
        const data = await res.json()
        console.log(data)

        if (data.success) {
            // Set cookie with secure flag (recommended) and optional expiration
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 1 day
            document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; Secure`;

            window.location.href = '/dashboard';
        }
    }
        // if(data.success) {
        //     localStorage.setItem('token', data.token)
        //     window.location.href = '/dashboard'
        // }

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='relative w-screen h-screen'>
            <Image src={BackgroundBiru} alt="logo" className='h-screen' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-1/4 rounded-2xl bg-[#E3F3FF] flex flex-col'>
                <h1 className='text-[#0090FA] p-3'><b>Log In</b></h1>
                <div className='h-1 w-full bg-white'/>
                <input type="text" placeholder='Email' className='m-5 rounded-2xl bg-white p-3 placeholder-[#0090FA] placeholder-opacity-60 font-bold text-[#0090FA] border-none' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' className='ml-5 mr-5 mt-1 mb-3 rounded-2xl bg-white p-3 placeholder-[#0090FA] placeholder-opacity-60 font-bold text-[#0090FA] border-none' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Button className='m-5 rounded-2xl bg-[#0090FA] p-3 border-none active:border-none text-center font-bold' onClick={() => login()}>LOGIN</Button>
            </div>
        </div>
    )
}