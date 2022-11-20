import { faLock, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AccountService from '../../../services/AccountService';
import Spiner from '../../../Spiner';
import ModalDetailAccount from '../../../modal/account/ModalDetail';
import ModalAddAccount from '../../../modal/account/ModalAdd';
import ModalEditAccount from '../../../modal/account/ModalEdit';
import Swal from 'sweetalert2';
import '../../pages.css';
import Tippy from '@tippyjs/react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function BangTaiKhoan() {
    const [state, setState] = useState({
        loading: false,
        accounts: [],
        currentPage: 1,
        recordPerPage: 5,
        search: '',
        errorMessage: '',
        totalPages: 0,
        roles: [],
    });
    const [reRender, setReRender] = useState(false);

    //modal detail
    const [showDetail, setShowDetail] = useState({
        showdetail: false,
        accountId: 0,
    });
    const handleCloseDetailAccount = () => setShowDetail(false);

    //modal add
    const [showAdd, setShowAdd] = useState(false);
    const hanldeCloseAddAccount = () => setShowAdd(false);

    //modal edit
    const [showEdit, setShowEdit] = useState({
        account: {},
        accountEditId: 0,
        showedit: false,
    });
    const hanldeCloseEditAccount = () => setShowEdit(false);

    const deleAccount = (id) =>
        Swal.fire({
            title: 'Bạn có chắc xóa chứ?',
            text: 'Bạn sẽ không hoàn tác lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi xóa',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                async function daleteAcount() {
                    await AccountService.getDeleteAccount(id);
                    setReRender(!reRender);
                    toast.success(`Đã xóa thành công!`);
                }
                daleteAcount();
                // Swal.fire('</br> Đã xóa!', 'Bạn đã xóa người dùng này.', 'Thành công!');
            }
        });
    const lockAccount = (id) =>
        Swal.fire({
            title: 'Bạn có chắc muốn khóa tài khoản này?',
            text: 'Bạn hãy xem xét lựa chọn của mình!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi muốn khóa',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                async function daleteAcount() {
                    await AccountService.patchLockAccount(id);
                    setReRender(!reRender);
                }
                daleteAcount();
                // Swal.fire('</br> Đã khóa!', 'Bạn đã khóa người dùng này.', 'Thành công!');
                toast.success(`Đã khóa người dùng thành công!`);
            }
        });
    const unLockAccount = (id) =>
        Swal.fire({
            title: 'Bạn có chắc muốn mở khóa tài khoản này?',
            text: 'Bạn hãy xem xét lựa chọn của mình!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi muốn mở khóa',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                async function daleteAcount() {
                    await AccountService.patchUnLockAccount(id);
                    setReRender(!reRender);
                }
                daleteAcount();
                // Swal.fire('</br> Đã mở khóa!', 'Bạn đã mở khóa người dùng này.', 'Thành công!');
                toast.success(`Đã mở khóa người dùng thành công!`);
            }
        });

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let role = await AccountService.getRoles();
                setState({
                    ...state,
                    roles: role.data,
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

    // data table
    async function getProductsByPagination(currentPage) {
        state.currentPage = currentPage - 1;
        let accountData = await AccountService.getDataTableAccount(
            state.search,
            state.currentPage,
            state.recordPerPage,
        );
        let role = await AccountService.getRoles();
        setState({
            ...state,
            accounts: accountData.data.content,
            totalPages: accountData.data.totalPages,
            totalElements: accountData.data.totalElements,
            currentPage: accountData.data.number + 1,
            roles: role.data,
            loading: false,
        });
    }

    const showLastPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search === '') {
                getProductsByPagination(Math.ceil(total / record));
            } else {
                searchBook(Math.ceil(total / record));
            }
        }
    };

    const showNextPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search === '') {
                getProductsByPagination(current + 1);
            } else {
                searchBook(current + 1);
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
            [e.target.name]: e.target.value,
        });
    };
    const handleReset = () => {
        document.querySelector('#select').value = '-1';
        document.querySelector('#search').value = '';
        async function getDataTable() {
            let dataTable = await AccountService.getDataTableAccount('', 0, 5);
            setState({
                ...state,
                accounts: dataTable.data.content,
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
            let dataTable = await AccountService.getDataTableAccount(state.search, currentPage, state.recordPerPage);
            setState({
                ...state,
                accounts: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
            });
        }
        getDataTable();
    };

    console.log('account: ', state.accounts);
    const { accountEditId, showedit } = showEdit;
    const { account, showdetail, accountId } = showDetail;
    const { loading, accounts, currentPage, recordPerPage, search, errorMessage, totalPages, roles } = state;
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between"></div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="shadow mb-4 cur-div" style={{ cursor: 'auto !important' }}>
                    <div className="card-header d-flex justify-content-betweeimport">
                        <h5 className="font-weight-bold text-primary" style={{ marginTop: '18px' }}>
                            Danh sách tài khoản
                        </h5>
                        <div className="d-flex align-items-center w-75">
                            {/* <p>Lọc: </p> */}
                            <select
                                className="form-select select-bg-ori col-4 mr-6"
                                id="select"
                                name="search"
                                onChange={searchBox}
                            >
                                <option value={-1} key={-1} disabled selected>
                                    Chọn
                                </option>
                                {roles.map((role) => (
                                    <option value={role.code} key={role.id}>
                                        {role.code}
                                    </option>
                                ))}
                            </select>
                            <div className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group mr-5">
                                    <input
                                        style={{ marginTop: '18px' }}
                                        type="text"
                                        id="search"
                                        name="search"
                                        size="50"
                                        className="form-control bg-light small"
                                        placeholder="Tìm kiếm tên..."
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
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                style={{ width: '150px', height: '40px' }}
                                onClick={() => setShowAdd(true)}
                            >
                                <i className="fa-solid fa-plus" title="Tạo mới"></i> Tạo
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th className="text-center">Ảnh</th>
                                        <th className="text-center">Tên đầy đủ</th>
                                        <th className="text-center">Quyền</th>
                                        <th className="text-center">Tỉnh/Thành Phố</th>
                                        <th className="text-center">Quận/Huyện</th>
                                        <th className="text-center">Thị trấn/Xã</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts === undefined
                                        ? ''
                                        : accounts.map((account) => (
                                              <tr key={account.id}>
                                                  <td className="text-center">
                                                      <button
                                                          onClick={() =>
                                                              setShowDetail({
                                                                  account: account,
                                                                  showdetail: true,
                                                                  accountId: account.id,
                                                              })
                                                          }
                                                          className="btnDetailProduct"
                                                      >
                                                          <img
                                                              src={account.avatar}
                                                              alt="anh tai khoan"
                                                              style={{ width: '100px' }}
                                                          />
                                                      </button>
                                                  </td>
                                                  <td className="text-center">
                                                      <strong>{account.fullName}</strong>
                                                  </td>
                                                  <td className="text-center">{account.role.code}</td>
                                                  <td className="text-center">{account.locationRegion.provinceName}</td>
                                                  <td className="text-center">{account.locationRegion.districtName}</td>
                                                  <td className="text-center">{account.locationRegion.wardName}</td>
                                                  <td className="text-center">
                                                      {/* <Tippy
                                                          delay={[0, 0]}
                                                          // offset={[15, 8]}
                                                          placement="top"
                                                          content="Cập nhật"
                                                      >
                                                          <button
                                                              className="btn btn-outline-secondary"
                                                              data-bs-toggle="modal"
                                                              data-bs-target="#btnEditAccount"
                                                              onClick={() =>
                                                                  setShowEdit({
                                                                      accountEditId: account.id,
                                                                      showedit: true,
                                                                  })
                                                              }
                                                          >
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
                                                              onClick={() => deleAccount(account.id)}
                                                          >
                                                              <i className="fa-solid fa-trash danger" title="Xóa"></i>
                                                          </button>
                                                      </Tippy>
                                                      {account.blocked ? (
                                                          <Tippy
                                                              delay={[0, 0]}
                                                              // offset={[15, 8]}
                                                              placement="top"
                                                              content="Khóa"
                                                          >
                                                              <button
                                                                  className="btn btn-outline-warning ml-2"
                                                                  onClick={() => unLockAccount(account.id)}
                                                              >
                                                                  <FontAwesomeIcon icon={faLock} />
                                                              </button>
                                                          </Tippy>
                                                      ) : (
                                                          <Tippy
                                                              delay={[0, 0]}
                                                              // offset={[15, 8]}
                                                              placement="top"
                                                              content="Khóa"
                                                          >
                                                              <button
                                                                  className="btn btn-outline-warning ml-2"
                                                                  onClick={() => lockAccount(account.id)}
                                                              >
                                                                  <FontAwesomeIcon icon={faUnlockKeyhole} />
                                                              </button>
                                                          </Tippy>
                                                      )}
                                                  </td>
                                              </tr>
                                          ))}
                                </tbody>
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
                    <ToastContainer autoClose={1500} />
                </div>
            )}

            {/* ========================= Modal Edit ========================= */}
            <ModalEditAccount
                showEdit={showedit}
                accountEditId={accountEditId}
                onCloseEditAccount={hanldeCloseEditAccount}
            />

            {/*==================== Modal Add ===========================*/}
            <ModalAddAccount showAdd={showAdd} onCloseAddAccount={hanldeCloseAddAccount} />

            {/* ======================= Modal detail ======================= */}
            <ModalDetailAccount
                showDetail={showdetail}
                accountId={accountId}
                account={account}
                onCloseDetailAccount={handleCloseDetailAccount}
            />
            <ToastContainer autoClose={2000} />
        </div>
    );
}

export default BangTaiKhoan;
