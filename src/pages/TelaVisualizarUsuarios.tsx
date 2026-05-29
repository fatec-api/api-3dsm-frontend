import Header from "../shared/components/Header";
import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import instance from "../api/instance";
import { listarUsuarios } from "../services/projectService";
import { KeycloakContext } from "../contexts/KeycloakProvider";



type Experiencia = "Júnior" | "Pleno" | "Sênior";
type StatusUsuario = "Ativo" | "Inativo";
type Cargo = "Gestor" | "Profissional" | "Financeiro";

interface Projeto {
  id: number;
  nome: string;
  cor: "green" | "orange" | "red" | "blue" | "purple";
}

interface Usuario {
  id: string;
  nomeUsuario: string;
  cargos: Cargo[];
  email: string;
  nivelExperiencia: Experiencia;
  valorHora: number;
  criado_em: string;
  projetos: Projeto[];
  ativo: boolean;
}


const formatarData = (dataString: string) => {
  if (!dataString) return "N/A";

  const data = new Date(dataString);
  return new Intl.DateTimeFormat('pt-BR').format(data);
};


// const usuarios: Usuario[] = [
//   {
//     id: 1,
//     nome: "Carlos",
//     cargo: "Gestor",
//     email: "Carlos@gmail.com",
//     experiencia: "Sênior",
//     valorHora: 40.0,
//     criadoEm: "09/04/2026",
//     projetos: [
//       { id: 1, nome: "Projeto1", cor: "green" },
//       { id: 2, nome: "Projeto2", cor: "orange" },
//       { id: 3, nome: "Projeto3", cor: "blue" },
//       { id: 4, nome: "Projeto4", cor: "purple" },
//     ],
//     status: "Ativo",
//   },
//   {
//     id: 2,
//     nome: "Marcos",
//     cargo: "Profissional",
//     email: "Marcos@gmail.com",
//     experiencia: "Júnior",
//     valorHora: 20.0,
//     criadoEm: "10/04/2026",
//     projetos: [{ id: 1, nome: "Projeto1", cor: "green" }],
//     status: "Ativo",
//   },
//   {
//     id: 3,
//     nome: "Jonas",
//     cargo: "Financeiro",
//     email: "Jonas@gmail.com",
//     experiencia: "Pleno",
//     valorHora: 30.0,
//     criadoEm: "10/04/2026",
//     projetos: [],
//     status: "Inativo",
//   },
//   {
//     id: 4,
//     nome: "User X",
//     cargo: "Gestor",
//     email: "UserX@gmail.com",
//     experiencia: "Sênior",
//     valorHora: 40.0,
//     criadoEm: "09/04/2026",
//     projetos: [
//       { id: 5, nome: "Projeto5", cor: "orange" },
//       { id: 2, nome: "Projeto2", cor: "orange" },
//       { id: 6, nome: "Projeto6", cor: "red" },
//     ],
//     status: "Ativo",
//   },
//   {
//     id: 5,
//     nome: "User Y",
//     cargo: "Profissional",
//     email: "UserY@gmail.com",
//     experiencia: "Júnior",
//     valorHora: 20.0,
//     criadoEm: "10/04/2026",
//     projetos: [
//       { id: 1, nome: "Projeto1", cor: "green" },
//       { id: 7, nome: "ProjetoK", cor: "purple" },
//       { id: 8, nome: "Projeto8", cor: "blue" },
//       { id: 9, nome: "Projeto9", cor: "red" },
//       { id: 10, nome: "Projeto10", cor: "orange" },
//     ],
//     status: "Ativo",
//   },
//   {
//     id: 6,
//     nome: "User Z",
//     cargo: "Financeiro",
//     email: "UserZ@gmail.com",
//     experiencia: "Pleno",
//     valorHora: 30.0,
//     criadoEm: "10/04/2026",
//     projetos: [
//       { id: 1, nome: "Projeto1", cor: "green" },
//       { id: 11, nome: "Projeto11", cor: "orange" },
//     ],
//     status: "Ativo",
//   },
// ];


export async function usuarios() {
  try {
    const response = await instance.get("/gestao/usuarios/ativos");
    return response.data;
  } catch (error) {
    console.error({ event: "API_ERROR", action: "listarUsuariosAtivos", error });
    throw error;
  }
}

const MAX_BADGES_VISIVEIS = 2;

const corBadge: Record<Projeto["cor"], string> = {
  green: "badge-success",
  orange: "badge-warning",
  red: "badge-error",
  blue: "badge-info",
  purple: "badge-secondary",
};

function BadgesProjetos({ projetos }: { projetos: Projeto[] }) {
  const visiveis = projetos.slice(0, MAX_BADGES_VISIVEIS);
  const extras = projetos.length - MAX_BADGES_VISIVEIS;

  if (projetos.length === 0) {
    return (
      <span className="badge badge-ghost badge-sm font-semibold">N/A</span>
    );
  }

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {visiveis.map((p) => (
        <span
          key={p.id}
          className={`badge badge-sm font-semibold ${corBadge[p.cor]}`}
        >
          {p.nome}
        </span>
      ))}
      {extras > 0 && (
        <span className="badge badge-sm badge-neutral font-bold">
          +{extras}
        </span>
      )}
    </div>
  );
}

