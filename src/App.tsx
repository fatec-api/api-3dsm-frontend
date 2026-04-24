import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Input from './shared/components/Input'
import Header from './shared/components/Header'
import Home from './pages/Home'
import TelaLogin from './pages/TelaLogin'
import Dropdown from './shared/components/Dropdown'
import CadastroUsuario from "./pages/TelaCadastroUsuario"
import CadastroProjeto from './pages/CadastroProjeto'
import ListaProjetos from './pages/ListaProjetos'
import ApontamentoHoras from './pages/TelaApontamentoHoras'
import DevAllocationTest from './pages/DevAllocationTest';
import DescricaoProjeto from './pages/DescricaoProjeto'
import TelaFuncionarios from './pages/TelaFuncionarios'
import CadastroItem from './pages/CadastroItem'
import TelaLogProfissional from './pages/TelaLogProfissional'
import ListaApontamentosGestor from './pages/ListaApontamentosGestor'


const router = createBrowserRouter(
 createRoutesFromElements(
   <>
     <Route path="/" element={<Header />}>
       <Route index element={<Home />}/>
       {/* <Route path='input' element={<Input/>}/>
       <Route path='dropdown' element={<Dropdown options={['Opção 1', 'Opção 2', 'Opção 3']} />}/> */}
       <Route path='login' element={<TelaLogin/>}/>
       <Route path='telafuncionarios' element={<TelaFuncionarios/>}/>
     </Route>
     <Route path='/telalogin' element={<TelaLogin/>}/>
     <Route path='/cadastro-usuario' element={<CadastroUsuario/>}/>
     <Route path='/cadastroprojeto' element={<CadastroProjeto/>}/>
     <Route path='/listaprojetos' element={<ListaProjetos/>}/>
     <Route path='/apontamentohoras' element={<ApontamentoHoras/>}/>
     <Route path='/teste-alocacao' element={<DevAllocationTest />}/>
     <Route path='/descricao-projeto' element={<DescricaoProjeto />}/>
     <Route path='/cadastro-item' element={<CadastroItem />} />
     <Route path='/logprofissional/:id' element={<TelaLogProfissional/>}/>
     <Route path='/apontamentos-gestor' element={<ListaApontamentosGestor/>}/>
   </>
 )
)

function App() {
  return <RouterProvider router={router} />
}

export default App