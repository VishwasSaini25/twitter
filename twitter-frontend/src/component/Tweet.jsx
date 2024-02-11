import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
const Tweet = () => {
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState(null);
    const query = useQuery();
    const [userData, setUserData] = useState('');

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    useEffect(() => {
        const dataParam = query.get("username");
        console.log(dataParam);
        if (dataParam) {
            setUserData(dataParam);
        }
    }, []);

    const postTweet = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tweet', tweet);
        if (file) {
            formData.append('media', file);
        }
        try {
            const result = await axios.post('http://localhost:5000/tweet', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log(result.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };
    return <>
        {userData ?
            <div className="tweet-section">
                <div className='tweet'>
                        <div className='tweet-form'>
                            <textarea
                                // style={{ width: '75%',height: '50%', margin: 'auto' }}
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
                        </div>
                </div>
            </div>
            : <div>Loading or no user data...</div>
        }
    </>
}
export default Tweet;