import BackgroundImages from "./BackgroundImages";
const OwnerTweetResult = () => {
   
    return <>
         <BackgroundImages />
        <div className="success-checkmark">
                <div>
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                    <h1>Tweeted successfully</h1>
                </div>  
        </div>
    </>
}
export default OwnerTweetResult;