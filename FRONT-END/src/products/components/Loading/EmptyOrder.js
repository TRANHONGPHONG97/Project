import React from 'react'
import emptyOrder from './../../asset/images/orderEmpty-removebg.png'

function EmptyOrder() {
    return ( 
        <div className='emptyOrder text-center'>
            <img className='emptyOrder' src={emptyOrder} alt="" />
            <h2 className='mt-5' style={{color: '#61bc6d'}}>Không có dữ liệu</h2>
        </div>
     );
}

export default EmptyOrder;