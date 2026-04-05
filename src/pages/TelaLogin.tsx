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
    <div className="flex h-screen bg-[#FFFFFF]">


      <div className="w-1/2 flex flex-col justify-center items-start pl-32">


        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Seja Bem vindo!
        </h1>


        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-80">
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


          <Botao type="submit">
            Login
          </Botao>


        </form>


      </div>


      <div className="w-1/2 flex items-center justify-center relative bg-[#FFFFF] overflow-hidden">
        <div className="absolute right-[350px] w-[400px] h-[700px] bg-[#1F3A5F] rounded-t-[250px] flex items-center justify-center">
          <img
            src={logo}
            alt="logo gsw"
            className="w-72 z-10"
          />
        </div>
      </div>
    </div>
  );
}
