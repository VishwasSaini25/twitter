// import axios from "axios";
import { instance } from "../utils/axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackgroundImages from "./BackgroundImages";
const AllowTweet = () => {
    const query = useQuery();
    const [cloudinaryUrl, setCloudinaryUrl] = useState('');
    const [tweet, setTweet] = useState('');
    const [shouldBlink, setShouldBlink] = useState(true);
    const [reject, setReject] = useState(false);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    useEffect(() => {
        const mediaUrl = query.get("mediaurl");
        const tweets = query.get("tweet");
        const rejected = query.get("reject");
        let shouldPostTweet = null;
        if (mediaUrl) {
            setCloudinaryUrl(mediaUrl);
            shouldPostTweet = true;
        } 
        if (tweets) {
            setTweet(tweets);
            shouldPostTweet = true;
        }
        if (rejected) { 
            setReject(true);
            shouldPostTweet = false;
        }
        const rejectTweet = async () => {
            try {
                await instance.post('/rejecttweet', { tweet, cloudinaryUrl });
            } catch (error) {
                console.error(error.response.data);
            }
        }
        const postTweet = async () => {
            if (shouldPostTweet && (cloudinaryUrl || tweet)) {
                const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
                let token = null;
                if (tokenCookie) {
                    token = tokenCookie.split('=')[1];
                }  
                try {
                    await instance.post('/tweetallow', { tweet, cloudinaryUrl }, { headers: { 'Authorization': `Bearer ${token}` } });
                } catch (error) {
                    console.error(error.response.data);
                }
            }
        };
        if (shouldPostTweet) { 
            postTweet();
        } else if (!shouldPostTweet) rejectTweet();
        // eslint-disable-next-line
    }, [query]);


    return <>
        <BackgroundImages />
        <div className="success-checkmark">
            {!reject ?
                <div>
                    <div className={shouldBlink ? 'blink check-icon' : 'check-icon'}>
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                    <h1>Tweeted successfully</h1>
                </div>
                :
                <div className="reject" style={{ margin: 'auto' }}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle className="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                        <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                        <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                    </svg>
                    <p className="error">Rejected</p>
                </div>
            }
        </div>
    </>
}
export default AllowTweet;