import React from 'react';
import { useEffect, useState } from 'react';
import ProductService from '../../../services/productService';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';
import Spiner from '../../../Spiner';
import ModalDetailProduct from '../../../modal/product/ModalDetail';
import ModalEditProduct from '../../../modal/product/ModalEdit';
import Swal from 'sweetalert2';
import '../../pages.css';
import CategoryService from '../../../services/Category';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function BangSanPham() {
    Moment.locale('vi');
    let tongtien = 0;
    const [state, setState] = useState({
        loading: false,
        products: [],
        currentPage: 1,
        recordPerPage: 5,
        search: '',
        errorMessage: '',
        totalPages: 0,
        categories: [],
    });

    const [reRender, setReRender] = useState(false);

    // modal detail
    const [showDetail, setShowDetail] = useState({
        product: {},
        showdetail: false,
        productIdDetail: 0,
    });

    const { product, showdetail, productIdDetail } = showDetail;

    const handleCloseDetail = () => setShowDetail({ ...showDetail, showdetail: false });

    //modal add
    const [showAdd, setShowAdd] = useState(false);
    // const handCloseAdd = () => setShowAdd(false);

    //modal edit
    const [showEdit, setShowEdit] = useState({
        productEditId: 0,
        showedit: false,
    });
    const { productEditId, showedit } = showEdit;
    const handleCloseEdit = () => setShowEdit(false);

    // function handleClick(id) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         type: 'warning',
    //         text: "You won't be able to revert this!",
    //         footer: '',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //     }).then((result) => {
    //         if (result.value) {
    //             async function deleteProduct(id) {
    //                 await ProductService.DeleteProduct(id);
    //                 setReRender(!reRender);
    //             }
    //             deleteProduct(id);
    //             console.log('result.value');
    //             Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    //         }
    //     });
    // }

    const notify = (id) =>
        Swal.fire({
            title: 'Bạn chắc không?',
            text: 'Bạn sẽ không hoàn tác lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi xóa nó',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                async function deleteProduct(id) {
                    await ProductService.DeleteProduct(id);
                    setReRender(!reRender);
                }
                deleteProduct(id);
                // Swal.fire('</br> Đã kiểm!', 'Bạn đã xóa sản phẩm này');
                toast.success(`Đã xóa thành công!`);
            }
        });
    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let category = await CategoryService.getCategory();
                // console.log('category.data useEffect: ', category.data);
                setState({
                    ...state,
                    categories: category.data,
                    loading: false,
                });
            }
            getData();
            getProductsByPagination(state.currentPage);
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message,
            });
        }
    }, [showAdd, showEdit, reRender]);

    // const WarningData = {
    //     title: 'Are you sure?',
    //     type: 'warning',
    //     text: "You won't be able to revert this!",
    //     footer: '',
    // };

    // const [dataTable, setDataTable] = useState({
    //     products: [],
    //     currentPage: 1,
    //     recordPerPage: 5,
    //     search: '',
    // });
    // const { productsData, currentPage, recordPerPage, search } = dataTable;

    // data table
    async function getProductsByPagination(currentPage) {
        state.currentPage = currentPage - 1;
        let productData = await ProductService.getDataTableProduct(
            state.search,
            state.currentPage,
            state.recordPerPage,
        );
        let category = await CategoryService.getCategory();
        // console.log('productData.data: ', productData.data);
        setState({
            ...state,
            products: productData.data.content,
            totalPages: productData.data.totalPages,
            totalElements: productData.data.totalElements,
            currentPage: productData.data.number + 1,
            categories: category.data,
            loading: false,
        });
    }

    const showNextPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search !== '') {
                getProductsByPagination(current + 1);
            } else {
                searchBook(current + 1);
            }
        }
    };

    const showLastPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (!state.search) {
                getProductsByPagination(Math.ceil(total / record));
            } else {
                searchBook(Math.ceil(total / record));
            }
        }
    };

    const showFirstPage = () => {
        let firstPage = state.currentPage - 1;
        if (state.currentPage > firstPage) {
            if (state.search === '') {
                getProductsByPagination(firstPage);
            } else {
                searchBook(firstPage);
            }
        }
    };

    const showPrevPage = () => {
        let prevPage = 1;
        let curent = state.currentPage;
        // console.log('curent showPrevPage: ', curent);
        if (curent > prevPage) {
            if (state.search === '') {
                getProductsByPagination(curent - curent + 1);
            } else {
                searchBook(curent - prevPage);
            }
        }
    };

    const searchBox = (e) => {
        setState({
            ...state,
            //assigning value to event target
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        document.querySelector('#select').value = '-1';
        document.querySelector('#search').value = '';
        async function getDataTable() {
            let dataTable = await ProductService.getDataTableProduct('', 0, 5);
            setState({
                ...state,
                products: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
                search: '',
            });
        }
        getDataTable();
    };

    const searchBook = (currentPage) => {
        if (document.querySelector('#search').value === '') {
            document.querySelector('#select').value = '-1';
        }
        currentPage = currentPage - 1;
        async function getDataTable() {
            let dataTable = await ProductService.getDataTableProduct(state.search, currentPage, state.recordPerPage);
            setState({
                ...state,
                products: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
            });
            // console.log('state: ', state);
        }
        getDataTable();
    };

    const resetBook = (currentPage) => {
        setState({ ...state, search: '' });
        getProductsByPagination(state.currentPage);
    };

    console.log('state new: ', state);
    const { loading, products, currentPage, recordPerPage, search, errorMessage, totalPages, categories } = state;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between"></div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="shadow mb-4 cur-div">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className="font-weight-bold text-primary" style={{ marginTop: '18px' }}>
                            Danh sách sản phẩm
                        </h5>
                        <div className="d-flex align-items-center w-75">
                            <p className="w-25 mb-0 ">Lọc theo thể loại:</p>
                            <select
                                className="form-select select-bg-ori w-25"
                                id="select"
                                name="search"
                                onChange={searchBox}
                            >
                                <option value={-1} key={-1} disabled selected>
                                    Chọn
                                </option>
                                {categories.map((category) => (
                                    <option value={category.slug} key={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                            <div className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 navbar-search ">
                                <div className="input-group">
                                    <input
                                        style={{ marginTop: '18px' }}
                                        type="text"
                                        id="search"
                                        name="search"
                                        size="75"
                                        className="form-control bg-light small"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        onChange={searchBox}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            style={{ marginTop: '18px' }}
                                            className="btn btn-primary ml-1"
                                            type="button"
                                            name="search"
                                            onClick={searchBook}
                                        >
                                            <i className="fas fa-search fa-sm" />
                                        </button>
                                        <button
                                            style={{ marginTop: '18px' }}
                                            className="btn btn-info ml-1"
                                            type="button"
                                            name="search"
                                            onClick={handleReset}
                                        >
                                            Đặt lại tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Button trigger modal */}
                            {/* <Button type="button" className="btn btn-primary" onClick={() => setShowAdd(true)}>
                                Tạo
                            </Button> */}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th className="text-center">Ảnh</th>
                                        <th className="text-center">Tên sản phẩm</th>
                                        {/* <th>Người tạo</th>
                                        <th className="text-center">Ngày tạo</th> */}
                                        <th className="text-center">Thể loại</th>
                                        <th className="text-center">Bán/Đấu giá</th>
                                        <th className="text-center">Số lượng</th>
                                        <th className="text-center">Giá (đ)</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        tongtien += product.available * product.price;
                                        return (
                                            <tr key={product.id}>
                                                <td className="text-center">
                                                    <button
                                                        onClick={() =>
                                                            setShowDetail({
                                                                product: product,
                                                                showdetail: true,
                                                                productIdDetail: product.id,
                                                            })
                                                        }
                                                        className="btnDetailProduct"
                                                    >
                                                        <img
                                                            src={
                                                                product.image ||
                                                                'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                                                            }
                                                            alt="ảnh sản phẩm"
                                                            style={{ width: '100px' }}
                                                        />
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <strong>{product.title}</strong>
                                                </td>
                                                {/* <td className="text-center">{product.createdBy}</td>
                                                <td className="text-end">
                                                    {Moment(product.createdAt).format('DD-MM-yyyy hh:mm:ss')}
                                                </td> */}
                                                <td className="text-center">
                                                    {product.category.deleted === true ? null : product.category.title}
                                                </td>
                                                <td className="text-center">{product.action ? 'Đấu giá' : 'Bán'}</td>
                                                <td className="text-end">{product.available}</td>
                                                <td className="text-end">
                                                    <NumericFormat
                                                        value={product.price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    {/* <Tippy
                                                        delay={[20, 20]}
                                                        // offset={[15, 8]}
                                                        placement="top"
                                                        content="Cập nhật"
                                                    >
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() =>
                                                                setShowEdit({
                                                                    ...showEdit,
                                                                    productEditId: product.id,
                                                                    showedit: true,
                                                                })
                                                            }
                                                        >
                                                            {' '}
                                                            <i
                                                                className="fa-solid fa-pen-to-square"
                                                                title="Cập nhật"
                                                            ></i>
                                                        </button>
                                                    </Tippy> */}
                                                    <Tippy
                                                        delay={[0, 0]}
                                                        // offset={[15, 8]}
                                                        placement="top"
                                                        content="Xóa"
                                                    >
                                                        <button
                                                            className="btn btn-outline-danger ml-2"
                                                            onClick={() => notify(product.id)}
                                                        >
                                                            {' '}
                                                            <i className="fa-solid fa-trash danger" title="Xóa"></i>
                                                        </button>
                                                    </Tippy>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <td className="text-end">Tổng: </td>
                                        <td className="text-end pr-4">
                                            <NumericFormat
                                                value={tongtien}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' đ'}
                                            />
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div
                                style={{
                                    float: 'left',
                                    fontFamily: 'monospace',
                                    color: '#0275d8',
                                }}
                            >
                                Trang: {currentPage} / {totalPages}
                            </div>
                            <div style={{ float: 'right' }}>
                                <div class="clearfix"></div>
                                {/* <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showPrevPage}
                                            >
                                                <i class="fa-solid fa-backward-fast"></i>
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showFirstPage}
                                            >
                                                {' '}
                                                <i class="fa-solid fa-backward-step"></i>
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showNextPage}
                                            >
                                                <i class="fa-solid fa-forward-step"></i>
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showLastPage}
                                            >
                                                <i class="fa-solid fa-forward-fast"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav> */}
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === 1
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showPrevPage}
                                            >
                                                Trang đầu
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === 1
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showFirstPage}
                                            >
                                                Lùi một trang
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === totalPages
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showNextPage}
                                            >
                                                Tiếp một trang
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === totalPages
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showLastPage}
                                            >
                                                Trang cuối
                                            </span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* <ProductsComponent /> */}
                </div>
            )}
            {/* ================== Modal Edit ================== */}
            <ModalEditProduct productEditId={productEditId} showEdit={showedit} handleCloseEdit={handleCloseEdit} />

            {/* =================== Modal detail products ===================== */}
            <ModalDetailProduct
                product={product}
                showdetail={showdetail}
                productIdDetail={productIdDetail}
                handleCloseDetail={handleCloseDetail}
            />
            <ToastContainer autoClose={1500} />

            {/*==================== Modal Add ===========================*/}
            {/* <ModalAddProduct show={showAdd} handleClose={handCloseAdd} /> */}
        </div>
    );
}

export default BangSanPham;
