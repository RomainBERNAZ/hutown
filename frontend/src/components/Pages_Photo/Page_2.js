import React, { useEffect } from 'react';
import './PagePhoto.css'
import ArtistMainPhotos from '../ArtistMainPhoto/artistMainPhoto';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../actions/productActions";
import { listPages } from '../../actions/pageActions'

const GuestPage = () => {
    
    const productList = useSelector((state) => state.productList);
    const { products, loading, error  } = productList;
    const pageList = useSelector(state => state.pageList);
    const { pages} = pageList;

    const toTop = () => {
        window.scrollTo(0,0);
    }
    
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
            { products && pages &&
            <ArtistMainPhotos 
                artist={pages[1]?.title}
                products={products}
                id="deuxiemeArtiste"
                test={pages}
                page="second"/> }    
                     </div>
            <div className="btn-to-top">
            <a><i onClick={toTop} className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};


export default GuestPage;