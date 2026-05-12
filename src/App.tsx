import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Input from './shared/components/Input'
import Header from './shared/components/Header'
import Home from './pages/TelaHome'
import TelaLogin from './pages/TelaLogin'
import Dropdown from './shared/components/Dropdown'
import CadastroUsuario from "./pages/TelaCadastroUsuario"
import CadastroProjeto from './pages/TelaCadastroProjeto'
import ListaProjetos from './pages/TelaListaProjetos'
import ApontamentoHoras from './pages/TelaApontamentoHoras'
import DevAllocationTest from './pages/TelaDevAllocationTest';
import DescricaoProjeto from './pages/TelaDescricaoProjeto'
import TelaFuncionarios from './pages/TelaFuncionarios'
import CadastroItem from './pages/TelaCadastroItem'
import TelaLogProfissional from './pages/TelaLogProfissional'
import Historico from './pages/TelaHistorico'
import ListaApontamentosGestor from './pages/TelaListaApontamentosGestor'
import TelaTeste from './pages/TelaTeste'
import TelaCadastroCliente from './pages/TelaCadastroCliente'

import PrivateRoute from './routes/PrivateRoutes'
import ListagemUsuarios from './pages/TelaVisualizarProfissionais'

const router = createBrowserRouter(
 createRoutesFromElements(
   <>
    <Route element={<PrivateRoute/>}>
      <Route path="/" element={<ListaProjetos />}>
      <Route path='/telafuncionarios' element={<TelaFuncionarios/>}/></Route>
      <Route path='/cadastro-usuario' element={<CadastroUsuario/>}/>
      <Route path='/cadastro-projeto' element={<CadastroProjeto/>}/>
      <Route path='/lista-projetos' element={<ListaProjetos/>}/>
      <Route path='/apontamento-horas' element={<ApontamentoHoras/>}/>
      <Route path='/teste-alocacao' element={<DevAllocationTest />}/>
      <Route path="/descricao-projeto/:id" element={<DescricaoProjeto />} />
      <Route path='/cadastro-item' element={<CadastroItem />} />
      <Route path='/log-profissional/:id' element={<TelaLogProfissional/>}/>
      <Route path='/tela-historico' element={<Historico/>}/>
      <Route path='/apontamentos-gestor' element={<ListaApontamentosGestor/>}/>
      <Route path='/teste-k' element={<TelaTeste />}/>
      <Route path='/cadastro-cliente' element={<TelaCadastroCliente />}/>
      <Route path='/visualizar-profissionais' element={<ListagemUsuarios />} />
    </Route>
  </>
 )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
