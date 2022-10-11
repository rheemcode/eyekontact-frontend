import { ChartData } from "chart.js"
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import { getOrdersAsync } from "../../features/orders/ordersSlice";
import { OrderData, ProductData, ResponseData } from "../../features/types";
import { selectOrdersState, selectProductsState, useAppDispatch, useAppSelector } from "../../hooks";
import { abbreviateAmount, calculateMonthlyOrderAmount } from "../../Utils";
import moment from "moment";
import { getProductsAsync } from "../../features/products/productsSlice";


const TrafficOverview = () => {
    const ref = useRef(HTMLCanvasElement.prototype);
    const ordersState = useAppSelector(selectOrdersState);
    const productsState = useAppSelector(selectProductsState);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [chartData, setChartData] = useState<ChartData<"line", number[], string>>({
        labels: labels,
        datasets: [{
            label: '',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            borderWidth: 5,
            tension: 0.3,
            pointRadius: 0
        }]
    });

    const dispatch = useAppDispatch();



    //TODO: return product price on retrieval from server

    useEffect(() => {
        const ctx = ref.current;
        const myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Line Chart'
                    }
                },
                scales: {

                    x: {
                        display: true,
                        title: {
                            display: true
                        },
                        grid: {
                            display: false,

                        },
                    },
                    y: {
                        display: true,
                        ticks: {
                            callback: (value, index, ticks) => {
                                const abbvAmount = abbreviateAmount(value);
                                return "₦" + abbvAmount;
                            }
                        },
                        title: {
                            display: false,
                            text: 'Value'
                        },
                        grid: {
                            display: true,
                            borderDash: [1, 4]
                        },


                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }, layout: {
                    padding: 20
                }
            },
        });

        (async () => {
            const productsResponse = await dispatch(getProductsAsync());
            const ordersResponse = await dispatch(getOrdersAsync());
            const ordersPayload = ordersResponse.payload as ResponseData;
            const productsPayload = productsResponse.payload as ResponseData;
            const orders = ordersPayload.data as OrderData[];
            const products = productsPayload.data as ProductData[];

            const monthlyOrderAmount = calculateMonthlyOrderAmount(orders, products);

            myChart.data = {
                labels: labels,
                datasets: [{
                    label: '',
                    data: monthlyOrderAmount as number[],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderWidth: 5,
                    tension: 0.3,
                    pointRadius: 0
                }]
            };
            myChart.update();
        })();

        return () => {
            myChart.destroy();
        }

    }, [])

    return (
        <div className="traffic-overview bg-white rounded-lg border border-gray-light py-4">
            <div className="flex flex-col mb-3 pl-6">
                <div className="">
                    <span className="text-xs">ANNUAL</span>
                </div>
                <div>
                    <span className="font-medium text-lg">SALES</span>
                </div>
            </div>
            <div className="chart-container relative">
                <canvas className="" ref={ref} id="myChart" width="400" height="200"></canvas>
            </div>
        </div>
    )
}

export default TrafficOverview;