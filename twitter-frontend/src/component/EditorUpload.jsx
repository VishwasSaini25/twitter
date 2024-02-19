import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundImages from './BackgroundImages';
const EditorUpload = () => {
    const History = useNavigate();
    const location = useLocation();
    const email = location.state;
    const [file, setFile] = useState(null);
    const [imagesData, setImagesData] = useState([]);
    const [tweet, setTweet] = useState('');
    const [tweetData, settweetData] = useState([]);

    const uploadFile = async (e) => {
        e.preventDefault();
        if (!file && !tweet.trim()) {
            alert("Please provide a tweet or select a file to upload.");
            return;
        }
        let mediaUrl = '';
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'chat-app');
            try {
                const res = await axios.post(`https://api.cloudinary.com/v1_1/vishwas12/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                mediaUrl = res.data.secure_url;
            } catch (err) {
                console.error(err.response);
            }
        }
        try {
            const response = await axios.post('http://localhost:5000/send-email', { mediaUrl, tweet })
            setImagesData(response.data.imagesData);
            settweetData(response.data.tweetData);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (imagesData.length > 0 && tweetData.length > 0) {
            History('/history', { state: { imagesData, tweetData } });
        } else if (imagesData.length === 0 && tweetData.length > 0) {
            History('/history', { state: { imagesData, tweetData } });
        }
    // eslint-disable-next-line
    }, [imagesData, tweet]);
    return <>
            <BackgroundImages />
        {email ?
            <div className="editorupload-section">
                <div className='editor-upload'>
                    <form onSubmit={uploadFile}>
                        <textarea
                            type="text"
                            value={tweet}
                            onChange={(e) => setTweet(e.target.value)}
                            placeholder="What's happening?"
                        />
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
            :
            <div>
                <BackgroundImages />
                <h1>Enter esecret first</h1>
                <button onClick={() => History('/usercategory')} >Go back to enter secret</button>
            </div>
        }
    </>
}
export default EditorUpload;