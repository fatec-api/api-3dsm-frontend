import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../shared/components/Input";
import Botao from "../shared/components/Botao";
import { useNavigate } from "react-router-dom";
import logo from "../assets/gsw-logo-branco.png";


export default function TelaLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setErro("E-mail inválido.");
      return;
    }

    const senhaValida =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!senhaValida.test(senha)) {
      setErro(
        "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."
      );
      return;
    }

    try {
      // aplicação fetch para quando o backend estiver pronto
      /*
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
  
      if (!response.ok) {
        throw new Error();
      }
  
      const data = await response.json();
      console.log(data);
      */

      // dado mockado para simular o login
      if (email === "admin@gsw.com" && senha === "Admin@123") {
        alert("Login realizado com sucesso!");

        setTimeout(() => {
          setEmail("");
          setSenha("");
          navigate("/");
        }, 500);
      } else {
        throw new Error();
      }

    } catch {
      setErro("Email ou senha inválidos.");
    }
  };


  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-50">

      <div className="w-1/2 flex flex-col justify-center items-start pl-32 relative">

        <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Seja Bem vindo!
        </h1>
        <p className="text-gray-500 mt-2">
          Faça login para acessar sua conta
        </p>
      </div>


        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-96 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div>
            <label className="block mb-2 font-medium">E-mail</label>

            <Input
              type="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              icon={<FiMail size={18} />}
            />
          </div>
          <div>

            <label className="block mb-2 font-medium">Senha</label>

            <Input
              type={mostrarSenha ? "text" : "password"}
              placeholder="************"
              value={senha}
              onChange={(e: any) => setSenha(e.target.value)}
              icon={<FiLock size={18} />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? (
                    <FiEye size={18} />
                  ) : (
                    <FiEyeOff size={18} />
                  )}
                </button>
              }
            />
          </div>

          {erro && (
            <p className="text-red-600 text-sm">
              {erro}
            </p>
          )}

          <Botao type="submit" variant="primary" >
            Login
          </Botao>

        </form>
      </div>

      <div className="hidden lg:flex w-1/2 items-end justify-center bg-gray-50">
        <div className="flex items-center justify-center w-[60%] max-w-[420px] aspect-[4/7] bg-[#173052] rounded-t-full -translate-x-6">
          <img
            src={logo}
            alt="Logo"
            className="w-2/3 max-w-[260px]"
          />
        </div>

      </div>
   </div>
  );
}
