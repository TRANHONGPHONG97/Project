import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';


const ListBids = ({ showListBids, bids, closeAction, timeAuction, changeShowListBids }) => {
    moment.locale('vi');
    const handleClose = () => {
        changeShowListBids(false);
    };
    return (
        <>
            <Modal size="xl"
                show={showListBids}
                onHide={handleClose}
                // backdrop="static" 
                keyboard={false}
            >
                <Modal.Header closeButton style={closeAction ? {border: '2px solid #b86c17' , backgroundColor: '#f8e6d3', borderBlockColor: '#b86c17' } : { backgroundColor: '#198553' }}>
                    <Modal.Title style={closeAction ? { color: '#b86c17' } : { color: '#fff' }}>Lịch sử đấu giá </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-checkout-modal" style={{ backgroundColor: '#f2f2f2' }}>
                    <Container>
                        <>
                            <Row>
                                <Col xs={12} md={12}>
                                    <div className="title-desc">
                                        <h2 className='text-center'>Sản phẩm: {bids.length === 0 ? '' : bids[0].auction.product.title}</h2>
                                        <hr />
                                        <p>
                                            <span className="">Người đặt giá cao nhất: </span>{' '}
                                            {bids.length === 0 ? '' : <b>{bids[0].account.fullName}</b>}
                                        </p>
                                    </div>
                                    <div className="summary-wrapper mt-2">
                                        <div className="summary-blocks grid-x grid-margin-x">
                                            <div className="summary-block cell small-3">
                                                <div className="summary-title text-center">
                                                    Giá lớn nhất:
                                                </div>
                                                <div className="summary-text text-center">
                                                    {bids.length === 0 ? (
                                                        'Hãy là người đặt giá đầu tiên'
                                                    ) : (
                                                        <b>
                                                            <NumericFormat
                                                                value={bids[0].bidPrice}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' đ'}
                                                            />
                                                        </b>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="summary-block cell small-3">
                                                <div className="summary-title text-center">
                                                    Lượt đặt giá
                                                </div>
                                                <div className="summary-text text-center fw-bold">{bids.length}</div>
                                            </div>
                                            <div className="summary-block cell small-6">
                                                <div className="summary-title text-center">
                                                    Thời gian còn lại
                                                </div>
                                                {closeAction ? (
                                                    <div className="summary-text text-center fw-bold">Phiên đấu giá đã kết thúc</div>
                                                ) : (
                                                    <div className="summary-text text-center fw-bold">
                                                        {timeAuction[0]}d : {timeAuction[1]}h : {timeAuction[2]}m :{' '}
                                                        {timeAuction[3]}s
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="history-list show-for-medium mt-3">
                                        <div className="grid-x grid-padding-x bid-header" style={{ backgroundColor: '#d2d2d2', height: '50px', lineHeight: '50px' }}>
                                            <div className="cell small-2 col-rank text-center">Thứ hạng</div>
                                            <div className="cell small-5 col-info text-center">Người đấu giá</div>
                                            <div className="cell small-3 col-info text-center">Thời gian đặt giá</div>
                                            <div className="cell small-2 col-info col-amt text-center">Số tiền (đ)</div>
                                        </div>
                                        {bids.map((bid, index) => (
                                            <div className="grid-x grid-padding-x bid-row winner mt-2" key={bid.id}>
                                                <div className="cell small-2 col-rank text-center">
                                                    <div className="rank">{index + 1}</div>
                                                </div>
                                                <div className="cell small-5 col-info col-name">
                                                    <div className="customer-name">{bid.account.fullName}</div>
                                                </div>
                                                <div className="cell small-3 col-info col-date text-center">
                                                    {moment(bid.createdAt).format('LTS L')}
                                                </div>
                                                <div className="cell small-2 col-info col-amt text-end">
                                                    <div className="text-bidamt">
                                                        <NumericFormat
                                                            value={bid.bidPrice}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                        // suffix={' đ'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>

                        </>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0' }}></Modal.Footer>
            </Modal>
        </>
    );
};

export default ListBids;
