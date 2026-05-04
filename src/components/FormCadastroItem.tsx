import { useState, useEffect } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";
import { GoProject } from "react-icons/go";
import { FiFileText, FiClock, FiUser } from "react-icons/fi";
import { useParams } from "react-router-dom";
import instance from "../api/instance";

type Profissional = { id: string; nomeUsuario: string };
type Projeto = { id: number; nomeProjeto: string };
type ItemPayload = {
  descricao: string; titulo: string; dataAtribuicao: string;
  previsaoHoras: number | null; nivelAtividade: string | null;
  usuarioId: string | null; projetoId: number;
};

export default function FormCadastroItem() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [nivelAtividade, setNivelAtividade] = useState("");
  const [previsaoHoras, setPrevisaoHoras] = useState("");
  const [projetoIdEstado, setProjetoId] = useState("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [erro, setErro] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const { projetoId: idDaUrl } = useParams<{ projetoId: string }>();

  useEffect(() => { if (idDaUrl) setProjetoId(idDaUrl); }, [idDaUrl]);

  useEffect(() => {
    async function carregarProjetos() {
      try {
        const res = await instance.get("/gestao/projetos/listar");
        setProjetos(res.data);
      } catch {
        setErro("Não foi possível carregar os projetos.");
      }
    }
    carregarProjetos();
  }, []);

  useEffect(() => {
    async function carregarProfissionaisDoProjeto() {
      if (!projetoIdEstado) { setProfissionais([]); return; }
      try {
        setLoading(true);
        const res = await instance.get(`/gestao/alocacoes/projeto/${projetoIdEstado}`);
        setProfissionais(res.data);
        setUsuarioId("");
      } catch {
        setErro("Erro ao carregar profissionais deste projeto.");
      } finally {
        setLoading(false);
      }
    }
    carregarProfissionaisDoProjeto();
  }, [projetoIdEstado]);

  const validar = (): string => {
    if (!projetoIdEstado) return "Selecione um projeto.";
    if (!titulo.trim()) return "O título é obrigatório.";
    if (!descricao.trim()) return "A descrição é obrigatória.";
    if (previsaoHoras !== "" && Number(previsaoHoras) < 0) return "A previsão de horas não pode ser negativa.";
    return "";
  };

  const limpar = () => {
    setTitulo(""); setDescricao(""); setUsuarioId("");
    setNivelAtividade(""); setPrevisaoHoras(""); setProjetoId(""); setErro("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const erroValidacao = validar();
    if (erroValidacao) { setErro(erroValidacao); return; }

    const payload: ItemPayload = {
      titulo: titulo.trim(), descricao: descricao.trim(),
      dataAtribuicao: new Date().toISOString().split("T")[0],
      previsaoHoras: previsaoHoras !== "" ? Number(previsaoHoras) : null,
      nivelAtividade: nivelAtividade || null,
      usuarioId: usuarioId || null,
      projetoId: Number(projetoIdEstado),
    };
    console.log(payload);

    try {
      setLoading(true);
      await cadastrarItem(payload);
      limpar();
      setMostrarPopup(true);
      setTimeout(() => setMostrarPopup(false), 3000);
    } catch (error: any) {
      const mensagem = error.response?.data?.Mensagem || error.response?.data?.message || "Erro ao cadastrar item.";
      throw { code: error.response?.data?.code ?? "HTTP_ERROR", mensagem };
    } finally {
      setLoading(false);
    }
  };

  async function cadastrarItem(payload: ItemPayload): Promise<void> {
    await instance.post("/gestao/itens/cadastrar", payload);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10"
      >
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
          Cadastro de Atividade
        </h1>

        <Dropdown
          label="Projeto *"
          value={projetoIdEstado}
          onChange={(e) => setProjetoId(e.target.value)}
          options={projetos.map((p) => ({ label: p.nomeProjeto, value: String(p.id) }))}
          icon={<GoProject size={18} />}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div className="flex flex-col gap-8">
            <Input
              label="Título do Item *"
              placeholder="Título do item"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              icon={<FiFileText size={18} />}
              maxLength={300}
            />
            <Input
              label="Descrição do Item *"
              placeholder="Descreva o que precisa ser feito..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              icon={<FiFileText size={18} />}
              maxLength={300}
            />
          </div>

          <div className="flex flex-col gap-8">
            <Dropdown
              label="Atribuir Profissional"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              options={profissionais.map((p) => ({ label: p.nomeUsuario, value: p.id }))}
              icon={<FiUser size={18} />}
              required={false}
            />
            <Dropdown
              label="Papel/Atividade do Profissional"
              value={nivelAtividade}
              onChange={(e) => setNivelAtividade(e.target.value)}
              options={[
                { label: "Análise", value: "Analise" },
                { label: "Desenvolvimento", value: "Desenvolvimento" },
                { label: "Teste", value: "Teste" },
              ]}
              icon={<FiUser size={18} />}
              required={false}
            />
            <Input
              label="Previsão de horas"
              type="number"
              placeholder="0"
              value={previsaoHoras}
              onChange={(e) => setPrevisaoHoras(e.target.value)}
              icon={<FiClock size={18} />}
              min={0}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {erro && (
            <div role="alert" className="alert alert-error alert-soft w-full">
              <span>{erro}</span>
            </div>
          )}
          <Botao type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Botao>
        </div>
      </form>

      {mostrarPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-[9999]">
          Item cadastrado com sucesso!
        </div>
      )}
    </>
  );
}