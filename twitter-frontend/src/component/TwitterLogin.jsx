const homebg = require("../images/homebg.jpg");
const TwitterLogin = () => {
    const handleTwitterLogin = () => {
        window.location.href = "http://localhost:5000/auth/twitter";
    };
    return <>
    <div className="home-section">
        <div style={{flex: '50%'}} className="home-heading">
            <h1 style={{fontSize: '2.5rem',fontWeight: '800',letterSpacing: '1px'}}>Making creator's life easy</h1>
            <h4 style={{fontSize: '1rem',letterSpacing: '1px'}}>Authorize your editor and forget file transfering issues.</h4>
            <button onClick={handleTwitterLogin}>Login with Twitter</button>
        </div>
        <div style={{flex: '50%'}}>
        <img  width='400' height='400'  src={homebg} />    
        </div>
    </div>
    </>
}
export default TwitterLogin;