import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {CardElement, ElementsConsumer, useStripe, useElements} from '@stripe/react-stripe-js';
import './ModalPaiement.css'


const ModalPaiement = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [ products, setProducts ] = useState([])
    let values = [], keys = Object.keys(localStorage), i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
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




  const handleSubmit = async (event) => {
    event.preventDefault();

    const {stripe, elements} = this.props;

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };








  useEffect(()  => {
      loadCart();
  }, [])


    return (
        <div className="modal-paiement-container">

            <div className="paiement-container">
                <div className="first-block-paiement">
                    <div className="paiement-recap">
                        

                        <div className="title-recap">
                            <h2>RECAP COMMANDE</h2>
                        </div>
                    <ul>
                            { products.length === 0 ?
                            '':
                                <li>
                                    <div className="nom-categorie-panier">
                                        <h4 className="nom-item-panier">PRODUIT</h4>
                                        <h4 className="taille-item-panier">TAILLE</h4>
                                        <h4 className="qte-item-panier">QTE</h4>
                                        <h4 className="prix-item-panier">PRIX</h4>
                                    </div>
                                </li>}
                                { products.length === 0 ?
                                <div>Le panier est vide</div>
                                : products.map(item =>
                                <li className="ligne-item" key={Math.floor(Math.random() * Math.floor(15000))}>
                                    <div className="liste-item-panier">
                                        <div className="title-item-panier">
                                            {item.name}
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
                            <h3 className="totalPrice">
                            TOTAL : {sum} €
                            </h3>
                    </div>
                </div>
               <form className="paiement-information" onSubmit={handleSubmit}>
                  <div className="credit-card">
                  <div className="credit-card-information">
                       <h2>COORDONNÉES BANCAIRE</h2>
                   </div>
                   <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                    />
                    <button type="submit" disabled={!stripe}>
                            Payer {sum}€
                    </button>
                  </div>
                </form>
            </div>
        </div>
    );
};

export default ModalPaiement;