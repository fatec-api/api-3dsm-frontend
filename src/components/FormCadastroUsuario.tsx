import { useState } from "react";
import Input from "../shared/components/Input";
import Dropdown from "../shared/components/Dropdown";
import Botao from "../shared/components/Botao";

import {
  FiUser,
  FiMail,
  FiLock,
  FiDollarSign,
  FiEye,
  FiEyeOff,
  FiBriefcase,
} from "react-icons/fi";


export default function FormularioCadastro() {
 const [mostrarSenha, setMostrarSenha] = useState(false);
 const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

 const [nome, setNome] = useState("");
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [confirmeSenha, setConfirmeSenha] = useState("");
 const [valorHora, setValorHora] = useState("");
 const [cargo, setCargo] = useState("");
 const [nivelExperiencia, setNivelExperiencia] = useState("");

 const [erro, setErro] = useState("");
 const [mostrarPopup, setMostrarPopup] = useState(false);
 const [loading, setLoading] = useState(false);


  const validar = () => {
    if (!nome || !email || !senha || !confirmeSenha || !valorHora || !cargo) {
      return "Preencha todos os campos obrigatórios: nome, e-mail, senha, confirme senha, valor/hora e cargo";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "E-mail informado é inválido";
    }

    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(senha)) {
      return "A senha deve ter no mínimo 8 caracteres, incluindo ao menos 1 letra maiúscula, 1 minúscula, 1 número e 1 caracter especial.";
    }

    if (senha !== confirmeSenha) {
      return "As senhas estão diferentes";
    }

    if (Number(valorHora) <= 0) {
      return "O valor/hora deve ser maior que zero.";
    }

    return "";
  };

  const limpar = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmeSenha("");
    setValorHora("");
    setCargo("");
    setNivelExperiencia("");
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
      nomeUsuario: nome.trim(),
      email: email.trim(),
      senha,
      valorHora: Number(valorHora),
      cargo,
      nivelExperiencia,
    };

    try {
      setLoading(true);

      const data = await cadastrarUsuario(payload);

      if (!data) {
        throw { code: "NO_DATA", message: "Resposta inválida do servidor" };
      }

      if (data.code && data.code !== "SUCCESS") {
        throw data;
      }

      if (data.status && !["success", "ok"].includes(String(data.status).toLowerCase())) {
        throw {
          code: data.code || "UNKNOWN",
          message: data.message || data.error || "Erro ao cadastrar usuário",
        };
      }

      limpar();
      setMostrarPopup(true);
      setErro("");

      setTimeout(() => {
        setMostrarPopup(false);
      }, 3000);
    } catch (err: any) {
      const backendMessage = err?.message || err?.error || "Erro ao cadastrar usuário";
      switch (err?.code) {
        case "EMAIL_ALREADY_REGISTERED":
        case "EMAIL_EXISTS":
          setErro("E-mail informado já está em uso");
          break;
        case "INVALID_DATA":
        case "VALIDATION_ERROR":
          setErro(backendMessage || "Dados inválidos");
          break;
        default:
          setErro(backendMessage);
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  async function cadastrarUsuario(payload: any) {
    const response = await fetch("http://localhost:3000/cadastrar/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = data?.message || data?.error || "Erro ao cadastrar usuário";
      const code = data?.code || "HTTP_ERROR";
      throw { code, message };
    }

    return data;
  }

 return (
  <>
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-[700px] flex flex-col gap-10"
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Cadastro de Usuário
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

        <div className="flex flex-col gap-8">

          <Input
            label="Nome"
            placeholder="Exemplo de Nome"
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
            icon={<FiUser size={18} />}
            widthPx={300}
            maxLength={100}
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            icon={<FiMail size={18} />}
            widthPx={300}
            maxLength={100}
          />

           <Dropdown
            label="Cargo"
            value={cargo}
            onChange={(e: any) => setCargo(e.target.value)}
            options={[
            "Profissional",
            "Gestor",
            "Administrativo",
            ]}
            icon={<FiBriefcase size={18} />}
            widthPx={300}
        />
        </div>

        <div className="flex flex-col gap-8">

          <Input
            label="Senha"
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(e: any) => setSenha(e.target.value)}
            icon={<FiLock size={18} />}
            widthPx={300}
            maxLength={100}
            rightElement={
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="cursor-pointer flex items-center justify-center translate-x-[-15px]"
              >
                {mostrarSenha ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            }
          />

          <Input
            label="Confirme Senha"
            type={mostrarConfirmar ? "text" : "password"}
            value={confirmeSenha}
            onChange={(e: any) => setConfirmeSenha(e.target.value)}
            icon={<FiLock size={18} />}
            widthPx={300}
            maxLength={100}
            rightElement={
              <button
                type="button"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="cursor-pointer flex items-center justify-center translate-x-[-15px]"
              >
                {mostrarConfirmar ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            }
          />

          <Input
            label="Valor por Hora"
            type="number"
            placeholder="25.50"
            value={valorHora}
            onChange={(e: any) => setValorHora(e.target.value)}
            icon={<FiDollarSign size={18} />}
            widthPx={300}
            maxLength={100}
          />

        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {erro && (
          <p className="text-red-600 text-sm text-center">
            {erro}
          </p>
        )}

        <Dropdown
          label="Nível de experiência"
          value={nivelExperiencia}
          onChange={(e: any) => setNivelExperiencia(e.target.value)}
          options={["", "Júnior", "Pleno", "Sênior"]}
          widthPx={300}
        />

        <Botao type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Botao>

        {mostrarPopup && (
          <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-[9999]">
             Usuário cadastrado com sucesso!
          </div>
        )}
      </div>
    </form>
  </>
);
}

