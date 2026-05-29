import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../assets/gsw-logo-branco.png";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { KeycloakContext } from "../../contexts/KeycloakProvider";

export default function Header() {
    const navigate = useNavigate();

    const { autenticado, login, logout, getUsuario } = useContext(KeycloakContext);
    const usuario = getUsuario();
    return (
        <>
            <div className="navbar justify-between sticky top-0 left-0 w-full z-50 bg-base-100 shadow-sm">
                <a className="cursor-pointer p-3 text-xl">
                    <img
                        src={logo}
                        alt="Logo GSW"
                        className="h-8 w-auto"
                    />
                </a>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <FiUser className="w-6 h-6" />
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
                            <li onClick={logout}><a>Logout</a></li>
                        </ul>

                    <Link to="/" className="btn btn-ghost text-xl">
                        <img
                            src={logo}
                            alt="Logo GSW"
                            className="h-8 w-auto"
                        />
                    </Link>

                </div>
                <div className="flex gap-2">
                    
                    {!autenticado ? (
                        <button className="w-10 btn btn-ghost" onClick={login} >Login
                        </button>
                    ) : (
                            <div className="flex items-center gap-2 text-[#F5BC51]">
                            <span>Olá, {usuario?.nome}</span>

                            <button onClick={logout} className="w-10 btn btn-ghost btn-circle avatar">
                                <FiLogOut className="w-6 h-6" />
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <div className="sticky top-16 left-0 w-full z-40">
                <Navbar />
            </div>

        </>
    )
}