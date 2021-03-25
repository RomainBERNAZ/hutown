import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { saveProduct, listProducts } from '../../actions/productActions'
import './modal.css'

const Modal = (props) => {

    const [ name, setName ] = useState('');
    const [ priceS, setPriceS ] = useState('');
    const [ priceM, setPriceM ] = useState('');
    const [ priceL, setPriceL ] = useState('');
    const [ priceX, setPriceX ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ selectedFile, setSelectedFile] = useState();
    const [ previewSource, setPreviewSource] = useState('');
    const [ fileInputState, setFileInputState] = useState('');
    const [ lieu, setLieu ] = useState('')
    const [ livraison, setLivraison ] = useState('')
    const [ papier, setPapier ] = useState('')


    const productSave = useSelector(state => state.productSave);
    const {loading : loadingSave, success: successSave, error: errorSave} = productSave;
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        handleSubmitFile();
        dispatch(saveProduct({name, priceS, priceM, priceL, priceX, description, lieu, papier, livraison}))
    }
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = () => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios.post('/api/uploadShop', JSON.stringify({ data: base64EncodedImage,
            id: name }), {
                headers: { 'Content-Type': 'application/json' }
            });
            setFileInputState('');
            setPreviewSource('');
            setTimeout(function(){
                window.location.reload(false);}, 1500);
                alert("Le produit à bien été ajouté !")
            
        } catch (err) {
            console.error(err);
        }
    };
    

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
                    <div className="informationscontainer">
                    <h3>INFORMATIONS</h3>
                        <div className="modal-name">
                            <p className="titreModal">Nom :</p>
                            <input type="text" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="modal-description">
                            <p className="titreModal">Description :</p>
                            <textarea name="" id="" cols="20" rows="10" onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="modal-lieu">
                            <p className="titreModal">Lieu :</p>
                            <input type="text" onChange={(e) => setLieu(e.target.value)} required/>
                        </div>
                        <div className="modal-papier">
                            <p className="titreModal">Papier :</p>
                            <input type="text" onChange={(e) => setPapier(e.target.value)} required/>
                        </div>
                        <div className="modal-livraison">
                            <p className="titreModal">Livraison :</p>
                            <input type="text" onChange={(e) => setLivraison(e.target.value)} required/>
                        </div>
                        <div className="modal-image">
                            <p className="titreModal">Image:</p>
                            <input className="inputFile" type="file" value={fileInputState} onChange={handleFileInputChange} required/>

                        </div>
                        <div className="modal-submit">
                            <button type="submit">SAVE</button>
                        </div>
                        
                    </div>
                    <div className="pricecontainer">
                        <h3>PRIX</h3>
                        <div className="modal-price-size">
                            <span>15x15 :</span>
                            <input type="number" onChange={(e) => setPriceS(e.target.value)} />
                        </div>
                        <div className="modal-price-size">
                            <span>20x20 :</span>
                            <input type="number" onChange={(e) => setPriceM(e.target.value)} />
                        </div>
                        <div className="modal-price-size">
                            <span>30x45 :</span>
                            <input type="number" onChange={(e) => setPriceL(e.target.value)} />
                        </div>
                        <div className="modal-price-size">
                            <span>40x60 :</span>
                            <input type="number" onChange={(e) => setPriceX(e.target.value)} />
                        </div>
                        <div className="previewImage">
                            {previewSource &&
                                <img src={previewSource} alt=""/>
                            }
                        </div>
                    </div>
                    
                    
                    
                </form>
            </div>
        </div>
    );
};

export default Modal;