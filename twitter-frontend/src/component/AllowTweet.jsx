import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const AllowTweet = () => {
    const query = useQuery();
    const [cloudinaryUrl,setCloudinaryUrl] = useState('');
    const [tweet,setTweet] = useState('');
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    useEffect(() => {
        const mediaUrl = query.get("mediaurl");
        const tweets = query.get("tweet");
        let shouldPostTweet = false;
        if(mediaUrl) { 
            setCloudinaryUrl(mediaUrl);
            shouldPostTweet = true;
        }
        if(tweets){
            setTweet(tweets);
            shouldPostTweet = true;
        }
        const postTweet = async () => {
            if(shouldPostTweet && cloudinaryUrl && tweet){           
            try {
                const result = await axios.post('http://localhost:5000/tweetallow', {tweet,cloudinaryUrl});
                console.log(result.data);
            } catch (error) {
                console.error(error.response.data);
            }
          }   
        };
        if(shouldPostTweet){
            postTweet();
        }
    }, [query]);

 
    return <>
        <h1>hello</h1> 
    </>
}
export default AllowTweet;