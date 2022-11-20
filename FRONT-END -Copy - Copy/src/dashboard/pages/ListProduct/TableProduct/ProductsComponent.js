import axios from 'axios';
import React from 'react';
import Moment from 'moment';
import { useEffect, useState } from 'react';
// import { Button, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import bookService from "../services/BookService";
class ProductsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            recordPerPage: 3,
            search: '',
        };
    }

    componentDidMount() {
        this.getProductsByPagination(this.state.currentPage);
    }
    getProductsByPagination(currentPage) {
        currentPage = currentPage - 1;
        axios
            .get('http://localhost:8080/api/products/p?page=' + currentPage + '&size=' + this.state.recordPerPage)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    products: data.content, // mang gồm 5 phần tử
                    totalPages: data.totalPages, // tổng số trang là 3
                    totalElements: data.totalElements, // tổng số phần tử là 14
                    currentPage: data.number + 1, // trang hiện tại là 1
                });
            });
    }
    //Writing All the pagination functions
    //Show Next page
    showNextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            if (!this.state.search) {
                this.getProductsByPagination(this.state.currentPage + 1);
            } else {
                this.searchBook(this.state.currentPage + 1);
            }
        }
    };
    //Show Last Page
    showLastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            if (!this.state.search) {
                this.getProductsByPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
            } else {
                this.searchBook(Math.ceil(this.state.totalElements / this.state.recordPerPage));
            }
        }
    };
    //Show First page
    showFirstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (!this.state.search) {
                this.getProductsByPagination(firstPage);
            } else {
                this.searchBook(firstPage);
            }
        }
    };
    //Show previous page
    showPrevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (!this.state.search) {
                this.getProductsByPagination(this.state.currentPage - prevPage);
            } else {
                this.searchBook(this.state.currentPage - prevPage);
            }
        }
    };
    //Search Box Method
    searchBox = (e) => {
        this.setState({
            //assigning value to event target
            [e.target.name]: e.target.value,
        });
    };
    //Search Method Logic
    searchBook = (currentPage) => {
        currentPage = currentPage - 1;
        axios
            .get(
                'http://localhost:8080/api/products/p/' +
                    this.state.search +
                    '?page=' +
                    currentPage +
                    '&size=' +
                    this.state.recordPerPage,
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    products: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    };
    //Reset Search Box
    resetBook = (currentPage) => {
        this.setState({ search: '' });
        this.getProductsByPagination(this.state.currentPage);
    };
    render() {
        const { products, currentPage, totalPages, recordPerPage, search } = this.state;
        return (
            <div>
                <div className="d-flex justify-content-between"></div>
                <h1 className="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>
                <div className="container mt-2">
                    <div style={{ float: 'center' }} align="center">
                        <div class="form-group mb-2">
                            {/* input search */}
                            <input
                                type="text"
                                class="form-control"
                                name="search"
                                size="50"
                                placeholder="Search Here"
                                value={search}
                                onChange={this.searchBox}
                            />
                            {/*btn search */}
                            <button
                                type="button"
                                name="search"
                                class="btn btn-info my-2 text-center mr-2"
                                onClick={this.searchBook}
                            >
                                Search
                            </button>
                            {/* btn clean */}
                            <button
                                type="reset"
                                class="btn btn-secondary text-center ml-5"
                                style={{ marginLeft: '10px' }}
                                onClick={this.resetBook}
                            >
                                Clean
                            </button>
                        </div>
                    </div>
                    <table className="table table-bordered border-info shadow">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>anh</th>
                                <th>Tên SP</th>
                                <th>Người tạo</th>
                                <th className="text-center">Ngày tạo</th>
                                <th>Thể loại</th>
                                <th>Bán/đấu giá</th>
                                <th>Số lượng</th>
                                <th>Giá (đ)</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr align="center">
                                    <td colSpan="5">No Record Found</td>
                                </tr>
                            ) : (
                                products.map((products, index) => (
                                    <tr key={products.id}>
                                        <td>{recordPerPage * (currentPage - 1) + index + 1}</td>
                                        <td>
                                            <img src={products.image} alt="" style={{ width: '100px' }} />
                                        </td>
                                        <td>{products.title}</td>
                                        <td>{products.createdBy}</td>
                                        <td>{Moment(products.createdAt).format('DD-MM-yyyy hh:mm:ss')}</td>
                                        <td>{products.title}</td>
                                        <td>{products.action ? 'Đấu giá' : 'Bán'}</td>
                                        <td>{products.available}</td>
                                        <td>{products.price}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <table className="table">
                        <div
                            style={{
                                float: 'left',
                                fontFamily: 'monospace',
                                color: '#0275d8',
                            }}
                        >
                            Page {currentPage} of {totalPages}
                        </div>
                        <div style={{ float: 'right' }}>
                            <div class="clearfix"></div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a
                                            type="button"
                                            class="page-link"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.showPrevPage}
                                        >
                                            Trang đầu tiên
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a
                                            type="button"
                                            class="page-link"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.showFirstPage}
                                        >
                                            Lùi
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a
                                            type="button"
                                            class="page-link"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.showNextPage}
                                        >
                                            Tiếp
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a
                                            type="button"
                                            class="page-link"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.showLastPage}
                                        >
                                            Trang cuối cùng
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProductsComponent;
