import React, { useEffect } from 'react'
import { Image } from "cloudinary-react";


const ProductImage = (props) =>  {

    useEffect(() => {
        console.log(props);
      }, [])
      
    return (
                <Image
                  className="shop-img"
                  publicId={props.publicId}
                  cloudName="hippolythe"
                />
    )
}

export default ProductImage
