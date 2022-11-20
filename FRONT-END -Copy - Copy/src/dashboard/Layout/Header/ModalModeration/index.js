import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductMediaService from '../../../services/ProductImageService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2';
import ProductService from '../../../services/productService';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';

function ModalDetailProduct(props) {
    Moment.locale('vi');
    const { showModal, idProduct, handleCloseModeration } = props;
    const [product, setProduct] = useState([]);
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
    // console.log('imageProduct: ', imageProduct);

    useEffect(() => {
        if (showModal) {
            try {
                async function getImage() {
                    let imageData = await ProductMediaService.getListMedia(idProduct);
                    setImageProduct(imageData.data);
                    let pro = await ProductService.ProductById(idProduct);
                    setProduct(pro.data);
                }
                getImage();
            } catch (error) {
                console.log(error);
            }
        }
    }, [showModal]);

    const notify = () =>
        Swal.fire({
            title: 'Bạn có đồng ý không?',
            text: 'Bạn sẽ không hoàn tác lại!',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi muốn duyệt',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                async function getModeration() {
                    let moderation = await ProductService.ModerationProduct(idProduct);
                    console.log('moderation.data: ', moderation.data);
                }
                getModeration();
                Swal.fire('<br/> Đã kiểm duyệt!', 'Bạn đã kiểm duyệt sản phẩm này.', 'Thành công!').then(() =>
                    handleCloseModeration(),
                );
            }
        });
    const notifyDel = () =>
        Swal.fire({
            title: 'Bạn có chắc xóa không?',
            text: 'Bạn sẽ không hoàn tác lại!',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi muốn xóa',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                async function getModeration() {
                    let moderation = await ProductService.DeleteProduct(idProduct);
                    console.log('moderation.data: ', moderation.data);
                }
                getModeration();
                Swal.fire('<br/> Đã xóa!', 'Bạn đã xóa sản phẩm này.', 'Thành công!').then(() =>
                    handleCloseModeration(),
                );
            }
        });
    console.log('moderation: ', product);
    return (
        <Modal show={showModal} onHide={handleCloseModeration} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product === [] ? (
                    ''
                ) : (
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
                                <h5 className="col-sm-5">Title:</h5>
                                <b className="col-sm-7">{product.title}</b>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Ngày Tạo:</h5>
                                <p className="col-sm-7">{Moment(product.createdAt).format('DD-MM-yyyy HH:mm:ss')}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Người tạo:</h5>
                                <p className="col-sm-7">{product.createdBy}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Đấu Giá / Bán</h5>
                                <p className="col-sm-7">{product.action ? 'Đấu Giá' : 'Bán'}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Số Lượng Còn Lại</h5>
                                <p className="col-sm-7">{product.available}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Đã Kiểm Duyệt:</h5>
                                <p className="col-sm-7">{product.moderation ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Giá:</h5>
                                <p className="col-sm-7">
                                    <NumericFormat
                                        value={product.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' đ'}
                                    />
                                </p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Giá khởi điểm:</h5>
                                <p className="col-sm-7">
                                    <NumericFormat
                                        value={product.estimatePrice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' đ'}
                                    />
                                </p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Đã bán:</h5>
                                <p className="col-sm-7">{product.sold}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Thể Loại:</h5>
                                <p className="col-sm-7">{product.category && product.category.title}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Mô tả:</h5>
                                <p className="col-sm-7">{product.description}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-5">Tiền quỵ:</h5>
                                <p className="col-sm-7">
                                    <NumericFormat
                                        value={product.cheatMoney}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' đ'}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseModeration}>
                    Đóng
                </Button>
                <Button variant="outline-danger" onClick={notifyDel}>
                    Xóa
                </Button>
                <Button variant="info" onClick={notify}>
                    Kiểm duyệt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailProduct;
