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
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';
init("user_r3SpDDPv18OmWrSh8zTIY");



const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;




const ModalPaiement = (listProducts) => {

    const [ deliveryPrice, setDeliveryPrice] = useState('0');
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const message = []

    const stripe = useStripe();
    const elements = useElements();
    
    const [ products, setProducts ] = useState([])

    let values = [], keys = Object.keys(localStorage), i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
        let listeDesProduits = []

        values.forEach(element => {
            listeDesProduits.push(JSON.parse(element))
        });
    
        const merged = [].concat.apply([], listeDesProduits);

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
          merged.map( nb => {
              arrayOfSize.push(nb.taille);
              return arrayOfSize;
          })
          const arrayOfPrice = []
          //Retourne les tailles dans un array.
          merged.map( nb => {
                  arrayOfPrice.push(nb.prix);
              for(let i=0; i<arrayOfPrice.length;i++) arrayOfPrice[i] = parseInt(arrayOfPrice[i], 10);
              return arrayOfPrice;
          })
          const arrayOfQte= []
          //Retourne un tableau avec les quantités des produits dans le panier 
          merged.map( qte => {
              arrayOfQte.push(qte.quantite);
              return arrayOfQte;
          })
      
          let sum = 0;
          for(let i=0; i< arrayOfPrice.length; i++) {
          sum += arrayOfPrice[i]*arrayOfQte[i];
      }
          const arrayOfId = []
          //Retourne un array avec les id des item dans le panier
          merged.forEach( id =>{
              arrayOfId.push(id.idObject)
              return arrayOfId;
          })

    let sumDelivery = sum + parseInt(deliveryPrice);

    const closeModal = () => {
      let modal = document.querySelector('.modal-paiement-container')
      document.body.style.position = '';
      document.body.style.top = '';
      modal.style.display='none';
    }

    const sendFeedback = (templateId, variables) => {

      emailjs
        .send("service_dwbtqpg", templateId, variables)
        .then((res) => {
          console.log('success !');
        })
        .catch(
          (err) =>
            document.querySelector('.form-message').innerHTML =
              "Une erreur s'est produite, veuillez réessayer.")
    };



    const handleSubmit = () => {
      sendFeedback("template_dkqc1vg", {
          message
        });
      
      
    };

    
  

    const loadCart = async () => {
      try {
          const arrayOfId = []
          //Retourne un array avec les id des item dans le panier
          merged.map( id =>{
              arrayOfId.push(id.idObject)
              return arrayOfId;
          })
          let productsList = arrayOfId.map(async (produitId) => { 
              const result =  await axios.get('/api/products/'+produitId)
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
    window.location.href = '/confirmation'
    }, 2050);
}

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();
     
    products.map(item =>
      message.push("Acheteur: "+ev.target.name.value +" / "+
                   "Adresse : " + ev.target.line1.value+" "+ev.target.zip.value+" "+ev.target.city.value+ " / " +
                   "Email: " +ev.target.email.value+" / "+
                   "Telephone: " +ev.target.telephone.value+" / "+
                   "Nom du produit: " + item.name + " / " +
                   "Taille :" + (arrayOfSize[products.indexOf(item)]).toString() + " / "+
                   "Quantité :" + (arrayOfQte[products.indexOf(item)]).toString()+"  "
      ))

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.line1.value,
        postal_code: ev.target.zip.value
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");
    
    try {
      const { data: clientSecret } = await axios.post("/api/pay", {
        amount: sum * 10 + deliveryPrice,
        description:  "Article: "+ products.map( item => item.name +" - Taille: "+(arrayOfSize[products.indexOf(item)]).toString()+" - Quantité: "+(arrayOfQte[products.indexOf(item)]).toString()+" "),
        receipt_email: billingDetails.email
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      
      const validationEmailClient = () => {
        sendFeedback("template_uldur75", {
          email: ev.target.email.value,
          article: products.map( item => item.name)
        });
      }
      validationEmailClient()


      handleSubmit()
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

    return (
        <div className="modal-paiement-container">
            <div className="paiement-container">
                <div className="first-block-paiement">
                    <div className="paiement-recap">
                        <div className="title-recap">
                            <h2>RÉCAPITULATIF COMMANDE</h2>
                            <div className="close-modal">
                    <i onClick={closeModal} className="far fa-window-close"></i>
                </div>
                        </div>
                    <ul>
                            { listProducts.length === 0 ?
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
                      <option value='0'>Choisir un pays</option>
                      <option value='0' >France</option>
                      <option value='8'>Reste du monde</option>
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