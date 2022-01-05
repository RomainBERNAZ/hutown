import React, { useEffect, useState } from 'react';
import './FirstPhoto.css'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../actions/productActions";
import { listPages } from '../../actions/pageActions'
import ArtistMainPhotos from '../ArtistMainPhoto/artistMainPhoto';
import axios from "axios"

const FirstPhoto = () => {
    
    const productList = useSelector((state) => state.productList);
    const { products, loading, error  } = productList;
    const pageList = useSelector(state => state.pageList);
    const { pages} = pageList;

    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(listProducts());
        dispatch(listPages());
    }, [dispatch]);

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:
        <div className="first-photo">
            <div className="picturesUpload">
            { products && 
            <ArtistMainPhotos 
                artist="ALBAN"
                products={products}
                id="deuxiemeArtiste"
                test={pages}
                page="first"/> }
                     </div>
            <div className="btn-to-top">
                <a href="#"><i className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default FirstPhoto;