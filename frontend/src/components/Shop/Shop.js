import React, { useEffect, useState } from 'react';
import './Shop.css'
import axios from 'axios'
import Modal from '../Modal/modal'
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions'


const Shop = () => {

    const [ imageIds, setImageIds ] = useState([]);

    const productList = useSelector(state => state.productList);
    const { products, loading, error} = productList;
    
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
    const dispatch = useDispatch();
 

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
        dispatch(listProducts());
        loadImages();
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
                    
                <Link to={'/product/' +product._id} >
                {
                    imageIds.map( imageId => {
                        return JSON.stringify(imageId).includes(product.name) ?
                    <Image
                            key={product._id}
                            className="shop-img"
                            publicId={imageId}
                            cloudName='drefurx4l'
                        />
                        :'' })
            }
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