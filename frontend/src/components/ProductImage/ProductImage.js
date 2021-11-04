import React, { useEffect } from 'react'
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import './ProductImage.css'

const ArtistShop = (props) =>  {
  let lengthArray = 0;
    useEffect(() => {
        console.log(props);
      }, [])
      
    return (   
    <>
    <h2 id={props.id}>{props.artist}</h2>
    <div className="product-grid" >
          {props.products.map(product => {
            return product.artiste === props.artist ?
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
                { product.price.Medium ? <p>{product.price.Medium} €</p> :   
                product.price.Large ? <p>{product.price.Large} €</p> :   
                product.price.Xtra ? <p>{product.price.Xtra} €</p> : ''  }</div>
              </div>
            </div> :""
          })}
  </div> 
  </>
   
    )
}

export default ArtistShop
