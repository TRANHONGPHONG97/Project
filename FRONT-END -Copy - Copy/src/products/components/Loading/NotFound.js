import React from 'react'
import notfound from './../../asset/images/data-not-found.png'

function NotFound() {
    return (
        <div className='notFound text-center'>
            <img className='notFound' src={notfound} alt="Không tìm thấy" style={{width: '200px', color: '#2aabe2'}} title='Không tìm thấy kết quả nào phù hợp' />
            <h2>KHÔNG TÌM THẤY KẾT QUẢ PHÙ HỢP</h2>
        </div>
    );
}

export default NotFound;