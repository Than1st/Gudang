import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillRobot, AiOutlineAlibaba, AiOutlineRobot} from "react-icons/ai";
import {BiSolidTrash} from "react-icons/bi";
import Swal from "sweetalert2";

export const Users = () => {
    const [users, setUsers] = useState([])
    const getUsers = () => {
        axios({
            method: "GET",
            url: "http://localhost:3001/users"
        }).then((res) => {
            setUsers(res.data)
        }).catch((e) => {
            console.log(e.message)
        })
    }
    const deleteHandler = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios({
                        method: "DELETE",
                        url: `http://localhost:3001/users/delete/${id}`,
                    });
                    getUsers();
                    Swal.fire("Deleted!", "Users has been deleted.", "success");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getUsers()
    }, []);
    return (
        <div className='container-fluid'>
            <div className='row p-3'>
                <div className='col-sm-6'>
                    <h1 className='mb-4'>Users</h1>
                </div>
                <div className='col-sm-6 text-end'>
                    <Link to={'/addUsers'}>
                        <button className='btn btn-primary'>Insert Users</button>
                    </Link>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        users.map((value, index, array) => {
                            return (
                                <div className='col-sm-4 mb-4'>
                                    <div className="card shadow">
                                        <div className='card-header text-white bg-primary'>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <h3><AiOutlineRobot/> Users Card</h3>
                                                </div>
                                                <div className='col-sm-6 text-end'>
                                                    <h3>Level: {value.role}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body px-4">
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <img className='object-fit-contain' width='100%' height='200'
                                                         src={value.image}
                                                         alt="Image"/>
                                                </div>
                                                <div className='col-sm-8'>
                                                    <h3 className='fw-bold text-truncate'
                                                        title={value.username}>{value.username}</h3>
                                                    Email : {value.email} <br/>
                                                    Password : {value.password}
                                                    <div className='row p-2'>
                                                        <div className='col-sm-6 text-center p-1'>
                                                            <Link to={`/editUsers/${value.id}`}
                                                                  className='btn btn-warning text-white w-100'>
                                                                <AiFillEdit/> Edit
                                                            </Link>
                                                        </div>
                                                        <div className='col-sm-6 text-center p-1'>
                                                            <button onClick={() => deleteHandler(value.id)}
                                                                    className='btn btn-danger text-white w-100'>
                                                                <BiSolidTrash/> Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
