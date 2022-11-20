import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>
                <ul className="pagination" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {pageNumbers.map((number) => (
                        <li className="page-item" key={number}>
                            <div
                                onClick={() => paginate(number)}
                                className="page-link"
                            >
                                {number}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
