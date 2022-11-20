import React from 'react'
import img from '../../assets/images/defaultProduct.jpg'

function DefaultProduct() {
    return ( 
        <div className='d-flex align-items-center justify-content-center'>
            <img className='loading' src={img} alt="" />
        </div>
     );
}

export default DefaultProduct;