import React,{ useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import BackgroundImages from "./BackgroundImages";
import axios from 'axios';
const History = () => {
    // const location = useLocation();
    const [combinedData, setCombinedData] = useState([]);
    // Provide default values in case state, imagesData, or tweetData are undefined
    // const { imagesData = [], tweetData = [] } = location.state || {};
    // Combine tweetData and imagesData into a single array of objects
    // const combinedData = tweetData.map((tweet, index) => ({
    //     tweet,
    //     imageUrl: imagesData[index] || null // Use null to explicitly denote no image
    // }));
    useEffect(() => {
        const fetchTweetData = async () => {
            try{
                const response = await axios.get('http://localhost:5000/fetchtweet');
                const data = response.data.tweets.map(tweet => ({
                    tweet: tweet.tweet,
                    imageUrl: tweet.mediaUrl || null
                }));
                setCombinedData(data);
            } catch(error){
                console.error('Failed to fetch tweets', error);
            }
        };
        fetchTweetData();
    },[])
    return <>
        <BackgroundImages />
        <div className="history-section">
            <div className="history" style={{ display: 'grid' }}>
                {combinedData.length > 0 ? combinedData.map((data, key) => (
                    <div className="data" key={key}>
                        <div className="column">
                            <h3>{data.tweet || "No tweet text provided."}</h3>
                            {data.imageUrl ? ( 
                                <a href={data.imageUrl}>Click here to see media</a>
                            ) : (<span>No media attached</span>)}
                            <h3>Status</h3>
                        </div>
                    </div>
                )) : (
                    <div className="data">
                        <p>No tweets to display.</p>
                    </div>
                )}
            </div>
        </div>
    </>
}

export default History;
