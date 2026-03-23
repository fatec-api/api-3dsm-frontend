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

 const [erro, setErro] = useState("");;
 const [mostrarPopup, setMostrarPopup] = useState(false);
 const [loading, setLoading] = useState(false);


 const validar = () => {
   if (!nome || !email || !senha || !confirmeSenha || !valorHora || !cargo) {
     return "Preencha todos os campos obrigatórios";
   }


   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
     return "E-mail inválido";
   }


   if (!/(?=.*[A-Z])(?=.*\d).{8,}/.test(senha)) {
     return "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.";
   }


   if (senha !== confirmeSenha) {
     return "As senhas não coincidem";
   }


   if (Number(valorHora) <= 0) {
     return "O valor por hora deve ser maior que 0";
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
    nome: nome.trim(),
    email: email.trim(),
    senha,
    valorHora: Number(valorHora),
    cargo,
    nivelExperiencia,
  };

  try {
    setLoading(true);

    const response = await cadastrarUsuario(payload);

    console.log("Resposta do back:", response);

    limpar();
    setMostrarPopup(true);

    setTimeout(() => {
      setMostrarPopup(false);
    }, 3000);

  } catch (error) {
    console.error(error);
    setErro("Erro ao cadastrar usuário");
  } finally {
    setLoading(false);
  }
};

// simução do backend
async function cadastrarUsuario(payload: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock enviado para o back:", payload);
      resolve({ sucesso: true });
    }, 1000);
  });

  // aplicação da integração para quando o backend estiver finalizado
  /*
  const response = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar usuário");
  }

  return await response.json();
  */
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

        <div className="flex flex-col gap-6">

          <Input
            label="Nome"
            placeholder="Exemplo de Nome"
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
            icon={<FiUser size={18} />}
            widthPx={300}
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            icon={<FiMail size={18} />}
            widthPx={300}
          />

           <Dropdown
            label="Cargo"
            value={cargo}
            onChange={(e: any) => setCargo(e.target.value)}
            options={[
            "Profissional",
            "Gestor",
            "Administrativo",
            "Financeiro",
            ]}
            icon={<FiBriefcase size={18} />}
            widthPx={300}
        />
        </div>

        <div className="flex flex-col gap-6">

          <Input
            label="Senha"
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(e: any) => setSenha(e.target.value)}
            icon={<FiLock size={18} />}
            widthPx={300}
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
          />

        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {erro && (
          <p className="text-red-600 text-sm text-center">
            {erro}
          </p>
        )}

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

