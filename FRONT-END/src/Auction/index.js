import { Provider } from 'react-redux';
// import { useParams } from 'react-router-dom';
import Header from '../products/components/Header/Header';
import store from '../products/redux/store';
import ContentAuctionDetail from './ContentAuction';
import './assets/style.css';

function Auction() {
    // const { auctionId } = useParams();
    // console.log('auctionId: ', auctionId);
    return (
        <Provider store={store}>
            <Header className="product-client" />
            {/* <Content className="product-client" /> */}
            <ContentAuctionDetail />
        </Provider>
    );
}

export default Auction;
