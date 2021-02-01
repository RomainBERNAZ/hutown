import React, { useEffect, useState }from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import './main.css'

const Main = () => {

    const [imageIds, setImageIds] = useState();
    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;

    const randomThird = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    const randomGuest = Math.floor(Math.random() * (29 - 15 + 1)) + 15;
    const random = Math.floor(Math.random() * (44 - 30 + 1)) + 30;
 
    const dispatch = useDispatch();

    const loadImages = async () => {
        try {
            const res = await axios.get('/api/images/');
            const data = await res.data;
            setImageIds(data);
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
            let firstLink = document.getElementById('hustle');
            let guestLink = document.getElementById('guest');
            let thirdLink = document.getElementById('out');
           
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
        }
        
        imageLoading();
        
       
    },[])

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:  
            <div className="main" id="main">
                

            { imageIds ?<Image
                id="backgroundImage"
                className="photoUpload"
                cloudName='drefurx4l'
                publicId={imageIds[random]}
                width="1600"
                crop="scale"/>:''}

            { imageIds ?<Image
                id="backgroundGuest"
                className="photoUpload"
                cloudName='drefurx4l'
                publicId={imageIds[randomGuest]}
                width="1600"
                crop="scale"/>:''}
            
            { imageIds ?<Image
                id="backgroundThird"
                className="photoUpload"
                cloudName='drefurx4l'
                publicId={imageIds[randomThird]}
                width="1600"
                crop="scale"/>:''}
                
                    <ul >
                    {pages.map(page  => {
                        return page.category ==='first' ?
                        <li id="hustle" key={page._id}><a href='/hustle'><button className="Hustle">{page.title}</button></a></li>: ''})}
                    {pages.map(page  => {
                        return page.category ==='second' ?
                        <li id="guest" key={page._id}><a href='/guest'><button id="Nick" className="Nick">{page.title}</button></a></li>: ''})}
                    {pages.map(page  => {
                        return page.category ==='third' ?
                        <li id="out" key={page._id}><a href='/third'><button id="Outdoors" className="Outdoors">{page.title}</button></a></li>: ''})}
                    </ul>
                
                

        </div>
    )
}

export default Main;