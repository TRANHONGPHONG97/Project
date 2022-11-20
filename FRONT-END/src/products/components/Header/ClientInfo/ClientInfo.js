import './ClientInfo.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAccount } from '../../../../products/redux/selector';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ModalDetail from './ModalClientInfo/ModalClientInfo';
import { loginStatus, setAccount, setWatchLists } from '../../../../products/redux/actions';
import ModalClientResetPassword from './ModalClientInfo/ModalClientResetPassword';
import ModalEditClient from './ModalClientInfo/ModalEditClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMonero } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import ModalClientDeposit from './ModalClientInfo/ModalClientDeposit';

function ClientInfo() {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);
    const [cookies, setCookie] = useCookies(['JWT']);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };
    // modal edit
    const hanldeCloseEditAccount = () => setShowEdit(false);
    const [showEdit, setShowEdit] = useState({
        account: {},
        accountEditId: 0,
        showedit: false,
    });
    const { accountEditId, showedit } = showEdit;

    //modal edit pass
    const hanldeCloseEditPasswordAccount = () => setShowEditPassword(false);
    const [showEditPassword, setShowEditPassword] = useState({
        account: {},
        accountEditPasswordId: 0,
        showeditpassword: false,
    });
    const { accountEditPasswordId, showeditpassword } = showEditPassword;
    //modal deposit
    const hanldeCloseDeposit = () => setShowDeposit(false);
    const [showDeposit, setShowDeposit] = useState({
        accountDepositId: 0,
        showeDeposit: false,
    });
    const { accountDepositId, showeDeposit } = showDeposit;
    // modal detail
    const [showDetail, setShowDetail] = useState({
        showdetail: false,
        accountId: 0,
    });
    const { accounts, showdetail, accountId } = showDetail;

    const handleCloseDetailAccount = () => setShowDetail(false);
    return (
        <>
            <div className="d-flex align-items-center me-3">
                <div className="clientInfoGroup">
                    <span className="ms-2 fw-bold sp-clientInfo">{account.username} </span>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-black-400" />
                    <div className="clientInfo-dropdown">
                        <ul>
                            <li>
                                <button
                                    className="btn-clientInfo"
                                    onClick={() =>
                                        setShowDetail({
                                            accounts: accounts,
                                            showdetail: true,
                                            accountId: account.id,
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-user-tie"></i> Hồ sơ
                                </button>
                                <br />
                                <button
                                    className="btn-clientInfo"
                                    onClick={() =>
                                        setShowEdit({
                                            accountEditId: account.id,
                                            showedit: true,
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-user-pen"></i> Cập nhật
                                </button>
                                <br />
                                <button
                                    className="btn-clientInfo"
                                    onClick={() =>
                                        setShowEditPassword({
                                            accountEditPasswordId: account.id,
                                            showeditpassword: true,
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-key"></i> Đổi mật khẩu
                                </button>
                                <br />
                                <button
                                    className="btn-clientInfo"
                                    onClick={() =>
                                        setShowDeposit({
                                            accountDepositId: account.id,
                                            showeDeposit: true,
                                        })
                                    }
                                >
                                    <FontAwesomeIcon icon={faMoneyBill1} /> Nạp tiền
                                </button>
                                <br />
                                <button
                                    className="btn-clientInfo"
                                    onClick={function () {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: '<br/> Bạn có chắc đăng xuất không?',
                                            showDenyButton: true,
                                            showCancelButton: true,
                                            showConfirmButton: false,
                                            denyButtonText: `Đăng xuất`,
                                            cancelButtonText: 'Không',
                                        }).then((result) => {
                                            if (result.isDenied) {
                                                toast.success(`Đăng xuất thành công!`);
                                                dispatch(loginStatus(false));
                                                dispatch(setAccount({ NOTFOUND: '' }));
                                                dispatch(setWatchLists([]));
                                                function eraseCookie(name) {
                                                    document.cookie = name + '=; Max-Age=0';
                                                }
                                                setTimeout(() => {
                                                    eraseCookie('JWT');
                                                    navigate('/login');
                                                    logout();
                                                }, 2000);
                                            }
                                        });
                                    }}
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i> Đăng Xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
                {account.email === undefined ? null : (
                    <ModalEditClient
                        showEdit={showedit}
                        accountEditId={accountEditId}
                        onCloseEditAccount={hanldeCloseEditAccount}
                        account={account}
                    />
                )}
                <ModalDetail
                    showDetail={showdetail}
                    accountId={accountId}
                    account={account}
                    onCloseDetailAccount={handleCloseDetailAccount}
                />
                <ModalClientResetPassword
                    showEditPassword={showeditpassword}
                    accountEditPasswordId={accountEditPasswordId}
                    onCloseEditPasswordAccount={hanldeCloseEditPasswordAccount}
                />
                <ModalClientDeposit
                    accountDepositId={accountDepositId}
                    showeDeposit={showeDeposit}
                    onCloseDeposit={hanldeCloseDeposit}
                />
            </div>
        </>
    );
}

export default ClientInfo;
