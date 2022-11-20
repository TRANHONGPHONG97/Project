import React from 'react';
import './asset/css/content.css';

const AccountInfo = () => {
    return (
        <div className="OnBoarder-module__progress___31t6K">
            <h2>TRUY CẬP TÀI KHOẢN CỦA BẠN</h2>
            <hr />
            <p>
                Khi bạn tạo tài khoản và hoàn thành hồ sơ của mình, bạn sẽ mở khóa quyền truy cập vào tất cả các tính
                năng tuyệt vời của Cửa hàng đấu giá trực tuyến.
            </p>
            <div className="OnBoarder-module__progressionSteps___3uURC">
                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isCurrent___3BHS4">
                    <i className="ProgressionStep-module__icon___3Q3o8 fas fa-solid fa-phone"></i>
                    <span> Số điện thoại</span>
                </div>
                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isCurrent___3BHS4">
                    <i className="ProgressionStep-module__icon___3Q3o8 fas fa-solid fa-user"></i>
                    <span> Tên đăng nhập</span>
                </div>
                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isUpcoming___1xRLv">
                    <i className="ProgressionStep-module__icon___3Q3o8 fas fa-solid fa-file-signature"></i>
                    <span> Họ và tên</span>
                </div>
                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isUpcoming___1xRLv">
                    <i className="ProgressionStep-module__icon___3Q3o8 fas fa-solid fa-lock"></i>
                    <span> Mật khẩu</span>
                </div>

                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isCurrent___3BHS4">
                    <i className="fa-solid fa-envelope"></i>
                    <span> Email</span>
                </div>
                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isCurrent___3BHS4">
                    <i className="fa-solid fa-image-portrait"></i>
                    <span> Ảnh đại diện</span>
                </div>
                <div className="ProgressionStep-module__step___hkWjZ ProgressionStep-module__isCurrent___3BHS4">
                    <i className="fa-solid fa-location-dot"></i>
                    <span> Vị trí</span>
                </div>
            </div>
            <div className="OnBoarder-module__currentSectionName___n7dQW">Tên đăng nhập</div>
        </div>
    );
};

export default AccountInfo;
