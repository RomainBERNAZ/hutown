import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { saveProduct, listProducts } from '../../actions/productActions'
import './modal.css'

const Modal = (props) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const productSave = useSelector(state => state.productSave);
    const {loading : loadingSave, success: successSave, error: errorSave} = productSave;

    
    const dispatch = useDispatch();

    useEffect(() => {

    })

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({name, price, description, image}))
        closeModal();
    }

    

    const closeModal = () => {
        let modal = document.getElementById('modal');
        document.body.style.position = '';
        document.body.style.top = '';
        modal.style.display='none';
        dispatch(listProducts());
    }



    return (
        <div className="modal" id='modal'>
            <div className="modal-container">
                {loadingSave && <div>Loading...</div> }
                {errorSave && <div>Erreur</div> }
                <div className="close-modal">
                    <i onClick={closeModal} className="far fa-window-close"></i>
                </div>
                <div className="title-modal">
                    <h2>Ajouter produit</h2>
                </div>
                <form className="modal-body" onSubmit={submitHandler}>
                    <div className="modal-name">
                        <p className="titreModal">Nom:</p>
                        <input type="text" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="modal-price">
                        <p className="titreModal">Price:</p>
                        <input type="number" onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="modal-description">
                        <p className="titreModal">Description:</p>
                        <textarea name="" id="" cols="40" rows="15" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="modal-image">
                        <p className="titreModal">Image:</p>
                        <input type="text" onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div className="modal-submit">
                        <button type="submit">SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;