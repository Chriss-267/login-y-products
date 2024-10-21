import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth_user } from '../firebase/appConfig'
import Login from './session/Login'
import Header from './Header'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'

export default function Home() {
    //estado donde vamos a verificar si el usuario esta autenticado
    const [user, setUser] = useState(null)

    //accediendo al usuario del localstorage
    const userStorage = JSON.parse(localStorage.getItem("user_firebase")) //{}

    //verificamos si el usuario esta en firebase
    //userFirebase = devuelve un objeto si la persona existe
    onAuthStateChanged(auth_user, (userFirebase) => {
        if (userFirebase) { //objeto
            //si el usuario existe
            console.log(userFirebase);
            setUser(userFirebase)
        } else {
            setUser(null)
        }
    })

    //metodo para cerrar sesion
    const logout = () => {
        signOut(auth_user).then(() => {
            alert("La sesion se ha cerrado");
        }).catch((error) => {
            console.error("Error al cerrar sesion", error)
        })
    }

    return (
        <div>
            {
                //validamos si el usuario existe le damos la bienvenida sino tendra que loguearse
                user ?
                    <>

                        <Header />
                        <div className='h-[80vh]'>
                            <section className='w-10/12 md:w8/12 mx-auto text-center mt-14 flex justify-center flex-col items-center space-y-2'>
                                <h1 className='text-2xl font-bold'>Bienvenido a la aplicacion!</h1>
                                <p>Has iniciado sesion</p>
                                <p>{userStorage.displayName ? userStorage.displayName : "Usuaro desconocido"}</p>
                                <img src={userStorage.photoURL ? userStorage.photoURL : "https://res.cloudinary.com/dmddi5ncx/image/upload/v1729199012/practicas/usuario_tpluzt.png"} alt="user" className='w-40 ' />
                                <p>Correo: {userStorage.email}</p>
                                <button className= "w-full md:w-4/12 bg-black text-white p-2.5 rounded-xl mt-3"onClick={logout}>Cerrar Sesion</button>
                            </section>

                        </div>




                    </>
                    : <Login />
            }

        </div>
    )
}
