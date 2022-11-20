import React from 'react'
import loadData from './../../asset/images/loading.gif'

function LoadData() {
    return ( 
        <div className='loadData'>
            <img className='loading' src={loadData} alt="" />
        </div>
     );
}

export default LoadData;