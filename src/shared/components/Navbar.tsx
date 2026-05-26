import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { KeycloakContext } from "../../contexts/KeycloakProvider";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const { getUsuario, temPermissao } = useContext(KeycloakContext);
    const navigate = useNavigate();
    const usuario = getUsuario();
    const KEYCLOAK_ADD_USER =
        "http://localhost:8081/admin/java-the-hutt/console/#/java-the-hutt/users/add-user";

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

                            {/* <li><Link to="/">Home</Link></li> */}
                            {temPermissao('GESTOR') && (
                                <li><Link to="/lista-projetos">Projetos</Link></li>
                            )}
                            <li><Link to="/tela-funcionarios">Funcionários</Link></li>
                            <li><Link to="/log-profissional">Apontamento de Horas</Link></li>

                            <li>
                                <a>Criação</a>
                                <ul className="p-2">
                                    {temPermissao('GESTOR') && (
                                        <>
                                            <li><Link to="/cadastroprojeto">Cadastro de Projeto</Link></li>
                                            <li>
                                                <a href={KEYCLOAK_ADD_USER} target="_blank" rel="noopener noreferrer">
                                                    Cadastro de Usuário
                                                </a>
                                            </li>
                                            <li><Link to="/cadastro-item">Cadastro de Atividade</Link></li>
                                            <li><Link to="/cadastro-cliente">Cadastro de Cliente</Link></li>

                                        </>
                                    )}
                                    <li><Link to="/apontamento-horas">Apontamento de Horas</Link></li>
                                </ul>
                            </li>
                            {temPermissao('GESTOR') && (<>
                                <li><Link to="/tela-historico">Histórico</Link></li>
                                <li><Link to="/apontamentos-gestor">Gestão de Apontamentos</Link></li>
                            </>)}

                            <li>
                                <a>Outros</a>
                                <ul className="p-2">
                                    <li><Link to="/descricao-projeto">Descrição do Projeto</Link></li>
                                    <li><Link to="/teste-alocacao">Alocação Dev</Link></li>
                                </ul>
                            </li>

                            <li><Link to="/tela-login">Login</Link></li>

                        </ul>
                    </div>
                </div>

                {/* menu tela grande */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {temPermissao('GESTOR') && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to="/lista-projetos">Projetos</Link></li>
                        )}
                        <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to={`/log-profissional/${usuario?.id}`}>Apontamento</Link></li>

                        <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105">
                            <details>
                                <summary>Criação</summary>
                                <ul className="text-black p-2 bg-base-100 w-52 z-1">
                                    {temPermissao('GESTOR') && (
                                        <>
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/cadastro-projeto">Cadastro de Projeto</Link></li>
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg">
                                                <a href={KEYCLOAK_ADD_USER} target="_blank" rel="noopener noreferrer">
                                                    Cadastro de Usuário
                                                </a>
                                            </li>
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/cadastro-item">Cadastro de Atividade</Link></li>
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/cadastro-cliente">Cadastro de Cliente</Link></li>
                                        </>
                                    )}
                                    <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/apontamento-horas">Apontamento de Horas</Link></li>
                                </ul>
                            </details>
                        </li>
                        {temPermissao('GESTOR') && (<>
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to="/tela-historico">Histórico</Link></li>
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to="/apontamentos-gestor">Gestão de apontamentos</Link></li>
                        </>)}
                        <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105">
                            {temPermissao('GESTOR') && (
                                <>
                                    <details>
                                        <summary>Clientes</summary>
                                        <ul className="text-black p-2 bg-base-100 w-52 z-1">
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/listagem-clientes">Lista dos Clientes</Link></li>
                                        </ul>
                                    </details>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="navbar-end"></div>
            </div>
            <Outlet />
        </>
    )
}
