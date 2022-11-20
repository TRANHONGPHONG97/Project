import Dashboard from './dashboard/pages/Dashboard';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import './assets/bootstrap-5.2.0-dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.min.css';
import Product from './products/Product';
import ListProduct from './dashboard/pages/ListProduct';
import ListAccount from './dashboard/pages/ListAccount';
import Auction from './Auction';
import ListCategories from './dashboard/pages/ListCategories/index';
import ShowCartItem from './products/components/Content/CartItem/index';
import Register from './singup/Register';
import RestartPassword from './RestartPassword';
import Login from './login/Login';
import TheShop from './products/components/Content/ProductDetail/TheShop/index';
import Deny from './DenyPage/Deny';
import ShowPageAuction from './products/components/Content/Pages/PageAuction/index';
import ShowPageTheShop from './products/components/Content/Pages/PageTheShop/index';
import RequireAuth from './context/RequireAuth';
import NotFound from './NotFound';
import Contact from './contact/Contact.js';
import ShowOrderDetail from './products/components/Content/OrderDetail';
import ShowMyShop from './products/components/Content/MyShop';

// export default App;

const ROLES = {
    user: 'USER',
    admin: 'ADMIN',
    // nopeLogin: ''
};

function App() {
    return (
        // <Router>
        <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/restartPassword" element={<RestartPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Deny />} />
            <Route path="*" element={<NotFound />} />

            {/*1. ADMIN */}
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                <Route path="/list-account" element={<ListAccount />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                <Route path="/list-product" element={<ListProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                <Route path="/dashboard/category" element={<ListCategories />} />
            </Route>

            {/*2. USER */}
            <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
                <Route path="/product" element={<Product />} />
            </Route>
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}> */}
                <Route path="/product/auction" element={<ShowPageAuction />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}> */}
                {/* <Route path="/bid/:auctionId" element={<ListBidAuction />} /> */}
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}> */}
                <Route path="/auction/:auctionId" element={<Auction />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}> */}
                <Route path="/product/the-shop/:slug" element={<TheShop />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}> */}
                <Route path="/product/the-shop" element={<ShowPageTheShop />} />
            {/* </Route> */}
            <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
                <Route path="/product/order" element={<ShowOrderDetail />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
                <Route path="/product/cart" element={<ShowCartItem />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
                <Route path="/product/my-shop" element={<ShowMyShop />} />
            </Route>
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}> */}
                <Route path="/contact" element={<Contact />} />
            {/* </Route> */}
        </Routes>
        // </Router>
    );
}

export default App;
