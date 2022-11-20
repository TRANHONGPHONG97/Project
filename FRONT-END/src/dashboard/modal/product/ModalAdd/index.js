import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CategoryService from '../../../services/Category';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import FileService from '../../../services/FileService';
import '../../modal.css';
import 'react-toastify/dist/ReactToastify.css';
import ProductService from '../../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getShowAddProduct } from '../../../../products/redux/selector';
import { setShowAddProduct } from '../../../../products/redux/actions';
let flag = false;
let listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];

function ModalAddProduct(props) {
    const account = useSelector(getAccount);
    const dispatch = useDispatch();
    // const notify = () =>
    //     toast.success('Đã thêm thành công!', {
    //         position: 'top-right',
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: 'colored',
    //     });
    const { show, handleClose } = props;
    const [category, setCategory] = useState({
        loading: false,
        categorys: [],
        errorMessage: '',
    });

    const [stateImg, setStateImg] = useState(false);

    const [radio, setRadio] = useState(false);
    const [submitFrm, setSubmitFrm] = useState({
        action: true,
        available: 0,
        image: '',
        moderation: false,
        price: 0,
        estimatePrice: 0,
        slug: '',
        sold: 0,
        title: '',
        viewed: 0,
        category: {
            id: 0,
        },
        description: '',
        images: [],
    });

    //upload multi image cloudinary
    const handleUpload = (e) => {
        listImg.shift();
        async function uploadAvatar() {
            for (let i = 0; i < e.target.files.length; i++) {
                setStateImg(true);
                let uploadResult = await FileService.Upload(e.target.files[i]);
                listImg.push(uploadResult.data.url);
            }
            setTimeout(() => {
                setStateImg(false);
            }, 1000 * 2);
            console.log('listImg: ', listImg);
        }
        uploadAvatar();
    };

    useEffect(() => {
        try {
            setCategory({ ...category, loading: true });
            async function getCate() {
                let category = await CategoryService.getCategory();
                setCategory({ ...categorys, categorys: category.data, loading: false });
            }
            getCate();
        } catch (error) {
            setCategory({ ...categorys, errorMessage: error.message, loading: false });
        }
    }, []);

    //here

    useEffect(() => {
        if (flag) {
            try {
                listImg.reverse();
                async function postData(submitFrm) {
                    setCategory({ ...category, loading: true });
                    await ProductService.AddProduct(submitFrm);
                }
                postData(submitFrm);
                setCategory({ ...category, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);
    // Validate from add
    const handleCloseAddProduct = () => {
        dispatch(setShowAddProduct(false));
        document.querySelector('#image').value = '';
        listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];
        formik.handleReset();
    };

    const handleResetFrom = () => {
        document.querySelector('#image').value = '';
        listImg = ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'];
        formik.handleReset();
    };
    const formik = useFormik({
        initialValues: {
            action: radio,
            available: 0,
            image: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg',
            moderation: true,
            price: 0,
            estimatePrice: 0,
            slug: '',
            sold: 0,
            title: '',
            viewed: 0,
            category: {
                id: 0,
            },
            description: '',
            countday: '0',
            cheatMoney: 0,
            images: ['https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'],
            createdBy: '',
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .min(5, 'Tên sản phẩm tối thiểu là 5 kí tự!')
                .max(25, 'Tên sản phẩm tối đa là 25 kí tự!')
                .required('Bạn phải nhập tên sản phẩm vào!'),
            price: yup
                .number('Vui lòng nhập số!')
                .required('Vui lòng nhập giá!')
                .moreThan(99999, 'Sản phẩm có giá nhỏ nhất là: 100.000 đ'),
            estimatePrice: yup.number('Vui lòng nhập số!'),
            // .min(10000, 'Vui lòng nhập giá ước tính trên 10000 VNĐ!')
            // .max(999900000, 'Vui lòng nhập giá ước tính dưới 999900000 VNĐ!'),
            // .required('Vui lòng nhập giá ước tính!'),
            available: radio
                ? null
                : yup
                      .number('Vui lòng nhập số!')
                      .required('Vui lòng nhập số lượng!')
                      .moreThan(1, 'Số lượng sản phẩm nhỏ nhất là 1')
                      .lessThan(199, 'Số lượng lớn nhất là 200'),
            action: yup.string(),
            image: yup.mixed(),
            description: yup.string(),
            cheatMoney: yup
                .number()
                .required('vui lòng nhập tiền quỵ')
                .moreThan(499999, 'Tiền quỵ nhỏ nhất là 500.000'),
        }),
        onSubmit: (product) => {
            product.createdBy = account.email;
            if (radio) {
                product.action = radio;
                product.available = 1;
                listImg.reverse();
                product.image = listImg[0];
                product.images = listImg;
                flag = true;
                product.category.id = Number(document.querySelector('#category').value);
                product.estimatePrice = document.querySelector('#estimatePrice').value;
                setSubmitFrm(product);
                handleResetFrom();
            } else {
                product.action = radio;
                listImg.reverse();
                product.image = listImg[0];
                product.images = listImg;
                flag = true;
                product.category.id = Number(document.querySelector('#category').value);
                product.estimatePrice = document.querySelector('#countday').value;
                setSubmitFrm(product);
                handleResetFrom();
            }
        },
    });

    const { loading, categorys, errorMessage } = category;
    const showAddProduct = useSelector(getShowAddProduct);
    return (
        <Modal show={showAddProduct} onHide={handleCloseAddProduct} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Thêm mới sản phẩm</Modal.Title>
            </Modal.Header>
            {loading ? (
                <span className="spinner-border text-warning"></span>
            ) : (
                <form multiple="multiple" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    {/* <form> */}
                    <Modal.Body>
                        <div className="frmError">
                            <ul>
                                {formik.errors.title && formik.touched.title && (
                                    <li className="error">{formik.errors.title}</li>
                                )}
                                {formik.errors.price && formik.touched.price && (
                                    <li className="error">{formik.errors.price}</li>
                                )}
                                {formik.errors.available && formik.touched.available && (
                                    <li className="error">{formik.errors.available}</li>
                                )}
                                {formik.errors.category && formik.touched.category && (
                                    <li className="error">{formik.errors.category}</li>
                                )}
                                {formik.errors.image && formik.touched.image && (
                                    <li className="error">{formik.errors.image}</li>
                                )}
                                {formik.errors.estimatePrice && formik.touched.estimatePrice && (
                                    <li className="error">{formik.errors.estimatePrice}</li>
                                )}
                                {formik.errors.cheatMoney && formik.touched.cheatMoney && (
                                    <li className="error">{formik.errors.cheatMoney}</li>
                                )}
                            </ul>
                        </div>
                        <div className="modal-body">
                            {/* <div className="row"> */}
                            {radio ? (
                                <div className="row">
                                    <div className="col-6 d-flex">
                                        <div className="col-6">
                                            <label
                                                htmlFor="addTitle"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Tên sản phẩm
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                id="addTitle"
                                                placeholder="Vui lòng nhập tên sản phẩm..."
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                htmlFor="addPrice"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Giá khởi điểm:
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                id="addPrice"
                                                placeholder="Vui lòng nhập giá..."
                                                value={formik.values.price}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex">
                                        <div className="col-6">
                                            <label
                                                htmlFor="addTitle"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Giá ước tính:
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="estimatePrice"
                                                id="estimatePrice"
                                                placeholder="Vui lòng nhập giá ước tính..."
                                                value={formik.values.estimatePrice}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label
                                                htmlFor="addPrice"
                                                className="form-label text-dark font-weight-bold ml-2"
                                            >
                                                Ngày kết thúc:
                                            </label>
                                            <select
                                                className="form-select select select-bg-ori"
                                                id="countday"
                                                name="countday"
                                                value={formik.values.countday}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="1" key="1">
                                                    1
                                                </option>
                                                <option value="2" key="2">
                                                    2
                                                </option>
                                                <option value="3" key="3">
                                                    3
                                                </option>
                                                <option value="4" key="4">
                                                    4
                                                </option>
                                                <option value="5" key="5">
                                                    5
                                                </option>
                                                <option value="6" key="6">
                                                    6
                                                </option>
                                                <option value="7" key="7">
                                                    7
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-6">
                                        <label
                                            htmlFor="addTitle"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Tên sản phẩm
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            id="addTitle"
                                            placeholder="Vui lòng nhập tên sản phẩm..."
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label
                                            htmlFor="addPrice"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Giá
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            id="addPrice"
                                            placeholder="Vui lòng nhập giá..."
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* </div> */}
                            <div className="row">
                                {radio ? (
                                    <div className="mb-3 col-4">
                                        <input
                                            type="hidden"
                                            className="form-control"
                                            value={5}
                                            onChange={formik.handleChange}
                                            name="available"
                                            id="addAvailable"
                                            placeholder="Vui lòng nhập số lượng..."
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-3 col-4">
                                        <label
                                            htmlFor="addAvailable"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Số Lượng
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formik.values.available}
                                            onChange={formik.handleChange}
                                            name="available"
                                            id="addAvailable"
                                            placeholder="Vui lòng nhập số lượng..."
                                        />
                                    </div>
                                )}
                                <div className="form-check form-switch mb-3 col-4">
                                    <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                        Bày bán/Đấu giá
                                    </label>
                                    <div className="form-check">
                                        <label className="form-check-label" htmlfor="flexRadioDefault1">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="action"
                                                {...(radio && 'checked')}
                                                id="flexRadioDefault1"
                                                value={true}
                                                onClick={() => setRadio(true)}
                                            />
                                            Đấu giá
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label" htmlfor="flexRadioDefault2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="action"
                                                {...(radio && 'checked')}
                                                // onInput={handleChange}
                                                id="flexRadioDefault2"
                                                value={false}
                                                onClick={() => setRadio(false)}
                                            />
                                            Bán
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 col-4">
                                    <label
                                        htmlFor="addCateglory"
                                        className="form-label text-dark font-weight-bold ml-2"
                                    >
                                        Thể loại
                                    </label>
                                    <select
                                        className="form-select select select-bg-ori"
                                        id="category"
                                        name="category.id"
                                        value={formik.values.category.id}
                                        onChange={formik.handleChange}
                                    >
                                        <option value={0} key={0} defaultChecked disabled>
                                            Chọn
                                        </option>
                                        {categorys.map((category) => (
                                            <option value={category.id} key={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                        Ảnh{' '}
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple="multiple"
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        placeholder="Vui lòng chọn file..."
                                        onInput={handleUpload}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="cheatMoney" className="form-label text-dark font-weight-bold ml-2">
                                        Tiền quỵ:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formik.values.cheatMoney}
                                        onChange={formik.handleChange}
                                        name="cheatMoney"
                                        id="cheatMoney"
                                        placeholder="Vui lòng nhập số lượng..."
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="row d-flex justify-content-around">
                                    {listImg.map((image, index) => (
                                        <div className="col-3 imgAdd" key={index} style={{ height: '200px' }}>
                                            <img
                                                src={image}
                                                alt=""
                                                onClick={() => document.querySelector('#image').click()}
                                                className="imgproduct"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-12">
                                    <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                        Mô tả
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="reset" variant="secondary w-auto" className="" onClick={handleCloseAddProduct}>
                            Đóng
                        </Button>
                        {stateImg ? (
                            <Button type="submit" className="btn btn-primary">
                                <span className="spinner-border text-info"></span>
                            </Button>
                        ) : (
                            <Button type="submit" className="btn btn-primary">
                                Thêm
                            </Button>
                        )}
                        <ToastContainer autoClose={1500} />
                    </Modal.Footer>
                </form>
            )}
        </Modal>
    );
}

export default ModalAddProduct;
