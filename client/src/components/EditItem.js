import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
    import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

export const EditItem = (props) => {
    const [data, setData] = useState({
        name: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
    })
    const param = useParams()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const navigate = useNavigate()
    const getData = () => {
        axios({
            method: "GET",
            url: "http://localhost:3002/items/details/" + param.id
        }).then((res) => {
            setData({
                name: res.data.name,
                price: res.data.price,
                stock: res.data.stock,
                category: res.data.category,
                image: res.data.image,
            })
        }).catch((e) => {
            navigate('/')
            Swal.fire({
                showConfirmButton: true,
                title: e.message,
                confirmButtonColor: "#E83B46",
                icon: "error"
            })
        })
    }
    const updateHandler = async () => {
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
                    image: data.image,
                    user_id: 1,
                }
                const result = axios({
                    method: "PUT",
                    url: "http://localhost:3002/items/update/" + param.id,
                    data: dataJson
                }).then((res) => {
                    navigate('/')
                    Swal.fire(res.data.message, '', 'success')
                }).catch((e) => {
                    console.log(e.message)
                })
            }
        })
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <div className='container'>
            <h1>Edit Items</h1>
            <form onSubmit={handleSubmit(updateHandler)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}
                           className="form-control" id="name" name='name' placeholder="Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" value={parseInt(data.price)}
                           onChange={(e) => setData({...data, price: parseInt(e.target.value)})}
                           className="form-control" id="price" name='price'
                           placeholder="Price"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" value={parseInt(data.stock)}
                           onChange={(e) => setData({...data, stock: parseInt(e.target.value)})}
                           className="form-control" id="stock" name='stock'
                           placeholder="Stock"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" value={data.category}
                           onChange={(e) => setData({...data, category: e.target.value})} className="form-control"
                           id="category" name='category'
                           placeholder="Category"/>
                </div>
                <div className="mb-4">
                    <img src={data.image} width={100} alt='image'/><br/><br/>
                    <label htmlFor="image" className="form-label">Link Image</label>
                    <input type="text" value={data.image} onChange={(e) => setData({...data, image: e.target.value})}
                           className="form-control" id="image" name='image'
                           placeholder="Image"/>
                </div>
                <div className='mb-3'>
                    <button className='btn btn-primary w-100' type='submit' name='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
