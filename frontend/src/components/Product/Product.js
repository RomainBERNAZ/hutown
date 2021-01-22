import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct, deleteProduct} from '../../actions/productActions'
import './Product.css';


const Product = (props) => {

    const productDetails = useSelector(state => state.productDetails);
    const {products, loading, error} = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;

    const history = useHistory();

    const productDelete = useSelector(state => state.productDelete);
    const {loading : loadingDelete, success: successDelete, error: errorDelete} = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
    },[])

    const deleteHandler = (products) => {
        dispatch(deleteProduct(products._id));
        history.push('/shop');
    }


    return(
        loading? <div>Loading</div>:
        error? <div>{error}</div>:
        loadingDelete? <div>Loading delete</div>:
        errorDelete? <div>{error}</div>:
        <div className="product-single">
            
            <div className="single-path">
                <h2>Shop <i className="fas fa-chevron-right"></i>{products.name}</h2>{userInfo &&
                <button onClick={() => deleteHandler(products)}>DELETE</button>
            }
            </div>
            <div className="single-body">
                <div className="image-container">
                    <img className='product-img' id='product-img' src={products.image} alt=""/>
                </div>
                <div className="product-contenu">
                    <p className='product-name'>{products.name}</p>
                    <p className='product-price'>{products.price} €</p>
                    <p className="product-description">{products.description}</p>
                    <button className="product-cart">Ajouter au panier</button>
                </div>
            </div>
        </div>
    )
}

export default Product;