import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form'
import db from '../firebase/appConfig';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function RegisterProduct() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    /**
     * register = hace referencia a lo que capturo en la entrada de dato
     * watch = permite observar alguna entrada de dato (valor)
     * handleSubmit = es la accion de lo que voy hacer con la informacion
     */

    //creando una constante para redirigir a una ruta
    const navigate = useNavigate()

    console.log(watch('name'));
    //metodo para guardar un producto
    const saveProduct = async (data) => {
        console.log("Se ha guardado");
        console.log(data);

        //conectarnos a la bd y guardamos un documento
        try {
            await addDoc(collection(db, "products"), {
                name: data.name,
                description: data.description
            })
        } catch (error) {
            console.error("Error al registrar el producto", error)
        }
        //redireccionamos a lista de productos
        navigate("/productos")
    }

    return (
        <>
            <Header/>
            <div className='w-full h-[80vh] flex justify-center items-center '>
            <section className='w-10/12 h-4/6 md:w-8/12 md:h-2/6 lg:w-4/12 lg:h-4/6 shadow-xl bg-slate-50'>

                    <h2 className='text-xl font-bold text-center mt-3'>Registro de Productos</h2>
                    <form className="w-8/12 mx-auto mt-3" action="" onSubmit={handleSubmit(saveProduct)}>
                        <div className='flex flex-col mt-3'>
                            <label htmlFor="">Ingresar Producto</label>
                            <input className='border-cyan-800 border-2' type="text" {...register('name')} />
                        </div>

                        <div className='flex flex-col mt-3'>
                            <label htmlFor="">Descripcion</label>
                            <input className='border-cyan-800 border-2' type="text" {...register('description')} />
                        </div>
                        <div>
                            <button className='mt-3 bg-black hover:bg-slate-900 w-full p-2 text-white' type='submit'>Guardar Producto</button>
                        </div>
                    </form>
                </section>

            </div>
        </>

    )
}
