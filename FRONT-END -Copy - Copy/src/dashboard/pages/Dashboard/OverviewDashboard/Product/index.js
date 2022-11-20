import { Link } from "react-router-dom";

function Products(props) {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2" style={{ cursor: 'auto' }}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-center">
                                <Link to={"/list-product"}>Số lượng sản phẩm</Link>
                            </div>
                            <div className="row no-gutters align-items-center justify-content-center">
                                <div className="col-auto">
                                    <div className="h5 ml-3 mb-0 mr-3 font-weight-bold text-gray-800  text-center">
                                        <Link to={"/list-product"}>{props.totalProduct}</Link>
                                    </div>
                                </div>
                                {/* <div className="col">
                                    <div className="progress progress-sm mr-2">
                                        <div
                                            className="progress-bar bg-info"
                                            role="progressbar"
                                            style={{ width: '50%' }}
                                            aria-valuenow={50}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-auto">
                            <Link to={"/list-product"}>
                                <i className="fas fa-clipboard-list fa-2x text-black-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
