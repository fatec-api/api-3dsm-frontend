import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Input from './shared/components/Input'
import Header from './shared/components/Header'
import Home from './pages/Home'
import TelaLogin from './pages/TelaLogin'


const router = createBrowserRouter(
 createRoutesFromElements(
   <>
     <Route path="/" element={<Header />}>
       <Route index element={<Home />}/>
       <Route path='/login' element={<Input/>}/>
     </Route>
     <Route path='/telalogin' element={<TelaLogin/>}/>
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
