"use client";
import DashTemplate from "../dash_template";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";

export default function DataUser() {
    const [openModal, setOpenModal] = useState(false);
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
                <tr className="bg-[#E3F3FF]">
                <td className="px-4 py-2">001</td>
                <td className="px-4 py-2">Mahardhika</td>
                <td className="px-4 py-2">bredymahardhika@gmail.com</td>
                <td className="px-4 py-2">
                    <div className="flex flex-row justify-center">
                    <button className="bg-yellow-200 text-white px-3 py-1 rounded-lg mr-2">
                        <BiSolidDetail size={20} />
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
                        <MdModeEdit size={20} />
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                        <FaTrashAlt size={20} />
                    </button>
                    </div>
                </td>
                </tr>
                <tr className="bg-[#E3F3FF]">
                <td className="px-4 py-2">002</td>
                <td className="px-4 py-2">Yoru</td>
                <td className="px-4 py-2">yorz@gmail.com</td>
                <td className="px-4 py-2">
                <div className="flex flex-row justify-center">
                    <button className="bg-yellow-200 text-white px-3 py-1 rounded-lg mr-2">
                        <BiSolidDetail size={20} />
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
                        <MdModeEdit size={20} />
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                        <FaTrashAlt size={20} />
                    </button>
                    </div>
                </td>
                </tr>
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
                <h1 className="pl-16 font-bold">User ID</h1>
                <div className="flex flex-row mr-16">
                <input
                    type="text"
                    className="ml-16 mr-3 mt-1 mb-2 w-full rounded-2xl bg-white py-3 font-bold focus:border-black"
                />
                <Button className="mt-1 mb-2 rounded-xl bg-black text-white font-semibold p-1 items-center">
                    Generate
                </Button>
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
                <h1 className="pl-16 pt-1 font-bold">Password Key</h1>
                <div className="flex flex-row mr-16">
                <input
                    type="text"
                    className="ml-16 mr-3 mt-1 mb-2 w-full rounded-2xl bg-white p-3 font-bold"
                />
                <Button className="mt-1 mb-2 rounded-xl bg-black text-white font-semibold p-1 items-center">
                    Generate
                </Button>
                </div>
                <Button
                className="mx-16 my-4 rounded-2xl bg-[#0090FA] p-3 text-white border-none active:border-none text-center font-bold"
                onClick={() => setOpenModal(false)}
                >
                Simpan
                </Button>
            </div>
            </Modal.Body>
        </Modal>
        </DashTemplate>
    );
}
