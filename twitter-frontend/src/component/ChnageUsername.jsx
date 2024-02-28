import React, { useState } from 'react';
import axios from 'axios';
import { instance } from '../utils/axios';

const ChangeUsername = () => {
    const [username,setUsername] = useState('');
    const [changed,setChanged] = useState(false);
    const ChangeUsername = async () => {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        let token = null;
        if (tokenCookie) {
            token = tokenCookie.split('=')[1];
        }  
        try{
            const response = await instance.post('/settings',{username},{ headers: { 'Authorization': `Bearer ${token}` } })
            if(response){
                setChanged(true);
            }
        } catch (error){
            console.log(error);
        }
    }

    return <>
    <div className="username-section">
        <div className="settings">
        <textarea
        type="text" placeholder="Enter your twitter username with which you logged in" 
        onChange={(e) => setUsername(e.target.value)}
        />
            {changed ? <span>Changed Successfully</span> : null}
        <button onClick={ChangeUsername}>Submit</button>
        </div>
    </div>
    </>
}
export default ChangeUsername;