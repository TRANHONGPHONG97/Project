import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccount } from '../../../../redux/selector';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import AccountService from '../../../../../dashboard/services/AccountService';
import axios from 'axios';

let flag = false;
const ModalClientDeposit = (props) => {
    const { showeDeposit, onCloseDeposit, accountDepositId } = props;
    console.log('props: ', props);
    const [submitFrm, setSubmitFrm] = useState({
        surplus: '',
    });
    const account_login = useSelector(getAccount);
    useEffect(() => {
        if (flag) {
            try {
                axios
                    .post('http://localhost:8080/api/accounts/deposit', submitFrm)
                    .then(() => {
                        toast.success('Bạn đã nạp tiền thành công!');
                        handleReset();
                    })
                    .catch(() => {
                        toast.error('Bạn đã nạp tiền thất bại, vui lòng nhập nạp lại!');
                    });
                flag = false;
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);

    const formik = useFormik({
        initialValues: {
            id: 0,
            surplus: '',
        },
        validationSchema: yup.object({
            surplus: yup.number().moreThan(49000, 'Vui lòng nhập số lơn hơn 50.000!').required('Vui lòng không được để trống!'),
        }),
        onSubmit: (account) => {
            flag = true;
            setSubmitFrm({ ...submitFrm, id: account_login.id, surplus: account.surplus });
        },
    });
    const handleReset = () => {
        formik.handleReset();
        onCloseDeposit();
    };
    return (
        <div>
            <Modal show={showeDeposit} onHide={onCloseDeposit} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'black' }}>Nạp tiền</Modal.Title>
                </Modal.Header>
                <form multiple="multiple" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <Modal.Body>
                        <div className="frmError"></div>
                        <div className="modal-body">
                            <div className="mb-2 col-12">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Nhập số tiền:
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="surplus"
                                    id="surplus"
                                    placeholder="Vui lòng nhập số tiền cần nạp..."
                                    value={formik.values.surplus}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.surplus && formik.errors.surplus && (
                                    <li className="error">{formik.errors.surplus}</li>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="reset" className="btn btn-primary" onClick={onCloseDeposit}>
                            Đóng
                        </Button>

                        <Button type="submit" className="btn btn-info">
                            Nạp tiền
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default ModalClientDeposit;
