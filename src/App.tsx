import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./pages/TelaCadastroUsuario";


function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<CadastroUsuario />} />
     </Routes>
   </BrowserRouter>
 );
}


export default App;
