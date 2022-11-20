import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../../../assets/css/sb-admin-2.min.css';

import Sidebar from '../../Layout/Sidebar';
import AccountAdmin from '../../Layout/Header/AccountAdmin';
import TurnoverYear from './ChartDashboard/TurnoverYear';
import OverviewDashboard from './OverviewDashboard';
import './OverviewDashboard/dashboard.css';
import { useSelector } from 'react-redux';
import { getShowModerationProduct } from '../../../products/redux/selector';
import ChartStart from './ChartStar/Chart';

function Dashboard() {
    const showModerationProduct = useSelector(getShowModerationProduct);
    return (
        <>
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Sidebar Toggle (Topbar) */}
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars" />
                            </button>
                            {/* <Search /> */}
                            <AccountAdmin />
                        </nav>
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800" style={{ fontWeight: 'bold' }}>
                                    {/* Dashboard */}
                                </h1>
                            </div>
                            {/* Content Row */}
                            <OverviewDashboard />
                            {/* Content Row */}
                            <div className="row dashboard">
                                <TurnoverYear />
                                {/* <TurnoverMonth /> */}
                            </div>
                        </div>
                    </div>
                    {/* <ChartStart /> */}
                    {/* <Footer /> */}
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
            <div
                className="modal fade"
                id="logoutModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Ready to Leave?
                            </h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Select "Logout" below if you are ready to end your current session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">
                                Cancel
                            </button>
                            <a className="btn btn-primary" href="login.html">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
