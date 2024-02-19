import React, { useState, useEffect } from 'react';
import SignupLogin from "./component/SignupLogin";
import Navbar from './component/Navbar';
import TwitterLogin from "./component/TwitterLogin";
import Tweet from "./component/Tweet";
import './Global.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import VerifyOwnerEditor from './component/VerifyOwnerEditor';
import EditorUpload from './component/EditorUpload';
import History from './component/History';
import AllowTweet from './component/AllowTweet';
function App() {
  const history = useNavigate();
  const [authorize, setAuthorize] = useState(true);
  useEffect(() => {
    if (!document.cookie) { 
      history("/");
    }
    // eslint-disable-next-line
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
        <Route path='/editorupload' element={<EditorUpload />} />
        <Route path='/history' element={<History />} />
        <Route path='/allowtweet' element={<AllowTweet />} />
      </Routes>
    </div>
  );
}

export default App;
