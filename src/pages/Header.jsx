import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='bg-black text-white '>
            <nav>
                <ul className='w-10/12 md:w-6/12 mx-auto flex justify-around items-center h-[10vh] '>
                    <li className='hover:text-gray-200'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='hover:text-gray-200'>
                        <Link to="/productos">Productos</Link>
                    </li>
                    <li className='hover:text-gray-200'>
                        <Link to="/registro">Registro</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header