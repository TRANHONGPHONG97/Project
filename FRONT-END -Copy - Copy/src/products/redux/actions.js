// Account
export const setAccount = (object) => {
    return {
        type: 'account/setAccount',
        payload: object,
    };
};

// Product
export const setProducts = (arr) => {
    return {
        type: 'products/setProducts',
        payload: arr,
    };
};
export const setProduct = (object) => {
    return {
        type: 'products/setProduct',
        payload: object,
    };
};
export const setCheckProduct = (boolean) => {
    return {
        type: 'products/setCheckProduct',
        payload: boolean,
    };
};

export const setLoadData = (boolean) => {
    return {
        type: 'products/setLoadData',
        payload: boolean,
    };
};

export const setIdProduct = (id) => {
    return {
        type: 'products/setIdProduct',
        payload: id,
    };
};

// Type
export const setTypes = (arr) => {
    return {
        type: 'products/setTypes',
        payload: arr,
    };
};

export const changeType = (text) => {
    return {
        type: 'lotTypes/changeType',
        payload: text,
    };
};

// Login
export const loginStatus = (boolean) => {
    return {
        type: 'login/loginStatus',
        payload: boolean,
    };
};
export const setShowSignupInfo = (boolean) => {
    return {
        type: 'login/setShowSignupInfo',
        payload: boolean,
    };
};
export const setShowLocation = (boolean) => {
    return {
        type: 'login/setShowLocation',
        payload: boolean,
    };
};

// Categories
export const setCategories = (arr) => {
    return {
        type: 'categories/setCategories',
        payload: arr,
    };
};

// Filters
export const searchFilterChange = (text) => {
    return {
        type: 'filters/searchFilterChange',
        payload: text,
    };
};
export const setResultsFilterChange = (arr) => {
    return {
        type: 'filters/setResultsFilterChange',
        payload: arr,
    };
};
export const setSearchingFilters = (boolean) => {
    return {
        type: 'filters/setSearchingFilters',
        payload: boolean,
    };
};

export const typeFiltersChange = (text) => {
    return {
        type: 'filters/typeFiltersChange',
        payload: text,
    };
};
export const sortFiltersChange = (text) => {
    return {
        type: 'filters/sortFiltersChange',
        payload: text,
    };
};

export const categoryFiltersChange = (arr) => {
    return {
        type: 'filters/categoryFiltersChange',
        payload: arr,
    };
};

export const setShowResultNav = (boolean) => {
    return {
        type: 'filters/setShowResultNav',
        payload: boolean,
    };
};

// Modal
export const setShowInfoProduct = (boolean) => {
    return {
        type: 'modals/showInfoProduct',
        payload: boolean,
    };
};

export const setShowAddProduct = (boolean) => {
    return {
        type: 'modals/showAddProduct',
        payload: boolean,
    };
};

export const setShowEditProduct = (boolean) => {
    return {
        type: 'modals/showEditProduct',
        payload: boolean,
    };
};

export const setShowModerationProduct = (boolean) => {
    return {
        type: 'modals/showModerationProduct',
        payload: boolean,
    };
};

// Cart Items
export const setCartItems = (arr) => {
    return {
        type: 'cartItems/setCartItems',
        payload: arr,
    };
};
export const setCart = (object) => {
    return {
        type: 'cartItems/setCart',
        payload: object,
    };
};

export const setShowCart = (boolean) => {
    return {
        type: 'cartItems/setShowCart',
        payload: boolean,
    };
};

export const setShowCartModalCheckout = (boolean) => {
    return {
        type: 'cartItems/setShowModalCheckout',
        payload: boolean,
    };
};

export const setReloadCartItem = (boolean) => {
    return {
        type: 'cartItems/setReloadCartItem',
        payload: boolean,
    };
};

// Order
export const setCheckPayment = (boolean) => {
    return {
        type: 'orders/setCheckPayment',
        payload: boolean,
    };
};

// Order detail
export const setOrderDetails = (arr) => {
    return {
        type: 'orderDetails/setOrderDetails',
        payload: arr,
    };
};
export const setReloadOrder = (boolean) => {
    return {
        type: 'orderDetails/setReloadOrder',
        payload: boolean,
    };
};

// Watch List
export const setWatchLists = (arr) => {
    return {
        type: 'watchLists/setWatchLists',
        payload: arr,
    };
};
export const setReloadWatchList = (boolean) => {
    return {
        type: 'watchLists/setReloadWatchList',
        payload: boolean,
    };
};

// My Shop
export const setOpenSidebar = (boolean) => {
    return {
        type: 'myShops/setOpenSidebar',
        payload: boolean,
    };
};
export const setMenu = (string) => {
    return {
        type: 'myShops/setMenu',
        payload: string,
    };
};

// Reviews
export const setReviews = (arr) => {
    return {
        type: 'reviews/setReviews',
        payload: arr,
    };
};
export const setReviewId = (int) => {
    return {
        type: 'reviews/setReviewId',
        payload: int,
    };
};

export const setReloadReviews = (boolean) => {
    return {
        type: 'reviews/setReloadReviews',
        payload: boolean,
    };
};
export const setRating = (int) => {
    return {
        type: 'reviews/setRating',
        payload: int,
    };
};
