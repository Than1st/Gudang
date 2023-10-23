import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export const EditUsers = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
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
            url: "http://localhost:3002/users/details/" + param.id
        }).then((res) => {
            setData({
                username: res.data.username,
                email: res.data.email,
                password: res.data.password,
                role: res.data.role,
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
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    image: data.image,
                }
                const result = axios({
                    method: "PUT",
                    url: "http://localhost:3002/users/update/" + param.id,
                    data: dataJson
                }).then((res) => {
                    navigate('/users')
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
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}
                           className="form-control" id="username" name='username'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={data.email}
                           onChange={(e) => setData({...data, email: e.target.value})}
                           className="form-control" id="email" name='email'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={data.password}
                           onChange={(e) => setData({...data, password: e.target.value})}
                           className="form-control" id="password" name='password'
                           placeholder="Stock"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" value={data.role}
                           onChange={(e) => setData({...data, role: e.target.value})} className="form-control"
                           id="role" name='role'/>
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
