import React, { useState } from 'react';
// import './styles.css';
import './asset/css/login.css';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default function Google() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const responseGoogle = (response) => {
        // console.log(response);
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
        setLoginStatus(true);
    };
    const logout = () => {
        // console.log('logout');
        setLoginStatus(false);
    };
    return (
        <div className="App">
            {/* {!loginStatus && (
                <GoogleLogin
                    clientId="671348139606-906f7lcl8vk6l26hivc1ka0hk2teuvb1.apps.googleusercontent.com"
                    buttonText="Đăng nhập với Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            )}
            {loginStatus && (
                <div>
                    <h2>Welcome {name}</h2>
                    <h2>Email: {email}</h2>
                    <img src={url} alt={name} />
                    <br />
                    <GoogleLogout
                        clientId="671348139606-906f7lcl8vk6l26hivc1ka0hk2teuvb1.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                    />
                </div>
            )} */}
        </div>
    );
}
