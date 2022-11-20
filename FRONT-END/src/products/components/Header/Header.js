import React from 'react';
import HeaderAction from './HeaderAction/HeaderAction';
import HeaderEnd from './HeaderEnd/HeaderEnd';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderSearch from './HeardSearch/HeaderSearch';
import './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../../../../node_modules/bootstrap/dist/js/bootstrap.js';
import HeaderAfterLogin from './HeaderAfterLogin/HeaderAfterLogin';
import './header.css';
import { useSelector } from 'react-redux/es/exports';
import { getLoginStatus } from './../../redux/selector';
import { Outlet } from 'react-router-dom';

const Header = () => {
    const login = useSelector(getLoginStatus);

    return (
        <>
            <div className="full-width header-nav clearfix no-show-webview" id="navbar">
                <div className="padd-horizontal_category_nav">
                    <div className="show-for-medium">
                        <div className="main-header-div grid-x">
                            <HeaderSearch />
                            <HeaderLogo />
                            {login ? <HeaderAfterLogin /> : <HeaderAction />}
                        </div>
                        <HeaderEnd />
                    </div>
                </div>
                {/* <Outlet /> */}
            </div>
        </>
    );
};

export default Header;
