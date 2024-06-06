"use client";
import DashTemplate from "../dash_template";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import ReactLoading from 'react-loading';

import { useEffect } from "react";

export default function DataUser() {
    const [openModal, setOpenModal] = useState(false);

    async function getAllUsers() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthTokenFromCookies()}`,
        },
    });
    const data = await res.json();
    setUsers(data);
    }

    async function addUser() {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthTokenFromCookies()}`,
        },
        body: JSON.stringify({
            name: name,
            email: email,
            pin: pin
        }),
    });
    const data = await res.json();
    console.log(data);
    setOpenModal(false);
    getAllUsers();
    resetForm();
    setIsLoading(false);
    }

    async function deleteUser(id: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthTokenFromCookies()}`,
        },
    });
    const data = await res.json();
    getAllUsers();
    }

    async function resetForm() {
        setName("");
        setEmail("");
        setPin("");
    }

    function getAuthTokenFromCookies() {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === 'token') {
                return value;
            }
        }
        return null; // Token not found in cookies
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    return (
        <DashTemplate activeindex={1}>
        <div className="flex flex-col text-black w-5/6 px-8 py-7">
            <h1 className="font-bold text-3xl">Data User</h1>
            <Button
            onClick={() => setOpenModal(true)}
            className="m-3 rounded-full bg-black text-white font-semibold p-1 self-end"
            >
            Tambah User +
            </Button>
            <table className="border-collapse border border-gray-300 rounded-lg overflow-hidden w-full text-center">
            <thead className="bg-blue-200">
                <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: any) => (
                    <tr className="bg-[#E3F3FF]" key={user.id}>
                        <td className="px-4 py-2">0{user.id}</td>
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                            <div className="flex flex-row justify-center">
                                <button className="bg-yellow-200 text-white px-3 py-1 rounded-lg mr-2">
                                <BiSolidDetail size={20} />
                            </button>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
                                <MdModeEdit size={20} />
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-lg" onClick={() => deleteUser(user.id)}>
                                <FaTrashAlt size={20} />
                            </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        <Modal
            show={openModal}
            size="md"
            className="bg-black bg-opacity-75"
            onClose={() => setOpenModal(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body className="mx-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-1/2 rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                <h1 className="font-bold text-2xl">Tambah User</h1>
                <IoClose size={38} onClick={() => setOpenModal(false)} />
                </div>
                <h1 className="pl-16 pt-1 font-bold">Nama</h1>
                <input
                    type="text"
                    className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <h1 className="pl-16 pt-1 font-bold">Email</h1>
                <input
                    type="email"
                    className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h1 className="pl-16 pt-1 font-bold">PIN</h1>
                <div className="flex flex-row mr-16">
                <input
                    type="text"
                    className="ml-16 mr-3 mt-1 mb-2 w-full rounded-2xl bg-white p-3 font-bold"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                />
                </div>
                {isLoading ? (
                    <div className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold flex justify-center">
                    <ReactLoading type={'balls'} color={'#ffffff'} height={'5%'} width={'5%'} />
                    </div>
                ): (
                    <Button
                        className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold"
                        onClick={() => addUser()}
                >
                        Simpan
                    </Button>
                )}
                
                
            </div>
            </Modal.Body>
        </Modal>
        </DashTemplate>
    );
}
