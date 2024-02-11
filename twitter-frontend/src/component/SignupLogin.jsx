import { useState } from 'react';
import '../Global.css';
import Signup from './Signup';
import Login from "./Login";
const SignupLogin = ({hookProp}) => {
    const [authorize,setAuthorize] = hookProp;
    return <>
    <div className='signuplogin'>
        {authorize === true ? <Signup prop={[authorize,setAuthorize]} /> : <Login prop = {[authorize,setAuthorize]} />}
    </div>
    </>
}
export default SignupLogin;