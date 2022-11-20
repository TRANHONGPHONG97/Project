import React from 'react';
import './asset/css/content.css';
const AccountSingupPhone = () => {
    const handleNextInfo = () => {
        alert(1);
    };
    return (
        <div>
            <div className="OnBoarder-module__progressionSteps___3uURC">
                <div className="Card-module__card___edZpg">
                    <div className="SignUp-module__wrapperOnBoarder___1cxLB profile-step">
                        <h2 className="H2-module__h2___n7HMh">Hãy bắt đầu với chúng tôi!</h2>
                        <p className="P-module__p___fx52B">
                            Bạn có thể sử dụng số điện thoại của mình hoặc một tài khoản trực tuyến khác để đăng ký tài
                            khoản!
                        </p>
                        <div className="SignUp-module__wrapperInnerOnBoarder___1evtQ">
                            <form>
                                <fieldset className="Input-module__fieldset___29NZv">
                                    <input
                                        // onChange={handleInputValue}
                                        name=""
                                        className="Input-module__input___r_xts email-primary"
                                        id="react-unique-id-0"
                                        type="tel"
                                        value=""
                                        placeholder="Số điện thoại"
                                    />
                                </fieldset>
                                <div className="Button-module__div___2L21a">
                                    <button
                                        className="Button-module__button____spOe Button-module__disabled___2wmxS"
                                        type="button"
                                        onClick={handleNextInfo}
                                    >
                                        Tiếp tục
                                    </button>
                                </div>
                            </form>
                            <div className="SignUp-module__divider___2J3jM">Hoặc</div>
                            <div className="Button-module__div___2L21a SignUp-module__facebook___1F1vX">
                                <a
                                    className="Button-module__button____spOe Button-module__hasIcon___1ugWt"
                                    href="/auth/facebook?success=/onboarder/card&amp;error=/onboarder/registration"
                                >
                                    <span>
                                        <svg
                                            fill="#fff"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 30 30"
                                            width="30px"
                                            height="30px"
                                        >
                                            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
                                        </svg>
                                        Đăng ký với Facebook
                                    </span>
                                </a>
                            </div>
                            <div className="Button-module__div___2L21a SignUp-module__google___r7xgm">
                                <a
                                    className="Button-module__button____spOe Button-module__hasIcon___1ugWt"
                                    href="/auth/google_oauth2?success=/onboarder/card&amp;error=/onboarder/registration"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 48 48"
                                            width="30px"
                                            height="30px"
                                        >
                                            <path
                                                fill="#FFC107"
                                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                            ></path>
                                            <path
                                                fill="#FF3D00"
                                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                            ></path>
                                            <path
                                                fill="#4CAF50"
                                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                            ></path>
                                            <path
                                                fill="#1976D2"
                                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                            ></path>
                                        </svg>
                                        Đăng ký với Google
                                    </span>
                                </a>
                            </div>
                            <fieldset className="Checkbox-module__fieldset___1LiMC terms-ckbox">
                                <div className="Checkbox-module__div___2e0nt">
                                    <input
                                        className="Checkbox-module__input___ADynG"
                                        id="react-unique-id-1"
                                        type="checkbox"
                                        checked=""
                                    />
                                </div>
                                <label className="Checkbox-module__label___3UYJx" htmlFor="react-unique-id-1">
                                    Gửi email cho tôi về các cuộc đấu giá tốt nhất!
                                </label>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSingupPhone;
