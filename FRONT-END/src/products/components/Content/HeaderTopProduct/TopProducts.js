import React, { useState, useEffect } from 'react';
import ProductService from '../../../service/Product/ProductService';
import Slideshow from './Slideshow';

const TopProducts = () => {
    const [topProduct, setTopProduct] = useState({
        loading: false,
        products: [],
        errorMessage: '',
    });
    useEffect(() => {
        try {
            async function postData() {
                let getTop = await ProductService.getTopProductBySold();
                setTopProduct({
                    ...topProduct,
                    products: getTop.data
                })
            }
            postData();
            setTopProduct({ ...topProduct, loading: false });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <Slideshow products={topProduct.products} />
        </div>
    );
};

export default TopProducts;
