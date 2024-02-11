import React, { useState, useEffect } from 'react';
import SignupLogin from "./component/SignupLogin";
import Navbar from './component/Navbar';
import TwitterLogin from "./component/TwitterLogin";
import Tweet from "./component/Tweet";
import './Global.css';
import { Route, Routes, useNavigate,useLocation } from 'react-router-dom';
import VerifyOwnerEditor from './component/VerifyOwnerEditor';
function App() {
  const history = useNavigate();
  const location = useLocation();
  const [authorize, setAuthorize] = useState(true);

  // check cookie available or not
  useEffect(() => {
    if (!document.cookie) {
      history("/");
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<SignupLogin hookProp={[authorize,setAuthorize]} />} />
        <Route path='/login' element={<SignupLogin hookProp={[authorize,setAuthorize]} />} />
        <Route path='/home' element={<TwitterLogin />} />
        <Route path='/tweet' element={<Tweet />} />
        <Route path='/usercategory' element={<VerifyOwnerEditor />} />
      </Routes>
    </div>
  );
}

export default App;
