import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from "@emotion/styled";
import { CardElement, useStripe ,useElements } from "@stripe/react-stripe-js";
import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";
import './ModalPaiement.css'
import Rowcard from './prebuilt/Rowcard';
import ErrorPayment from './ErrorPayment';
import SuccessPayment from './SuccessPayment';



const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;




const ModalPaiement = () => {

    const [ deliveryPrice, setDeliveryPrice] = useState(0);
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();
    
    const [ products, setProducts ] = useState([])

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

    let sumDelivery = sum + parseInt(deliveryPrice);

    const closeModal = () => {
      let modal = document.querySelector('.modal-paiement-container')
      document.body.style.position = '';
      document.body.style.top = '';
      modal.style.display='none';
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

  const closeModalPaiement = () => {
    document.querySelector('.success-container').style.display="flex"
    setTimeout(() => {
    let modal = document.querySelector('.modal-paiement-container');
    modal.style.display="none";
    localStorage.clear();
      window.location.reload(false);
    }, 2050);
}

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        postal_code: ev.target.zip.value
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");
    
    try {
      const { data: clientSecret } = await axios.post("/api/pay", {
        amount: sum * 10 + deliveryPrice,
        receipt_email: billingDetails.email
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        console.log('ça pue');
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      
      closeModalPaiement();


      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "black",
      fontSize: "16px",
      iconColor: "gray",
      "::placeholder": {
        color: "gray"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };




  useEffect(() => {
      loadCart();
  }, []);

  

    return (
        <div className="modal-paiement-container">
            <div className="paiement-container">
                <div className="first-block-paiement">
                    <div className="paiement-recap">
                        <div className="title-recap">
                            <h2>RECAP COMMANDE</h2>
                            <div className="close-modal">
                    <i onClick={closeModal} className="far fa-window-close"></i>
                </div>
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
                <ErrorPayment/>
                <SuccessPayment/>
                <form id="payment-form" className="paiement-information" onSubmit={handleFormSubmit}>
                  <h3>INFORMATIONS PERSONNELLES</h3>
                  <h4>Dans le cadre d'une remise en main propre sur Paris "intra-muros", merci de l'indiquer dans informations complémentaires.</h4>
                  <Row>
                    <div id="info-perso">
                   <BillingDetailsFields />
                   <span>Pays (frais de livraison)</span>
                    <select className="" onChange={ (e) => setDeliveryPrice(e.target.value)}>
                      <option value="0">Choisir un pays</option>
                      <option value='0' >France</option>
                      <option value="8">Reste du monde</option>
                    </select>
                    </div>
                 </Row>
                    
                 
                 <Rowcard>
                   <CardElementContainer>
                     <CardElement
                       options={cardElementOpts}
                       onChange={handleCardDetailsChange}
                     />
                   </CardElementContainer>
                 </Rowcard>
                 {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
                 <Row>
                   {/* TIP always disable your submit button while processing payments */}
                   <SubmitButton disabled={isProcessing || !stripe}>
                     {isProcessing ? "Processing..." : `Payer ${sumDelivery}€`}
                   </SubmitButton>
                 </Row>
                </form>
                
            </div>
        </div>
    );
};

export default ModalPaiement;