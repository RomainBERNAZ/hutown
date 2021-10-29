import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { saveProduct, listProducts } from '../../actions/productActions'
import './modal.css'

const Modal = () => {

    const [ name, setName ] = useState('');
    const [ priceS, setPriceS ] = useState('');
    const [ priceM, setPriceM ] = useState('');
    const [ pages, setPages ] = useState([]);
    const [ sizeS, setSizeS ] = useState('');
    const [ sizeM, setSizeM ] = useState('');
    const [ image, setImage ] = useState('');
    const [ artiste, setArtiste ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ selectedFile, setSelectedFile] = useState();
    const [ previewSource, setPreviewSource] = useState('');
    const [ fileInputState, setFileInputState] = useState('');

    const productSave = useSelector(state => state.productSave);
    const {loading : loadingSave, /* success: successSave ,*/ error: errorSave} = productSave;
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({name, image,  price:{
                      Small: priceS,
                      Medium: priceM
                  },
                  size:{
                      Small:  sizeS,
                      Medium: sizeM, 
                  }, description, artiste}))
    }
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const max_Size = 2000000
        const reader = new FileReader();
        if( file && file.size < max_Size){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                uploadImage(reader.result);
                setPreviewSource(reader.result);
            };
        }
        else{
            alert('Fichier trop grand, ça passera pas !')
        }
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios.post('/api/uploadShop', JSON.stringify({ data: base64EncodedImage,
            id: name }), {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( res => {
                console.log(res.data.uploadResponse.public_id);
                setImage(res.data.uploadResponse.public_id)
            });
        } catch (err) {
            console.error(err);
        }
    };
    

    const closeModal = () => {
        let modal = document.getElementById('modal');
        document.body.style.position = '';
        document.body.style.top = '';
        modal.style.display='none';
    }

    const handleListPage = async (e) => {
        try {
            const res = await axios.get('/api/pages/');
            const data = await res.data;
            setPages(data);
            setArtiste(data[0].title);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        handleListPage();
    }, [])

    return (
        <div className="modal" id='modal'>
            <div className="modal-container">
                {loadingSave && <div>Loading...</div> }
                {errorSave && <div>Erreur</div> }
                <div className="close-modal">
                    <i onClick={closeModal} className="far fa-window-close"></i>
                </div>
                <form className="modal-body" onSubmit={submitHandler}>
                    <div className="informationscontainer">
                    <h3>INFORMATIONS</h3>
                        <div className="modal-name">
                            <p className="titreModal">Titre :</p>
                            <input type="text" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="modal-description">
                            <p className="titreModal">Description :</p>
                            <textarea name="" id="" cols="20" rows="10" onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="modal-serie">
                            <p className="titreModal">Artiste :</p>
                            { pages != null ?
                            <select name="" id="" onChange={(e) => setArtiste(e.target.value)}>
                               {pages.map((page) => (
                                   <option>{page.title}</option>))}
                            </select>:""}
                        </div>
                        <div className="modal-image">
                            <p className="titreModal">Image:</p>
                            <input className="inputFile" type="file" value={fileInputState} onChange={handleFileInputChange} required/>

                        </div>
                        <div className="modal-submit">
                            <button type="submit">Ajouter le produit</button>
                        </div>
                        
                    </div>
                    <div className="sizePrice">
                        <div className="sizecontainer">
                            <h3>TAILLES</h3>
                            <div className="modal-price-size">
                                <span>Small :</span>
                                <input type="texte" placeholder="15x15" onChange={(e) => setSizeS(e.target.value)} />
                            </div>
                            <div className="modal-price-size">
                                <span>Medium :</span>
                                <input type="texte" placeholder="15x15" onChange={(e) => setSizeM(e.target.value)} />
                            </div>
                        </div>
                        <div className="pricecontainer">
                            <h3>PRIX</h3>
                            <div className="modal-price-size">
                                <span>Small :</span>
                                <input type="number" onChange={(e) => setPriceS(e.target.value)}/>
                            </div>
                            <div className="modal-price-size">
                                <span>Medium :</span>
                                <input type="number" onChange={(e) => setPriceM(e.target.value)} />
                            </div>
                            <div className="previewImage">
                                {previewSource &&
                                    <img src={previewSource} alt=""/>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;