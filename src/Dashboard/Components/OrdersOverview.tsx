import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { ChartData } from "chart.js"
import { CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import Chart from 'chart.js/auto';
import { useAppSelector, selectOrdersState, selectProductsState } from "../../hooks";
import { calculateMonthlyOrderAmount, calculateMonthlyOrderCount, parseToCurrency } from "../../Utils";
import moment from "moment";
import { OrderData } from "../../features/types";

const MonthlySalesCard: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const ordersState = useAppSelector(selectOrdersState);
    const productsState = useAppSelector(selectProductsState);
    const monthlySale = useRef({ total: 0 })

    useEffect(() => {
        const monthOrders = calculateMonthlyOrderAmount(ordersState.orders, productsState.products, moment().month()) as OrderData[];
        let total = 0;
        for (let monthOrder of monthOrders) {
            total += Number(monthOrder.productprice);
        }
        monthlySale.current.total = total;
    })

    return (
        <div className={`bg-white border border-gray-light px-6 py-2 rounded-lg ${props.className}`}>

            <div className="flex justify-between">
                <div className="mr-3">
                    <h6 className="font-medium text-gray" style={{ fontSize: "0.65rem" }}>MONTHLY SALES</h6>
                    <span className="font-medium text-xl">₦ {parseToCurrency(monthlySale.current.total)}</span>
                </div>
                <div className="self-center">
                    <CurrencyDollarIcon width={24} />
                </div>
            </div>
        </div>
    )
}

const OrderPlacedCard: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const ordersState = useAppSelector(selectOrdersState);


    return (
        <div className={`bg-white border border-gray-light px-6 py-2 rounded-lg ${props.className}`}>
            <div className="flex justify-between">
                <div className="mr-3">
                    <h6 className="font-medium text-gray" style={{ fontSize: "0.65rem" }}>ORDERS PLACED</h6>
                    <span className="font-medium text-xl">{ordersState.orders.length}</span>
                </div>
                <div className="self-center">
                    <ShoppingBagIcon width={24} />
                </div>
            </div>
        </div>
    )
}

declare interface OrdersOverviewProps extends HTMLAttributes<HTMLDivElement> {

}

const OrdersOverview: React.FC<OrdersOverviewProps> = (props) => {
    const ordersState = useAppSelector(selectOrdersState);
    const productsState = useAppSelector(selectProductsState);

    const ref = useRef(HTMLCanvasElement.prototype)

    useEffect(
        () => {
            const ctx = ref.current;
            const DATA_COUNT = 7;
            const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
            console.log(calculateMonthlyOrderCount(ordersState.orders, productsState.products))
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const data: ChartData<"bar", number[], string> = {
                labels: labels,
                datasets: [{
                    label: '',
                    data: calculateMonthlyOrderCount(ordersState.orders, productsState.products),
                    borderRadius: 10,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(75, 192, 192)',
                    barThickness: 10,
                    borderWidth: 0,
                }]
            };

            const myChart = new Chart(ctx, {
                type: 'bar',
                data: data,
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

            return () => {
                myChart.destroy();
            }

        }, []
    )


    return (
        <div className={`orders-overview mt-5 ${props.className}`}>
            <div className="flex flex-col lg:flex-row">
                <div className="grow py-3  bg-white border border-gray-light rounded-lg mr-4">
                    <div className="py-3 border-b border-gray-light px-3">
                        <h1 className="font-medium">Orders</h1>
                    </div>
                    <div className="canvas-container relative">
                        <canvas ref={ref} id="orders-chart   " width="400" height="200"></canvas>
                    </div>
                </div>
                <div className="">
                    <OrderPlacedCard />
                    <MonthlySalesCard className="mt-4" />
                </div>
            </div>
        </div>
    )
}

export default OrdersOverview;  