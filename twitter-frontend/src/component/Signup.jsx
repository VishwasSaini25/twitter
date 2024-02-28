import React, { useState } from 'react';
// import axios from 'axios';
import { instance } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const Signup = ({prop}) => {
    const History = useNavigate();
    const [authorize,setAuthorize] = prop;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRPassword] = useState('');
    const [osecret, setOsecret] = useState('');
    const [esecret, setEsecret] = useState('');
    const [tusername, settUsername] = useState('');
    const [show, setShow] = useState(false);
    const [cshow, setcShow] = useState(false);
    const handleRegister = async () => {
        if (email && password && osecret && esecret && (password === rpassword) && tusername) {
            
            await instance.post('/auth/register', { email, password, osecret, esecret,tusername })
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
                     <InputGroup>
                        <Input
                             type={show ? "text" : "password"}
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             placeholder="Enter you password"
                        />
                        <InputRightElement>
                            <Button size="m" onClick={() => setShow(!show)}>
                                {show ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>                       
                    <label>Re-enter Passowrd</label>
                    <div style={{display: 'flex'}}>
                    <InputGroup>
                        <Input
                             type={cshow ? "text" : "password"}
                             value={rpassword}
                             onChange={(e) => setRPassword(e.target.value)}
                             placeholder="Renter you password"
                        />
                        <InputRightElement>
                            <Button size="m" onClick={() => setcShow(!cshow)}>
                                {cshow ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    </div>
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
                    <label>Twitter Username</label>
                    <input type="text"
                        value={tusername}
                        onChange={(e) => settUsername(e.target.value)}
                        placeholder="Enter you twitter username" />
                </div>
                <button onClick={handleRegister} className="register">Register</button>
                <h5 style={{textAlign: 'center',marginBottom: '2%',fontWeight: '400'}} onClick={ () => { 
                    setAuthorize(!authorize)
                    History('/login')  }}>Already have an account? <strong>Login</strong></h5>
            </div>
        </div>
    </>
}
export default Signup;