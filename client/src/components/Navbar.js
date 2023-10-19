import logo from '../logo.svg'
import {Link, Outlet, useNavigate} from "react-router-dom";
import {IoMdArrowDropdownCircle, IoMdArrowDropleftCircle} from "react-icons/io";
import {useState} from "react";
import {SlLogout} from "react-icons/sl";
import {BsPerson} from "react-icons/bs";
import Swal from "sweetalert2";

export const Navbar = () => {
    const [isclick, setIsClick] = useState(true)
    const navigation = useNavigate();
    const getUsername = () => {
        const keyString = sessionStorage.getItem('username')
        const keyJson = JSON.parse(keyString)
        return keyJson?.toString()
    }
    const username = getUsername()? getUsername():''
    const getImage = () => {
        const keyString = sessionStorage.getItem('image')
        const keyJson = JSON.parse(keyString)
        return keyJson?.toString()
    }
    const image = getImage()? getImage():''

    const getData = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const data = getData()? getData():[]
    const logoutHandler = () => {
        Swal.fire({
            title: 'Apakah yakin ingin keluar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'lightgreen',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText:'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('token')
                // navigation('/')
                Swal.fire(
                    {
                        title: "Berhasil Keluar!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "lightgreen"
                    }
                ).then((result)=>{
                    if (result.isConfirmed){
                        window.location = '/'
                    } else if (result.dismiss){
                        window.location = '/'
                    }
                })
            }
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" width="50" height="50" className="d-inline-block align-text-top"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <Link to={'/'} style={{textDecoration: "none"}}>
                                <li className="nav-item">
                                    <div className="nav-link" aria-current="page" href="#">Home</div>
                                </li>
                            </Link>
                            <Link to={'/users'} style={{textDecoration: "none"}}>
                                <li className="nav-item">
                                    <div className="nav-link" aria-current="page" href="#">Users</div>
                                </li>
                            </Link>
                        </ul>
                        <div className='d-flex'>
                            <div className="dropdown">
                                <button data-bs-toggle="dropdown" className='btn btn-light' onClick={() => setIsClick(!isclick)}>{isclick ?
                                    <IoMdArrowDropleftCircle size={25}/> :
                                    <IoMdArrowDropdownCircle size={25}/>} {username} <img className='border-5 rounded-circle'
                                                                                       src={image}
                                                                                       width={40} height={40}/></button>
                                <ul className="dropdown-menu">
                                    <li><a data-bs-toggle="modal" data-bs-target="#exampleModal" className="dropdown-item" href="#"><BsPerson/> Info Account</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item" onClick={logoutHandler}><SlLogout/> Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="modal" id='exampleModal' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title bg">Info Account</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>Name: </label>
                            <h3>{data.data.username}</h3>
                            <label>Email: </label>
                            <p>{data.data.email}</p>
                            <label>Password: </label>
                            <p>{data.data.password}</p>
                            <label>Role: </label>
                            <p>{data.data.role}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-4">
                <Outlet/>
            </div>
        </div>
    )
}
