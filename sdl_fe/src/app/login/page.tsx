import Image from 'next/image'
import BackgroundBiru from '/public/BackgroundBiru.png'
import Link from 'next/link'

export default function Login() {
    return (
        <div className='relative w-screen h-screen'>
            <Image src={BackgroundBiru} alt="logo" className='h-screen' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-1/4 rounded-2xl bg-[#E3F3FF] flex flex-col'>
                <h1 className='text-[#0090FA] p-3'><b>Log In</b></h1>
                <div className='h-1 w-full bg-white'/>
                <input type="text" placeholder='Email' className='m-5 rounded-2xl bg-white p-3 placeholder-[#0090FA] placeholder-opacity-60 font-bold text-[#0090FA] border-none'/>
                <input type="password" placeholder='Password' className='ml-5 mr-5 mt-1 mb-3 rounded-2xl bg-white p-3 placeholder-[#0090FA] placeholder-opacity-60 font-bold text-[#0090FA] border-none' />
                <h2 className='text-center text-[#0090FA]'>Lupa Password!?</h2>
                <Link className='m-5 rounded-2xl bg-[#0090FA] p-3 border-none active:border-none text-center font-bold' href={'/dashboard'} >LOGIN</Link>
            </div>
        </div>
    )
}