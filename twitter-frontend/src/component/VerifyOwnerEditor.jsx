import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const VerifyOwnerEditor = () => {
    const [zind, setZind] = useState(true);
    const [osecret, setOsecret] = useState('');
    const [esecret, setEsecret] = useState('');
    // const query = useQuery();
    // const [email, setEmail] = useState('');
    const history = useNavigate();

    // function useQuery() {
    //     return new URLSearchParams(useLocation().search);
    // }

    // useEffect(() => {
    //     const dataParam = query.get("email");
    //     console.log(dataParam);
    //     if (dataParam) {
    //         setEmail(dataParam);
    //     }
    //     console.log(email);
    // }, []);


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
    return <>
        <div className="userCategory-section">
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
        </div>
    </>
}
export default VerifyOwnerEditor;