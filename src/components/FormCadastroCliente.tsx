import { useState } from "react";
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

  const handleCadastro = (e) => {
    e.preventDefault();

    const dados = {
      nomeEmpresa,
      email,
      cnpj,
    };

    console.log(dados);

    setSucesso(true);
    setAlerta("Cliente cadastrado com sucesso!");
  };

  const handleLimpar = () => {
    setNomeEmpresa("");
    setEmail("");
    setCnpj("");
    setAlerta("");
    setSucesso(false);
  };

  return (
    <>
      <form
        onSubmit={handleCadastro}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 w-full max-w-[400px] flex flex-col gap-10"
      >
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
          Cadastro de Cliente
        </h1>

        <div className="flex flex-col items-start  gap-x-8 gap-y-8">
          <div className="flex flex-col place-self-start gap-1 md:col-span-2">
            <label className="ms-1 font-medium text-gray-700 dark:text-gray-300">
              Nome da Empresa
            </label>

            <Input
              type="text"
              placeholder="Ex: Empresa XYZ"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
              icon={<MdBusiness size={20} />}
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
              onChange={(e) => setCnpj(e.target.value)}
              icon={<FaRegIdCard size={18} />}
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {alerta && (
            <div
              role="alert"
              className={`alert alert-soft w-full ${
                sucesso ? "alert-success" : "alert-error"
              }`}
            >
              <span>{alerta}</span>
            </div>
          )}

          <div className="flex flex-col gap-4 w-full justify-center">            
            <Botao type="submit">
              Cadastrar
            </Botao>
              <Botao 
              type="button" 
              onClick={handleLimpar}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
            >
              Cancelar
            </Botao>
          </div>
        </div>
      </form>
    </>
  );
}