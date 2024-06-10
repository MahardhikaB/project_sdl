"use client";
import DashTemplate from "../dash_template";
import Image from 'next/image'

import { useEffect, useState } from "react";

export default function Laporan() {

    async function getHistory() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();
    setHistories(data);
    }

    const [histories, setHistories] = useState([]);

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <DashTemplate activeindex={2}>
            <div className="flex flex-col text-black w-5/6 px-8 py-7 bg-white">
                <h1 className="font-bold text-3xl pb-6">History</h1>
                    <table className="border-collapse border border-gray-300 rounded-lg overflow-hidden w-full text-center">
                        <thead className="bg-blue-200">
                            <tr>
                                <th className="px-4 py-2">User</th>
                                <th className="px-4 py-2">Gambar</th>
                                <th className="px-4 py-2">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.map((history: any) => (
                                <tr className="bg-[#E3F3FF]" key={history.id}>
                                <td className="px-4 py-2">0{history.user_id}</td>
                                <td className="px-4 py-2 flex justify-center items-center">
                                    <Image src={history.image} alt="image" width={120} height={120}/>
                                </td>
                                <td className="px-4 py-2">{history.created_at}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </DashTemplate>
    )
}