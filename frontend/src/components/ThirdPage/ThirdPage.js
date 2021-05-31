import React, { useEffect, useState } from 'react';
import '../FirstPhoto/FirstPhoto.css'
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import axios from 'axios';

const ThirdPage = () => {
    
    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;

    const sortBySensitivity = sensitivity => (a, b) => a.localeCompare(
        b,
        undefined, // locale string -- undefined means to use browser default
        { sensitivity }
      );

    const byBase    = sortBySensitivity('base');
    
    const [imageIds, setImageIds] = useState();
    const regex = /^third/;
    
    const dispatch = useDispatch();

    const loadImages = async () => {
        try {
            const res = await axios.get('/api/images/');
            const data = await res.data;
            setImageIds(data.sort(byBase));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        console.log(imageIds);
        dispatch(listPages());
        loadImages();
    }, [dispatch]);

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:
        <div className="first-photo">
           
           <div className="texte-photos">
            {pages.map(page  => {
                return page.category ==='third' ?
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
                        cloudName='hippolythe'
                        publicId={imageId}
                        width="1600"
                        crop="scale"
                    /></div> :''
                }
                     )}
                     </div>
            <div className="btn-to-top">
                <a href="#"><i className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default ThirdPage;