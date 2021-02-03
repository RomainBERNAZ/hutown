import React, { useEffect, useState } from 'react';
import './FirstPhoto.css'
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import axios from 'axios';

const FirstPhoto = () => {
    
    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;
    
    const [imageIds, setImageIds] = useState();
    const regex = /^first/;
    
    
    const dispatch = useDispatch();

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
        dispatch(listPages());
        loadImages();
    }, [dispatch]);

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:
        <div className="first-photo">
           
           <div className="texte-photos">
            {pages.map(page  => {
                return page.category ==='first' ?
                    <div className="photos" key={page._id}>
                        <h1>{page.title}</h1>
                        <p className="descriptionPage">{page.description}</p>
                    </div> : ''
            }
                )}

            </div>

            <div className="picturesUpload">
            {imageIds && 
                imageIds.map( (imageId, index) => {
                    return regex.test(imageId) ?
                    <div className="item" key={index}>
                    <Image
                        className="photoUpload"
                        cloudName='drefurx4l'
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

export default FirstPhoto;