"use client";
import { Button } from "flowbite-react";
import DashTemplate from "../dash_template";
import Image from 'next/image';
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';

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
    console.log(data.data);
    setHistories(data.data);
    }

    const [histories, setHistories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    async function nextPage() {
        setIsLoading(true);
        setCurrentPage(currentPage + 1);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/history?page=${currentPage + 1}`, {
        });
        const data = await res.json();
        setHistories(data.data);
        setIsLoading(false);
    }

    async function prevPage() {
        if (currentPage > 1) {
            setIsLoading(true);
            setCurrentPage(currentPage - 1);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/history?page=${currentPage - 1}`, {
            });
            const data = await res.json();
            setHistories(data.data);
            setIsLoading(false);
        }
    }
    
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
                <div className="flex justify-end ">
                    <Button className="bg-blue-200 text-black font-bold text-3xl" onClick={prevPage} disabled={currentPage === 1}>Prev</Button>
                    <Button className="bg-blue-200 text-black font-bold text-3xl" onClick={nextPage}>Next</Button>
                </div>
            </div>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" id="loadingHistory">
                    <ReactLoading type={'spinningBubbles'} color={'#ffffff'} height={'5%'} width={'5%'} />
                </div>
            )}
        </DashTemplate>
    )
}