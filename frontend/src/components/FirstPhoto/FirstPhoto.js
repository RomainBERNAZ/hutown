import React, { useEffect, useState } from 'react';
import './FirstPhoto.css'
import ArtistShop from "../ProductImage/ProductImage";
import { useDispatch, useSelector } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import axios from 'axios';

const FirstPhoto = () => {
    
    const pageList = useSelector(state => state.pageList);
    const { pages, loading, error } = pageList;
    
    const [imageIds, setImageIds] = useState();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    
    
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
           
            <ArtistShop 
          artist="TOM"
          products={products}
          id="premierArtiste"/>    
            <div className="btn-to-top">
                <a href="#"><i className="fas fa-arrow-up"></i></a>
            </div>
        </div>
    );
};

export default FirstPhoto;