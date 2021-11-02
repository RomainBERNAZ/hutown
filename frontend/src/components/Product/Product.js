import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { motion } from "framer-motion"
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, deleteProduct } from "../../actions/productActions";
import "./Product.css";

const Product = (props) => {

  const productDetails = useSelector((state) => state.productDetails);
  const { products, loading, error } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [imageIds, setImageIds] = useState([]);
  const [defaultPrice, setDefaultPrice] = useState("");
  const [defaultSize, setDefaultSize] = useState("");
  const mql = window.matchMedia("(max-width: 600px)");
  const dispatch = useDispatch();
  const [qte, setQte] = useState("1");
  const history = useHistory();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    /* success: successDelete, */
    error: errorDelete,
  } = productDelete;

   //Fonction qui fait appel aux deux autres qui permettent de supprimer un produit en base et sur Cloudinary
   const deleteHandler = (products, id) => {
    dispatch(deleteProduct(products._id));
    deleteImage(id);
    history.push("/shop");
  };

  //Fonction qui supprime l'image de Cloudinary lorsque le produit à été supprimé.
  const deleteImage = async (imageId) => {
    try {
      await axios.post(
        "/api/destroy",
        { imageId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      loadImages();
    } catch (err) {
      console.error(err);
    }
  };

  //Fonction qui récupère l'image du produit en fonction de son id via Cloudinary
  const loadImages = async () => {
    try {
      const res = await axios.get("/api/imagesShop");
      const data = await res.data;
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  //Permet de modifier le format choisi et donc le prix associé.
  const handleChangeSize = (e) => {
      let res = e.target.value 
      const S = "Small"

      if(res === S)
      {
        setDefaultPrice(products.price.Small)
        setDefaultSize(products.size.Small)
      }
      else
      {
        setDefaultPrice(products.price.Medium)
        setDefaultSize(products.size.Medium)
      }
  };

  //Ajoute l'objet choisi au panier.
  const addItem = (id) => {
    if(defaultPrice === "")
    {
      let soloPrice = products.price.Medium
      let  soloSize = products.size.Medium
      let msgCart = document.getElementById("validation-add-cart");
      let cartList = [];
      let key = id + "/" + soloSize;
      cartList.push(id + "/" + qte + "-" + soloSize + "*" + soloPrice);
      localStorage.getItem(key);
      localStorage.setItem(key, JSON.stringify(cartList));
      msgCart.style.opacity = 1;
    }
    else
    {
      let msgCart = document.getElementById("validation-add-cart");
      let cartList = [];
      let key = id + "/" + defaultSize;
      cartList.push(id + "/" + qte + "-" + defaultSize + "*" + defaultPrice);
      localStorage.getItem(key);
      localStorage.setItem(key, JSON.stringify(cartList));
      msgCart.style.opacity = 1;
    }

  };
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, []);

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
                transition={{ duration: 2.5 }}>
    <div className="product-single">
      <div className="single-path">
        <h2>
          Shop <i className="fas fa-chevron-right"></i>
          {products.name}
        </h2>
      </div>
      <div className="single-body">
        <div className="image-container">
                <Image
                  key={products._id}
                  className="product-img"
                  publicId={products.image}
                  cloudName="hippolythe"
                />
                {userInfo && (
                  <button className="button-delete-product" onClick={() => deleteHandler(products, products.image)}>
                    SUPPRIMER PRODUIT
                  </button>
                )}
        </div>
        <form className="product-contenu" onSubmit={() => addItem( products._id) }>
          <p className="product-name">{products.name}</p>
          <div className="bloc-information">
            <div className="product-size">
              <p>Taille:</p>
              {products.price ? 
              <>
              { products.price.Medium  ? (
              <select name="taille" id="taille" onChange={handleChangeSize} required>
                {products.price.Small !== null ? (
                  <option id="priceS" value="Small">
                    {products.size.Small}
                  </option>
                ) : (
                  ""
                )}
                {products.price.Medium !== null ? (
                  <option id="priceM" value="Medium" selected>
                    {products.size.Medium}
                  </option>
                ) : (
                  ""
                )}
              </select> ) :<span id="simpleSize">{products.size.Medium}</span> }
              </> :"" }
            <div className="product-details">
              {products.price ? 
              <div>
              {defaultPrice === "" ? 
                <span>{products.price.Medium} €</span>
            :<span>{defaultPrice} €</span>}
              </div>:""
            }
            </div>
            </div>

            <div className="product-description">
                      <p>Description:</p>  
              <span>{products.description}</span> 
            </div>
            <div className="product-quantite">
                <p>Quantité : </p>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  onChange={(e) => setQte(e.target.value)}
                />
            </div>
          </div>        
          <button className="product-cart" >Ajouter au panier</button>
        </form>
      </div>
    </div>
    </motion.div>
  );
};

export default Product;