import React, { useEffect } from 'react';
import './Shop.css'
import Modal from '../Modal/modal'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions'


const Shop = () => {

    const productList = useSelector(state => state.productList);
    const { products, loading, error} = productList;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(listProducts());
    }, [])

    const openModal = () => {
        let modal = document.getElementById('modal');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        modal.style.display='flex';
    }

    return (

        loading? <div>Loading...</div> :
        error? <div>{error}</div>:
        <div className="shop">
            <Modal/>
            <div className="shop-title">
                <div className="line-title">
                    <h1 className="title">Shop</h1>
                    { userInfo &&
                        <i onClick={openModal} className="far fa-plus-square"></i>
                    }
                </div>
                <hr className="shop-line"/>
            </div>
            <div className="product-grid">
            {products.map(product => 
                <div key={product._id} className="single-product">
                <Link to={'/product/' +product._id}>
                    <img className='shop-img' src={product.image} alt=""/>
                </Link>
                <div className="shop-description">
                    <p className='shop-name'>{product.name}</p>
                    <p className='shop-price'>{product.price}€</p>
                </div>
          </div>
                )}
            </div>
        </div>
    )
}

export default Shop; 