import { Link } from "react-router-dom"

export default function TopNav() {
    return(
        <div className="flex justify-between bg-white w-full mb-5 py-4 px-4 border-b border-[#eceaea]">
            <a href="#" className="font-bold text-lg text-[#252525]">Task Management</a>
            <Link to='/login'
            className="bg-blue-500 py-1 px-4 rounded-lg text-white text-sm cursor-pointer hover:bg-blue-400 duration-300">
            Logout
            </Link>
        </div>
    )
}