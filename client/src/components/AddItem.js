import {useForm} from 'react-hook-form';
import axios from "axios";
import Swal from "sweetalert2";
import {Link, redirect, useNavigate} from "react-router-dom";
import {Home} from "./Home";

export const AddItem = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const navigate = useNavigate()
    const getIdUser = () => {
        const keyString = sessionStorage.getItem('iduser')
        const keyJson = JSON.parse(keyString)
        return keyJson?.toString()
    }
    const iduser = getIdUser()? getIdUser():0
    const createHandler = async (data) => {
        Swal.fire({
            title: 'Apakah data sudah sesuai?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const dataJson = {
                    name: data.name,
                    category: data.category,
                    price: data.price,
                    stock: data.stock,
                    userid: +iduser,
                }
                console.log(dataJson)
                const result = axios({
                    method: "POST",
                    url: "http://localhost:3002/items/create",
                    data: dataJson
                }).then((res) => {
                    navigate('/')
                    Swal.fire(res.data.message, '', 'success')
                }).catch((e) => {
                    console.log(e)
                })
            }
        })
    }
    return (
        <div className='container'>
            <h1>Add Items</h1>
            <form onSubmit={handleSubmit(createHandler)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input {...register(
                        'name'
                    )} type="text" className="form-control" id="name" name='name' placeholder="Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input {...register(
                        'price'
                    )} type="number" className="form-control" id="price" name='price' placeholder="Price"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input {...register(
                        'stock'
                    )} type="number" className="form-control" id="stock" name='stock' placeholder="Stock"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input {...register(
                        'category'
                    )} type="text" className="form-control" id="category" name='category' placeholder="Category"/>
                </div>
                <div className='mb-3'>
                    <button className='btn btn-primary w-100' type='submit' name='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
