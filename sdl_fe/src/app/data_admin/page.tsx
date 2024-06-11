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

type Admin = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

type ErrorMessage = {
    email: string;
    password: string;
    }
    
    export default function DataAdmin() {
        const [openModal, setOpenModal] = useState(false);
        const [modalDelete, setModalDelete] = useState(false);
        const [adminId, setAdminId] = useState(0);
        const [modalEdit, setModalEdit] = useState(false);
        const [modalDetail, setModalDetail] = useState(false);
        const [adminDetail, setAdminDetail] = useState<Admin>({id: 0, name: '', email: '', password: '', created_at: '', updated_at: ''});
        
        const [ErrorMessage, setErrorMessage] = useState<ErrorMessage>({email: '', password: ''});
        
        const [Admins, setAdmins] = useState([]);
        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [isLoading, setIsLoading] = useState(false);
        const [nameEdit, setNameEdit] = useState('')
        const [emailEdit, setEmailEdit] = useState('')
        const [passwordEdit, setPasswordEdit] = useState('')
        

    async function getAllAdmins() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/admin`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();
    setAdmins(data);
    }

    async function addAdmin() {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/admin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status) {
        setOpenModal(false);
        getAllAdmins();
        resetForm();
        setIsLoading(false);
        setErrorMessage({email: '', password: ''});
    } else {
        const emailMsg = data.message.email ? data.message.email : "";
        const passwordMsg = data.message.password ? data.message.password : "";
        setIsLoading(false);
        setErrorMessage({email: emailMsg, password: passwordMsg});
    }
    }

    async function editAdmin() {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/admin/${adminId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name: nameEdit,
            email: emailEdit,
            password: passwordEdit
        }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status) {
        setOpenModal(false);
        getAllAdmins();
        resetForm();
        setIsLoading(false);
        setErrorMessage({email: '', password: ''});
    } else {
        const emailMsg = data.message.email ? data.message.email : "";
        const passwordMsg = data.message.password ? data.message.password : "";
        setIsLoading(false);
        setErrorMessage({email: emailMsg, password: passwordMsg});
    }
    getAllAdmins();
    }

    async function deleteAdmin(id: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/admin/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();
    getAllAdmins();
    }

    async function resetForm() {
        setName("");
        setEmail("");
        setPassword("");
        setErrorMessage({email: '', password: ''});
    }

    useEffect(() => {
        getAllAdmins();
    }, []);


    return (
        <DashTemplate activeindex={1}>
        <div className="flex flex-col text-black w-5/6 px-8 py-7">
            <h1 className="font-bold text-3xl">Data Admin</h1>
            <Button
            onClick={() => setOpenModal(true)}
            className="m-3 rounded-full bg-black text-white font-semibold p-1 self-end"
            >
            Tambah Admin +
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
                {Admins.map((Admin: any) => (
                    <tr className="bg-[#E3F3FF]" key={Admin.id}>
                        <td className="px-4 py-2">0{Admin.id}</td>
                        <td className="px-4 py-2">{Admin.name}</td>
                        <td className="px-4 py-2">{Admin.email}</td>
                        <td className="px-4 py-2">
                            <div className="flex flex-row justify-center">
                                <button className="bg-yellow-200 text-white px-2 py-2 rounded-lg mr-2" onClick={() => {setModalDetail(true); setAdminDetail(Admin)}}>
                                <BiSolidDetail size={20} />
                            </button>
                            <button className="bg-blue-500 text-white px-2 py-2 rounded-lg mr-2" onClick={() => {setModalEdit(true); setNameEdit(Admin.name); setEmailEdit(Admin.email); setPasswordEdit(Admin.pin); setAdminId(Admin.id)}}>
                                <MdModeEdit size={20} />
                            </button>
                            <button className="bg-red-500 text-white px-2 py-2 rounded-lg" onClick={() => {setModalDelete(true); setAdminId(Admin.id)}}>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[20%] h-100 w-[40%] rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                <h1 className="font-bold text-2xl">Tambah Admin</h1>
                <IoClose size={38} onClick={() => {setOpenModal(false); resetForm()}} />
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
                {ErrorMessage.email.length > 0 && <p className="text-red-500 text-sm ml-16">*{ErrorMessage.email}</p>}
                <h1 className="pl-16 pt-1 font-bold">Password</h1>
                <input
                    type="password"
                    className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {ErrorMessage.password.length > 0 && <p className="text-red-500 text-sm ml-16">*{ErrorMessage.password}</p>}
                {isLoading ? (
                    <div className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold flex justify-center">
                    <ReactLoading type={'balls'} color={'#ffffff'} height={'5%'} width={'5%'} />
                    </div>
                ): (
                    <Button
                        className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold"
                        onClick={() => addAdmin()}
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[100%] h-100 w-[30%] rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                    <h1 className="font-bold text-2xl">Delete Admin</h1>
                    <IoClose size={38} onClick={() => setModalDelete(false)} />
                </div>
                <h1 className="text-center pt-1 font-bold">Apakah anda yakin ingin menghapus Admin ini?</h1>
                <div className="flex flex-row justify-center gap-4 px-4">
                    <Button
                        className="my-4 rounded-2xl bg-[#0090FA] p-3 w-full text-white border-none active:border-none text-center font-bold"
                        onClick={() => setModalDelete(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="my-4 rounded-2xl bg-red-500 p-3 w-full text-white border-none active:border-none text-center font-bold"
                        onClick={() => {deleteAdmin(adminId); setModalDelete(false)}}
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[25%] h-100 w-[40%] rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                <h1 className="font-bold text-2xl">Edit Admin</h1>
                <IoClose size={38} onClick={() => {setModalEdit(false); resetForm()}} />
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
                {ErrorMessage.email.length > 0 && <p className="text-red-500 text-sm ml-16">*{ErrorMessage.email}</p>}
                <h1 className="pl-16 pt-1 font-bold">Password</h1>
                <input
                    type="password"
                    className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold"
                    value={passwordEdit}
                    onChange={(e) => setPasswordEdit(e.target.value)}
                />
                {ErrorMessage.password.length > 0 && <p className="text-red-500 text-sm ml-16">*{ErrorMessage.password}</p>}
                {isLoading ? (
                    <div className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold flex justify-center">
                    <ReactLoading type={'balls'} color={'#ffffff'} height={'5%'} width={'5%'} />
                    </div>
                ): (
                    <Button
                        className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold"
                        onClick={() => editAdmin()}
                >
                        Simpan
                    </Button>
                )}
            </div>
            </Modal.Body>
        </Modal>
        {/* Modal Detail Data */}
        <Modal
            show={modalDetail}
            size="md"
            className="bg-black bg-opacity-75"
            onClose={() => setModalDetail(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body className="mx-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[70%] h-100 w-[30%] rounded-2xl bg-white flex flex-col text-black py-3">
                <div className="flex flex-row items-center justify-between px-3 mx-3 mb-5">
                <h1 className="font-bold text-2xl">Detail Admin</h1>
                <IoClose size={38} onClick={() => setModalDetail(false)} />
                </div>
                <h1 className="pl-16 pt-1 font-bold">Nama :</h1>
                <p className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold">
                    • {adminDetail.name ?? ''}
                </p>
                <h1 className="pl-16 pt-1 font-bold">Email :</h1>
                <p className="mx-16 mt-1 mb-2 rounded-2xl bg-white p-3 font-bold">
                    • {adminDetail.email ?? ''}
                </p>
            </div>
            </Modal.Body>
        </Modal>
        </DashTemplate>
    );
}
