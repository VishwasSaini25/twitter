import "../Global.css";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
const Navbar = () => {
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
            <div onClick={() => History('/usercategory')} className="navbrand">
                <h1>Creator Alias</h1>
            </div>
            <div className="nav-btns">
                <button onClick={() => {
                    handleLogout()
                }}
                style={location.pathname === "/login" || location.pathname === "/" ? {display: 'none'} : {display: 'block'}}
                >Logout</button>
            </div>
        </div>
    </>
}
export default Navbar;