import { Rating } from '@mui/material';
import React, { useState, useEffect } from 'react';

const StarRating = ({ setNewRating }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    useEffect(() => {
        setNewRating(rating);
    }, [rating]);
    return (
        <>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? 'on customStart' : 'off customStart'}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star" style={{}}>
                                &#9733;
                            </span>
                            {/* <Rating name="simple-controlled" /> */}
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default StarRating;
