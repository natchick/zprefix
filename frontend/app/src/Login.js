import react, {useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthProvider' ;





const Login = () => {
    //set references for users and error
    const userRef = useRef();
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const loginFunction = (credentials) => {
        fetch('http://localhost:8085/users/login', {
            method: 'POST' ,
            body:JSON.stringify({ 
                Username: username, 
                Password: password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then((setSuccess(true)))
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [username, password])


        // try {
        //     const response = await axios.post('http://localhost:8085/users/login/' , 
        //         JSON.stringify({
        //             Username: username,
        //             Password: password
        //         }),
        //         {
        //             headers: { 'Content=Type': 'application/json'},
        //             withCredentials: true
        //         }) ;
        //         const accessToken=response?.data?.accessToken;
        //         const roles = response?.data?.roles;
        //         setAuth({ username, password, roles, accessToken });
        //     setUsername('');
        //     setPassword('');
        //     setSuccess(true);
            
        // } catch (error) {
        //     if (!error?.response) {
        //         setErrorMsg('No Server Response') 
        //         } else if (error.response?.status === 400) {
        //             setErrorMsg('Missing Username or Password');
        //         } else if (error.response?.status === 401) {
        //             setErrorMsg('Unauthroized');
        //         } else {
        //             setErrorMsg('Login Failed');
        //         }
        //         errorRef.current.focus();
        //     }

    return (
        <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="http://localhost:3000/Items">See Inventory</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errorRef} className ={errorMsg ? "errormsg" :
            "offscreen"} aria-live="assertive">{errorMsg}</p>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required 
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button onClick={loginFunction}>Sign In</button>
            </form>
        </section>
        )}
        </>
    )
}

export default Login

