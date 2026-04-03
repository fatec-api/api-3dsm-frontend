import { useState, useEffect } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";
import { GoProject } from "react-icons/go";
import { FiFileText, FiClock, FiUser } from "react-icons/fi";

type Profissional = {
  id: string;
  nomeUsuario: string;
};

type Projeto = {
  id: number;
  nomeProjeto: string;
};

type ItemPayload = {
  descricao: string;
  dataAtribuicao: string;
  previsaoHoras: number | null;
  nivelAtividade: string | null;
  usuarioId: string | null;
  projetoId: number;
};

export default function FormCadastroItem() {
  const [descricao, setDescricao] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [nivelAtividade, setNivelAtividade] = useState("");
  const [previsaoHoras, setPrevisaoHoras] = useState("");
  const [projetoId, setProjetoId] = useState("");

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const [erro, setErro] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resProfissionais, resProjetos] = await Promise.all([
          fetch("http://localhost:8080/api/usuarios"),
          fetch("http://localhost:8080/listar/projetos"),
        ]);

        if (!resProfissionais.ok || !resProjetos.ok) {
          throw new Error("Erro ao buscar dados iniciais.");
        }

        setProfissionais(await resProfissionais.json());
        setProjetos(await resProjetos.json());
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Não foi possível carregar profissionais ou projetos.");
      }
    }

    carregarDados();
  }, []);

  const validar = (): string => {
    if (!projetoId) return "Selecione um projeto.";
    if (!descricao.trim()) return "A descrição é obrigatória.";
    if (previsaoHoras !== "" && Number(previsaoHoras) < 0)
      return "A previsão de horas não pode ser negativa.";
    return "";
  };

  const limpar = () => {
    setDescricao("");
    setUsuarioId("");
    setNivelAtividade("");
    setPrevisaoHoras("");
    setProjetoId("");
    setErro("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const erroValidacao = validar();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const payload: ItemPayload = {
      descricao: descricao.trim(),
      dataAtribuicao: new Date().toISOString().split("T")[0],
      previsaoHoras: previsaoHoras !== "" ? Number(previsaoHoras) : null,
      nivelAtividade: nivelAtividade || null,
      usuarioId: usuarioId || null,
      projetoId: Number(projetoId),
    };

    try {
      setLoading(true);
      await cadastrarItem(payload);
      limpar();
      setMostrarPopup(true);
      setTimeout(() => setMostrarPopup(false), 3000);
    } catch (error: any) {
      setErro(error?.mensagem || "Erro ao cadastrar o item.");
    } finally {
      setLoading(false);
    }
  };

  async function cadastrarItem(payload: ItemPayload): Promise<void> {
    const response = await fetch("http://localhost:8080/api/itens/cadastro/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const mensagem =
        data?.Mensagem || data?.message || "Erro ao cadastrar item.";
      throw { code: data?.code ?? "HTTP_ERROR", mensagem };
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[560px] flex flex-col gap-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Cadastro de Item
      </h1>

      {/* Projeto vem primeiro pois o código é gerado a partir dele */}
      <Dropdown
        label="Projeto *"
        value={projetoId}
        onChange={(e) => setProjetoId(e.target.value)}
        options={projetos.map((p) => ({
          label: p.nomeProjeto,
          value: String(p.id),
        }))}
        icon={<GoProject size={18} />}
        required
      />

      <Input
        label="Descrição do Item *"
        placeholder="Descreva o que precisa ser feito..."
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        icon={<FiFileText size={18} />}
        maxLength={300}
      />

      <Dropdown
        label="Atribuir Profissional"
        value={usuarioId}
        onChange={(e) => setUsuarioId(e.target.value)}
        options={profissionais.map((p) => ({
          label: p.nomeUsuario,
          value: p.id,
        }))}
        icon={<FiUser size={18} />}
        required={false}
      />

      <Dropdown
        label="Papel/Atividade do Profissional"
        value={nivelAtividade}
        onChange={(e) => setNivelAtividade(e.target.value)}
        options={[
          { label: "Análise", value: "ANALISE" },
          { label: "Desenvolvimento", value: "DESENVOLVIMENTO" },
          { label: "Teste", value: "TESTE" },
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

      {erro && (
        <p className="text-red-600 text-sm text-center">{erro}</p>
      )}

      <div className="flex justify-center">
        <Botao type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Botao>
      </div>

      {mostrarPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-[9999]">
          Item cadastrado com sucesso!
        </div>
      )}
    </form>
  );
}