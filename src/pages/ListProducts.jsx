import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import db from '../firebase/appConfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ListProducts() {
    //declaramos un estado para la lista de productos
    const [products, setProducts] = useState([])

    //montando la informacion de los productos que hay en firebase
    useEffect(() => {
        //Funcion que nos permite visualizar la info de la bd en tiempo real
        onSnapshot(
            //obtenemos la conexion de la base de datos y el nombre de la coleccion
            collection(db, "products"),
            (snapshot) => {
                //objeto de firebase
                //console.log(snapshot);
                //testeando el primer documento de la coleccion
                console.log(snapshot.docs[0].data());

                /** mapeando / iterando los documentos de la coleccion */
                const array_products = snapshot.docs.map((doc) => {
                    //copiamos la data de cada documento de la coleccion productos y la mandamos al array_products
                    return { ...doc.data(), id: doc.id }
                })
                //testear 
                console.log(array_products);

                //actualizamos el estado con el arreglo de productos
                setProducts(array_products)
            }
        )
    }, [])

    //funcion para eliminar un producto
    const deleteProduct = (id) => {
        console.log(id);
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //eliminar el documento
                    deleteDoc(doc(db, "products", id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.error("Error al eliminar un producto", error)
        }

    }

    return (
        <>
            <Header/>

            <div className='w-full md:w-10/12  mx-auto  text-center mt-5'>

                <section >
                    <h2 className='text-xl font-bold '>Lista de Productos</h2>

                    <table className='w-11/12 md:w-9/12 mx-auto mt-2'>
                        <thead className='bg-sky-600'>
                            <tr className='text-white'>

                                <th className='px-1.5'>Nombre</th>
                                <th className='px-1.5'>Descripción</th>
                                <th className='px-1.5'>Editar</th>
                                <th className='px-1.5'>Eliminar</th>
                            </tr>

                        </thead>
                        {
                            products.length > 0 ?
                                products.map((product) => {
                                    return (


                                        <tbody key={product.id}>
                                            <tr className='border-dashed border-b-2 border-gray-400 pt-20'>
                                                <td>
                                                    <h3>{product.name}</h3>
                                                </td>
                                                <td>
                                                    <p>{product.description}</p>
                                                </td>
                                                <td>
                                                    <Link to={`/editar/${product.id}`} className='text-green-800'><i className="fa-solid fa-pencil"></i></Link>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteProduct(product.id)} className='text-red-600'><i className="fa-solid fa-circle-xmark"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    )
                                })
                                : <p className='text-center'>No hay productos por el momento</p>
                        }
                    </table>


                </section>

            </div>
        </>

    )
}
