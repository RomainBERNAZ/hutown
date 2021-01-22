import React from "react";
import { logout } from '../../actions/userActions'
import { useDispatch, useSelector} from 'react-redux'
import './header.css'

const Header = () => {

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
    const dispatch = useDispatch();

    //Gestion de la déconnexion de l'utilisateur.
    const handleLogout = () => {
        dispatch(logout());
    }

    return  ( 
        <div className="navbar">
            <div className="logo">
               <a href='/'>HUTOWN</a> 
            </div>
            <ul className="nav">
                <li><a title="Notre travail" href='/'>Notre travail</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href='/contact'>Contact</a></li>
                <li><a href=""><i className="fab fa-instagram"></i></a></li>
            { userInfo &&
                <li><a href="/" className="logout" onClick={handleLogout}>Logout</a></li>
            }
            </ul>
        </div>
    )
}

export default Header; 