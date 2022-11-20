import React from 'react'
import loading from '../../assets/images/loading.gif'

function Spiner() {
    return ( 
        <div className='d-flex align-items-center justify-content-center'>
            <img className='loading' src={loading} alt="" />
        </div>
     );
}

export default Spiner;