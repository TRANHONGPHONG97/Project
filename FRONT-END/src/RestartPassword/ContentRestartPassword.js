import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../singup/asset/css/content.css';
import axios from 'axios';
import AccountService from '../dashboard/services/AccountService';
import { useNavigate } from 'react-router-dom';

let flag = false;
let flag2 = false;
const ContentRestartPassword = () => {
    const navigate = useNavigate();
    const [accountFrm, setAccountFrm] = useState({
        password: '',
    });
    const [checkError, setCheckError] = useState(false);
    useEffect(() => {
        if (flag && flag2) {
            async function register() {
                await AccountService.postRestartPassword(accountFrm)
                    .then(() => {
                        toast.success('Bạn đã đổi mật khẩu thành công!');
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 2000);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.exceptionMessage);
                        document.querySelector('#email').disabled = false;
                        setCheckError(true);
                    });
            }
            register();
            document.querySelector('#email').disabled = false;
            flag = false;
            flag2 = false;
            try {
            } catch (error) {}
        } else {
        }
    }, [accountFrm]);
    const handleReset = () => {
        formik.handleReset();
    };
    const handleCheckEmail = () => {
        let email = document.querySelector('#email').value;
        axios
            .get('http://localhost:8080/api/accounts/getAccountEmail/' + email)
            .then((account) => {
                toast.success('Kiểm tra email thành công!');
                document.querySelector('#email').disabled = true;
                setCheckError(false);
                setAccountFrm({ ...account.data });
                flag2 = true;
            })
            .catch((error) => {
                toast.error(error.response.data.exceptionMessage);
                document.querySelector('#email').disabled = false;
                setCheckError(true);
            });
    };
    // console.log('acoount: ', accountFrm);

    const formik = useFormik({
        initialValues: {
            id: 0,
            email: '',
            password: '',
            repassword: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('Vui lòng nhập đúng định dạng email!').required('Vui lòng nhập địa chỉ email!'),
            password: yup
                .string()
                .min(8, 'Mật khẩu ít nhất là 8 kí tự!')
                .max(20, 'Mật khẩu tối đa là 20 kí tự!')
                .required('Vui lòng nhập mật khẩu!'),
            repassword: yup
                .string()
                .oneOf([yup.ref('password')], 'Mật khẩu phải trùng nhau!')
                .required('Vui lòng nhập lại mật khẩu!'),
        }),
        onSubmit: (account) => {
            flag = true;
            setAccountFrm({ ...accountFrm, password: account.password });
            handleReset();
        },
    });
    return (
        <>
            <form className="alo" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="base-width-reg main-yield" style={{ maxWidth: '40%' }}>
                    <h3 style={{ color: 'yellow', textAlign: 'center', paddingTop: '50px' }}>Quên mật khẩu</h3>
                    <hr />
                    <div className="modal-body">
                        <div className="frmError row">
                            <ul>
                                {formik.errors.email && formik.errors.email && (
                                    <li className="error">{formik.errors.email}</li>
                                )}
                                {formik.errors.password && formik.errors.password && (
                                    <li className="error">{formik.errors.password}</li>
                                )}
                                {formik.errors.repassword && formik.errors.repassword && (
                                    <li className="error">{formik.errors.repassword}</li>
                                )}
                                {checkError && <li className="error">Bạn chưa kiểm tra Email!</li>}
                            </ul>
                        </div>
                        <div className="row d-flex align-items-end">
                            <div className="mb-2 col-8">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Email:
                                </label>
                                {/* <p style={{ color: 'red' }}>{formErrors.email}</p> */}
                                <input
                                    type="Email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Vui lòng nhập Email..."
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <button
                                    type="button"
                                    className="btn btn-info col-12"
                                    style={{ height: '39px', marginBottom: '16px' }}
                                    onClick={handleCheckEmail}
                                >
                                    Kiểm tra Email
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-2 col-6">
                                <label htmlFor="password" className="form-label text-dark font-weight-bold ml-2">
                                    Nhập mật khẩu:
                                </label>
                                {/* <p style={{ color: 'red' }}>{formErrors.password}</p> */}
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Vui lòng nhập mật khẩu..."
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-6">
                                <label htmlFor="repassword" className="form-label text-dark font-weight-bold ml-2">
                                    Nhập lại mật khẩu:
                                </label>
                                {/* <p style={{ color: 'red' }}>{formErrors.cpassword}</p> */}
                                <input
                                    type="password"
                                    className="form-control"
                                    name="repassword"
                                    id="repassword"
                                    placeholder="Vui lòng nhập lại mật khẩu..."
                                    value={formik.values.repassword}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="signinBtn btn btn-primary"
                            style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </form>

            {/* {stateImg ? (
                <Button type="submit" className="btn btn-primary">
                    <span className="spinner-border text-info"></span>
                </Button>
            ) : (
                <Button type="submit" className="btn btn-primary">
                    Create
                </Button>
            )} */}
            <ToastContainer />
        </>
    );
};

export default ContentRestartPassword;
