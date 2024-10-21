import React from 'react'
import { useForm } from 'react-hook-form'
import style from "../../styles/login.module.css"
//importando la funcion para iniciar sesion (correo / password)
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth_user, providerGoogle } from '../../firebase/appConfig'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    //metodo para iniciar sesion
    const loginForm = (data) => {

        signInWithEmailAndPassword(auth_user, data.email, data.password)
            .then((userCredentiales) => {
                //si el usuario existe extraemos solo su informacion (.user)
                const user = userCredentiales.user
                console.log(user);

                //guardando la informacion del usuario en el localstorage
                saveLocalStorage("user_firebase", JSON.stringify(user))
            }).catch((error) => {
                console.error(error.message)
                Swal.fire({
                    title: "Credenciales Invalidas",
                    text: "Revisa tu informacion",
                    icon: "warning"
                });
            })
    }

    //metodo para iniciar sesion con google
    const loginGoogle = async () => {
        //metodo que permite autenticar a travez de un proveedor externo
        try {
            const result = await signInWithPopup(auth_user, providerGoogle);
            console.log(result.user);
            //almacenamos la info del usuario al storage
            saveLocalStorage("user_firebase", JSON.stringify(result.user))
        } catch (error) {
            console.error(error.message)
            Swal.fire({
                title: "Error al autenticarse con Google",
                text: "Revisa tu informacion",
                icon: "warning"
            });
        }
    }

    //metodo que nos va guardar el usuario en el localstorage
    const saveLocalStorage = (key, data) => {
        //localStorage (setItem, getItem)
        localStorage.setItem(key, data);
    }

    return (
        <div className={style.background} >
            <section className='w-10/12 h-4/6 md:h-3/6 lg:w-5/12 lg:h-5/6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg flex flex-col items-center justify-center'>
                <h1 className='text-white text-4xl font-bold mb-3'>Iniciar sesion</h1>

                <form className = "w-9/12"onSubmit={handleSubmit(loginForm)}>
                    <div className='flex flex-col'>
                        <label className='text-white' htmlFor="">Correo Electronico</label>
                        <input className='bg-transparent border-b-2 border-white  focus:outline-none focus:border-b-2 focus:border-b-orange-500 ' type="email" {...register('email', { required: true })} />
                        {errors.email && <span style={{ color: "red" }}>Campo Obligatorio</span>}
                    </div>

                    <div className='flex flex-col mt-3'>
                        <label className='text-white' htmlFor="">Contraseña</label>
                        <input className='bg-transparent border-b-2 border-white  focus:outline-none focus:border-b-2 focus:border-b-orange-500' type="password" {...register('password', { required: true })} />
                        {errors.password && <span style={{ color: "red" }}>Campo Obligatorio</span>}
                    </div>
                    <button className='p-3 text-white bg-black w-full my-5 hover:bg-slate-900' type='submit'>Iniciar Sesion</button>
                </form>
                <div>
                    <button  className=' bg-slate-300 px-3 py-2.5 mb-2 rounded-xl' onClick={loginGoogle}>
                     <i className="fa-brands fa-google"></i>{" "}
                    Ingresar con Google</button>
                </div>

                <section>
                    <p>Si no tienes cuenta <Link to="/registrar">Registrate <span className='font-bold'> Aquí </span></Link></p>
                </section>

            </section>

        </div>
    )
}
