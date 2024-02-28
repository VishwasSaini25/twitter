import axios from 'axios';
import React, { useState } from 'react';
import BackgroundImages from './BackgroundImages';
import { useNavigate } from 'react-router-dom';
import { instance } from '../utils/axios';
const Tweet = () => {
    const History = useNavigate();
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState(null);
    const [tweeted, setTweeted] = useState(false);
    const postTweet = async (e) => {
        e.preventDefault();
        setTweeted(false);
        const formData = new FormData();
        formData.append('tweet', tweet);
        if (file) {
            formData.append('media', file);
        }
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        let token = null;
        if (tokenCookie) {
            token = tokenCookie.split('=')[1];
        }
        try {
            const result = await instance.post('/tweet', formData, { headers: { 'Content-Type': 'multipart/form-data','Authorization': `Bearer ${token}` } });
            if (result.data) {
                setTweeted(true);
                History('/tweeted');
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };
    return <>
        <BackgroundImages />
        <div className="tweet-section">
            <div className='tweet'>
                <h1>Type you'r tweet content or select Media</h1>
                <div className='tweet-form'>
                    <textarea
                        type="text"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        placeholder="What's happening?"
                    />
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button onClick={postTweet} >Tweet</button>
                    {tweeted ? <span>Tweeted Successfully</span> : null}
                </div>
            </div>
        </div>
    </>
}
export default Tweet;