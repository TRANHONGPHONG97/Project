import React from "react";
import { Link } from "react-router-dom";

const HeaderAction = () => {
    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <Link id="show-login-popup" className="new-login-button" to={"/login"}>ĐĂNG NHẬP</Link>
                <Link className="new-signup-button" to={"/registration"}>ĐĂNG KÝ</Link>
            </div>
        </div>
    )
}

export default HeaderAction;