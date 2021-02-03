import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { saveProduct, listProducts } from '../../actions/productActions'
import './modal.css'

const Modal = (props) => {

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ selectedFile, setSelectedFile] = useState();
    const [ previewSource, setPreviewSource] = useState('');
    const [ fileInputState, setFileInputState] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')

    const productSave = useSelector(state => state.productSave);
    const {loading : loadingSave, success: successSave, error: errorSave} = productSave;
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({name, price, description}))
        handleSubmitFile();
        closeModal();
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
            setErrMsg('something went wrong!');
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
            setSuccessMsg('Image uploaded successfully');
            console.log(name, 'affichage du nom');
            setTimeout(function(){
                window.location.reload(false);}, 1000);
                //alert("Chargement de l'image effectué")
            
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
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
                        <input type="file" value={fileInputState} onChange={handleFileInputChange}/>
                        
                    </div>
                    <div className="previewImage">
                        {previewSource &&
                            <img src={previewSource} alt=""/>
                        }
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