import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { useDispatch, useSelector} from 'react-redux'
import './header.css'

const Header = () => {

    const mql = window.matchMedia('(max-width: 600px)');
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
    const dispatch = useDispatch();

    //Gestion de la déconnexion de l'utilisateur.
    const handleLogout = () => {
        dispatch(logout());
    }
    const showMenu = () => {
        const menu = document.getElementById('nav-mobile');
        if (menu.style.opacity === '1') {
            menu.style.opacity = '0';
            setTimeout(function(){
                menu.style.display='none'}, 200);
          } else {
            menu.style.display='block'
            setTimeout(function(){
            menu.style.opacity = '1';
        },100)
          }
    }
    useEffect(() => {
      if (mql.matches) {
          document.querySelector('.navbar').style.display="none"
          document.querySelector('.navbar-mobile').style.display="block"
      }else{
          document.querySelector('.navbar').style.display="block"
          document.getElementById('menuToggle').style.display='none'
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
               <a id="logo-mobile" href='/'>HIPPOLYTHE</a>
               <h2>Artistic Platform</h2>
            </div>
            <ul className="nav">
                <li><a title="Notre travail" href='/'>Notre travail</a></li>
                <li><a href='/histoire'>Histoire</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href='/contact'>Contact</a></li>
                <li><a href="https://www.instagram.com/hippolythe._/" target="_blank"><i className="fab fa-instagram"></i></a></li>
                <li><a href="/panier"><i className="fas fa-shopping-cart"></i></a><span>{values.length}</span></li>
                
                { userInfo && 
                   <Link className='gestionLink' to={'/gestion'}><li className="gestionLink">Gestion</li></Link> }
                { userInfo &&
                    <li><a href="/" className="logout" onClick={handleLogout}>Logout</a></li>
                }
            </ul>
        </div>
        <div className="mobile-container">
            <div className="navbar-mobile" id='navbar-mobile'>
                <div className="logo-mobile">
                   <a href='/'>HIPPOLYTHE</a>
                   <h2>Artistic Platform</h2>
                </div>
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