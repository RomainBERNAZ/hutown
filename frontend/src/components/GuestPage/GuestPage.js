import React, { useEffect } from 'react';
import '../FirstPhoto/FirstPhoto.css'
import ArtistMainPhotos from '../ArtistMainPhoto/artistMainPhoto';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../actions/productActions";
import { listPages } from '../../actions/pageActions'

const GuestPage = () => {
    
    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;
    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    
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
            <ArtistMainPhotos 
                artist="ESTELLE"
                products={products}
                id="deuxiemeArtiste"
                test={pages}
                page="second"/>    
                     </div>
            <div className="btn-to-top">
                <a href="#"><i className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default GuestPage;