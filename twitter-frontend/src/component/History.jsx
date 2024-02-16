import { useLocation } from "react-router-dom";
const History = () => {
    const location = useLocation();
    const {imagesData,tweetData} = location.state;
    return <>
        <div className="history-section">
            <div className="history" style={{ display: 'grid' }}>
                {imagesData.map((item,key) => (
                        <div className="data">
                            <div className="column">
                                <h3>{tweetData[key]}</h3>
                                <a href={item}>Click here to see media</a>
                                <h3>Status</h3>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    </>
}
export default History;