function BadgeStatus({ status }: { status: StatusUsuario }) {
  return (
    <span
      className={`badge badge-sm font-semibold ${status === "Ativo" ? "badge-success" : "badge-error"
        }`}
    >
      {status}
    </span>
  );
}



export default function ListagemUsuarios() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [carregando, setCarregando] = useState(true)

  const { temPermissao } = useContext(KeycloakContext);

  const PermissaoGestor = temPermissao("GESTOR");

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const data = await listarUsuarios()
        setUsuarios(data)
      } catch (erro) {
        console.error("Erro ao buscar usuários:", erro)
      } finally {
        setCarregando(false)
      }
    }

    carregarUsuarios()
  }, [])


  // quantos itens serão exibidos na tabela
  const ITENS_POR_PAGINA = 15;

  // filtro
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = busca.toLowerCase();

    const correspondeBusca =
      usuario.nomeUsuario.toLowerCase().includes(termo) ||
      usuario.nivelExperiencia.toLowerCase().includes(termo);

    const correspondeStatus =
      filtroStatus === "Todos" ||
      (filtroStatus === "Ativo" ? usuario.ativo === true : usuario.ativo === false)

    return correspondeBusca && correspondeStatus;
  });


  const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;

  const usuariosPaginados = usuariosFiltrados.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA
  );

  function BadgesProjetos({ projetos }: { projetos: Projeto[] }) {
    const listaProjetos = projetos || [];
    const visiveis = listaProjetos.slice(0, MAX_BADGES_VISIVEIS);
    const extras = listaProjetos.slice(MAX_BADGES_VISIVEIS);

    if (listaProjetos.length === 0) {
      return (
        <span className="badge badge-ghost badge-sm font-semibold">
          N/A
        </span>
      );
    }

    if (!PermissaoGestor) {
      return (
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg font-semibold text-red-500">
            Acesso negado.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-1 items-center">
        {visiveis.map((p) => (
          <span
            key={p.id}
            className={`badge badge-sm font-semibold ${corBadge[p.cor]}`}
          >
            {p.nome}
          </span>
        ))}

        {extras.length > 0 && (
          <span
            className="badge badge-sm badge-neutral font-bold cursor-pointer"
            title={extras.map((p) => p.nome).join(", ")}
          >
            +{extras.length}
          </span>
        )}
      </div>
    );
  }
  return (
    <>
      <Header />

      <section className="flex justify-center px-6 pb-12">
        <main className="w-full max-w-7xl rounded-2xl p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">


            <h1 className="text-2xl font-bold text-base-content">
              Listagem de Usuários
            </h1>


            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <input
                type="text"
                placeholder="Pesquisar por nome ou experiência..."
                className="input input-bordered w-full md:w-80"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              <select
                className="select select-bordered w-full md:w-52"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

          </div>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Cargos</th>
                  <th>Email</th>
                  <th>Experiência</th>
                  <th>Valor/Hora</th>
                  <th>Criado em</th>
                  <th>Projetos Alocado</th>
                  <th>Status</th>
                  <th>Editar</th>
                </tr>
              </thead>

              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10">
                      <span className="skeleton skeleton-text">Carregando usuários...</span>
                    </td>
                  </tr>
                ) : usuariosPaginados.length > 0 ? (
                  usuariosPaginados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="font-medium">{usuario.nomeUsuario}</td>

                      <td>
                        <ul>
                          {usuario.cargos.map((cargo, index) => (
                            <li key={index}>{cargo}</li>
                          ))}
                        </ul>
                      </td>

                      <td>{usuario.email}</td>

                      <td>{usuario.nivelExperiencia}</td>

                      <td>
                        {usuario.valorHora.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td>{formatarData(usuario.criado_em)}</td>

                      <td>
                        <BadgesProjetos projetos={usuario.projetos} />
                      </td>

                      <td>
                        {/* <BadgeStatus status={usuario.ativo} /> */}
                        <span className={`badge badge-sm ${usuario.ativo ? 'badge-success' : 'badge-error'}`}>
                          {usuario.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>


                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          aria-label={`Editar ${usuario.nomeUsuario}`}
                          onClick={() => {
                            window.open(
                              `http://localhost:8081/admin/java-the-hutt/console/#/java-the-hutt/users/${usuario.id}/settings`,
                              "_blank"
                            );
                          }}
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-base-content/70">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <div className="join">
              <button
                className="join-item btn btn-sm"
                onClick={() =>
                  setPaginaAtual((prev) => Math.max(prev - 1, 1))
                }
              >
                «
              </button>

              <button className="join-item btn btn-sm btn-active">
                Página {paginaAtual}
              </button>

              <button
                className="join-item btn btn-sm"
                onClick={() => setPaginaAtual((prev) => prev + 1)}
              >
                »
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}


