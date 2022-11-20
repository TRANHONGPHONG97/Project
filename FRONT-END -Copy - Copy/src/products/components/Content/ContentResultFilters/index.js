import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Posts from './Posts';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { getResultsFiltersChange } from '../../../redux/selector';
import { productsRemainingCategorySelector } from './../../../redux/selector';

function PagingResultFilters() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const products = useSelector(productsRemainingCategorySelector);


    useEffect(() => {
        const fetchPosts = async () => {
            setPosts(products);
        };

        fetchPosts();
    }, [products]);

    // console.log(posts);

    const indexOfLastPost = currentPage * postsPerPage;
    // console.log("indexOfLastPost: ", indexOfLastPost);

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log("indexOfFirstPost: ", indexOfFirstPost);

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Posts products={currentPosts} />
            <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={posts.length} />
        </>
    );
}
export default PagingResultFilters;
