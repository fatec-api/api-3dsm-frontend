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
                            className="menu menu-sm dropdown-content bg-[#071A40] rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {/* <li><Link to="/">Home</Link></li> */}
                            {temPermissao(['GESTOR', 'FINANCEIRO']) && (
                                <li>
                                    <a>Projetos</a>
                                    <ul className="p-2">
                                        {temPermissao('GESTOR') && (
                                            <li>
                                                <Link to="/cadastro-projeto">Cadastro de Projeto</Link>
                                            </li>
                                        )}

                                        <li>
                                            <Link to="/lista-projetos">Listagem de Projetos</Link>
                                        </li>

                                        {temPermissao('GESTOR') && (
                                            <li>
                                                <Link to="/cadastro-item">Cadastro de Atividade</Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {temPermissao('GESTOR') && (
                                <li>
                                    <a>Apontamentos</a>
                                    <ul className="p-2">
                                        <li>
                                            <Link to="/apontamentos-gestor">
                                                Aprovar e Reprovar
                                            </Link>
                                        </li>

                                        {temPermissao('PROFISSIONAL') && (
                                            <>
                                                <li>
                                                    <Link to={`/log-profissional/${usuario?.id}`}>
                                                        Meus Apontamentos
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link to="/apontamento-horas">
                                                        Efetuar Apontamento
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {temPermissao('PROFISSIONAL') && !temPermissao('GESTOR') && (
                                <li>
                                    <Link to={`/log-profissional/${usuario?.id}`}>
                                        Meus Apontamentos
                                    </Link>
                                </li>
                            )}

                            {temPermissao('PROFISSIONAL') && !temPermissao('GESTOR') && (
                                <li>
                                    <Link to="/apontamento-horas">
                                        Efetuar Apontamento
                                    </Link>
                                </li>
                            )}

                            {temPermissao(['GESTOR', 'FINANCEIRO']) && (
                                <li>
                                    <a>Usuários</a>
                                    <ul className="p-2">
                                        {temPermissao('GESTOR') && (
                                            <li>
                                                <a
                                                    href={KEYCLOAK_ADD_USER}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Cadastro de Usuário
                                                </a>
                                            </li>
                                        )}

                                        <li>
                                            <Link to="/visualizar-usuarios">
                                                Listagem de Usuários
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}

                            {temPermissao(['GESTOR', 'FINANCEIRO']) && (
                                <li>
                                    <a>Clientes</a>
                                    <ul className="p-2">
                                        {temPermissao('GESTOR') && (
                                            <li>
                                                <Link to="/cadastro-cliente">
                                                    Cadastro de Cliente
                                                </Link>
                                            </li>
                                        )}

                                        <li>
                                            <Link to="/listagem-clientes">
                                                Lista dos Clientes
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}

                            {temPermissao('GESTOR') && (
                                <li>
                                    <Link to="/tela-historico">Histórico</Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>

                {/* menu tela grande */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-x-6">
                        {temPermissao(['GESTOR', 'FINANCEIRO']) && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105">
                            <details name="menu">
                                <summary>Projetos</summary>
                                <ul className="text-black p-2 bg-base-100 w-52 z-1">
                                    {temPermissao('GESTOR') && (
                                        <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/cadastro-projeto">Cadastro de Projeto</Link></li>
                                    )}
                                    <li><Link to="/lista-projetos">Listagem de Projetos</Link></li>
                                    {temPermissao('GESTOR') && (
                                        <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/cadastro-item">Cadastro de Atividade</Link></li>
                                    )}
                                </ul>
                            </details>
                            </li>
                        )}
                        
                        {temPermissao('GESTOR') && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105">
                                <details name="menu">
                                    <summary>Apontamentos</summary>
                                    <ul className="text-black p-2 bg-base-100 w-52 z-1">
                                        <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to="/apontamentos-gestor">Aprovar e Reprovar</Link></li>
                                        {temPermissao('PROFISSIONAL') && (
                                            <>
                                            <li><Link to={`/log-profissional/${usuario?.id}` } className="hover:rounded-lg hover:transform transition-transform hover:scale-105">Meus Apontamentos</Link></li>
                                            <li><Link to="/apontamento-horas" className="hover:rounded-lg hover:transform transition-transform hover:scale-105">Efetuar Apontamento</Link></li>
                                            </>
                                        )}
                                    </ul>
                                </details>
                            </li>
                        )}

                        {temPermissao('PROFISSIONAL') && !temPermissao('GESTOR')  && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to={`/log-profissional/${usuario?.id}` } className="hover:rounded-lg hover:transform transition-transform hover:scale-105">Meus Apontamentos</Link></li>
                        )}
                        {temPermissao('PROFISSIONAL') && !temPermissao('GESTOR')  && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to="/apontamento-horas" className="hover:rounded-lg hover:transform transition-transform hover:scale-105">Efetuar Apontamento</Link></li>
                        )}
                        
                        {temPermissao(['GESTOR', 'FINANCEIRO']) && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105">
                                <details name="menu">
                                    <summary>Usuários</summary>
                                    <ul className="text-black p-2 bg-base-100 w-52 z-1">
                                        {temPermissao('GESTOR') && (
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg">
                                                <a href={KEYCLOAK_ADD_USER} target="_blank" rel="noopener noreferrer">
                                                    Cadastro de Usuário
                                                </a>
                                            </li>
                                        )}
                                        <li>
                                            <Link to="/visualizar-usuarios" className="hover:rounded-lg hover:transform transition-transform hover:scale-105">Listagem de Usuários</Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        )}     
                            {temPermissao(['GESTOR', 'FINANCEIRO']) && (
                                <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105">
                                    <details name="menu">
                                        <summary>Clientes</summary>
                                        <ul className="text-black p-2 bg-base-100 w-52 z-1">
                                            {temPermissao('GESTOR') && (
                                                <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/cadastro-cliente">Cadastro de Cliente</Link></li>
                                            )}
                                            <li className="hover:bg-[#1E3859] hover:text-white hover:rounded-lg"><Link to="/listagem-clientes">Lista dos Clientes</Link></li>
                                        </ul>
                                    </details>
                               </li>
                            )}
                        
                        {temPermissao('GESTOR') && (
                            <li className="hover:rounded-lg hover:transform transition-transform hover:scale-105"><Link to="/tela-historico">Histórico</Link></li>
                        )}
                    </ul>
                </div>
                <div className="navbar-end"></div>
            </div>
            <Outlet />
        </>
    )
}
