import React from 'react'
import loadQuantity from './../../asset/images/loadQlt.gif'

function Loading() {
    return ( 
        <div className='loading text-center' style={{marginTop: '44px', height: '300px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)' }}>
            <img className='loading' style={{width: '200px', marginTop: '44px'}} src={loadQuantity} alt="" />
        </div>
     );
}

export default Loading;