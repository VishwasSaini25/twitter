import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = ({prop}) => {
    const History = useNavigate();
    const [authorize,setAuthorize] = prop;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRPassword] = useState('');
    const [osecret, setOsecret] = useState('');
    const [esecret, setEsecret] = useState('');
    const handleRegister = async () => {
        if (email && password && osecret && esecret && (password === rpassword)) {
            
            await axios.post('http://localhost:5000/register', { email, password, osecret, esecret })
                .then(response => {
                    if (response.data) {
                        alert("Success, You must login now");
                        setAuthorize(!authorize);
                        History("/login");
                    } else {
                        History("/"); 
                    }
                })
                .catch(error => {
                    alert(error);
                });
        } else {
            alert('Invalid Input');
        }
    }
    return <>
        <div className="signup-section">
            <div className="signup">
                <div className="signup-heading">
                    <h1>Signup</h1>
                    <h3>Enter your details to register your account</h3>
                </div>
                <div className="form">
                    <label>Email:</label>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" placeholder="Enter your email" />
                    <label>Password:</label>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter you password" />
                    <label>Re-enter Passowrd</label>
                    <input type="password"
                        value={rpassword}
                        onChange={(e) => setRPassword(e.target.value)}
                        placeholder="Renter you password" />
                    <div style={{ display: 'flex', marginTop: '1%' }}>
                        <div>
                            <label>Owner Secret</label>
                            <input style={{ width: '90%' }} type="password"
                                value={osecret}
                                onChange={(e) => setOsecret(e.target.value)}
                                placeholder="Enter owner secret" />
                        </div>
                        <div>
                            <label>Editor Secret</label>
                            <input type="password"
                                value={esecret} 
                                onChange={(e) => setEsecret(e.target.value)}
                                placeholder="Enter editor secret" />
                        </div>
                    </div>
                </div>
                <button onClick={handleRegister} className="register">Register</button>
                <h5 style={{textAlign: 'center',marginBottom: '2%'}} onClick={ () => { 
                    setAuthorize(!authorize)
                    History('/login')  }}>Click here to Login</h5>
            </div>
        </div>
    </>
}
export default Signup;