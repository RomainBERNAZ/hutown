import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react'
import axios from 'axios'
import './Tableau.css'

const Tableau = () => {

    const [ fileInputState, setFileInputState] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')
    const [ folder, setFolder ] = useState('');
    const [ selectedFile, setSelectedFile] = useState();
    const [ previewSource, setPreviewSource] = useState('');

    const [imageIds, setImageIds] = useState();
    const regex = /^first/;
    const regexSecond = /^second/;
    const regexThird = /^third/;


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

    const handleSubmitFile = (e) => {
        e.preventDefault();
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
            await axios.post('/api/upload', JSON.stringify({ data: base64EncodedImage,
            cat: folder }), {
                headers: { 'Content-Type': 'application/json' }
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
            setTimeout(function(){
                window.location.reload(false);}, 1000);
                alert("Chargement de l'image effectué")
            
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    const deleteImage = async (imageId) => {
        console.log(imageId);
        try {
            await axios.post('/api/destroy', {imageId}, {
                headers: { 'Content-Type': 'application/json' }
            });
            loadImages();
            alert('Suppression réussie')
        } catch (err) {
            console.error(err);
        }
    };
    const loadImages = async () => {
        try {
            const res = await axios.get('/api/images/');
            const data = await res.data;
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);



    return (
        <div className="gestion-tableau">

                <form className="picture-section" onSubmit={handleSubmitFile}>
                    <h2>PHOTOS</h2>
                    <div className="input-picture">
                        <input type="file" name="" id="" value={fileInputState} onChange={handleFileInputChange}/>
                        <button type="submit">VALIDER</button>
                    </div>
                    <div className="select-cat">
                    <select name="" id="" value={folder} onChange={ (e) => setFolder(e.target.value)}>
                            <option>Choisir une catégorie</option>
                            <option value="first">Première page</option>
                            <option value="second">Deuxième page</option>
                            <option value="third">Troisième page</option>
                        </select>
                    </div>
                    {previewSource &&
                <img src={previewSource} alt=""/>
            }

                </form>


            <div className="firstPageTab">PREMIERE PAGE</div>
            <div className='tableau'>
            {imageIds && 
                imageIds.map( (imageId, index) => {
                    return regex.test(imageId) ?
                    <div className="item" key={index}>
                    <Image
                        onClick={() => deleteImage(imageId)}
                        className="photo-tableau"
                        cloudName='hippolythe'
                        publicId={imageId}
                        width="1600"
                        crop="scale"
                    /></div> :''
                }
                     )}
            </div>
            <div className="firstPageTab">DEUXIEME PAGE</div>
            <div className='tableau'>
            {imageIds && 
                imageIds.map( (imageId, index) => {
                    return regexSecond.test(imageId) ?
                    <div className="item" key={index}>
                    <Image
                        onClick={() => deleteImage(imageId)}
                        className="photo-tableau"
                        cloudName='hippolythe'
                        publicId={imageId}
                        width="1600"
                        crop="scale"
                    /></div> :''
                }
                     )}
            </div>
            <div className="firstPageTab">TROISIEME PAGE</div>
            <div className='tableau'>
            {imageIds && 
                imageIds.map( (imageId, index) => {
                    return regexThird.test(imageId) ?
                    <div className="item" key={index}>
                    <Image
                        onClick={() => deleteImage(imageId)}
                        className="photo-tableau"
                        cloudName='hippolythe'
                        publicId={imageId}
                        width="1600"
                        crop="scale"
                    /></div> :''
                }
                     )}
            </div>



        </div>

        
    );
};

export default Tableau;