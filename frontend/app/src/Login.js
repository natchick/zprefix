import {useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthProvider' ;
import axios from './axios' ;
const Login_URL = '#'


const Login = () => {
    //set references for users and error
    const userRef = useRef();
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(Login_URL, 
                JSON.stringify({user, password}),
                {
                    headers: { 'Content=Type': 'application/json'},
                    withCredentials: true
                }) ;
            setUser('');
            setPassword('');
            setSuccess(true);
            
        } catch (error) {

        }
    }

    return (
        <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="#">See Inventory</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errorRef} className ={errorMsg ? "errormsg" :
            "offscreen"} aria-live="assertive">{errorMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required 
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    ref={userRef}
                    autoComplete="off"
                    onChangeCapture={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>

        </section>
        )}
        </>
    )
}

export default Login

