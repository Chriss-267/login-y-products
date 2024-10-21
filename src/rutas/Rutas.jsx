import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/session/Register'
import ListProducts from '../pages/ListProducts'
import RegisterProduct from '../pages/RegisterProduct'
import EditForm from '../pages/EditForm'
/**
 * 
 * 3 rutas
 * 1 ruta para el home
 * login, registro
 */
export default function Rutas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/registrar' element={<Register />}/>
                    <Route path='/productos' element={<ListProducts />}/>
                    <Route path='/registro' element={<RegisterProduct />}/>
                    <Route path='/editar/:id' element={<EditForm />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
