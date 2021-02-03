import React, { useState} from 'react';
import emailjs from 'emailjs-com'
import './Contact.css'
import{ init } from 'emailjs-com';
init("user_r3SpDDPv18OmWrSh8zTIY");

const Contact =() => {

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const isEmail = () => {
      
      let mail = document.getElementById('not-mail');
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (email.match(regex)) {
        mail.style.display="none";
        return true;
      }else {
        mail.style.display='block'
        mail.style.opacity='1'
        mail.style.animation='dongle 1s'
        setTimeout(() => {
          mail.style.animation="none"
          mail.style.opacity='0'
        },3500)
        return false;
      }
    }

    const failMessage = () => {
      let formMess = document.querySelector('.form-message');
      formMess.innerHTML = 'Merci de vérifier les champs requis.'
      formMess.style.opacity='1';
      setTimeout(() => {
        formMess.style.opacity='0'
      },3500)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(name && isEmail() && message) {
          sendFeedback("template_dkqc1vg", {
            name,
            company,
            phone,
            email,
            message,
          });
        }else {
          failMessage();
        }
        
      };

      const sendFeedback = (templateId, variables) => {

        emailjs
          .send("service_dwbtqpg", templateId, variables)
          .then((res) => {
            console.log('success !');
            setName("");
            setCompany("");
            setPhone("");
            setEmail("");
            setMessage("");
          })
          .catch(
            (err) =>
              document.querySelector('.form-message').innerHTML =
                "Une erreur s'est produite, veuillez réessayer.")
      };

    return (
         <form className="contact">
            <div className="form-content">
              <h2>CONTACTEZ-NOUS</h2>
              <input
                required
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom*"
                value={name}
                autoComplete="off"
              />
              <input
                type="text"
                id="company"
                name="company"
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Société"
                value={company}
              />
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Téléphone"
                value={phone}
              />
               <div className="email-content">
                <label id="not-mail">Email non valide</label>
                <input
                  type="mail"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email *"
                  value={email}
                  autoComplete="off"
                />
                </div>
              <textarea
                required
                id="message"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message*"
                value={message}
              />
              <button onClick={handleSubmit}>Confirmer</button>
        </div>
        <div className="form-message"></div>
      </form>
    )
}

export default Contact;