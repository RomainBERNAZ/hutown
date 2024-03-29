import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import Img from 'react-cloudinary-lazy-image'
import './ProductImage.css'

const ArtistShop = (props) =>  {
  let lengthArray = 0;

   props.products.sort(function(a, b) {
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  });

    useEffect(() => {
      }, [])
      
    return (   
    <>
    <h2 id={props.id}>{props.artist}</h2>
    <div className="product-grid" >
          {props.products.map(product => {
            return product.artiste === props.artist ?
            <div key={product._id} className="single-product">
              <Link to={"/product/" + product._id}>
                <Img
                      key={product._id}
                      className="shop-img"
                      cloudName={'hippolythe'}
                      imageName={product.image}
                      fluid={{
                        maxWidth: 1000,
                        height: 1000
                    }}
                    imgFormat={false}
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
