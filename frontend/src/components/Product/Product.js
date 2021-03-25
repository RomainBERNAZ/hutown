import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, deleteProduct } from "../../actions/productActions";
import "./Product.css";
import { USER_LOGIN_FAIL } from "../../constants/userConstant";

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
      //alert('Suppression réussie')
    } catch (err) {
      console.error(err);
    }
  };

  const loadImages = async () => {
    try {
      const res = await axios.get("/api/imagesShop");
      const data = await res.data;
      console.log(data, "affichage des datas");
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

  const handleChangeSize = (e) => {
    let target = e.target.value;
    if (target === "priceS") {
      setDefaultPrice(products.priceS);
      setSize("15x15");
    } else if (target === "priceM") {
      setDefaultPrice(products.priceM);
      setSize("20x20");
    } else if (target === "priceL") {
      setDefaultPrice(products.priceL);
      setSize("30x45");
    } else if (target === "priceX") {
      setDefaultPrice(products.priceX);
      setSize("40x60");
    } else {
      
    }
  };

  const addItem = (id) => {
    let msgCart = document.getElementById("validation-add-cart");
    let cartList = [];
    let key = id + "/" + size;
    cartList.push(id + "/" + qte + "-" + size + "*" + defaultPrice);
    localStorage.getItem(key);
    localStorage.setItem(key, JSON.stringify(cartList));
    msgCart.style.opacity = 1;
    setTimeout(() => {
      window.location.reload(false);
    }, 11500);
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
                  onClick={() => console.log(imageId)}
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
        <form
          className="product-contenu"
          onSubmit={() => addItem(products._id)}
        >
          <p className="product-name">{products.name}</p>
          <div className="product-details">
            <select name="taille" id="" onChange={handleChangeSize} required>
              <option value="">Tailles disponibles</option>
              {products.priceS !== null ? (
                <option id="priceS" value="priceS">
                  {products.sizeS}
                </option>
              ) : (
                ""
              )}
              {products.priceM !== null ? (
                <option id="priceM" value="priceM">
                  {products.sizeM}
                </option>
              ) : (
                ""
              )}
              {products.priceL !== null ? (
                <option id="priceL" value="priceL">
                  {products.sizeL}
                </option>
              ) : (
                ""
              )}
              {products.priceX !== null ? (
                <option id="priceX" value="priceX">
                  {products.sizeX}
                </option>
              ) : (
                ""
              )}
            </select>
            <span>QUANTITÉ : </span>{" "}
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
          <div className="details-price">
            {defaultPrice ? <span>{defaultPrice * qte} €</span> : ""}
          </div>
          <div className="product-description"><p>Description:</p>  <span>{products.description}</span> </div>
          <div className="product-description"><p>Lieu:</p> <span>{products.lieu}</span></div>
          <div className="product-description"><p>Papier utilisé: </p><span>{products.papier}</span></div>
          <div className="product-description"><p>Livraison: </p><span>{products.livraison}</span></div>
          <button className="product-cart">Ajouter au panier</button>
        </form>
      </div>
    </div>
  );
};

export default Product;
