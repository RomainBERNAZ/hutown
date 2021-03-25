import React, { useEffect, useState } from "react";
import "./Shop.css";
import axios from "axios";
import Modal from "../Modal/modal";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

const Shop = () => {
  const [imageIds, setImageIds] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const [ minimumPrice, setMinimumPrice ] = useState('')

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const setMinimumProductPrice = () => {

    if(products.priceS != null){
      setMinimumPrice(products.priceS);
    }
    else if(products.priceS === null && products.priceM != null){
      setMinimumPrice(products.priceM);
    }
    else if(products.priceS === null && products.priceM === null && products.priceL != null){
      setMinimumPrice(products.priceL);
    }
    else {
      setMinimumPrice(products.priceX);
    }
    
  }


  const loadImages = async () => {
    try {
      const res = await axios.get("/api/imagesShop");
      const data = await res.data;
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(listProducts());
    loadImages();
    setMinimumProductPrice();
  }, [dispatch]);

  const openModal = () => {
    let modal = document.getElementById("modal");
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    modal.style.display = "flex";
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="shop" id="shop">
      <Modal />
      <div className="shop-title">
        <div className="line-title">
          <h1 className="title">Shop</h1>
          {userInfo && (
            <i onClick={openModal} className="far fa-plus-square"></i>
          )}
        </div>
        <div className="line-under-title">
          <hr className="shop-line" />
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="single-product">
            <Link to={"/product/" + product._id}>
              {imageIds.map((imageId) => {
                return JSON.stringify(imageId).includes(product.name) ? (
                  <Image
                    key={product._id}
                    className="shop-img"
                    publicId={imageId}
                    cloudName="hippolythe"
                  />
                ) : (
                  ""
                );
              })}
            </Link>

            <div className="shop-description">
              <p className="shop-name">{product.name}</p>
              <p className="shop-price">À partir de {product.priceS ? <p>{product.priceS}</p> : 
                                                     product.priceM ? <p>{product.priceM}</p> :   
                                                     product.priceL ? <p>{product.priceL}</p> :   
                                                     product.priceX ? <p>{product.priceX}</p> : ''  } €</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
