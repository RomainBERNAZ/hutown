import React, { useEffect} from 'react';
import './PagePhoto.css'
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import { listProducts } from "../../actions/productActions";
import ArtistMainPhotos from '../ArtistMainPhoto/artistMainPhoto';


const PageFive = () => {
    
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
    }, [dispatch]);

    return (
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:
            <div className="first-photo">
            <div className="picturesUpload">
            { products && pages &&
            <ArtistMainPhotos 
                artist={pages[4]?.title}
                products={products}
                id="deuxiemeArtiste"
                test={pages}
                page="five"/>  }  
                     </div>
            <div className="btn-to-top">
                <a><i onClick={toTop} className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default PageFive;