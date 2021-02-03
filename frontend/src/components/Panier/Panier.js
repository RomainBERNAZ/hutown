import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react'
import './Panier.css'

const Panier = (props) => {

    const [ imageIds, setImageIds ] = useState([]);
    const [ products, setProducts ] = useState([])
    const [ cart, setCart ] = useState([])

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
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

    const deleteItemCart = (id) => {
        localStorage.removeItem(id);
        window.location.reload(false);
    }

    const loadCart = async () => {
        try {
            console.log(products);
            console.log(products.length);
            let testInput = values.join().substring(1).replace(/[[\]"]+/g,'').split(',');
            testInput.map( x => cart.push(x));
            let productsList = cart.map(async (id) => { 
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
            <div className="liste-panier">
                  <h3>
                    PANIER
                  </h3>
                      <div className="liste-item" >
                        <ul>
                        { products.length === 0 ?
                        '':
                            <li>
                                <div className="nom-categorie-panier">
                                    <h4 className="nom-item-panier">PRODUIT</h4>
                                    <h4 className="image-item-panier">IMAGE</h4>
                                    <h4 className="qte-item-panier">QTE</h4>
                                    <h4 className="prix-item-panier">PRIX</h4>
                                </div>
                            </li>}
                            { products.length === 0 ?
                            <div>Le panier est vide</div>
                            : products.map(item =>
                            <li className="ligne-item" key={Math.floor(Math.random() * Math.floor(1550000))}>
                                <div className="liste-item-panier">
                                    <div className="title-item-panier">
                                       <span onClick={() => deleteItemCart(item._id)}>x</span> {item.name}
                                    </div>
                                    <div className="panier-image-container">
                                        {
                                            imageIds.map( imageId => {
                                                return JSON.stringify(imageId).includes(item.name) ?
                                            <Image
                                                    key={imageId}
                                                    className="panier-image"
                                                    publicId={imageId}
                                                    cloudName='drefurx4l'
                                                />
                                                :'' })
                                        }
                                    </div>
                                    <div className="panier-qte">
                                        
                                    </div>
                                    <div className="prix-produit">
                                        {item.price} €
                                    </div>
                                </div>
                            </li>)
                }
                        </ul>
                      </div>
                      { products.length === 0 ?
                        '':    
                <h3 className="totalPrice">
                TOTAL : {products.reduce((a, c) => a + c.price, 0)} €
                </h3>}
    </div>
        </div>
    );
};

export default Panier;