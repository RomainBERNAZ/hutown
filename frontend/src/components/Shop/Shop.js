import React, { useEffect, useState } from "react";
import "./Shop.css";
import axios from "axios";
import Modal from "../Modal/modal";
import Newsletter from "../Newsletter/news";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

const Shop = () => {
  const [imageIds, setImageIds] = useState([]);
  //const [lengthArray, setLengthArray] = useState(0);
  let lengthArray = 0;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();


  const checkLengthOfPriceArray = () => {
    products.forEach(product => {
      console.log(product.price.Small);
  });
    
  }

  const loadImages = async () => {
    try {
      const res = await axios.get("/api/imagesShop") 
      const data = await res.data;
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(listProducts());
    loadImages();
    checkLengthOfPriceArray()
  }, [dispatch]);

  const openModal = () => {
    let modal = document.getElementById("modal")
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
      <div className="modal-newsletter">
        <h2>Newsletter ?</h2>
        <input type="text"/>
        <button>CONFIRMER</button>
      </div>
    
      <Modal />
      <Newsletter />
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
               <div className="shop-price">    
              {lengthArray > 1 ?
              <p>A partir de :</p> : ""}
              {/* product.price.Small ? <p>{product.price.Small} €</p> :  */
               product.price.Medium ? <p>{product.price.Medium} €</p> :   
               product.price.Large ? <p>{product.price.Large} €</p> :   
               product.price.Xtra ? <p>{product.price.Xtra} €</p> : ''  }</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
