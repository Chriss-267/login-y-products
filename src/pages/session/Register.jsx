import React from 'react'
import style from "../../styles/login.module.css"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth_user} from '../../firebase/appConfig';
import { useNavigate } from 'react-router-dom';

//creando un esquema (reglas) para validar el correo y password
const schema = yup.object().shape({
    //asignamos las reglas que se van a validar
    email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ejemplo: usuario@dominio.com"),
    password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres"),
    //validamos si las contrasenas son igual con la funcion oneOf()
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no son iguales")
})

export default function Register() {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    //constante para la navegacion
    const navigate = useNavigate()

    //creando un usuario para firebase
    const registerForm = (data) => {
        console.log(data);
        
        createUserWithEmailAndPassword(auth_user, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            //redigirlo a la pagina principal
            navigate('/')
        }).catch((error) => {
            console.log("Error al registrar el usuario", error);
        })
    }

    return (
        <div className={style.background}>
            <section className='w-10/12 h-4/6 md:h-3/6 lg:w-5/12 lg:h-5/6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg flex flex-col items-center justify-center'>
            <h1 className='text-white text-4xl font-bold mb-3 text-center'>Registro de Usuario</h1>
            <form className = "w-9/12" onSubmit={handleSubmit(registerForm)}>
                <div className='flex flex-col'>
                    <label className='text-white' htmlFor="">Correo Electronico</label>
                    <input className='bg-transparent border-b-2 border-white  focus:outline-none focus:border-b-2 focus:border-b-orange-500 ' type="email"{...register('email', {required: true})}/>
                    <span style={{color: "red"}}>
                        {errors.email && errors.email.message}
                    </span>
                </div>

                <div className='flex flex-col'>
                    <label className='text-white' htmlFor="">Contraseña</label>
                    <input className='bg-transparent border-b-2 border-white  focus:outline-none focus:border-b-2 focus:border-b-orange-500 ' type="password" {...register('password', {required: true})}/>
                    <span style={{color: "red"}}>
                        {errors.password && errors.password.message}
                    </span>
                </div>

                <div className='flex flex-col'>
                    <label className='text-white' htmlFor="">Confirmar Contraseña</label>
                    <input className='bg-transparent border-b-2 border-white  focus:outline-none focus:border-b-2 focus:border-b-orange-500 ' type="password" {...register('confirmPassword')}/>
                    <span style={{color: "red"}}>
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </span>
                </div>
                <button className='p-3 text-white bg-black w-full my-5 hover:bg-slate-900' type='submit'>Registrarse</button>
            </form>

            </section>
            
        </div>
    )
}
