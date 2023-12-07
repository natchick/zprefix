import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types' ;
import './Login.css'

async function loginFunction(credentials) {
    return fetch('http://localhost:8085/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }) 
        .then(data => data.json())
}

export default function Login( { setToken }) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginFunction({
            username,
            password
        });
        setToken(token);
    }
    return(
        <div className="login-wrapper">
            <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}



















// import react, {useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from './AuthProvider' ;
// import axios from './axios' ;
// const Login_URL = '#'




// const Login = () => {
//     //set references for users and error
//     const userRef = useRef();
//     const errorRef = useRef();
//     const { setAuth } = useContext(AuthContext);

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMsg, setErrorMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     // const loginFunction = async() => {
//     //     const loginTry = await fetch('http://localhost:8085/users/login', {
//     //         method: 'Post' ,
//     //         body:JSON.stringify({ 
//     //             Username: username, 
//     //             Password: password
//     //     }),
//     //     headers: {
//     //         'Content-type': 'application/json; charset=UTF-8',
//     //     },
//     //     })
//     //     if (loginTry)
//     // }

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrorMsg('');
//     }, [username, password])

//     const handleSubmit = async (e) => {
//         // e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8085/users/login/' , 
//                 JSON.stringify({
//                     Username: username,
//                     Password: password
//                 }),
//                 {
//                     headers: { 'Content=Type': 'application/json'},
//                     withCredentials: true
//                 }) ;
//                 const accessToken=response?.data?.accessToken;
//                 const roles = response?.data?.roles;
//                 setAuth({ username, password, roles, accessToken });
//             setUsername('');
//             setPassword('');
//             setSuccess(true);
            
//         } catch (error) {
//             if (!error?.response) {
//                 setErrorMsg('No Server Response') 
//                 } else if (error.response?.status === 400) {
//                     setErrorMsg('Missing Username or Password');
//                 } else if (error.response?.status === 401) {
//                     setErrorMsg('Unauthroized');
//                 } else {
//                     setErrorMsg('Login Failed');
//                 }
//                 errorRef.current.focus();
//             }
//         }

//     return (
//         <>
//         {success ? (
//             <section>
//                 <h1>You are logged in!</h1>
//                 <br />
//                 <p>
//                     <a href="#">See Inventory</a>
//                 </p>
//             </section>
//         ) : (
//         <section>
//             <p ref={errorRef} className ={errorMsg ? "errormsg" :
//             "offscreen"} aria-live="assertive">{errorMsg}</p>
//             <h1>Login</h1>
//             <form>
//                 <label htmlFor="username">Username:</label>
//                 <input 
//                     type="text" 
//                     id="username"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChange={(e) => setUsername(e.target.value)}
//                     value={username}
//                     required 
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input 
//                     type="password"
//                     id="password"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChangeCapture={(e) => setPassword(e.target.value)}
//                     value={password}
//                     required
//                 />
//                 <button onClick={()=> {handleSubmit()}}>Sign In</button>
//             </form>
//         </section>
//         )}
//         </>
//     )
// }

// export default Login

