import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../assets/gsw-logo-colorida.png";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { KeycloakContext } from "../../contexts/KeycloakProvider";

export default function Header() {
    const navigate = useNavigate();

    const { autenticado, login, logout, getUsuario } = useContext(KeycloakContext);
    const usuario = getUsuario();
    return (
        <>
            <div className="navbar sticky top-0 left-0 w-full z-50 bg-base-100 shadow-sm">
                <div className="flex-1">

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
                        <div>
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