import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ({prop}) => {

    const History = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authorize,setAuthorize] = prop;
    const handleLogin = async () => {
        if(email && password){
            await axios.post('http://localhost:5000/login', { email, password })
            .then(response => {
                if(response.data){
                    document.cookie = `token=${response.data.token}`;
                    setAuthorize(!authorize);
                    History("/home");
                }else {
                    History("/login");
                }
            })
            .catch(error => {
                alert(error.response.data);
            });
        } else {
            alert('Invalid input');
        }
    }
    return <>
     <div className="signup-section">
        <div className="signup">
            <div className="signup-heading">
                <h1>Login</h1>
                <h3>Enter your details to login to your account</h3>
            </div>
            <div className="form">
                <label>Email:</label>
                <input type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" />
                <label>Password:</label>
                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter you password" />
            </div>
            <button onClick={handleLogin} className="register">Login</button>
            <h5 style={{textAlign: 'center',marginBottom: '2%'}} onClick={ () => { 
                    setAuthorize(!authorize)
                    History('/')  }}>Click here to Signup</h5>
        </div>
    </div>
    </>
}
export default Login;