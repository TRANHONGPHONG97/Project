import { Link } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';
import SidebarUtilities from './SidebarUtilelties';

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                {/* <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div> */}
                <div className="box elegant">
                    <div
                        className="paragraph-logo"
                        style={{
                            fontSize: '20px',
                            textShadow: '-5px 5px 3px #333',
                            color: '#d76060',
                            fontWeight: 'bold',
                        }}
                    >
                        AUCTIONS SHOP
                    </div>
                </div>
            </Link>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i class="fa-solid fa-store"></i>
                    <span>TRANG QUẢN LÝ</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Quản lý</div>

            {/* Nav Item - Pages Collapse Menu */}
            <SidebarComponent />

            {/* Nav Item - Utilities Collapse Menu */}
            <SidebarUtilities />
            {/* Divider */}

            <hr className="sidebar-divider" />
            {/* Heading */}
            {/* <div className="sidebar-heading">Addons</div> */}

            {/* Nav Item - Pages Collapse Menu */}
            {/* <SidebarPage /> */}
            {/* Nav Item - Charts */}

            {/* <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Charts</span>
                </a>
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table" />
                    <span>Tables</span>
                </a>
            </li> */}
        </ul>
    );
}

export default Sidebar;
