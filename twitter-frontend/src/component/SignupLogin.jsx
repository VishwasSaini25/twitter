import '../Global.css';
import Signup from './Signup';
import Login from "./Login";
const SignupLogin = ({hookProp}) => {
    const [authorize,setAuthorize] = hookProp;
    const bg = require('../images/bg.jpg');
    return <>
    <div className='signuplogin'>
        <div className='signuplogin-image' style={{flex: '50%'}}>
            <img src={bg} width="550" height="500" />
        </div>
        <div className='signuplogin-form'  style={{flex: '50%'}}>
        {authorize === true ? <Signup prop={[authorize,setAuthorize]} /> : <Login prop = {[authorize,setAuthorize]} />}
        </div>
    </div>
    </> 
}
export default SignupLogin;