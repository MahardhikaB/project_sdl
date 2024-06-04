import DashTemplate from "../dash_template";
import GambarExp from '/public/kirari.jpg'
import Image from 'next/image'

export default function Laporan() {
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
                            <tr className="bg-[#E3F3FF]">
                                <td className="px-4 py-2">001</td>
                                <td className="px-4 py-2 flex justify-center items-center">
                                    <Image src={GambarExp} alt="image" className='w-28'/>
                                </td>
                                <td className="px-4 py-2">18-04-2024</td>
                            </tr>
                            <tr className="bg-[#E3F3FF]">
                                <td className="px-4 py-2">002</td>
                                <td className="px-4 py-2">Ini Gambar</td>
                                <td className="px-4 py-2">19-04-2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </DashTemplate>
    )
}