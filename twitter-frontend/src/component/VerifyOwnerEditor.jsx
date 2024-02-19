import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import BackgroundImages from './BackgroundImages';
const VerifyOwnerEditor = () => {
    const [zind, setZind] = useState(true);
    const [osecret, setOsecret] = useState('');
    const [esecret, setEsecret] = useState('');
    const [tlogin,settLogin] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const query = useQuery();
    const history = useNavigate();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    useEffect(() => {
        settLogin(query.get('username'));
        setIsLoading(false);
    },[query])

    const handleUserSecret = async () => {
        const data = zind ? osecret : esecret;
        await axios.post('http://localhost:5000/usercategory', { data })
            .then(response => {
                if (response.data) {
                    data === osecret ? history('/tweet') : history('/editorupload',{state: response.data.email})
                } else {
                    console.log('wrong secret');
                }
            })
            .catch(error => {
                console.error(error.response.data);
            })
    }
    if (isLoading) { 
        return <div style={{margin: 'auto'}}>
            <BackgroundImages />
            <h1>Loading...</h1>
            </div>;
    }
    return <>
    <BackgroundImages />
        <div className="userCategory-section">
            {tlogin ? 
            <div className="userCategory">
                <h1>Tell us who you are</h1>
                <div className="userCategory-form">
                    <div className="user-btns" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={() => { setZind(true) }} style={zind ? { background: 'black', color: 'white' } : null}>You'r the owner</button>
                        <button onClick={() => { setZind(false) }} style={!zind ? { background: 'black', color: 'white' } : null}>You'r an editor</button>
                    </div>
                    <div style={{ display: 'grid', width: '55%', margin: 'auto', marginTop: '1%' }}>
                        <label style={{ marginBottom: '1%', fontSize: '22px' }}>Enter you secret</label>
                        <input
                            style={{ height: '2rem', paddingInline: '1%' }}
                            type='text'
                            placeholder={zind ? "Enter owner secret" : "Enter editor secret"}
                            value={zind ? osecret : esecret}
                            onChange={(e) => { zind ? setOsecret(e.target.value) : setEsecret(e.target.value) }}
                            />
                    </div>
                    <button onClick={handleUserSecret} className="user-submit">Submit</button>
                </div>
            </div>
            : <div>
                <h1>You didn't logged in with twitter yet</h1>
                <button onClick={() => history('/home')} >Login with twitter</button>
            </div>
            }
        </div>
    </>
}
export default VerifyOwnerEditor;