import React from "react";
import { Link } from "react-router-dom";
import { FormatMoney } from "../../../Hooks/Hooks";
import rank1 from './../../../asset/images/rank1.png';
import rank2 from './../../../asset/images/rank2.png';
import rank3 from './../../../asset/images/rank3.png';
import rank4 from './../../../asset/images/rank4.png';
import rank5 from './../../../asset/images/rank5.png';

const colors = ["#0088FE", "#00C49F", "#FFBB28", "black", "white"];
const delay = 2500;

function Slideshow({ products }) {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {products.map((product, index) => (
                    <div
                        className="slide"
                        key={index}
                    >
                        <Link to={`/product/the-shop/${product.slug}`} style={{ display: 'flex' }}>
                            <div style={{ position: 'relative' }}>
                                {index === 0 ? (<img style={{ position: 'absolute' }} src={rank1} alt="" width={60} />) : (
                                    index === 1 ? (<img style={{ position: 'absolute' }} src={rank2} alt="" width={60} />) : (
                                        index === 2 ? (<img style={{ position: 'absolute' }} src={rank3} alt="" width={60} />) : (
                                            index === 3 ? (<img style={{ position: 'absolute' }} src={rank4} alt="" width={60} />) : (
                                                <img style={{ position: 'absolute' }} src={rank5} alt="" width={60} />
                                            )
                                        )
                                    )
                                )}
                                <img src={product.image} alt="" style={{ height: '200px' }} />
                            </div>
                            <div className="ms-3 mt-3" style={{ paddingRight: '10px' }}>
                                <div style={{ color: 'black' }}>{product.title}</div>
                                <div style={{ fontSize: 'small' }}>Đã bán <b>{product.sold}</b></div>
                                <div>{product.description}</div>
                                <div>{FormatMoney(product.price)} ₫</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="slideshowDots">
                {colors.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Slideshow;