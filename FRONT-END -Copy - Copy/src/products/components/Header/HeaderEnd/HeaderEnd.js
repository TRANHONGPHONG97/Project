import { Link } from 'react-router-dom';

const HeaderEnd = () => {
    return (
        <div className="main-nav-div">
            <ul className="navigation">
                <li className="left">
                    <Link className="home" to={"/"}>
                        Trang chủ
                    </Link>
                </li>
                <li className="left">
                    <Link to={'/product/the-shop'} className="nav-explore drop-category">
                        Cửa hàng<span className="watch-circle my-cb-circle my-cb-count hidden">0</span>
                    </Link>
                </li>
                <li className="left">
                    <Link className="btn-bin" to={"/product/auction"}>
                        Đấu giá
                    </Link>
                </li>
                <li className="left">
                    <Link className="contact" to="/contact">
                        Liên hệ & Hợp tác cùng chúng tôi
                    </Link>
                </li>
                {/* <li className="left">
                    <a className="contact" href="#">
                        Hợp tác cùng chúng tôi
                    </a>
                </li> */}
            </ul>
            <div className="charity-wrappper">
                <div className="depth-bg-wrapper">
                    <div className="close-charity-dropdown">
                        <i className="icon-remove" />
                    </div>
                    <input id="charities" placeholder="Search by all" type="text" />
                </div>
                <ul id="results" />
            </div>
        </div>
    );
};

export default HeaderEnd;
