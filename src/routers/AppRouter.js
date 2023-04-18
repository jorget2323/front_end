import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Estados from '../components/Estados'
import Inventario from '../components/Inventario'
import Marcas from '../components/Marcas'
import TipoEquipos from '../components/TipoEquipos'
import Footer from '../components/ui/Footer'
import NavBar from '../components/ui/NavBar'
import NotFound from '../components/ui/NotFound'
import Usuarios from '../components/Usuarios'

export default function AppRouter() {
  return (
    <>
        <NavBar />
        <div className='container'>
            <Routes>
                <Route path='/' element={<TipoEquipos/>} />
                <Route path='/estados' element={<Estados />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/marcas' element={<Marcas/> } />
                <Route path='/inventario' element={<Inventario />} />
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
        <Footer />
    </>
  )
}
