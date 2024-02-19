import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackgroundImages from "./BackgroundImages";
const AllowTweet = () => {
    const query = useQuery();
    const [cloudinaryUrl, setCloudinaryUrl] = useState('');
    const [tweet, setTweet] = useState('');
    const [shouldBlink, setShouldBlink] = useState(true);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    useEffect(() => {
        const mediaUrl = query.get("mediaurl");
        const tweets = query.get("tweet");
        let shouldPostTweet = false;
        if (mediaUrl) {
            setCloudinaryUrl(mediaUrl);
            shouldPostTweet = true;
        }
        if (tweets) {
            setTweet(tweets);
            shouldPostTweet = true;
        }
        const postTweet = async () => {
            if (shouldPostTweet && cloudinaryUrl && tweet) {
                try {
                    const result = await axios.post('http://localhost:5000/tweetallow', { tweet, cloudinaryUrl });
                    console.log(result.data);
                } catch (error) {
                    console.error(error.response.data);
                }
            }
        };
        if (shouldPostTweet) {
            postTweet();
            const timer = setTimeout(() => {
                setShouldBlink(false); 
            }, 3000);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line
    }, [query]);


    return <>
    <BackgroundImages />
        <div class="success-checkmark">
            <div className={shouldBlink ? 'blink check-icon' : 'check-icon'}>
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
            </div>
            <h1>Tweeted successfully</h1>
        </div>
    </>
}
export default AllowTweet;