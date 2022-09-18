// import './style.login.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { SongsList } from '../Context/AppContext';


export default function Login({setIsLogged,setCurrUser}){

    const email=useRef()
    const password=useRef()

    const submitForm=(e)=>{
      debugger
        e.preventDefault()
        const response = axios.post('http://localhost:4000/api/users/login/',{
            email: email.current.value,
            password: password.current.value
        })
        .then(({data}) => {
            console.log("userData:", data)

            localStorage.token = data.token
            localStorage.user = data.userDetails.firstname

            setIsLogged(localStorage.token)
            setCurrUser(data.userDetails)
        })
        .catch((err)=> console.log(err))
}

return(
  <>
    <div id="main-container" className="d-grid h-100">
      <h1 className="mb-3 fs-3 fw-normal">Please sign in</h1>
      <form id="sign-in-form" onSubmit={submitForm} className="text-center p-3 w-100">
        <input type="email" id="txtEmail" ref={email} placeholder="enter email" className="position-relative" />
        <input type="password" id="txtPass" ref={password} placeholder="enterPassword" className="position-relative" />
        <span  className="d-flex justify-content-center mb-4"><input type="checkbox" id="cbRme"></input><label>Remember me</label></span>
        <input type="submit" value="Sign In" />
    </form>

    </div></>
    )
}
