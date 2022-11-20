import './footer.css';

function Footer() {
    return (
        <>
            <div className="containerFooter mt-5 footer">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 mt-4">
                        <h2 style={{ textAlign: 'center', color: '#ccc' }}>Liên Hệ Với Chúng Tôi</h2>
                        <h3 style={{ textAlign: 'center', color: '#ccc' }}>Trụ Sở Chính</h3>
                        <div>
                            <i className="fa-solid fa-map-location-dot my-2"></i>
                            : Trung tâm Auctions Shop Online tại 28 Nguyễn Tri Phương <br />
                            <i className="fa-solid fa-envelope my-2"></i>
                            : auctionshophptp@gmail.com <br />
                            <i className="fa-solid fa-phone-alt my-2"></i>
                            : 0987654321 - 0123456789 <br />
                            <i className="fa-solid fa-clock my-2"></i>: Thứ 2 đến Thứ 6: 08:00 - 18:00
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
                        <h4 style={{ color: '#ccc'}}>Thông tin</h4>
                        <a style={{ color: '#ccc'}} href="#">Thông tin giao hàng</a>
                        <a style={{ color: '#ccc'}} href="#">Chính sách bảo mật</a>
                        <a style={{ color: '#ccc'}} href="#">Điều khoản & Điều kiện</a>
                        <a style={{ color: '#ccc'}} href="#">Liên hệ chúng tôi</a>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 mt-4 follow">
                        <h4 style={{ color: '#ccc'}}>Theo dõi chúng tôi</h4>
                        <div className="icon">
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                            <i className="fa-brands fa-youtube"></i>
                            <i className="fa-brands fa-tiktok"></i>
                        </div>
                    </div>
                    <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#ccc' }}>
                        Trung tâm CodeGym Huế @10-2022 code by HPTP
                    </p>
                </div>
            </div>
        </>
    );
}

export default Footer;
