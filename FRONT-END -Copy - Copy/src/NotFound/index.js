import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <div id="wrapper" style={{marginTop: '100px'}}>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="text-center">
                                <div className="error mx-auto">
                                    404
                                </div>
                                <p className="lead text-gray-800 mb-5">Trang không tồn tại</p>
                                <p className="text-gray-500 mb-0">Có vẻ như bạn đã gặp một trục trặc trong hệ thống của chúng tôi ...</p>
                                <br/>
                                <Link to={'/login'}>← Quay trở lại đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
