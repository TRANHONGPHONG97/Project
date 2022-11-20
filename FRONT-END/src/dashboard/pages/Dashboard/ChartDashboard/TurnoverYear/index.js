import BarChart from '../../../../Chart/BarChart';

function TongQuanThuNhap() {
    return (
        <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between right-chart">
                    <h6 className="m-0 font-weight-bold text-primary">Doanh thu năm</h6>
                    <div className="dropdown no-arrow">
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink"
                        >
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">
                                Action
                            </a>
                            <a className="dropdown-item" href="#">
                                Another action
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">
                                Something else here
                            </a>
                        </div>
                    </div>
                </div>
                {/* Card Body */}
                <div className="card-body right-chart">
                    {/* <div className="chart-area">
                        <canvas id="myAreaChart" />
                    </div> */}
                    <BarChart />
                </div>
            </div>
        </div>
    );
}

export default TongQuanThuNhap;
