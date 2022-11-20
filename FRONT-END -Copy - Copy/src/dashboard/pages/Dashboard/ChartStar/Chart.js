import './Chart.css';
import StarRatingsChart from './StarRatingsChart';

export default function ChartStart() {
    return (
        <div className="App">
            <StarRatingsChart
                starCounts={{
                    Total: [10, 43, 32, 91, 40],
                    'Last Year': [0, 29, 8, 32, 25],
                    'Last Month': [0, 4, 0, 7, 5],
                }}
                width={500}
                height={230}
            />
        </div>
    );
}
