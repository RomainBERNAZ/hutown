import React, { useEffect } from 'react';
import './PagePhoto.css'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import { listProducts } from "../../actions/productActions";
import ArtistMainPhotos from '../ArtistMainPhoto/artistMainPhoto';

const PageSeven = () => {
    
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
                artist="GOODIES"
                products={products}
                id="deuxiemeArtiste"
                test={pages}
                page="seven"/>  }  
                     </div>
            <div className="btn-to-top">
                <a href="/#"><i className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default PageSeven;