import './notifi.css';
import { Link } from 'react-router-dom';



function Notification({ countOrder, myOrderDetails }) {

    return (
        <>
            <div className="d-flex align-items-center me-3">
                <div className="notif-InfoGroup">
                    <i
                        style={{ position: 'relative', color: '#1779ba' }}
                        className="fa-regular fa-bell fa-2x ic-notif "
                        aria-hidden="true"
                    >
                        {(countOrder > 0 || myOrderDetails.length > 0) ? (
                            <span
                                style={{
                                    textAlign: 'center',
                                    position: 'absolute',
                                    border: '0.5px solid white',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    fontSize: '12px',
                                    left: '15px',
                                    bottom: '15px',
                                    padding: '3px',
                                }}
                            >
                            </span>
                        ) : null}
                    </i>
                    <div className="norif-Info-dropdown">
                        <ul>
                            <li>
                                <Link to={"/product/order"} style={{ fontSize: '14px' }}>
                                    <i style={{ position: 'relative', color: '#1779ba' }} className="fa-solid fa-truck-fast"></i>
                                    {countOrder === 0 ? null : (
                                        <span className='notifi-dot'
                                            style={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                border: '0.5px solid white',
                                                width: 'auto',
                                                height: '20px',
                                                borderRadius: '10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                fontSize: '12px',
                                                left: '35px',
                                                top: '4px',
                                            }}
                                        >
                                            {countOrder}
                                        </span>
                                    )}
                                    <span style={{ color: '#1779ba' }} className='ms-3'>Đơn hàng</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/product/my-shop"} style={{ fontSize: '14px' }}>
                                    {/* <i style={{ position: 'relative', color: '#1779ba' }} className="fa-solid fa-message"></i> */}
                                    <i style={{ position: 'relative', color: '#1779ba' }} className="fa-solid fa-store"></i>
                                    {myOrderDetails > 0 ? (
                                        <span className='notifi-dot'
                                            style={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                border: '0.5px solid',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                fontSize: '12px',
                                                left: '34px',
                                                bottom: '28px',
                                            }}
                                        >
                                        </span>
                                    ) : null}
                                    <span style={{ color: '#1779ba' }} className='ms-3'>Cửa hàng</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notification;
