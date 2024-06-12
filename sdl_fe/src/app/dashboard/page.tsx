'use client';
import DashTemplate from "../dash_template";
import { FaDoorOpen } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Opened Door History',
        },
    },
};

type graphData = {
    date: string;
    count: number;
}

export default function Dashboard() {
    const [usersCount, setUsersCount] = useState(0);
    const [todayHistoryCount, setTodayHistoryCount] = useState(0);
    const [graphData, setGraphData] = useState<graphData[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    async function getAllUsers() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sdl_users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        setUsersCount(data.length);
    }

    async function getTodayHistoryCount() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/history_today`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        setTodayHistoryCount(data.data);
    }

    async function getGraphData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/graph`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        console.log(data);
        setGraphData(data);

        // Extracting dates for labels
        const graphLabels = data.map((item: graphData) => item.date);
        setLabels(graphLabels);
    }

    useEffect(() => {
        getAllUsers();
        getTodayHistoryCount();
        getGraphData();
    }, []);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Total Door Opened',
                data: graphData.map((item) => item.count),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <DashTemplate activeindex={0}>
            <div className="flex flex-col text-black w-5/6 px-8 py-7">
                <h1 className="font-bold text-3xl mb-4">Dashboard</h1>
                <div className="flex flex-row">
                    <div className="bg-[#E3F3FF] rounded-lg w-full mr-5 flex flex-row justify-between">
                        <h1 className="font-bold text-3xl m-4">Total User</h1>
                        <h1 className="font-bold text-3xl m-4">{usersCount} User</h1>
                    </div>
                    <div className="bg-[#E3F3FF] rounded-lg w-full flex flex-row justify-between">
                        <h1 className="font-bold text-3xl mx-4 my-4">
                            Door Opened Today
                        </h1>
                        <h1 className="font-bold text-3xl m-4">{todayHistoryCount} Times</h1>
                    </div>
                </div>
                <div className="bg-[#E3F3FF] rounded-lg h-[75vh] w-full mt-5 flex justify-center">
                    <Line options={options} data={chartData} />
                </div>
            </div>
        </DashTemplate>
    );
}
