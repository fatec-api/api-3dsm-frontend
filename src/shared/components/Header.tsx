import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header() {
    return (
        <>
            <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">GSW</a>
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.icons8.com/material-rounded/48/user.png" />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>

                    <div className="w-10 btn btn-ghost btn-circle avatar">
                        <img src="https://img.icons8.com/fluency-systems-filled/48/exit.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="fixed top-16 left-0 w-full z-40 ">
                <Navbar />
            </div>

            {/* pode ser necessário para o bom funcionamento correto da navbar */}
            <div className="pt-32 flex flex-col">
            <Outlet />
            </div>

        </>
    )
}
