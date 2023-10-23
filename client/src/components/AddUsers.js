import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const AddUsers = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const navigate = useNavigate()
    const createHandler = async (data) => {
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
                }
                const result = axios({
                    method: "POST",
                    url: "http://localhost:3002/users/register",
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
    return (
        <div className='container'>
            <h1>Add Users</h1>
            <form onSubmit={handleSubmit(createHandler)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input {...register('username')} type="text" className="form-control" id="username"
                           name='username'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input {...register(
                        'email'
                    )} type="email" className="form-control" id="email" name='email'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input {...register(
                        'password'
                    )} type="password" className="form-control" id="password" name='password'/>
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input {...register(
                        'role'
                    )} type="text" className="form-control" id="role" name='role'/>
                </div>
                <div className='mb-3'>
                    <button className='btn btn-primary w-100' type='submit' name='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
