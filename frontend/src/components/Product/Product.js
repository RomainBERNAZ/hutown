import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, deleteProduct } from "../../actions/productActions";
import "./Product.css";

const Product = (props) => {

  const [imageIds, setImageIds] = useState([]);
  const productDetails = useSelector((state) => state.productDetails);
  const { products, loading, error } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [defaultPrice, setDefaultPrice] = useState("");
  const [defaultSize, setDefaultSize] = useState("");
  const mql = window.matchMedia("(max-width: 600px)");
  const history = useHistory();
  const dispatch = useDispatch();
  const [qte, setQte] = useState("1");
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  

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

  //Fonction qui fait appel aux deux autres qui permettent de supprimer un produit en base et sur Cloudinary
  const deleteHandler = (products, id) => {
    dispatch(deleteProduct(products._id));
    deleteImage(id);
    history.push("/shop");
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
    let msgCart = document.getElementById("validation-add-cart");
    let cartList = [];
    let key = id + "/" + defaultSize;
    cartList.push(id + "/" + qte + "-" + defaultSize + "*" + defaultPrice);
    localStorage.getItem(key);
    localStorage.setItem(key, JSON.stringify(cartList));
    msgCart.style.opacity = 1;
  };


  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    loadImages();
  }, [props.match.params.id, dispatch]);

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
            {defaultPrice ? 
            <span>{defaultPrice} €</span>
          :""}
            
          { products.price ? (
            <div>
            { products.price.Medium && products.price.Small ? (
            <select name="taille" id="" onChange={handleChangeSize} required>
              <option value="">Tailles disponibles</option>
              {products.price.Small !== null ? (
                <option id="priceS" value="Small">
                  {products.size.Small}
                </option>
              ) : (
                ""
              )}
              {products.price.Medium !== null ? (
                <option id="priceM" value="Medium">
                  {products.size.Medium}
                </option>
              ) : (
                ""
              )}
            </select> ) :"" }
            
            </div>
                  ) :"" } 
            
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
          <div className="product-description"><p>Taille:</p><span id="price">{defaultSize}</span></div> 
          <div className="product-description"><p>Lieu:</p> <span>{products.lieu}</span></div>
          <div className="product-description"><p>Papier utilisé: </p><span>{products.papier}</span></div>
          <div className="product-description"><p>Livraison: </p><span>{products.livraison}</span></div>
          <button className="product-cart" >Ajouter au panier</button>
        </form>
      </div>
    </div>
  );
};

export default Product;
