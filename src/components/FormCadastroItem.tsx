import { useState, useEffect } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";
import { GoProject } from "react-icons/go";
import { FiFileText, FiClock, FiUser } from "react-icons/fi";

export default function FormCadastroItem() {
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [nivelAtividade, setNivelAtividade] = useState("");
  const [previsaoHoras, setPrevisaoHoras] = useState("");
  const [projetoId, setProjetoId] = useState("");

  const [profissionais, setProfissionais] = useState<{ id: string; nomeUsuario: string }[]>([]);
  const [projetos, setProjetos] = useState<{ id: number; nomeProjeto: string }[]>([]);

  const [erro, setErro] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resProfissionais, resProjetos] = await Promise.all([
          fetch("http://localhost:8080/api/usuarios"),
          fetch("http://localhost:8080/api/projetos"),
        ]);
        const profissionaisData = await resProfissionais.json();
        const projetosData = await resProjetos.json();
        setProfissionais(profissionaisData);
        setProjetos(projetosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    carregarDados();
  }, []);

  const validar = () => {
    if (!codigo || !descricao || !projetoId) {
      return "Preencha todos os campos obrigatórios: código, descrição e projeto.";
    }

    if (!/^[A-Za-z]{3}\d{4}$/.test(codigo)) {
      return "Código fora do padrão: deve conter 3 letras seguidas de 4 números (ex: GSW1234).";
    }

    if (previsaoHoras && Number(previsaoHoras) < 1) {
      return "A previsão de horas deve ser de pelo menos 1 hora.";
    }

    return "";
  };

  const limpar = () => {
    setCodigo("");
    setDescricao("");
    setUsuarioId("");
    setNivelAtividade("");
    setPrevisaoHoras("");
    setProjetoId("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErro("");

    const erroValidacao = validar();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const payload = {
      codigo: codigo.toUpperCase(),
      descricao: descricao.trim(),
      dataAtribuicao: new Date().toISOString().split("T")[0],
      previsaoHoras: previsaoHoras ? Number(previsaoHoras) : null,
      nivelAtividade: nivelAtividade || null,
      usuarioId: usuarioId || null,
      projetoId: Number(projetoId),
    };

    try {
      setLoading(true);
      await cadastrarItem(payload);
      limpar();
      setMostrarPopup(true);
      setErro("");
      setTimeout(() => setMostrarPopup(false), 3000);
    } catch (error: any) {
      setErro(error?.mensagem || "Erro ao cadastrar o item.");
    } finally {
      setLoading(false);
    }
  };

  async function cadastrarItem(payload: any) {
    const response = await fetch("http://localhost:8080/api/itens/cadastro/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const mensagem = data?.Mensagem || data?.message || "Erro ao cadastrar item";
      const code = data?.code || "HTTP_ERROR";
      throw { code, mensagem };
    }

    return data;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[560px] flex flex-col gap-8"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Cadastro de Item
        </h1>

        <Input
          label="Código"
          placeholder="GSW1234"
          value={codigo}
          onChange={(e: any) => setCodigo(e.target.value.toUpperCase())}
          icon={<GoProject size={18} />}
          maxLength={7}
        />

        <Input
          label="Descrição do Item"
          placeholder="Exemplo de descrição do item, o que é para fazer..."
          value={descricao}
          onChange={(e: any) => setDescricao(e.target.value)}
          icon={<FiFileText size={18} />}
          maxLength={300}
        />

        <Dropdown
          label="Atribuir Profissional"
          value={usuarioId}
          onChange={(e: any) => setUsuarioId(e.target.value)}
          options={profissionais.map((p) => ({ label: p.nomeUsuario, value: p.id }))}
          icon={<FiUser size={18} />}
        />

        <Dropdown
          label="Papel/Atividade do Profissional"
          value={nivelAtividade}
          onChange={(e: any) => setNivelAtividade(e.target.value)}
          options={[
            { label: "Análise", value: "ANALISE" },
            { label: "Desenvolvimento", value: "DESENVOLVIMENTO" },
            { label: "Teste", value: "TESTE" },
          ]}
          icon={<FiUser size={18} />}
        />

        <Input
          label="Previsão de horas"
          type="number"
          placeholder="5"
          value={previsaoHoras}
          onChange={(e: any) => setPrevisaoHoras(e.target.value)}
          icon={<FiClock size={18} />}
        />

        <Dropdown
          label="Projeto"
          value={projetoId}
          onChange={(e: any) => setProjetoId(e.target.value)}
          options={projetos.map((p) => ({ label: p.nomeProjeto, value: String(p.id) }))}
          icon={<GoProject size={18} />}
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
    </>
  );
}