import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductMediaService from '../../../services/ProductImageService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';

function ModalDetailProduct(props) {
    Moment.locale('vi');
    const { product, showdetail, handleCloseDetail, productIdDetail } = props;
    const [imageProduct, setImageProduct] = useState([
        {
            id: 0,
            fileUrl: '',
        },
    ]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        async function getImage() {
            let imageData = await ProductMediaService.getListMedia(productIdDetail);
            setImageProduct(imageData.data);
        }
        getImage();
    }, [showdetail]);

    return (
        <Modal show={showdetail} onHide={handleCloseDetail} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Thông tin sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-0">
                    {/* image */}
                    <div className="col-md-4 ">
                        <Slider {...settings}>
                            {imageProduct.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.fileUrl}
                                    className="img-fluid rounded-start"
                                    alt="Ảnh sản phẩm"
                                />
                            ))}
                        </Slider>
                    </div>

                    <div className="col-md-7 ml-5">
                        <div className="row">
                            <h5 className="col-sm-6">Tên sản phẩm:</h5>
                            <p className="col-sm-6">{product.title}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Ngày Tạo:</h5>
                            <p className="col-sm-6">{Moment(product.createdAt).format('DD-MM-yyyy hh:mm:ss')}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Người tạo:</h5>
                            <p className="col-sm-6">{product.createdBy}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Ngày Sửa Đổi Gần Nhất:</h5>
                            <p className="col-sm-6">{Moment(product.updateAt).format('DD-MM-yyyy hh:mm:ss')}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Người Sửa Đổi:</h5>
                            <p className="col-sm-6">{product.updateBy}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Đấu Giá / Bán:</h5>
                            <p className="col-sm-6">{product.action ? 'Bán' : 'Đấu Giá'}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Số Lượng Còn Lại:</h5>
                            <p className="col-sm-6">{product.available}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Đã Kiểm Duyệt:</h5>
                            <p className="col-sm-6">{product.moderation ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Giá:</h5>
                            <p className="col-sm-6">
                                <NumericFormat
                                    value={product.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' đ'}
                                />
                            </p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Đã bán:</h5>
                            <p className="col-sm-6">{product.sold}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Thể Loại:</h5>
                            <p className="col-sm-6">{product.category && product.category.title}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-6">Mô tả:</h5>
                            <p className="col-sm-6">{product.description}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-primary" onClick={handleCloseDetail}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailProduct;
