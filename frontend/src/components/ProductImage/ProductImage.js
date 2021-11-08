import React, { useEffect } from 'react'
import { Image, Transformation } from "cloudinary-react";
import { Link } from "react-router-dom";
import Img from 'react-cloudinary-lazy-image'
import './ProductImage.css'

const ArtistShop = (props) =>  {
  let lengthArray = 0;

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

    useEffect(() => {
        console.log(props.products.sort(dynamicSort('name')))
      }, [])
      
    return (   
    <>
    <h2 id={props.id}>{props.artist}</h2>
    <div className="product-grid" >
          {props.products.sort().map(product => {
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
