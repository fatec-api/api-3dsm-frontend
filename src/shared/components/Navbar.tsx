import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    {/* menu mobile (dropdown) */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to="/listaprojetos">Projetos</Link></li>
                            <li>
                                <a>Criação</a>
                                <ul className="p-2">
                                    <li><Link to="/cadastroprojeto">Cadastro de Projeto</Link></li>
                                    <li><Link to="/cadastro-usuario">Cadastro de Usuário</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* menu tela grande */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/listaprojetos">Projetos</Link></li>
                        <li>
                            <details>
                                <summary>Criação</summary>
                                <ul className="p-2 bg-base-100 w-52 z-1">
                                    <li><Link to="/cadastroprojeto">Cadastro de Projeto</Link></li>
                                    <li><Link to="/cadastro-usuario">Cadastro de Usuário</Link></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end"></div>
            </div>
            <Outlet />
        </>
    )
}