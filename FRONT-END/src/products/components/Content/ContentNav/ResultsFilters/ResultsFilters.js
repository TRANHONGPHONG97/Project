import React from "react";
import { useDispatch } from 'react-redux/es/exports';
import { setSearchingFilters, typeFiltersChange, setShowResultNav } from "../../../../redux/actions";

const ResultsFilters = () => {
    const dispatch = useDispatch();

    const handleBackPage = () => {
        dispatch(setSearchingFilters(false));
        dispatch(typeFiltersChange(''));
        dispatch(setShowResultNav(false));
    };


    return (
        <>
            <div className="filter-item small cell small-12 medium-7">
                <div className="filter-title">SẢN PHẨM</div>
                <div className="result-filters">
                    <div className="tab-sel-wrapper grid-x text-center small-4">
                        <div className="tab-item left-end cell small-12"
                            style={{ color: '#fff', background: '#ff523d', borderRadius: '50px 50px 50px 50px' }}
                        >
                            <div className="i-label">Kết quả tìm kiếm</div>
                        </div>
                    </div>
                    <div className="grid-x text-center small-3" onClick={handleBackPage}>
                        <div className="left-end cell small-12 back-page">
                            <div className="i-label">Quay lại</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultsFilters;