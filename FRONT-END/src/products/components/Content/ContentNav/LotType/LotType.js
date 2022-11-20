import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getType, getTypes } from './../../../../redux/selector';
import { changeType } from "../../../../redux/actions";

const LotType = () => {

    const dispatch = useDispatch();

    const [newType, setNewType] = useState('Tất cả');
    const lotTypes = useSelector(getTypes);

    useEffect(() => {
        dispatch(changeType(newType));
    }, [newType]);

    const type = useSelector(getType);
    return (
        <>
            <div className="filter-item small cell small-12 medium-7">
                <div className="filter-title">SẢN PHẨM</div>
                <div className="tab-sel-wrapper grid-x text-center">
                    {
                        lotTypes.map((lotType, index) => (
                            <div className="tab-item left-end cell small-4"
                                key={lotType}
                                onClick={() => {
                                    setNewType(lotType)
                                }}
                                id={`type_${index}`}
                                style={type === lotType ? { color: '#fff', background: '#ff523d', borderRadius: '50px 50px 50px 50px' } : {}}
                            >
                                <div className="i-label">{lotType}</div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </>
    );
}

export default LotType;