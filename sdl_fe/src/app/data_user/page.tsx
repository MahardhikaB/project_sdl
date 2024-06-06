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
    const [modalDelete, setModalDelete] = useState(false);
    const [userId, setUserId] = useState(0);
    const [modalEdit, setModalEdit] = useState(false);

    async function getAllUsers() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name: name,
            email: email,
            pin: pin
        }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status) {
        setOpenModal(false);
        getAllUsers();
        resetForm();
        setIsLoading(false);
    } else {
        const emailMsg = data.message.email ? data.message.email : "";
        const pinMsg = data.message.pin ? data.message.pin : "";
        alert(emailMsg + "\n" + pinMsg);
        setIsLoading(false);
    }
    }

    async function editUser() {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name: nameEdit,
            email: emailEdit,
            pin: pinEdit
        }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status) {
        setOpenModal(false);
        getAllUsers();
        resetForm();
        setIsLoading(false);
    } else {
        const emailMsg = data.message.email ? data.message.email : "";
        const pinMsg = data.message.pin ? data.message.pin : "";
        alert(emailMsg + "\n" + pinMsg);
        setIsLoading(false);
    }
    setModalEdit(false);
    getAllUsers();
    }

    async function deleteUser(id: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    useEffect(() => {
        getAllUsers();
    }, []);

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [nameEdit, setNameEdit] = useState('')
    const [emailEdit, setEmailEdit] = useState('')
    const [pinEdit, setPinEdit] = useState('')


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
                                <button className="bg-yellow-200 text-white px-2 py-2 rounded-lg mr-2">
                                <BiSolidDetail size={20} />
                            </button>
                            <button className="bg-blue-500 text-white px-2 py-2 rounded-lg mr-2" onClick={() => {setModalEdit(true); setNameEdit(user.name); setEmailEdit(user.email); setPinEdit(user.pin); setUserId(user.id)}}>
                                <MdModeEdit size={20} />
                            </button>
                            <button className="bg-red-500 text-white px-2 py-2 rounded-lg" onClick={() => {setModalDelete(true); setUserId(user.id)}}>
                                <FaTrashAlt size={20} />
                            </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        {/* Modal Tambah Data */}
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
        {/* Modal Hapus Data */}
        <Modal
            show={modalDelete}
            size="md"
            className="bg-black bg-opacity-75"
            onClose={() => setModalDelete(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body className="mx-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-[30%] rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                    <h1 className="font-bold text-2xl">Delete User</h1>
                    <IoClose size={38} onClick={() => setModalDelete(false)} />
                </div>
                <h1 className="text-center pt-1 font-bold">Apakah anda yakin ingin menghapus user ini?</h1>
                <div className="flex flex-row justify-center gap-4 px-4">
                    <Button
                        className="my-4 rounded-2xl bg-[#0090FA] p-3 w-full text-white border-none active:border-none text-center font-bold"
                        onClick={() => setModalDelete(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="my-4 rounded-2xl bg-red-500 p-3 w-full text-white border-none active:border-none text-center font-bold"
                        onClick={() => {deleteUser(userId); setModalDelete(false)}}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        {/* Modal Update Data */}
        <Modal
            show={modalEdit}
            size="md"
            className="bg-black bg-opacity-75"
            onClose={() => setModalEdit(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body className="mx-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-1/2 rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                <h1 className="font-bold text-2xl">Edit User</h1>
                <IoClose size={38} onClick={() => setModalEdit(false)} />
                </div>
                <h1 className="pl-16 pt-1 font-bold">Nama</h1>
                <input
                    type="text"
                    className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                    value={nameEdit}
                    onChange={(e) => setNameEdit(e.target.value)}
                />
                <h1 className="pl-16 pt-1 font-bold">Email</h1>
                <input
                    type="email"
                    className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                    value={emailEdit}
                    onChange={(e) => setEmailEdit(e.target.value)}
                />
                <h1 className="pl-16 pt-1 font-bold">PIN</h1>
                <div className="flex flex-row mr-16">
                <input
                    type="text"
                    className="ml-16 mr-3 mt-1 mb-2 w-full rounded-2xl bg-white p-3 font-bold"
                    value={pinEdit}
                    onChange={(e) => setPinEdit(e.target.value)}
                />
                </div>
                {isLoading ? (
                    <div className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold flex justify-center">
                    <ReactLoading type={'balls'} color={'#ffffff'} height={'5%'} width={'5%'} />
                    </div>
                ): (
                    <Button
                        className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold"
                        onClick={() => editUser()}
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
