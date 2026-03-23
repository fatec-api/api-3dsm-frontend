import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Input from './shared/components/Input'
import Header from './shared/components/Header'
import Home from './pages/Home'
import TelaLogin from './pages/TelaLogin'
import Dropdown from './shared/components/Dropdown'
import CadastroProjeto from './pages/CadastroProjeto'


const router = createBrowserRouter(
 createRoutesFromElements(
   <>
     <Route path="/" element={<Header />}>
       <Route index element={<Home />}/>
       <Route path='/input' element={<Input/>}/>
       <Route path='/dropdown' element={<Dropdown options={['Opção 1', 'Opção 2', 'Opção 3']} />}/>
     </Route>
     <Route path='/telalogin' element={<TelaLogin/>}/>
     <Route path='/cadastroprojeto' element={<CadastroProjeto/>}/>
   </>
 )
)


function App() {


 return (
   <>
     <RouterProvider router={router} />
   </>
 )
}


export default App
