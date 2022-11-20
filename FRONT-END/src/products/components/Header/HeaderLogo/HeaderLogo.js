import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
    return (
        <div className="main-logo-div small-4">
            <Link className="logo-home-link-new" to={"/"}>
                <div className="box elegant">
                    <div className="paragraph-logo">
                        AUCTIONS SHOP
                    </div>
                </div>
                {/* <p className="paragraph-logo">AUCTIONS SHOP ONLINE</p> */}
            </Link>
        </div>
    );
};

export default HeaderLogo;
