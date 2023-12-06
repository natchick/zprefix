import React, {useState } from "react";

export const Register = (props) => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }


    return(
        <div className = "registerForm">
            <h2>Register for an Account</h2>
            <form className="register_form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} username="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="username" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" id="password" />
                <button type="submit">Log In</button>
            </form>
            <button ClassName="loginpage" onClick={() => props.onFormSwitch('login')}>Login if you already have an account</button>
        </div>
    )
} 