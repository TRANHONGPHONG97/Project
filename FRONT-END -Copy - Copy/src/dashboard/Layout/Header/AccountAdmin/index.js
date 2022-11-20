import Tippy from '@tippyjs/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ProductService from '../../../services/productService';
import ModalModeration from '../ModalModeration';
import AdminInfo from './../adminInfo/AdminInfo';

function AccountAdmin() {
    const [showModalModeration, setShowModerationProduct] = useState({
        products: [],
        idProduct: 0,
        showModal: false,
    });
    const handleCloseModeration = () =>
        setShowModerationProduct({
            ...showModalModeration,
            showModal: false,
        });
    const { products, idProduct, showModal } = showModalModeration;
    useEffect(() => {
        async function getListProduct() {
            let listProduct = await ProductService.getProductsModeration();
            setShowModerationProduct({ ...showModalModeration, products: listProduct.data });
        }
        getListProduct();
    }, [showModal]);

    const renderThongBao = () => {
        return (
            <div className="dropdown-list dropdown-menu-right shadow animated--grow-in" id="thongbao">
                <h6 className="dropdown-header">Thông báo</h6>
                {products.map((product) => (
                    <Button
                        className="dropdown-item d-flex align-items-center alerts-a"
                        onClick={() =>
                            setShowModerationProduct({
                                ...showModalModeration,
                                showModal: true,
                                idProduct: product.id,
                            })
                        }
                        key={product.id}
                    >
                        <div className="mr-3">
                            <div className="icon-circle bg-primary">
                                {/* <i className="fas fa-file-alt text-white" /> */}
                                <img src={product.image} alt="" className="imgAlerts" />
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">{moment(product.createdAt).format('DD-MM-yyyy')}</div>
                            <span className="font-weight-bold">{product.title}</span>
                        </div>
                    </Button>
                ))}
            </div>
        );
    };

    const renderTinNhan = () => {
        return (
            <div
                className="dropdown-list dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="messagesDropdown"
            >
                <h6 className="dropdown-header">Message Center</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="img/undraw_profile_1.svg" alt="..." />
                        <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold">
                        <div className="text-truncate">
                            Hi there! I am wondering if you can help me with a problem I've been having.
                        </div>
                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="img/undraw_profile_2.svg" alt="..." />
                        <div className="status-indicator" />
                    </div>
                    <div>
                        <div className="text-truncate">
                            I have the photos that you ordered last month, how would you like them sent to you?
                        </div>
                        <div className="small text-gray-500">Jae Chun · 1d</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="img/undraw_profile_3.svg" alt="..." />
                        <div className="status-indicator bg-warning" />
                    </div>
                    <div>
                        <div className="text-truncate">
                            Last month's report looks great, I am very happy with the progress so far, keep up the good
                            work!
                        </div>
                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..." />
                        <div className="status-indicator bg-success" />
                    </div>
                    <div>
                        <div className="text-truncate">
                            Am I a good boy? The reason I ask is because someone told me that people say this to all
                            dogs, even if they aren't good...
                        </div>
                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                    </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">
                    Read More Messages
                </a>
            </div>
        );
    };

    const renderAccuont = () => {
        return <div></div>;
    };
    return (
        <ul className="navbar-nav ml-auto">
            {/* Nav Item - Search Dropdown (Visible Only XS) */}
            <li className="nav-item dropdown no-arrow d-sm-none">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i className="fas fa-search fa-fw" />
                </a>
            </li>
            {/* Nav Item - Alerts */}
            <li className="nav-item dropdown no-arrow mx-1">
                <Tippy placement="bottom-end" interactive content={renderThongBao()} hideOnClick={true} trigger="click">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown">
                        <i className="fas fa-bell fa-fw" />
                        <span className="badge badge-danger badge-counter">{products.length}</span>
                    </a>
                </Tippy>
            </li>
            {/* Nav Item - Messages */}
            {/* <li className="nav-item dropdown no-arrow mx-1">
                <Tippy
                    placement="bottom-end"
                    interactive
                    content={renderTinNhan()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="messagesDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fas fa-envelope fa-fw" />
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </Tippy>
            </li> */}
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
                <Tippy
                    // delay={[0, 700]}
                    // offset={[15, 8]}
                    placement="bottom-end"
                    interactive
                    content={renderAccuont()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span style={{ fontWeight: 'bold' }} className="mr-2 d-none d-lg-inline text-gray-600 small">
                            <AdminInfo />
                        </span>
                    </a>
                </Tippy>
            </li>
            <ModalModeration
                showModal={showModal}
                idProduct={idProduct}
                handleCloseModeration={handleCloseModeration}
            />
        </ul>
    );
}

export default AccountAdmin;
