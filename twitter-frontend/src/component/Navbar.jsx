import "../Global.css";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
const Navbar = () => {
    const icon = require('../images/icon.png')
    const History = useNavigate();
    let location = useLocation();
    const handleLogout = async () => {       
            await axios.post('http://localhost:5000/logout')
                .then(response => {
                    if (response.data) {
                        const deleteCookie = (cookieName) => {
                            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        };
                        deleteCookie(document.cookie);
                        History("/login");
                    } else {
                        History(null);
                    }
                }) 
                .catch(error => {
                    alert(error.response.data.error);
                });
    }
    return <>
        <div className="navbar">
            <div onClick={() => History(-1)} className="navbrand">
                <img src={icon} width="50" height="50" style={{marginRight: '10px'}} />
                <h1 style={{color: 'blueviolet'}}>Creator Alias</h1>
            </div>
            <div className="nav-btns">
                <button onClick={() => {
                    handleLogout()
                }}
                style={location.pathname === "/login" || location.pathname === "/" ? {display: 'none'} : {display: 'block'}}
                >Logout</button>
                <button className="history-btn" 
                style={location.pathname === "/login" || location.pathname === "/" ? {display: 'none'} : {display: 'block'}}
                onClick={() => History('/history')}
                >
                    History
                </button>
            </div>
        </div>
    </>
}
export default Navbar;