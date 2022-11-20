import TurnoverInYear from './TurnoverInYear';
import TurnoverInMonth from './TurnoverInMonth';
import Product from './Product';
import Account from './Account';
import { useState, useEffect, useRef } from 'react';
import productService from '../../../services/productService';
import AccountService from '../../../services/AccountService';
import ChartService from '../../../services/ChartService';

function TongQuanDashboard() {
    const [state, setState] = useState({
        accounts: [],
        products: [],
        turnover: [],
    });
    const { accounts, products } = state;

    useEffect(() => {
        async function getdashboard() {
            let turnover = await ChartService.getTurnoverByMonth();
            let product = await productService.getProducts();
            let account = await AccountService.getAccount();
            setState({
                accounts: account.data,
                products: product.data,
                turnover: turnover.data[0],
            });
        }
        getdashboard();
    }, []);
    return (
        <div className="row dashboard">
            <TurnoverInMonth turnoverByMonth={state.turnover.turnoverMonth} />

            <TurnoverInYear turnoverByYear={state.turnover.turnoverYear} />

            <Product totalProduct={products.length} />

            <Account totalAccount={accounts.length} />
        </div>
    );
}

export default TongQuanDashboard;
