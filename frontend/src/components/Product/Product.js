import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Image } from 'cloudinary-react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct, deleteProduct} from '../../actions/productActions'
import './Product.css';


const Product = (props) => {

    const [ imageIds, setImageIds ] = useState([]);

    const productDetails = useSelector(state => state.productDetails);
    const {products, loading, error} = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;

    const history = useHistory();
    const dispatch = useDispatch();

    const productDelete = useSelector(state => state.productDelete);
    const {loading : loadingDelete, success: successDelete, error: errorDelete} = productDelete;

    const deleteImage = async (imageId) => {
        console.log(imageId);
        try {
            await axios.post('/api/destroy', {imageId}, {
                headers: { 'Content-Type': 'application/json' }
            });
            loadImages();
            //alert('Suppression réussie')
        } catch (err) {
            console.error(err);
        }
    };

    const loadImages = async () => {
        try {
            const res = await axios.get('/api/imagesShop');
            const data = await res.data;
            setImageIds(data)
        } catch (err) {
            console.error(err); 
        }
    };

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        loadImages();
    },[])

    const deleteHandler = (products, id) => {
       
        dispatch(deleteProduct(products._id));
        deleteImage(id)
        history.push('/shop');
    }

    return(
        loading? <div>Loading</div>:
        error? <div>{error}</div>:
        loadingDelete? <div>Loading delete</div>:
        errorDelete? <div>{error}</div>:
        <div className="product-single">
            
            <div className="single-path">
                <h2>Shop <i className="fas fa-chevron-right"></i>{products.name}</h2>
            </div>
            <div className="single-body">
                
                <div className="image-container">
                {
                    imageIds.map( imageId => {
                        return JSON.stringify(imageId).includes(products.name) ?
                       <div key={products._id}> 
                       <Image
                            onClick={() => console.log(imageId)}
                            className="product-img"
                            publicId={imageId}
                            cloudName='drefurx4l'
                        />{userInfo &&
                            <button onClick={() => deleteHandler(products, imageId)}>DELETE</button>
                        }</div> :'' })
                }
                </div>
                <div className="product-contenu">
                    <p className='product-name'>{products.name}</p>
                    <p className='product-price'>{products.price} €</p>
                    <p className="product-description">{products.description}</p>
                    <button onClick={
                        () => console.log(JSON.stringify(imageIds[0]))
                    } className="product-cart">Ajouter au panier</button>
                </div>
            </div>
        </div>
    )
}

export default Product;