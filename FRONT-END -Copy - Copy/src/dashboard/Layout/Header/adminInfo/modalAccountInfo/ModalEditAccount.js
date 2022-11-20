import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AccountService from '../../../../../dashboard/services/AccountService';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FileService from '../../../../../dashboard/services/FileService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let flag = false;
let img = undefined;
function ModalEditAccount(props) {
    const notify = () =>
        toast.success('Cập nhật thành công!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const { showEdit, onCloseEditAccount, accountEditId, account } = props;
    const [stateImg, setStateImg] = useState(false);
    const [state, setState] = useState({
        provinces: [],
    });
    const [accountById, setAccountById] = useState({});
    const [accountFrm, setAccountFrm] = useState({});

    const [location, setLocation] = useState({
        districts: [],
        wards: [],
    });

    useEffect(() => {
        // if (accountEditId !== 0 && accountEditId !== undefined) {
        try {
            async function getAddAccount() {
                let role = await AccountService.getRoles();
                let Province = await AccountService.getProvinces();
                let districtsRes = await AccountService.getDistrict(account.locationRegion.provinceId);
                let wardsRes = await AccountService.getWard(account.locationRegion.districtId);
                let accountEdit = await AccountService.getAccountById(accountEditId);

                setAccountById({ ...accountEdit.data });
                setState({ ...state, roles: role.data, provinces: Province.data.results });
                setLocation({ ...location, districts: districtsRes.data.results, wards: wardsRes.data.results });
            }
            getAddAccount();
        } catch (error) {
            console.log(error);
        }
        // }
    }, [showEdit]);

    useEffect(() => {
        if (flag) {
            try {
                async function postData() {
                    await AccountService.getEditAccount(accountFrm, accountEditId);
                }
                postData();
                handleReset();
                flag = false;
            } catch (error) {
                console.log(error);
            }
        }
    }, [accountFrm]);

    const handleProvince = (e) => {
        try {
            async function getProvince() {
                let district = await AccountService.getDistrict(e.target.value);
                let ward = await AccountService.getWard(district.data.results[0].district_id);
                setLocation({ districts: district.data.results, wards: ward.data.results });
                setAccountFrm({
                    ...accountFrm,
                    provinceId: e.target.value,
                    districtId: district.data.results[0].district_id,
                    wardId: ward.data.results[0].ward_id,
                });
            }
            getProvince();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDistrict = (e) => {
        try {
            async function getDistrict() {
                let ward = await AccountService.getWard(e.target.value);
                setLocation({ ...location, wards: ward.data.results });
                let dist = document.querySelector('#district').options.selectedIndex;
                let currentDistrict = document.querySelector('#district').options[dist].text;
                setAccountFrm({
                    ...accountFrm,
                    districtId: ward.data.results[0].district_id,
                    districtName: currentDistrict,
                    wardId: ward.data.results[0].ward_id,
                    wardName: ward.data.results[0].ward_name,
                });
            }
            getDistrict();
        } catch (error) {
            console.log(error);
        }
    };

    const handleWard = (e) => {
        let war = document.querySelector('#ward').options.selectedIndex;
        let currentWard = document.querySelector('#ward').options[war].text;
        setAccountFrm({
            ...accountFrm,
            wardId: e.target.value,
            wardName: currentWard,
        });
    };

    const handleUpload = (e) => {
        async function uploadAvatar() {
            for (let i = 0; i < e.target.files.length; i++) {
                setStateImg(true);
                let uploadResult = await FileService.Upload(e.target.files[0]);
                img = uploadResult.data.url;
                setStateImg(false);
            }
        }
        uploadAvatar();
    };
    const handleReset = () => {
        document.querySelector('#image').value = '';
        formik.handleReset();
        onCloseEditAccount();
    };

    const formik = useFormik({
        initialValues: {
            id: 0,
            createdAt: '',
            createdBy: '',
            updateAt: '',
            updateBy: '',
            fullName: accountById.fullName,
            username: accountById.username,
            email: accountById.email,
            phone: accountById.phone,
            password: accountById.password,
            repassword: '',
            blocked: accountById.blocked,
            avatar: '',
            role: {
                id: 1,
            },
            locationRegion: {
                id: accountById.locationRegionId,
                provinceId: accountById.locationRegionProvinceId,
                provinceName: accountById.locationRegionProvinceName,
                districtId: accountById.locationRegionDistrictId,
                districtName: accountById.locationRegionDistrictName,
                wardId: accountById.locationRegionWardId,
                wardName: accountById.locationRegionWardName,
                address: accountById.locationRegionAddress,
            },
        },
        validationSchema: yup.object({
            fullName: yup
                .string()
                .min(8, 'Tên của bạn tối thiểu là 8 kí tự!')
                .max(20, 'Tên của bạn tối đa là 20 kí tự!')
                .required('Vui lòng thay đổi họ và tên đầy đủ!'),
            username: yup
                .string()
                .min(8, 'Tên đăng nhập tối thiểu là 8 kí tự!')
                .max(20, 'Tên đăng nhập tối đa là 20 kí tự!')
                .required('Vui lòng thay đổi tên đăng nhập!'),
            email: yup.string().email('Nhập địa chỉ Email hợp lệ!').required('Vui lòng thay đổi email vào!'),
            phone: yup.string().required('Vui lòng thay đổi số điện thoại!'),
            locationRegion: yup
                .object()
                .shape({ provinceId: yup.string().required('Vui lòng thay đổi Tỉnh / Thành phố!') }),
            locationRegion: yup
                .object()
                .shape({ districtId: yup.string().required('Vui lòng thay đổi Quận / huyện!') }),
            locationRegion: yup.object().shape({ wardId: yup.string().required('Vui lòng thay đổi Thôn / xã!') }),
            locationRegion: yup.object().shape({ address: yup.string().required('Vui lòng thay đổi địa chỉ!') }),
        }),
        onSubmit: (account) => {
            console.log('abc');
            let provinceId = document.querySelector('#province').value;
            let prov = document.querySelector('#province').options.selectedIndex;
            let currentProvince = document.querySelector('#province').options[prov].text;

            let districtId = document.querySelector('#district').value;
            let dist = document.querySelector('#district').options.selectedIndex;
            let currentDistrict = document.querySelector('#district').options[dist].text;

            let wardId = document.querySelector('#ward').value;
            let war = document.querySelector('#ward').options.selectedIndex;
            let currentWard = document.querySelector('#ward').options[war].text;

            flag = true;
            account.avatar = img;
            account.blocked = accountById.blocked;
            account.locationRegion.id = accountById.locationRegion.id;
            account.locationRegion.provinceId = provinceId;
            account.locationRegion.provinceName = currentProvince;
            account.locationRegion.districtId = districtId;
            account.locationRegion.districtName = currentDistrict;
            account.locationRegion.wardId = wardId;
            account.locationRegion.wardName = currentWard;
            setAccountFrm({ ...account });
            notify();
        },
    });

    const { provinces } = state;
    const { districts, wards } = location;
    return (
        <Modal show={showEdit} onHide={onCloseEditAccount} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Cập nhật tài khoản</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Modal.Body>
                    <div className="frmError">
                        <ul>
                            {formik.errors.fullName && formik.errors.fullName && (
                                <li className="error">{formik.errors.fullName}</li>
                            )}
                            {formik.errors.email && formik.errors.email && (
                                <li className="error">{formik.errors.email}</li>
                            )}
                            {formik.errors.username && formik.errors.username && (
                                <li className="error">{formik.errors.username}</li>
                            )}
                            {formik.errors.phone && formik.errors.phone && (
                                <li className="error">{formik.errors.phone}</li>
                            )}
                            {formik.errors.districtname && formik.errors.districtname && (
                                <li className="error">{formik.errors.districtname}</li>
                            )}
                            {formik.errors.wardname && formik.errors.wardname && (
                                <li className="error">{formik.errors.wardname}</li>
                            )}
                            {formik.errors.address && formik.errors.address && (
                                <li className="error">{formik.errors.address}</li>
                            )}
                        </ul>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đầy đủ:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Vui lòng nhập họ và tên..."
                                    value={formik.values.fullName || accountById.fullName}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Email:
                                </label>
                                <input
                                    type="Email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Vui lòng nhập Email..."
                                    value={formik.values.email || accountById.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đăng nhập:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="Vui lòng nhập tên đăng nhập..."
                                    value={formik.values.username || accountById.username}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                    Số điện thoại:
                                </label>
                                <input
                                    type="phone"
                                    className="form-control"
                                    value={formik.values.phone || accountById.phone}
                                    onChange={formik.handleChange}
                                    name="phone"
                                    id="phone"
                                    placeholder="Vui lòng nhập số điện thoại..."
                                />
                            </div>
                        </div>
                        <div className="row mb-3 ">
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Tỉnh / Thành phố:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="province"
                                    name="locationRegion.provinceId"
                                    value={formik.values.locationRegion.provinceId ?? account.locationRegion.provinceId}
                                    onChange={formik.handleChange}
                                    onInput={handleProvince}
                                >
                                    {provinces && (
                                        <option value={-1} key={-1} selected>
                                            Chọn
                                        </option>
                                    )}
                                    {provinces.map((province) => (
                                        <option value={province.province_id} key={province.province_id}>
                                            {province.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Quận / Huyện:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="district"
                                    name="locationRegion.districtId"
                                    value={formik.values.locationRegion.districtId ?? account.locationRegion.districtId}
                                    onChange={formik.handleChange}
                                    onInput={handleDistrict}
                                >
                                    {districts ? (
                                        ''
                                    ) : (
                                        <option value={-1} key={-1} disabled>
                                            Chọn tỉnh / Thành phố:
                                        </option>
                                    )}
                                    {districts.map((district) => (
                                        <option value={district.district_id} key={district.district_id}>
                                            {district.district_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Thôn / Thị xã:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="ward"
                                    name="locationRegion.wardId"
                                    value={formik.values.locationRegion.wardId ?? account.locationRegion.wardId}
                                    onChange={formik.handleChange}
                                    onInput={handleWard}
                                >
                                    {wards ? (
                                        ''
                                    ) : (
                                        <option value={-1} key={-1} disabled>
                                            Chọn tỉnh / Thành phố:
                                        </option>
                                    )}
                                    {wards.map((ward) => (
                                        <option value={ward.ward_id} key={ward.ward_id}>
                                            {ward.ward_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Ảnh:
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
                                <img src={img ?? account.avatar} width={100} alt="" />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Địa chỉ:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="locationRegion.address"
                                    placeholder="Vui lòng nhập địa chỉ..."
                                    value={formik.values.locationRegion.address ?? account.locationRegion.address}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="reset" variant="secondary w-auto" onClick={onCloseEditAccount}>
                        Đóng
                    </Button>
                    {stateImg ? (
                        <Button type="submit" className="btn btn-primary">
                            <span className="spinner-border text-info"></span>
                        </Button>
                    ) : (
                        <Button type="submit" className="btn btn-primary">
                            Cập nhật
                        </Button>
                    )}
                    <ToastContainer />
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditAccount;
