import React, { useEffect, useState } from "react";
import "./news.css";


const News = () => {

    const closeModal = () => {
        let modal = document.querySelector('.container')
        document.body.style.position = '';
        document.body.style.top = '';
        modal.style.display='none';
    }


    return(
        <div className="container">
            <div className="title">
                <h2>Souhaitez-vous rejoindre notre newsletter ?</h2>
                <i onClick={closeModal} className="far fa-window-close"></i>
            </div>
            <input type="email"/>
            <button type="submit">CONFIRMER</button>
        </div>
    )
}


export default News; 