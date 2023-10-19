import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {Home} from "./components/Home";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {AddItem} from "./components/AddItem";
import {EditItem} from "./components/EditItem";
import {Users} from "./components/Users";
import {AddUsers} from "./components/AddUsers";
import {EditUsers} from "./components/EditUsers";
import {Login} from "./components/Login";
import {useEffect, useState} from "react";

function App() {
    const setToken = (data) => {
        sessionStorage.setItem('token', JSON.stringify(data.token))
        sessionStorage.setItem('username', JSON.stringify(data.username))
        sessionStorage.setItem('image', JSON.stringify(data.image))
        sessionStorage.setItem('iduser', JSON.stringify(data.iduser))
        sessionStorage.setItem('userdata', JSON.stringify(data.data))
    }
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken?.toString()
    }
    const token = getToken()
    if (!token) {
        return <Login setToken={setToken}/>
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar/>}>
                        <Route index element={<Home/>}/>
                        <Route path='/addItems' element={<AddItem/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/addUsers' element={<AddUsers/>}/>
                        <Route path='/editUsers'>
                            <Route path=':id' element={<EditUsers/>}/>
                        </Route>
                        <Route path='/editItems'>
                            <Route path=':id' element={<EditItem/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
