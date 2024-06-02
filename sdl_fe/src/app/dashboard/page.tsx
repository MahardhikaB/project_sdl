import DashTemplate from "../dash_template";
import { FaDoorOpen } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

export default function Dashboard() {
    return (    
        <DashTemplate activeindex={0}>
            <div className="flex flex-col text-black w-5/6 px-8 py-7">
            <h1 className="font-bold text-3xl mb-4">Dashboard</h1>
            <div className="flex flex-row">
                <div className="bg-[#E3F3FF] rounded-lg h-48 w-full mr-5 flex flex-col justify-between">
                    <h1 className="font-bold text-3xl m-4">Total User</h1>
                    <h1 className="font-bold text-3xl self-end m-4">2 User</h1>
                </div>
                <div className="bg-[#E3F3FF] rounded-lg h-48 w-full flex flex-col justify-between">
                    <h1 className="font-bold text-3xl mx-4 my-4">The Doors Opened Today</h1>
                    <h1 className="font-bold text-3xl self-end m-4">12 Times</h1>
                </div>
            </div>
            <div className="bg-[#E3F3FF] rounded-lg h-96 w-full mt-5">

            </div>
        </div>
        </DashTemplate>
    )
}