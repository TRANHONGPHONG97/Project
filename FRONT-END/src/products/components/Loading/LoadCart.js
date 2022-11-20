import React from 'react'
import loadCart from './../../asset/images/loadCart.gif'

function LoadCart() {
    return ( 
        <div className='loadCart text-center'>
            <img className='loading' src={loadCart} alt="" />
        </div>
     );
}

export default LoadCart;