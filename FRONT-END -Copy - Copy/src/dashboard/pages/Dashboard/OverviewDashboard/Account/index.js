import { Link } from 'react-router-dom';

function TaiKhoan(props) {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2" style={{ cursor: 'auto' }}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1 text-center">
                                <Link to={'/list-account'}>Tài Khoản</Link>
                            </div>
                            <div className="h5 ml-3 mb-0 mr-3 font-weight-bold text-gray-800 text-center">
                                <Link to={'/list-account'}>{props.totalAccount}</Link>
                            </div>
                        </div>
                        <div className="col-auto">
                            <Link to={'/list-account'}>
                                <i className="fa-solid fa-users-viewfinder fa-2x text-gray-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaiKhoan;
