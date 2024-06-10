'use client';
import Image from 'next/image'
import LogoPutih from '/public/logo_putih.png'
import LogoHitam from '/public/logo_hitam.png'
import Avatar from '/public/Avatar.jpg'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

export default function DashTemplate({
    children,
    activeindex
}: {children: React.ReactNode, activeindex: number}) {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    return (
        <div className="flex bg-white w-screen h-screen">
            <aside className="w-1/6 bg-[#E3F3FF] flex flex-col p-4 justify-between">
                <div>
                    <div className='flex justify-center items-center'>
                        <Image src={LogoHitam} alt="logo" className='w-8' />
                        <h1 className='text-black font-bold text-xl p-0 mt-4 mb-5 ml-2 mr-2'>Fantastic Five</h1>
                    </div>
                    <ul className='text-black'>
                        <li className={`${activeindex == 0 ? 'bg-white' : ''} rounded-xl p-1`}>
                            <div className='flex flex-row items-center px-9'>
                            <IoHome className='mr-3'/>
                            <Link href={'/dashboard'} className='font-semibold'>Dashboard</Link>
                            </div>
                        </li>
                        <li className={`${activeindex == 1 ? 'bg-white' : ''} rounded-xl p-1`}>
                            <div className='flex flex-row items-center px-9'>
                            <FaUser className='mr-3'/>
                            <Link href={'/data_user'} className='font-semibold'>Data User</Link>
                            </div>      
                        </li>
                        <li className={`${activeindex == 2 ? 'bg-white' : ''} rounded-xl p-1`}>
                            <div className='flex flex-row items-center px-9'>
                            <FaHistory className='mr-3'/>
                            <Link href={'/laporan'} className='font-semibold'>History</Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-evenly'>
                    <Image src={Avatar} alt="avatar" className='w-8 rounded-full' />
                    <div className='flex flex-col'>
                        <h1 className='text-black font-bold p-0 text-sm'>Admin</h1>
                        <h2 className='text-black font-light text-xs'>admin@gmail.com</h2>
                    </div>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faEllipsis} style={{width : 30, color : 'black', scale : '125%'}} onClick={() => setOpenModal(true)}/>
                    </div>
                </div>
            </aside>
            {children}
            {/* MODAL PROFILE */}
            <Modal show={openModal} size="md" className="bg-black bg-opacity-75" onClose={() => setOpenModal(false)} popup>
            <Modal.Header/>
            <Modal.Body className="mx-20">
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[40%] h-100 w-5/12 rounded-2xl bg-white flex flex-col text-black py-3'>
                <div className='flex flex-row items-center justify-between px-3 mx-3 mb-5'>
                    <h1 className='font-bold text-2xl'>Profile</h1>
                    <IoClose size={38} onClick={() => setOpenModal(false)}/>
                </div>
                <div className='flex ml-20'>
                    <Image src={Avatar} alt="avatar" className='w-40 rounded-full' />
                    <div className='flex flex-col justify-center ml-20'>
                        <h1 className='font-bold text-xl'>Admin</h1>
                        <h2 className='font-light text-xl'>Admin@gmail.com</h2>
                    </div>
                </div>
                <div className='flex flex-row mt-3'>
                    <Button className='ml-16 my-4 rounded-2xl bg-[#0090FA] px-8 py-2 w-[350px] text-white border-none active:border-none text-center font-bold flex justify-center items-center' onClick={() => {setOpenModal(false)
                                                            setOpenModal2(true)
                    } } >Edit Profile</Button>
                    <Link className='ml-2 mr-16 my-4 rounded-2xl bg-red-600 py-2 w-full text-white border-none active:border-none flex justify-center items-center text-center font-bold' href={'/login'} >Logout</Link>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        {/* MODAL EDIT PROFILE */}
        <Modal
            show={openModal2}
            size="md"
            className="bg-black bg-opacity-75"
            onClose={() => {setOpenModal2(false)
                            setOpenModal(true)
            } }
            popup
        >
            <Modal.Header />
            <Modal.Body className="mx-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[25%] h-100 w-1/2 rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                <h1 className="font-bold text-2xl">Edit Profile</h1>
                <IoClose size={38} onClick={() => {setOpenModal2(false)
                                                    setOpenModal(true)
                } } />
                </div>
                <h1 className="pl-16 pt-1 font-bold">Nama</h1>
                <input
                type="text"
                className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                />
                <h1 className="pl-16 pt-1 font-bold">Email</h1>
                <input
                type="email"
                className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                />
                <h1 className="pl-16 pt-1 font-bold">Password</h1>
                <div className="flex flex-row mr-16">
                <input
                    type="password"
                    className="ml-16 mr-3 mt-1 mb-2 w-full rounded-2xl bg-white p-3 font-bold"
                />
                </div>
                <Button
                className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold"
                onClick={() => {setOpenModal2(false)
                                setOpenModal(true)
                } }
                >
                Simpan
                </Button>
            </div>
            </Modal.Body>
        </Modal>
        </div>
    );
}