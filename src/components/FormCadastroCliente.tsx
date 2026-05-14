import { useEffect, useState } from "react";
import axios from "axios";
import { MdBusiness } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegIdCard } from "react-icons/fa";

import Input from "../shared/components/Input";
import Botao from "../shared/components/Botao";

type Cliente = {
  id: number;
  nomeEmpresa: string;
  email: string;
  cnpj: string;
  ativo: boolean;
};

type Props = {
  cliente?: Cliente | null;
  onClose?: () => void;
  onSuccess?: () => void;
};

export default function FormCadastroCliente({
  cliente,
  onClose,
  onSuccess,
}: Props) {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [alerta, setAlerta] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const modoEdicao = !!cliente;

  useEffect(() => {
    if (cliente) {
      const cnpjFormatado = formatarCNPJ(cliente.cnpj);

      setNomeEmpresa(cliente.nomeEmpresa);
      setEmail(cliente.email);
      setCnpj(cnpjFormatado);
      setAtivo(cliente.ativo);
    } else {
      setNomeEmpresa("");
      setEmail("");
      setCnpj("");
      setAtivo(true);
    }
  }, [cliente]);

  const validarCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/\D/g, "");

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;

    let numeros = cnpj.substring(0, tamanho);

    const digitos = cnpj.substring(tamanho);

    let soma = 0;

    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;

      if (pos < 2) pos = 9;
    }

    let resultado =
      soma % 11 < 2
        ? 0
        : 11 - (soma % 11);

    if (
      resultado !== Number(digitos.charAt(0))
    ) {
      return false;
    }

    tamanho += 1;

    numeros = cnpj.substring(0, tamanho);

    soma = 0;

    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;

      if (pos < 2) pos = 9;
    }

    resultado =
      soma % 11 < 2
        ? 0
        : 11 - (soma % 11);

    return (
      resultado === Number(digitos.charAt(1))
    );
  };

  const formatarCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(
        /^(\d{2})\.(\d{3})(\d)/,
        "$1.$2.$3"
      )
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  const handleLimpar = () => {
    setNomeEmpresa("");
    setEmail("");
    setCnpj("");
    setAtivo(true);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setCarregando(true);

    setAlerta("");

    const cnpjLimpo = cnpj.replace(/\D/g, "");

    if (!validarCNPJ(cnpjLimpo)) {
      setSucesso(false);

      setAlerta("CNPJ inválido.");

      setCarregando(false);

      return;
    }

    const dados = {
      razaoSocial: nomeEmpresa,
      email,
      cnpj: cnpjLimpo,
      ativo,
    };

    try {
      if (modoEdicao && cliente) {
        await axios.put(
          `http://localhost:8080/gestao/clientes/${cliente.id}`,
          dados
        );

        setAlerta(
          "Cliente atualizado com sucesso!"
        );
      } else {
        await axios.post(
          "http://localhost:8080/gestao/clientes",
          dados
        );

        setAlerta(
          "Cliente cadastrado com sucesso!"
        );

        handleLimpar();
      }

      setSucesso(true);

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1000);

    } catch (error: any) {
      setSucesso(false);

      const mensagem =
        error.response?.data?.message ||
        "Erro ao conectar com o servidor.";

      setAlerta(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-[550px] flex flex-col gap-8"
    >
      <h1 className="text-2xl font-bold text-center">
        {modoEdicao
          ? "Editar Cliente"
          : "Cadastro de Cliente"}
      </h1>

      <div className="flex flex-col gap-6 items-start w-full">

        <div className="flex flex-col gap-2 w-full text-left">
          <label className="font-medium">
            Nome da Empresa
          </label>

          <Input
            type="text"
            placeholder="Ex: Empresa XYZ LTDA"
            value={nomeEmpresa}
            onChange={(e) =>
              setNomeEmpresa(e.target.value)
            }
            icon={<MdBusiness size={20} />}
            disabled={carregando}
            required
            className="w-full text-left"
          />
        </div>

        <div className="flex flex-col gap-2 w-full text-left">
          <label className="font-medium">
            E-mail
          </label>

          <Input
            type="email"
            placeholder="empresa@email.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            icon={<HiOutlineMail size={20} />}
            disabled={carregando}
            required
            className="w-full text-left"
          />
        </div>

        <div className="flex flex-col gap-2 w-full text-left">
          <label className="font-medium">
            CNPJ
          </label>

          <Input
            type="text"
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) =>
              setCnpj(
                formatarCNPJ(e.target.value)
              )
            }
            icon={<FaRegIdCard size={18} />}
            disabled={carregando}
            required
            className="w-full text-left"
          />
        </div>

        {modoEdicao && (
          <div className="w-full flex items-center justify-between rounded-xl border border-base-300 px-4 py-4 bg-base-200">

            <div className="flex flex-col text-left">
              <span className="font-semibold">
                Status do Cliente
              </span>

              <span className="text-sm opacity-70">
                Altere entre ativo e inativo
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  ativo
                    ? "text-success"
                    : "text-content"
                }`}
              >
                {ativo ? "Ativo" : "Inativo"}
              </span>

              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={ativo}
                onChange={() =>
                  setAtivo((prev) => !prev)
                }
                disabled={carregando}
              />
            </div>
          </div>
        )}
      </div>

      {alerta && (
        <div
          role="alert"
          className={`alert ${
            sucesso
              ? "alert-success"
              : "alert-error"
          }`}
        >
          <span>{alerta}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Botao
          type="submit"
          disabled={carregando}
          className="flex-1"
        >
          {carregando
            ? "Salvando..."
            : modoEdicao
            ? "Salvar Alterações"
            : "Cadastrar"}
        </Botao>

        <Botao
          type="button"
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          className="flex-1 bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Cancelar
        </Botao>
      </div>
    </form>
  );
}