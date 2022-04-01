import React, { useEffect } from 'react';
import './PagePhoto.css'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../../actions/productActions";
import { listPages } from '../../actions/pageActions'
import ArtistMainPhotos from '../ArtistMainPhoto/artistMainPhoto';

const Page_1 = () => {
    
    const productList = useSelector((state) => state.productList);
    const { products, loading, error  } = productList;
    const pageList = useSelector(state => state.pageList);
    const { pages} = pageList;

    const dispatch = useDispatch();

    const toTop = () => {
        window.scrollTo(0,0);
    }

    useEffect(() => {
        dispatch(listProducts());
        dispatch(listPages());
        console.log(pages)
    }, [dispatch]);

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:
        <div className="first-photo">
            <p></p>
            <div className="picturesUpload">
            { products && pages &&
            <ArtistMainPhotos 
                artist={pages[0]?.title}
                products={products}
                id="deuxiemeArtiste"
                test={pages}
                page="first"/> }
                     </div>
            <div className="btn-to-top">
                <a><i onClick={toTop} className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default Page_1;