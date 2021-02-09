import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { useDispatch, useSelector} from 'react-redux'
import './header.css'

const Header = () => {

    var mql = window.matchMedia('(max-width: 600px)');
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
    const dispatch = useDispatch();

    //Gestion de la déconnexion de l'utilisateur.
    const handleLogout = () => {
        dispatch(logout());
    }
    const showMenu = () => {
        const menu = document.querySelector('.nav-mobile');
        let toggle = true; 
        if(toggle){
            toggle=false;
            menu.style.display="none";
        }else {
            toggle=true;
            menu.style.display="block";
       }

    }



    useEffect(() => {
      if (mql.matches) {
          document.querySelector('.navbar').style.display="none"
          document.querySelector('.navbar-mobile').style.display="block"
      }else{
          document.querySelector('.navbar').style.display="block"
          document.querySelector('.navbar-mobile').style.display="none"
      }
    })
    


    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
  

    return  ( 
        <div>
        <div className="navbar">
            <div className="logo">
               <a href='/'>HIPPOLYTHE</a> 
            </div>
            <ul className="nav">
                <li><a title="Notre travail" href='/'>Notre travail</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href='/contact'>Contact</a></li>
                <li><a href="https://www.instagram.com/mh_hypo/?hl=fr"><i className="fab fa-instagram"></i></a></li>
                <li><a href="/panier"><i className="fas fa-shopping-cart"></i></a><span>{values.length}</span></li>
                
                { userInfo && 
                   <Link className='gestionLink' to={'/gestion'}><li className="gestionLink">Gestion</li></Link> }
                { userInfo &&
                    <li><a href="/" className="logout" onClick={handleLogout}>Logout</a></li>
                }
            </ul>
        </div>

        <div className="navbar-mobile">
            <div className="logo-mobile">
               <a href='/'>HIPPOLYTHE</a> 
            </div>
            <div id="menuToggle" onClick={showMenu}>
                <input type="checkbox" />
                <span></span>
                <span></span>
            </div>
            <ul className="nav-mobile" id="nav-mobile" >
                <li><a title="Notre travail" href='/'>Notre travail</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href='/contact'>Contact</a></li>
                { userInfo && 
                   <Link className='gestionLink' to={'/gestion'}><li className="gestionLink">Gestion</li></Link> }
                { userInfo &&
                    <li><a href="/" className="logout" onClick={handleLogout}>Logout</a></li>
                }
                <ul className="social-mobile">
                    <li><a href="https://www.instagram.com/mh_hypo/?hl=fr"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="/panier"><i className="fas fa-shopping-cart"></i></a><span>{values.length}</span></li>
                </ul>
            </ul>
            
        </div>
    </div>
    )
}

export default Header; 