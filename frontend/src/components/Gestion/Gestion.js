import React from 'react';
import './Gestion.css'

const Gestion = () => {


    const handleGestionFirst = () => {
        
    }



    return (
        <div className="gestion">
                <form className="first-section" onSubmit={handleGestionFirst}>
                    <h2>Première Page</h2>
                    <div className="titre-menu">
                        <h3>TITRE DU MENU</h3>
                        <input type="text" name="" id=""/>
                    </div>
                    <div className="main-photo">
                        <h3>PHOTO PRINCIPALE</h3>
                        <img src="" alt=""/>
                        <input type="file" name="" id=""/>
                    </div>
                    <div className="multiple-photo">
                        <h3>PHOTOS DE LA PAGE</h3>
                        <input type="file" name="" id=""/>
                    </div>  
                    <div className="text-photo">
                        <h3>TEXTE DESCRIPTIF</h3>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button>VALIDER</button>
                </form>

                <div className="first-section">
                    <h2>Deuxième Page</h2>
                    <div className="titre-menu">
                        <h3>TITRE DU MENU</h3>
                        <input type="text" name="" id=""/>
                    </div>
                    <div className="main-photo">
                        <h3>PHOTO PRINCIPALE</h3>
                        <img src="" alt=""/>
                        <input type="file" name="" id=""/>
                    </div>
                    <div className="multiple-photo">
                        <h3>PHOTOS DE LA PAGE</h3>
                        <input type="file" name="" id=""/>
                    </div>  
                    <div className="text-photo">
                        <h3>TEXTE DESCRIPTIF</h3>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <div className="first-section">
                    <h2>Troisième Page</h2>
                    <div className="titre-menu">
                        <h3>TITRE DU MENU</h3>
                        <input type="text" name="" id=""/>
                    </div>
                    <div className="main-photo">
                        <h3>PHOTO PRINCIPALE</h3>
                        <img src="" alt=""/>
                        <input type="file" name="" id=""/>
                    </div>
                    <div className="multiple-photo">
                        <h3>PHOTOS DE LA PAGE</h3>
                        <input type="file" name="" id=""/>
                    </div>  
                    <div className="text-photo">
                        <h3>TEXTE DESCRIPTIF</h3>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
        </div>
    );
};

export default Gestion;