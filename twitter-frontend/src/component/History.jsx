import { useLocation } from "react-router-dom";
import BackgroundImages from "./BackgroundImages";
const History = () => {
    const location = useLocation();
    // Provide default values in case state, imagesData, or tweetData are undefined
    const { imagesData = [], tweetData = [] } = location.state || {};

    // Combine tweetData and imagesData into a single array of objects
    const combinedData = tweetData.map((tweet, index) => ({
        tweet,
        imageUrl: imagesData[index] || null // Use null to explicitly denote no image
    }));

    return <>
        <BackgroundImages />
        <div className="history-section">
            <div className="history" style={{ display: 'grid' }}>
                {combinedData.length > 0 ? combinedData.map((data, key) => (
                    <div className="data" key={key}>
                        <div className="column">
                            <h3>{data.tweet}</h3>
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
