import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import db from '../firebase/appConfig'
import { useForm } from 'react-hook-form'
import Header from './Header'

export default function EditForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    //useParams captura los parametros que mandamos en las rutas
    const { id } = useParams();

    const navigate = useNavigate()

    //montando el producto seleccionado
    useEffect(() => {

        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id));
            console.log(productDoc);

            //validamos si el documento existe
            if (productDoc.exists()) {
                const productData = productDoc.data()
                console.log(productData);

                //mandar la informacion del producto al formulario
                setValue('name', productData.name)
                setValue('description', productData.description)
            } else {
                console.log("No existe el producto");
            }
        }

        getProductById()
    }, [])

    const editProduct = async (data) => {
        try {
            //actualizamos el producto, seleccionamos el documento por su id
            updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            });
            //redireccionamos a la lista de productos
            navigate("/productos")
        } catch (error) {
            console.error('Error al actualizar el producto', error)
        }
    }

    return (
        <>

            <Header />
            <div className='w-full h-[80vh] flex justify-center items-center '>
                <section className='w-10/12 h-4/6 md:w-8/12 md:h-2/6 lg:w-4/12 lg:h-4/6 shadow-xl bg-slate-50'>

                    <h2 className='text-xl font-bold text-center mt-3'>Editar Producto</h2>
                    <form className="w-8/12 mx-auto mt-3" action="" onSubmit={handleSubmit(editProduct)}>
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
