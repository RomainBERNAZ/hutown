import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import { listProducts } from "../../actions/productActions";
import { motion } from "framer-motion"
import CookieConsent from "react-cookie-consent";
import './main.css'

const Main = () => {

    
    const [ background, setBackground ]= useState('');

    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;
    const mql = window.matchMedia('(max-width: 600px)');
 
    const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }

    const dispatch = useDispatch();

      function randomNumber(max) {
          return Math.floor(Math.random() * max);
      }

    function changeBackground(artiste)  {
        const produitsTest = products.filter( item => item.artiste.includes(artiste));
        setBackground(produitsTest[randomNumber(5)].image)
        document.getElementById("backgroundImage").style.opacity = 1;
        console.log(background);
    }

    function hideBackground() {
        document.getElementById("backgroundImage").style.opacity = 0;
    }
    
    useEffect(() => {
        dispatch(listProducts());
        dispatch(listPages());   
    },[])

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:  
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity:1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 2 }}>
            <div className="main" id="main">
                <motion.div  initial="hidden" 
                       animate="visible" 
                       className="window">
                </motion.div>
                <div exit={{ opacity: 1 }} transition={transition} className="window"></div>
                <CookieConsent
                  location="bottom"
                  buttonText="J'accepte"
                  cookieName="myAwesomeCookieName2"
                  style={{ background: "black" }}
                  buttonStyle={{ color: "white", fontSize: "13px" }}
                  expires={150}
                >
                  Ce site web utilise des cookies pour une meilleure expérience utilisateur.{" "}
                </CookieConsent>

            <Image
                id="backgroundImage"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={background}
                width="1600"
                crop="scale"/>
                
                    <ul >
                        {pages.map(page  => {
                            return page.category ==='first' ?
                            <li id="hustle" key={page._id} >
                                    <a href='/artiste_1'>
                                        <button onMouseEnter={() => changeBackground(page.title)}
                                                onMouseLeave={() => hideBackground()}>
                                                {page.title}
                                        </button>
                                    </a>
                            </li>: ''})
                        }
                        {pages.map(page  => {
                            return page.category ==='second' ?
                            <li id="guest" key={page._id}>
                                    <a href='/artiste_2'>
                                        <button onMouseEnter={() => changeBackground(page.title)}
                                                onMouseLeave={() => hideBackground()}>
                                                {page.title}
                                        </button>
                                    </a>
                            </li>: ''})}
                        {pages.map(page  => {
                            return page.category ==='third' ?
                            <li id="out" key={page._id}>
                                    <a href='/artiste_3'>
                                        <button onMouseEnter={() => changeBackground(page.title)}
                                                onMouseLeave={() => hideBackground()}>
                                                {page.title}
                                        </button>
                                    </a>
                            </li>: ''})}
                    </ul>
                
                    <ul className="old-pictures">
                        {pages.map(page  => {
                            return page.category ==='four' ?
                            <li id="four" key={page._id}>
                                <a href='/artiste_4'>
                                    <button onMouseEnter={() => changeBackground(page.title)}
                                            onMouseLeave={() => hideBackground()}>
                                            {page.title}
                                    </button>
                                </a></li>: ''})}
                        
                        
                        {pages.map(page  => {
                            return page.category ==='five' ?
                            <li id="five" key={page._id}>
                                <a href='/artiste_5'>
                                    <button onMouseEnter={() => changeBackground(page.title)}
                                            onMouseLeave={() => hideBackground()}>
                                            {page.title}
                                    </button>
                                </a></li>: ''})}
                        
                        
                        {pages.map(page  => {
                            return page.category ==='six' ?
                            <li id="six" key={page._id}>
                                <a href='/artiste_6'>
                                    <button onMouseEnter={() => changeBackground(page.title)}
                                            onMouseLeave={() => hideBackground()}>
                                            {page.title}
                                    </button>
                                </a></li>: ''})}
                        
                        
                        {pages.map(page  => {
                            return page.category ==='seven' ?
                            <li id="seven" key={page._id}>
                                <a href='/artiste_7'>
                                    <button onMouseEnter={() => changeBackground(page.title)}
                                            onMouseLeave={() => hideBackground()}>
                                            {page.title}
                                    </button>
                                </a></li>: ''})}   
                    </ul>

                    </div>
                    </motion.div>
    )
}

export default Main;