import React from 'react'
import emptyCart from './../../asset/images/empty-cart.svg'

function EmptyCart() {
    return ( 
        <div className='emptyCart text-center' style={{width: '50%', margin: 'auto', marginTop: '150px'}}>
            <img className='emptyCart' src={emptyCart} alt="" />
            <h2 className='mt-2' style={{color: '#888'}}>Hãy mua thêm sản phẩm</h2>
        </div>
     );
}

export default EmptyCart;