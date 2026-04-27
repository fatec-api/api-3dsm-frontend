import React, { useContext } from 'react';
import { KeycloakContext } from '../contexts/KeycloakProvider';
import axios from 'axios';

const Painel = () => {
  const { autenticado, login, logout, getUsuario, getToken, temPermissao } = useContext(KeycloakContext);

  const testarBackend = async () => {
    try {
      const resposta = await axios.get('http://localhost:8082/api/gestao/projetos', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      alert('Conexão com o Java funcionou!');
    } catch (e) {
      alert('Erro: ' + e.response.status);
    }
  };

  if (!autenticado) {
    return <button onClick={login}>Entrar no Sistema Hutt</button>;
  }

  return (
    <div>
      <h2>Bem-vindo, {getUsuario()?.nome}</h2>
      <button onClick={testarBackend}>Testar API de Projetos</button>

      {temPermissao('GESTOR') && (
        <button>Botão Secreto de Gestor</button>
      )}

      <button onClick={logout}>Sair</button>
    </div>
  );
};
export default Painel;