import { useState } from "react";
import axios from "axios"; 
import { MdBusiness } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegIdCard } from "react-icons/fa";

import Input from "../shared/components/Input";
import Botao from "../shared/components/Botao";

export default function CadastroCliente() {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [alerta, setAlerta] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const formatarCNPJ = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setAlerta("");

    const cnpjLimpo = cnpj.replace(/\D/g, "");
    
    const dados = { 
      razaoSocial: nomeEmpresa, 
      email: email, 
      cnpj: cnpjLimpo 
    };

    try {
      const response = await axios.post("http://localhost:8080/gestao/clientes", dados);

      if (response.status === 201 || response.status === 200) {
        setSucesso(true);
        setAlerta("Cliente cadastrado com sucesso!");
        handleLimpar(); 
      }
    } catch (error) {
      setSucesso(false);
      const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor.";
      setAlerta(`Falha no cadastro: ${mensagem}`);
    } finally {
      setCarregando(false);
    }
  };

  const handleLimpar = () => {
    setNomeEmpresa("");
    setEmail("");
    setCnpj("");
  };

  return (
    <form
      onSubmit={handleCadastro}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 w-full max-w-[400px] flex flex-col gap-10"
    >
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Cadastro de Cliente
      </h1>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <label className="ms-1 font-medium text-gray-700 dark:text-gray-300">
            Nome da Empresa (Razão Social)
          </label>
          <Input
            type="text"
            placeholder="Ex: Empresa XYZ"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
            icon={<MdBusiness size={20} />}
            disabled={carregando}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="ms-1 font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <Input
            type="email"
            placeholder="empresa@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<HiOutlineMail size={20} />}
            disabled={carregando}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="ms-1 font-medium text-gray-700 dark:text-gray-300">
            CNPJ
          </label>
          <Input
            type="text"
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
            icon={<FaRegIdCard size={18} />}
            disabled={carregando}
            required
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {alerta && (
          <div role="alert" className={`alert alert-soft w-full ${sucesso ? "alert-success" : "alert-error"}`}>
            <span>{alerta}</span>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          <Botao type="submit" disabled={carregando}>
            {carregando ? "Enviando..." : "Cadastrar"}
          </Botao>
          <Botao 
            type="button" 
            onClick={() => { handleLimpar(); setAlerta(""); }} 
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            Cancelar
          </Botao>
        </div>
      </div>
    </form>
  );
}