import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import CookieConsent from "react-cookie-consent";
import './main.css'

const Main = () => {

    
    const [imageIds, setImageIds] = useState();

    const [ first, setFirst ]= useState([]);
    const [ second, setSecond ]= useState([]);
    const [ third, setThird ]= useState([]);
    const [ four, setFour ] = useState([]);
    const [ five, setFive ] = useState([]);
    const [ six, setSix ] = useState([]);
    const [ all, setAll ]= useState([]);
    const [ randomImage, setRandomImage ]= useState([]);



    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;
    const mql = window.matchMedia('(max-width: 600px)');
 
    const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }

    const dispatch = useDispatch();

    const variants = { 
        hidden: { opacity: 1}, 
        visible: { 
          opacity: 0,
          zIndex:0,
          transition:{
            duration:1.2,
            ease: [0.7, 0, 0.84, 0],
          zIndex:{
            delay:1.2
          } 
          }
        } 
      }

    const loadImages = async () => {
        try {
            const res = await axios.get('/api/images/');
            const data = await res.data;
            setImageIds(data);
            setFirst(data.filter((id) => id.startsWith("first")))
            setSecond(data.filter((id) => id.startsWith("second")))
            setThird(data.filter((id) => id.startsWith("third")))
            setFour(data.filter((id) => id.startsWith("four")))
            setFive(data.filter((id) => id.startsWith("five")))
            setSix(data.filter((id) => id.startsWith("six")))
            setAll(data)
            setRandomImage(Math.floor(Math.random() * data.length - 1) + 1  )
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {


        dispatch(listPages());
         async function imageLoading(){
            await loadImages(); 
            let background = document.getElementById('backgroundImage');
            let backgroundGuest = document.getElementById('backgroundGuest');
            let backgroundThird = document.getElementById('backgroundThird');
            let backgroundFour = document.getElementById('backgroundFour');
            let backgroundFive = document.getElementById('backgroundFive');
            let backgroundSix = document.getElementById('backgroundSix');

            let firstLink = document.getElementById('hustle');
            let guestLink = document.getElementById('guest');
            let thirdLink = document.getElementById('out');
            let fourthLink = document.getElementById('four');
            let fifthLink = document.getElementById('five');
            let sixthLink = document.getElementById('six');
           
            firstLink.addEventListener('mouseover', () => {
                background.style.transition = '0.6s linear';
                background.style.opacity='1';
            })
            firstLink.addEventListener('mouseleave', () => {
                background.style.opacity='0';
             })

            guestLink.addEventListener('mouseover', () => {
                backgroundGuest.style.transition = '0.6s linear';
                backgroundGuest.style.opacity='1';
            })
            guestLink.addEventListener('mouseleave', () => {
                backgroundGuest.style.opacity='0';
             })

            thirdLink.addEventListener('mouseover', () => {
                backgroundThird.style.transition = '0.6s linear';
                backgroundThird.style.opacity='1';
            })
            thirdLink.addEventListener('mouseleave', () => {
                backgroundThird.style.opacity='0';
             })

            fourthLink.addEventListener('mouseover', () => {
                backgroundFour.style.transition = '0.6s linear';
                backgroundFour.style.opacity='1';
            })
            fourthLink.addEventListener('mouseleave', () => {
                backgroundFour.style.opacity='0';
             })

             fifthLink.addEventListener('mouseover', () => {
                backgroundFive.style.transition = '0.6s linear';
                backgroundFive.style.opacity='1';
            })
            fifthLink.addEventListener('mouseleave', () => {
                backgroundFive.style.opacity='0';
             })
             
            sixthLink.addEventListener('mouseover', () => {
                backgroundSix.style.transition = '0.6s linear';
                backgroundSix.style.opacity='1';
            })
            sixthLink.addEventListener('mouseleave', () => {
                backgroundSix.style.opacity='0';
             })
        } 

        async function mobileBackground(){
            await loadImages(); 
            let background = document.getElementById('backgroundMobile');
            background.style.opacity = '1'
            
        }
        if (mql.matches){
            mobileBackground()
        }else {
            imageLoading();
        }
        
       
    },[dispatch, mql.matches])

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
                       variants={variants} 
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

            { imageIds ?<Image
                id="backgroundImage"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={first[0]}
                width="1600"
                crop="scale"/>:''}

            { imageIds ?<Image
                id="backgroundGuest"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={second[0]}
                width="1600"
                crop="scale"/>:''}
            
            { imageIds ?<Image
                id="backgroundThird"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={third[0]}
                width="1600"
                crop="scale"/>:''}

            { imageIds ?<Image
                id="backgroundFour"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={four[0]}
                width="1600"
                crop="scale"/>:''}

            { imageIds ?<Image
                id="backgroundFive"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={five[0]}
                width="1600"
                crop="scale"/>:''}

            { imageIds ?<Image
                id="backgroundSix"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={six[0]}
                width="1600"
                crop="scale"/>:''}

            { imageIds ?<Image
                id="backgroundMobile"
                className="photoUpload"
                cloudName='hippolythe'
                publicId={all[randomImage]}
                width="1600"
                crop="scale"/>:''}
                
                    <ul >
                    {pages.map(page  => {
                        return page.category ==='first' ?
                        <li id="hustle" key={page._id}><Link params={pages} to='/hustle'><button className="Hustle">{page.title}</button></Link></li>: ''})}
                    {pages.map(page  => {
                        return page.category ==='second' ?
                        <li id="guest" key={page._id}><a href='/guest'><button id="Nick" className="Nick">{page.title}</button></a></li>: ''})}
                    {pages.map(page  => {
                        return page.category ==='third' ?
                        <li id="out" key={page._id}><a href='/third'><button id="Outdoors" className="Outdoors">{page.title}</button></a></li>: ''})}
                    </ul>
                
                    <ul className="old-pictures">
                    {pages.map(page  => {
                        return page.category ==='four' ?
                        <li id="four" key={page._id}><a href='/four'><button className="Hustle">{page.title}</button></a></li>: ''})}
                    {pages.map(page  => {
                        return page.category ==='five' ?
                        <li id="five" key={page._id}><a href='/five'><button id="Nick" className="Nick">{page.title}</button></a></li>: ''})}
                    {pages.map(page  => {
                        return page.category ==='six' ?
                        <li id="six" key={page._id}><a href='/six'><button id="Outdoors" className="Outdoors">{page.title}</button></a></li>: ''})}
                    </ul>
                

                    </div>
                    </motion.div>
    )
}

export default Main;