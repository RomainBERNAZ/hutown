import React, { useEffect, useState } from "react";
import "./Shop.css";
import { motion } from "framer-motion"
import Modal from "../Modal/modal";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { listPages } from "../../actions/pageActions";
import ArtistShop from "../ProductImage/ProductImage";

const Shop = () => {


  const [ pages, setPages ] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pageList = useSelector((state) => state.pageList);
  const { page } = pageList;

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


  useEffect(() => {
    handleListPage();
    dispatch(listProducts());
    dispatch(listPages())
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
      </div>
      <ul className="list-button">
        <li><a href="#premierArtiste">ALBAN</a></li>
        <li><a href="#deuxiemeArtiste">MATTHIEU</a></li>
        <li><a href="#troisiemeArtiste">ROMAIN</a></li>
        <li><a href="#quatriemeArtiste">TOM</a></li>
        <li><a href="#cinquiemeArtiste">GOODIES</a></li>
        <li><a href="#sixiemeArtiste">CHARLOTTE</a></li>
      </ul>
        <ArtistShop 
          artist="ALBAN"
          products={products}
          id="premierArtiste"/>                       
      <ArtistShop 
          artist="MATTHIEU"
          products={products}
          id="deuxiemeArtiste"/>                       
      <ArtistShop 
          artist="ROMAIN"
          products={products}
          id="troisiemeArtiste"/>                       
      <ArtistShop 
          artist="TOM"
          products={products}
          id="quatriemeArtiste"/>                       
      <ArtistShop 
          artist="GOODIES"
          products={products}
          id="cinquiemeArtiste"/>                       
      <ArtistShop 
          artist="CHARLOTTE"
          products={products}
          id="sixiemeArtiste"/>  

    </div>
    </motion.div>
  );
};

export default Shop;