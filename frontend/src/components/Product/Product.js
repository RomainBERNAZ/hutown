import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, deleteProduct } from "../../actions/productActions";
import "./Product.css";
import Mondial from "../MondialRelay/Mondial";

const Product = (props) => {
  const [imageIds, setImageIds] = useState([]);
  const [size, setSize] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { products, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();
  const dispatch = useDispatch();


  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const [defaultPrice, setDefaultPrice] = useState("");
  const mql = window.matchMedia("(max-width: 600px)");


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

  const loadImages = async () => {
    try {
      const res = await axios.get("/api/imagesShop");
      const data = await res.data;
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };



  const [qte, setQte] = useState("1");

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    loadImages();

  }, [props.match.params.id, dispatch]);

  const deleteHandler = (products, id) => {
    dispatch(deleteProduct(products._id));
    deleteImage(id);
    history.push("/shop");
  };

  

  const handleChangeSize = () => {
      setDefaultPrice(products.price.Medium);
      console.log(defaultPrice);
      setSize(products.size.Medium);
  };

  const addItem = (id) => {
    let msgCart = document.getElementById("validation-add-cart");
    let cartList = [];
    let key = id + "/" + size;
    cartList.push(id + "/" + qte + "-" + size + "*" + defaultPrice);
    localStorage.getItem(key);
    localStorage.setItem(key, JSON.stringify(cartList));
    msgCart.style.opacity = 1;
    //setTimeout(() => {
    //  window.location.reload(false);
    //}, 11500);
  };

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : loadingDelete ? (
    <div>Loading delete</div>
  ) : errorDelete ? (
    <div>{error}</div>
  ) : (
    <div className="product-single">
      <div id="validation-add-cart">
        <h2>Cet article a bien été ajouté au panier</h2>
      </div>
      <div className="single-path">
        <h2>
          Shop <i className="fas fa-chevron-right"></i>
          {products.name}
        </h2>
      </div>
      <div className="single-body">
        <div className="image-container">
          {imageIds.map((imageId) => {
            return JSON.stringify(imageId).includes(products.name) ? (
              <div key={products._id}>
                <Image
                  onClick={() => console.log(products)}
                  className="product-img"
                  publicId={imageId}
                  cloudName="hippolythe"
                />
                {userInfo && (
                  <button className="button-delete-product" onClick={() => deleteHandler(products, imageId)}>
                    SUPPRIMER PRODUIT
                  </button>
                )}
              </div>
            ) : (
              ""
            );
          })}
        </div>
        <form className="product-contenu" onSubmit={() =>addItem(products._id)}>
          <p className="product-name">{products.name}</p>
          <div className="product-details">
          
          {products.price ? <span>{products.price.Medium} €</span> : ""}



         {/* { products.price ? (
            <div>
            { products.price.Medium && products.price.Small ? (
            <select name="taille" id="" onChange={handleChangeSize} required>
              <option value="">Tailles disponibles</option>
              {products.price.Small !== null ? (
                <option id="priceS" value="priceS">
                  {products.size.Small}
                </option>
              ) : (
                ""
              )}
              {products.price.Medium !== null ? (
                <option id="priceM" value="priceM">
                  {products.size.Medium}
                </option>
              ) : (
                ""
              )}
              {products.price.Large !== null ? (
                <option id="priceL" value="priceL">
                  {products.size.Large}
                </option>
              ) : (
                ""
              )}
              {products.price.Xtra !== null ? (
                <option id="priceX" value="priceX">
                  {products.size.Xtra}
                </option>
              ) : (
                ""
              )}
            </select> ) :"" }
            
            </div>
                  ) :"" } */}
            
            <p>QUANTITÉ : </p>{" "}
            {mql.matches ? (
              <input
                inputmode="numeric"
                pattern="[0-9]*"
                type="text"
                defaultValue="1"
                min="0"
                onChange={(e) => setQte(e.target.value)}
              />
            ) : (
              <input
                type="number"
                defaultValue="1"
                min="0"
                onChange={(e) => setQte(e.target.value)}
              />
            )}
            
          </div>
          
          <div className="product-description"><p>Description:</p>  <span>{products.description}</span> </div>
          <div className="product-description"><p>Taille:</p> 
           
            {products.size ? (
            <div>
                {products.size.Small ? <span id="price">{products.size.Small}</span> : 
                 products.size.Medium ? <span id="price">{products.size.Medium}</span> :   
                 products.size.Large ? <span id="price">{products.size.Large}</span> :   
                 products.size.Xtra ? <span id="price">{products.size.Xtra}</span> : ''  }
            </div> ) : ""}
          </div>

          <div className="product-description"><p>Lieu:</p> <span>{products.lieu}</span></div>
          <div className="product-description"><p>Papier utilisé: </p><span>{products.papier}</span></div>
          <div className="product-description"><p>Livraison: </p><span>{products.livraison}</span></div>
          <button className="product-cart" onClick={handleChangeSize}>Ajouter au panier</button>
        </form>
      </div>
    </div>
  );
};

export default Product;
