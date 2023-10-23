import PropTypes from "prop-types";
import {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import data from "bootstrap/js/src/dom/data";

export const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const loginUser = async () => {
        axios({
            method: "POST",
            url: "http://localhost:3002/users/login",
            data: {
                email: email,
                password: password,
            }
        }).then((res) => {
            // console.log(res.data)
            // console.log({token: res.data.token, username: res.data.data.username, image: res.data.data.image})
            setToken({
                token: res.data.token,
                username: res.data.data.username,
                image: res.data.data.image,
                iduser: res.data.data.id,
                data: res.data
            })
            window.location = '/'
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <div className='container d-flex align-items-center justify-content-center' style={{height: 900}}>
            <div className='card shadow h-50 w-50'>
                <div className='card-body p-0'>
                    <div className='row h-100'>
                        <div className='col-sm-6'>
                            <img className='object-fit-cover'
                                 src='https://www.mas-software.com/wp-content/uploads/2022/09/Pengertian-Gudang.jpg'
                                 width='100%' height='100%'/>
                        </div>
                        <div className='col-sm-6 d-flex align-items-center justify-content-center'>
                            <div className='w-75'>
                                <h1>Welcome</h1>
                                <form onSubmit={handleSubmit(loginUser)}>
                                    <input type='email' className='form-control mb-3' name='email'
                                           placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                                    <input type='password' className='form-control mb-3' name='username'
                                           placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                                    <button type='submit' className='btn btn-primary w-100' name='username'
                                            placeholder='Username'>Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
