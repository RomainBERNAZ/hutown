import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react'
import {useSelector} from 'react-redux'


import ModalPaiement from '../ModalPaiement/ModalPaiement'
import './Panier.css'

const Panier = () => {

    const [ imageIds, setImageIds ] = useState([]);
    const [ products, setProducts ] = useState([])
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
    

    let values = [], keys = Object.keys(localStorage), i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
    
    const checkNewsletter = () => {
    for( let i = 0; i < values.length; i++){ 
    
        if ( values[i] === '1') { 
    
            values.splice(i, 1); 
        }
    
    }
    }
    checkNewsletter();



    const arrayOfSize = []
    //Retourne les tailles dans un array.
    values.map( nb => {
        arrayOfSize.push(nb.slice(29).replace(/[[\]"]+/g,'').split('*').splice(0,1));
        return arrayOfSize;
    })

    const arrayOfPrice = []
    //Retourne les tailles dans un array.
    values.map( nb => {
        arrayOfPrice.push(nb.slice(29).replace(/[[\]"]+/g,'').split('*').pop());
        for(let i=0; i<arrayOfPrice.length;i++) arrayOfPrice[i] = parseInt(arrayOfPrice[i], 10);
        return arrayOfPrice;
    })
    const arrayOfQte= []
    //Retourne un tableau avec les quantités des produits dans le panier 
    values.map( qte => {
        arrayOfQte.push(qte.slice(27).replace(/[[\]"]+/g,'').split('-').splice(0,1));
        return arrayOfQte;
    })

    let sum = 0;
    for(let i=0; i< arrayOfPrice.length; i++) {
    sum += arrayOfPrice[i]*arrayOfQte[i];
}

    const clearLocalStorage = () => {
    setTimeout(() => {
      localStorage.clear();
        window.location.reload(false);
      }, 2050);
  }

    const loadImages = async () => {
        try {
            const res = await axios.get('/api/imagesShop');
            const data = await res.data;
            setImageIds(data)
        } catch (err) {
            console.error(err); 
        }
    };
    const deleteItemCart = (id, size) => {
        localStorage.removeItem(id+'/'+size);
        window.location.reload(false);
    }

    const openModalPaiement = () => {
        let modal = document.querySelector('.modal-paiement-container');
        modal.style.display="block";
    }

    const loadCart = async () => {
        try {
            const arrayOfId = []
            //Retourne un array avec les id des item dans le panier
            let idItem = values.join().substring(1).replace(/[[\]"]+/g,'').split(',');
            idItem.map( id =>{
                arrayOfId.push(id.split('/')[0].split(','))
                return arrayOfId;
            })
            let productsList = arrayOfId.map(async (id) => { 
                const result =  await axios.get('/api/products/' +id)
                    return result.data;
                })
                
            productsList = await Promise.all(productsList);
            setProducts(productsList)
        } catch (error) {
            console.log(error);
        }
    }
 
    useEffect(()  => {
        loadCart();
        loadImages();
    }, [])
 
    return (
        <div className="panier-container">
                <ModalPaiement/>
            <div className="liste-panier">
                <div className="title">
                  <h3>
                    PANIER
                  </h3>
                  { userInfo && 
                  <button onClick={clearLocalStorage}>
                    VIDER PANIER
                    </button> }
                </div>
                      <div className="liste-item" >
                        <ul>
                        { values.length === 0 ?
                        '':
                            <li>
                                <div className="nom-categorie-panier">
                                    <h4 className="nom-item-panier">PRODUIT</h4>
                                    <h4 className="image-item-panier">IMAGE</h4>
                                    <h4 className="taille-item-panier">TAILLE</h4>
                                    <h4 className="qte-item-panier">QTE</h4>
                                    <h4 className="prix-item-panier">PRIX</h4>
                                </div>
                            </li>}
                            { values.length === 0 ?
                            <div className="empty-cart">
                                <h2>Votre panier est vide</h2>
                                <h2>Venez visiter notre shop !</h2>
                                <h2>C'est par ici <a href="/shop"><i className="fas fa-store"></i></a></h2>
                            </div>
                            : products.map(item =>
                            <li className="ligne-item" key={Math.floor(Math.random() * Math.floor(15000))}>
                                <div className="liste-item-panier">
                                    <div className="title-item-panier">
                                       <span onClick={() => deleteItemCart(item._id, arrayOfSize[products.indexOf(item)])}>x</span> {item.name}
                                    </div>
                                    <div className="panier-image-container">
                                        {
                                            imageIds.map( imageId => {
                                                return JSON.stringify(imageId).includes(item.name) ?
                                            <Image  
                                                    key={imageId}
                                                    className="panier-image"
                                                    publicId={imageId}
                                                    cloudName='hippolythe'
                                                />:'' })
                                        }
                                    </div>
                                    <div className="size-item-panier">
                                        <span>{arrayOfSize[products.indexOf(item)]}</span>
                                    </div>
                                    <div className="qte-item-panier">
                                        <span>{arrayOfQte[products.indexOf(item)]}</span>
                                    </div>
                                    <div className="price-item-panier">
                                        <span>{arrayOfPrice[products.indexOf(item)]*arrayOfQte[products.indexOf(item)]} €</span>
                                    </div>
                                </div>
                            </li>)
                }
                        </ul>
                      </div>
        </div>
    { values.length === 0 ?
                        '':    
                       <div className="validation-paiement">
                            <h3 className="totalPrice">
                            TOTAL : {sum} €
                            </h3>
                            <button className="btn-paiement" onClick={openModalPaiement}>PAIEMENT</button>
                        </div>}
        </div>
    );
};

export default Panier;