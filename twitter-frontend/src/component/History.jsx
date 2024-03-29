import React, { useState, useEffect } from 'react';
import { instance } from '../utils/axios';
import BackgroundImages from "./BackgroundImages";
// import axios from 'axios';
const History = () => {
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        const fetchTweetData = async () => {
            try {
                const response = await instance.get('/fetchtweet');
                const data = response.data.tweets.map(tweet => ({
                    tweet: tweet.tweet,
                    imageUrl: tweet.mediaUrl || null
                }));
                setCombinedData(data);
            } catch (error) {
                console.error('Failed to fetch tweets', error);
            }
        };
        fetchTweetData();
    }, [])
    return <>
        <BackgroundImages />
        <div className="history-section">
            <div className="history" style={{ display: 'grid' }}>
                {combinedData.length > 0 ? combinedData.map((data, key) => (
                    <div className="data" key={key}>
                        <div className="column">
                            <h3 style={{ fontWeight: '400', fontStyle: 'italic' }}>
                                {data.tweet.length > 4 ? "'" + data.tweet.slice(0, 15) + "...'" : "'" + data.tweet + "'" || "No tweet text provided."}
                            </h3>
                            {data.imageUrl ? (
                                <a href={data.imageUrl}>Click here to see media</a>
                            ) : (<span>No media attached</span>)}
                            <h3>⌛ Pending</h3>
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
