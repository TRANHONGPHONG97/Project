import React from 'react'
import loadQuantity from './../../asset/images/loadQuantity.gif'

function LoadQuantity() {
    return ( 
        <div className='loadQuantity text-center' >
            <img className='loading' src={loadQuantity} alt="" style={{width: '70px'}}/>
        </div>
     );
}

export default LoadQuantity;