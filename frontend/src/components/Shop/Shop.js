import React, { useEffect, useState } from "react";
import "./Shop.css";
import { motion } from "framer-motion"
import Modal from "../Modal/modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

const Shop = () => {
  let lengthArray = 0;

  const [ pages, setPages ] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  
  const handleListPage = async (e) => {
    try {
        const res = await axios.get('/api/pages/');
        const data = await res.data;
        setPages(data);
    } catch (err) {
        console.error(err);
    }
};
const filterArtiste = (e) => {
  products.filter( product => console.log(product.artiste));
}

  useEffect(() => {
    dispatch(listProducts());
    handleListPage();
  }, [dispatch]);

  const openModal = () => {
    let modal = document.getElementById("modal")
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    modal.style.display = "flex";
  };

  return loading ? (
    <motion.div initial={{ opacity: 0 }}
                animate={{ opacity:1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 2 }}></motion.div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <motion.div initial={{ opacity: 0 }}
                animate={{ opacity:1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 3.5 }}>
    <div className="shop" id="shop">
      <Modal />
      <div className="shop-title">
          <h1 className="title">Shop</h1>
          {userInfo && (
            <i onClick={openModal} className="far fa-plus-square"></i>
          )}
          { pages != null ?
                            <select name="Filtrer" id="" className="filter" onChange={(e) => filterArtiste(e.target.value)}>
                              <option value="" disabled selected hidden>Filtrer</option>
                              <option>Tous les artistes</option>
                               {pages.map((page) => (
                                   <option id={page.title}>{page.title}</option>))}
                            </select>:""}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="single-product">
            <Link to={"/product/" + product._id}>
              <Image
                    key={product._id}
                    className="shop-img"
                    publicId={product.image}
                    cloudName="hippolythe"
                  />
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
    </motion.div>
  );
};

export default Shop;