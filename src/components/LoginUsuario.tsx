import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

type LoginDados = {
  email: string;
  senha: string;
};

export default function LoginUsuario() {

  const [dados, setDados] = useState<LoginDados>({
    email: "",
    senha: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (!dados.email || !dados.senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setSucesso("Login realizado com sucesso!");
      setDados({ email: "", senha: "" });

    } catch {
      setErro("Email ou senha inválidos.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">

      <div className="w-80">

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div>
            <label className="block mb-2 font-medium">
              E-mail
            </label>

            <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 h-12 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-200">

              <FiMail className="mr-3 text-gray-600" size={18} />

              <input
                type="email"
                name="email"
                placeholder="exemplo@gmail.com"
                value={dados.email}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent placeholder-gray-400"
              />

            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Senha
            </label>

            <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 h-12 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-200">

              <FiLock className="mr-3 text-gray-600" size={18} />

              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="************"
                value={dados.senha}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="ml-2"
              >
                {mostrarSenha ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>

            </div>
          </div>

          {erro && (
            <p className="text-red-600 text-sm">
              {erro}
            </p>
          )}

          {sucesso && (
            <p className="text-green-600 text-sm">
              {sucesso}
            </p>
          )}

          <button
            type="submit"
            className="border-2 border-black rounded-xl h-10 mt-2 bg-white hover:bg-gray-100"
          >
            Logar
          </button>

        </form>

      </div>

    </div>
  );
}
