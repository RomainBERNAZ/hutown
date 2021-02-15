import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import './ModalPaiement.css'


const ModalPaiement = () => {

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
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

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
      loadCart();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
 

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
                <form id="payment-form" className="paiement-information" onSubmit={handleSubmit}>
                  <fieldset className="FormInformation">
                    <div className="name-info">
                      <h3>Nom & Prénom</h3>
                      <input type="text" placeholder="Locke John"/>
                    </div>
                    <div className="country-info">
                      <h3>Pays</h3>
                      <select name="" id="">
                        <option value="DEFAULT">Choisir une valeur</option>
                        <option value="FRANCE">France</option>
                        <option value="EUROPE">Europe</option>
                        <option value="RESTE DU MONDE">Reste du monde</option>
                      </select>
                    </div>
                    <div className="adresse-info">
                      <h3>Adresse</h3>
                      <input type="text" placeholder="N° et nom de rue"/>
                      <input type="text" placeholder="Bâtiment, appartement, lot, etc. (facultatif)"/>
                    </div>
                    <div className="city-info">
                      <h3>Ville</h3>
                      <input type="text" placeholder="Nantes"/>
                    </div>
                    <div className="codepostal-info">
                      <h3>Code Postal</h3>
                      <input type="text" placeholder="44000"/>
                    </div>
                    <div className="mail-info">
                      <h3>Email</h3>
                      <input type="text" placeholder="mail@mail.com"/>
                    </div>
                  </fieldset>
                  <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                  <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                  >
                    <span id="button-text">
                      {processing ? (
                        <div className="spinner" id="spinner"></div>
                      ) : (
                        "Pay now"
                      )}
                    </span>
                  </button>
                  {/* Show any error that happens when processing the payment */}
                  {error && (
                    <div className="card-error" role="alert">
                      {error}
                    </div>
                  )}
                  {/* Show a success message upon completion */}
                  <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a
                      href={`https://dashboard.stripe.com/test/payments`}
                    >
                      {" "}
                      Stripe dashboard.
                    </a> Refresh the page to pay again.
                  </p>
                </form>
                
            </div>
        </div>
    );
};

export default ModalPaiement;