import React, { useState, useEffect } from "react";
import nextImage from './../asset/images/next.png';
import prevImage from './../asset/images/prev.png';

// Format money
export const FormatMoney = (money) => {
    let str = money.toString();
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev;
    });
}

// Check object
export const isEmpty = (obj) => {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

// Slide Image
export const Carousel = ({ children, maxVisibility }) => {

    const [active, setActive] = useState(0);
    const count = React.Children.count(children);

    useEffect(() => {
        if (maxVisibility > 0) {
            setActive(maxVisibility - 1);
        } else {
            setActive(0);
        }
    }, [maxVisibility]);

    return (
        <div className='carousel'>
            {active > 0 &&
                <div className='nav-left' onClick={() => setActive(i => i - 1)}>
                    <img src={prevImage} alt="Previous image" />

                </div>}
            {React.Children.map(children, (child, i) => (
                <div className='card-image-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / maxVisibility,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / maxVisibility,
                    'pointerEvents': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= maxVisibility ? '0' : '1',
                    'display': Math.abs(active - i) > maxVisibility ? 'none' : 'block',
                }}>
                    {child}
                </div>
            ))}
            {active < count - 1 &&
                <div className='nav-right' onClick={() => setActive(i => i + 1)}>
                    <img src={nextImage} alt="Next image" />
                </div>}
        </div>
    );
};

// Typeof Number
export const isNumber = (value) => {
    return /^[\d]+(?:e-?\d+)?$/.test(value);
}

// Sort 
export const compareValues = (key, order = 'asc') => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // nếu không tồn tại
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
