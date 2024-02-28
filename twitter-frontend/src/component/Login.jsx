import React, { useState } from 'react';
// import axios from 'axios';
import { instance } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = ({prop}) => {

    const History = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authorize,setAuthorize] = prop;
    const [show, setShow] = useState(false);

    const handleLogin = async () => {
        if(email && password){
            await instance.post('/auth/login', { email, password })
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
            </div>
            <button onClick={handleLogin} className="register">Login</button>
            <h5 style={{textAlign: 'center',marginBottom: '2%',fontWeight: '400'}} onClick={ () => { 
                    setAuthorize(!authorize)
                    History('/')  }}>Didn't have an account? <strong>Signup</strong></h5>
        </div>
    </div>
    </>
}
export default Login;