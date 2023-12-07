import React, {useState } from "react";
import './App.css';

export const Register = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    const addUser = () => {
        fetch('http://localhost:8085/users/', {
            method: 'POST',
            body: JSON.stringify({
                First_Name: FirstName,
                Last_Name: LastName,
                Username: username,
                Password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }


    return(
        <div className = "App">
            <h2>Register for an Account</h2>
            <form className="register_form" onSubmit={handleSubmit}>
                <label htmlFor="FirstName">First Name</label>
                <input value={FirstName} FirstName="FirstName" onChange={(e) => setFirstName(e.target.value)} id="FirstName" placeholder="First" />
                <label htmlFor="LastName">Last Name</label>
                <input value={LastName} LastName="LastName" onChange={(e) => setLastName(e.target.value)} id="LastName" placeholder="Last" />
                <label htmlFor="username">Username</label>
                <input value={username} username="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="username" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" id="password" />
                <button onClick={()=> {addUser()}}>Create Account</button>
            </form>
        </div>
    )
} 