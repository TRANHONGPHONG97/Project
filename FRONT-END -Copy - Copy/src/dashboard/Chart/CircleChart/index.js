import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function CircleChart() {
    return (
        <div>
            <Doughnut
                data={{
                    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
                    datasets: [
                        {
                            label: 'so phieu bau',
                            data: [12, 19, 3, 5],
                            backgroundColor: [
                                'rgba(205, 29, 102, 0.3)',
                                'rgba(4, 142, 205, 0.3)',
                                'rgba(205, 186, 56, 0.3)',
                                'rgba(25, 172, 162, 0.3)',
                                // "rgba(153, 102, 255, 0.2)",
                                // "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                // "rgba(153, 102, 255, 1)",
                                // "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}
                height={500}
                width={600}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            // text: 'Chart.js Bar Chart',
                        },
                    },
                }}
            />
        </div>
    );
}

export default CircleChart;
