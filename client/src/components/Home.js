import {useEffect, useState} from "react";
import axios from "axios";
import {AiFillEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import {BiSolidTrash} from "react-icons/bi";
import Swal from "sweetalert2";
import {FaBoxes} from "react-icons/fa";

export const Home = () => {
    const [items, setItems] = useState([])
    const getItems = () => {
        axios({
            method: "GET",
            url: "http://localhost:3001/items"
        }).then((res) => {
            setItems(res.data)
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
                        url: `http://localhost:3001/items/delete/${id}`,
                    });
                    getItems();
                    Swal.fire("Deleted!", "Your Items has been deleted.", "success");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getItems()
    }, []);
    return (
        <div className="container-fluid">
            <div className='row p-3'>
                <div className='col-sm-6'>
                    <h1 className='mb-4'>Home</h1>
                </div>
                <div className='col-sm-6 text-end'>
                    <Link to={'/addItems'}>
                        <button className='btn btn-primary'>Insert Items</button>
                    </Link>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        items.map((value, index, array) => {
                            return (
                                <div className='col-sm-3 mb-4' key={value.id}>
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <img
                                                src={value.image}
                                                className='object-fit-contain rounded' width='100%' height='300px'/>
                                        </div>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <FaBoxes/> {value.stock} Left
                                                </div>
                                                <div className='col-sm-6 text-end'>
                                                    <span className="badge bg-secondary">{value.category}</span>
                                                </div>
                                            </div>
                                            <h3 className='h3 text-truncate'
                                                title={value.name}>{value.name}</h3>
                                            <h4 className='h4'>{value.price.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            })}</h4>
                                            <div className='row border shadow rounded mx-3 my-4'>
                                                <div className='col-sm-3 p-1 d-flex align-items-center justify-content-center'>
                                                    <img src={value.User.image} width={70} height={70} className='rounded'/>
                                                </div>
                                                <div className='col-sm-9 p-1'>
                                                    <div>
                                                        Uploader
                                                    </div>
                                                    <div className='fw-bold'>
                                                        {value.User.username}
                                                    </div>
                                                    <div>
                                                        {value.User.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6 text-center p-1'>
                                                    <Link to={`/editItems/${value.id}`}>
                                                        <button className='btn btn-warning text-white w-100'>
                                                            <AiFillEdit/> Edit
                                                        </button>
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
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
