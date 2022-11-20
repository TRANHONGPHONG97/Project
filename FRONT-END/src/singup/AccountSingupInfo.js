import React from 'react';

const AccountSingupInfo = () => {
    return (
        <div>
            <div className="OnBoarder-module__progressionSteps___3uURC">
                <div className="Card-module__card___edZpg">
                    <div className="SignUp-module__wrapperOnBoarder___1cxLB profile-step">
                        <h2 className="H2-module__h2___n7HMh">Đăng ký thông tin người dùng</h2>
                        <p className="P-module__p___fx52B"></p>
                        <div className="SignUp-module__wrapperInnerOnBoarder___1evtQ">
                            <form>
                                <fieldset className="Input-module__fieldset___29NZv">
                                    <input
                                        className="Input-module__input___r_xts email-primary"
                                        id="react-unique-id-0"
                                        type="text"
                                        value=""
                                        placeholder="Tên đăng nhập"
                                    />
                                    <br />
                                    <input
                                        className="Input-module__input___r_xts email-primary"
                                        id="react-unique-id-0"
                                        type="text"
                                        value=""
                                        placeholder="Họ và tên"
                                    />
                                    <br />
                                    <input
                                        className="Input-module__input___r_xts email-primary"
                                        id="react-unique-id-0"
                                        type="password"
                                        value=""
                                        placeholder="Mật khẩu"
                                    />
                                    <br />
                                    <input
                                        className="Input-module__input___r_xts email-primary"
                                        id="react-unique-id-0"
                                        type="email"
                                        value=""
                                        placeholder="Email"
                                    />
                                    <br />
                                    <input
                                        className="Input-module__input___r_xts email-primary"
                                        id="react-unique-id-0"
                                        type="text"
                                        placeholder="Ảnh đại diện"
                                    />
                                </fieldset>
                                <div className="Button-module__div___2L21a">
                                    <button
                                        className="Button-module__button____spOe Button-module__disabled___2wmxS"
                                        type="submit"
                                        data-testid="next"
                                    >
                                        <span>Đăng ký</span>
                                    </button>{' '}
                                    |
                                    <button
                                        className="Button-module__button____spOe Button-module__disabled___2wmxS"
                                        type="submit"
                                        data-testid="back"
                                    >
                                        <span> Quay lại</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSingupInfo;
