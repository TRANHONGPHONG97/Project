import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

function TurnoverByYear(props) {
    const { turnoverByYear } = props;
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2" style={{ cursor: 'auto' }}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1 text-center">
                                <Link to="#">Doanh thu (Năm)</Link>
                            </div>
                            <div className="h5 mb-0 ml-1 font-weight-bold text-gray-800 text-center">
                                <NumericFormat
                                    value={turnoverByYear}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' đ'}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-black-300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TurnoverByYear;
