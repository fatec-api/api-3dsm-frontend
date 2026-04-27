import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../assets/gsw-logo-colorida.png";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100 shadow-sm">
                <div className="flex-1">
                   <a className="btn btn-ghost text-xl">
                      <img
                        src={logo}
                        alt="Logo GSW"
                        className="h-8 w-auto"
                        />
                   </a>
               </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                             <FiUser className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="w-10 btn btn-ghost btn-circle avatar"  onClick={() => navigate("/telalogin")}>
                        <FiLogOut className="w-6 h-6" />
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