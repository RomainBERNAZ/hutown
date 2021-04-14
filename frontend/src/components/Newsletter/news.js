import React, {useEffect} from "react";
import "./news.css";


const News = () => {


    const checkLocalStorage = () => {
    let modal = document.querySelector('.container')
        if(localStorage.blue === '1') {
        modal.style.display ='none'}
    }

    const closeModal = () => {
    let modal = document.querySelector('.container')

        if(localStorage.blue !== '1') {
            modal.classList.add('none')
            localStorage.blue='1';
            } 
        document.body.style.position = '';
        document.body.style.top = '';

    }
    useEffect(() => {
        checkLocalStorage();
    }, [])


    return(
        <div className="container">
            <form action="https://gmail.us1.list-manage.com/subscribe/post?u=d31346929d741d251edccca91&amp;id=58912d346e" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div className="title">
                <h2>Souhaitez-vous rejoindre notre newsletter ?</h2>
            </div>
            <i onClick={closeModal} className="far fa-window-close"></i>
            <input type="email"/>
            <button type="submit">CONFIRMER</button>
            </form>
        </div>
    )
}


export default News; 