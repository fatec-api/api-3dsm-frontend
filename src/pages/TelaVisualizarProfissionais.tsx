import Navbar from "../shared/components/Navbar";
import Header from "../shared/components/Header";
import { useState } from "react";


type Experiencia = "Júnior" | "Pleno" | "Sênior";
type StatusUsuario = "Ativo" | "Inativo";
type Cargo = "Gestor" | "Profissional" | "Financeiro";

interface Projeto {
  id: number;
  nome: string;
  cor: "green" | "orange" | "red" | "blue" | "purple";
}

interface Usuario {
  id: number;
  nome: string;
  cargo: Cargo;
  email: string;
  experiencia: Experiencia;
  valorHora: number;
  criadoEm: string;
  projetos: Projeto[];
  status: StatusUsuario;
}




const usuarioLogadoId = 1; // ID do usuário autenticado

const usuarios: Usuario[] = [
  {
    id: 1,
    nome: "Carlos",
    cargo: "Gestor",
    email: "Carlos@gmail.com",
    experiencia: "Sênior",
    valorHora: 40.0,
    criadoEm: "09/04/2026",
    projetos: [
      { id: 1, nome: "Projeto1", cor: "green" },
      { id: 2, nome: "Projeto2", cor: "orange" },
      { id: 3, nome: "Projeto3", cor: "blue" },
      { id: 4, nome: "Projeto4", cor: "purple" },
    ],
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Marcos",
    cargo: "Profissional",
    email: "Marcos@gmail.com",
    experiencia: "Júnior",
    valorHora: 20.0,
    criadoEm: "10/04/2026",
    projetos: [{ id: 1, nome: "Projeto1", cor: "green" }],
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Jonas",
    cargo: "Financeiro",
    email: "Jonas@gmail.com",
    experiencia: "Pleno",
    valorHora: 30.0,
    criadoEm: "10/04/2026",
    projetos: [],
    status: "Inativo",
  },
  {
    id: 4,
    nome: "User X",
    cargo: "Gestor",
    email: "UserX@gmail.com",
    experiencia: "Sênior",
    valorHora: 40.0,
    criadoEm: "09/04/2026",
    projetos: [
      { id: 5, nome: "Projeto5", cor: "orange" },
      { id: 2, nome: "Projeto2", cor: "orange" },
      { id: 6, nome: "Projeto6", cor: "red" },
    ],
    status: "Ativo",
  },
  {
    id: 5,
    nome: "User Y",
    cargo: "Profissional",
    email: "UserY@gmail.com",
    experiencia: "Júnior",
    valorHora: 20.0,
    criadoEm: "10/04/2026",
    projetos: [
      { id: 1, nome: "Projeto1", cor: "green" },
      { id: 7, nome: "ProjetoK", cor: "purple" },
      { id: 8, nome: "Projeto8", cor: "blue" },
      { id: 9, nome: "Projeto9", cor: "red" },
      { id: 10, nome: "Projeto10", cor: "orange" },
    ],
    status: "Ativo",
  },
  {
    id: 6,
    nome: "User Z",
    cargo: "Financeiro",
    email: "UserZ@gmail.com",
    experiencia: "Pleno",
    valorHora: 30.0,
    criadoEm: "10/04/2026",
    projetos: [
      { id: 1, nome: "Projeto1", cor: "green" },
      { id: 11, nome: "Projeto11", cor: "orange" },
    ],
    status: "Ativo",
  },
];



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

  const usuarioAtual = usuarios.find((u) => u.id === usuarioLogadoId);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = busca.toLowerCase();

    // filtros de busca dos cenários
    const correspondeBusca =
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.experiencia.toLowerCase().includes(termo);

    const correspondeStatus =
      filtroStatus === "Todos" ||
      usuario.status === filtroStatus;

    return correspondeBusca && correspondeStatus;
  });

 return (
  <>
    <Navbar />
    <Header />

    <main className="px-6 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-base-content">
        Listagem de Usuários
      </h1>

      {/* PESQUISA E FILTRO */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Cargo</th>
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
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="font-medium">{usuario.nome}</td>

                  <td>{usuario.cargo}</td>

                  <td>{usuario.email}</td>

                  <td>{usuario.experiencia}</td>

                  <td>
                    {usuario.valorHora.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td>{usuario.criadoEm}</td>

                  <td>
                    <BadgesProjetos projetos={usuario.projetos} />
                  </td>

                  <td>
                    <BadgeStatus status={usuario.status} />
                  </td>

                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      aria-label={`Editar ${usuario.nome}`}
                      onClick={() => {
                        window.open(
                          `http://localhost:8081/admin/java-the-hutt/console/#/java-the-hutt/users/${usuario.id}/settings`,
                          "_blank"
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-8 text-base-content/70"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
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
  </>
);
}
