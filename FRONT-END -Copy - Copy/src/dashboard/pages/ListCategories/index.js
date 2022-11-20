import AccountAdmin from '../../Layout/Header/AccountAdmin';
import Sidebar from '../../Layout/Sidebar';
import TableCategories from './TableCategories/index';

function ListCategories() {
    return (
        <>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars" />
                            </button>
                            <AccountAdmin />
                        </nav>
                        <TableCategories />
                    </div>
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
        </>
    );
}

export default ListCategories;
