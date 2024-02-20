import BackgroundImages from './BackgroundImages';
const homebg = require("../images/homebg.jpg");
const TwitterLogin = () => {
    
    const handleTwitterLogin = () => {
        window.location.href = "http://localhost:5000/auth/twitter";
    };
    return <>
        <BackgroundImages />
    <div className="home-section">
        <div style={{flex: '50%'}} className="home-heading">
            <h1 style={{fontSize: '2.5rem',fontWeight: '800',letterSpacing: '1px'}}>Hey, Creators👋</h1>
            <h2 style={{fontSize: '2.5rem',fontWeight: '600',letterSpacing: '1px'}}>Making creator's life easy</h2>
            <h5 style={{fontSize: '1rem',letterSpacing: '1px'}}>Creator alias is a unique platform designed to streamline the process
             of content creation, review, and social media publishing. Our tool empowers editors to submit content for 
             review, and administrators to approve it for tweeting, ensuring only the best content makes it to your audience.</h5>
            <button onClick={handleTwitterLogin}>Login with Twitter</button>
        </div>
        <div className='home-heading-image' style={{flex: '50%'}}>
        <img  width='400' height='400' src={homebg} alt="creator" />    
        </div>
    </div>
    </>
}
export default TwitterLogin;