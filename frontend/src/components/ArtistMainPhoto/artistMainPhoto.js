import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import Img from 'react-cloudinary-lazy-image'
import './ArtistMainPhotos.css'

const ArtistMainPhotos = (props) =>  {

   props.products.sort(function(a, b) {
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  });

    useEffect(() => {
      console.log(props.test);
      }, [])
      
    return (   
    <div className="artistMainPhoto">
      <div className="texte-photos-main">
      <h2 id={props.id}>{props.artist}</h2>
              {props.test.map(page  => {
                  return page.category === props.page ?
                      <div className="photos-description" key={page._id}>
                          <p className="descriptionPage">{page.description}</p>
                      </div> : ''})}

      </div>
      <div className="product-grid-main" >
            {props.products.map(product => {
              return product.artiste === props.artist ?
              <div key={product._id} className="single-product-main">
                <Link to={"/product/" + product._id}>
                  <Img
                        key={product._id}
                        className="shop-img-main"
                        cloudName={'hippolythe'}
                        imageName={product.image}
                        fluid={{
                          maxWidth: 1000,
                          height: 1000
                      }}
                      imgFormat={false}
                      />
                </Link>
              </div> :""
            })}
      </div> 
  </div>
   
    )
}

export default ArtistMainPhotos