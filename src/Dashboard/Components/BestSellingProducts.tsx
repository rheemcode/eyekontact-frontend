import { ProductImg } from "../../images";
import { useEffect, useRef, useState } from 'react';
import { getOrdersAsync } from "../../features/orders/ordersSlice";
import { OrderData, ProductData, ResponseData } from "../../features/types";
import { selectOrdersState, selectProductsState, useAppDispatch, useAppSelector } from "../../hooks";
import { calculateMonthlyOrderAmount, parseToCurrency } from "../../Utils";
import moment from "moment";

declare interface IBestSeller {
    productname: string;
    productImg: string;
    productstatus: string;
    productprice: string;
    monthlyOrder: string;
}

const BestSellerTable: React.FC<IBestSeller> = (props) => {
    return (
        <tr>
            <td className="pl-4 py-3">
                <div className="flex items-center">
                    <div className="avatar">
                        <img className="avatar-img rounded mr-3" style={{ width: "48px", height: "48px" }} src={props.productImg} alt="product image" />
                    </div>
                    <div className="ms-3">
                        <h4 className="font-normal mb-1">{props.productname}</h4>
                    </div>
                </div>
            </td>
            <td className="py-3">
                <span className={`${props.productstatus === "available" ? "text-emerald-400 bg-emerald-100" : "text-slate-400 bg-slate-100"} p-1 px-2 rounded-full`}>
                    {props.productstatus}
                </span>
            </td>
            <td className="py-3">
                ₦{
                    parseToCurrency(props.productprice)
                }
            </td>
            <td className="py-3">
                ₦{
                    parseToCurrency(props.monthlyOrder)
                }
            </td>
        </tr>

    )
}

const BestSellingProducts = () => {
    const bestSellers = useAppSelector((state) => {
        const monthlySales = calculateMonthlyOrderAmount(state.orders.orders, state.products.products, moment().month()) as OrderData[];
        let res: IBestSeller[] = []
        state.products.products.forEach((product) => {
            let totalProductSales = 0;
            monthlySales.forEach((sales) => {
                if (sales.productid === product.productid)
                    totalProductSales += Number(sales.productprice);
            });

            res.push({
                productname: product.productname as string,
                productImg: product.productimage as string,
                productstatus: product.productstatus as string,
                productprice: product.productprice as string,
                monthlyOrder: totalProductSales.toString()
            })
        })

        return res;
    })

    const [bestSellingProducts, setBestSellingProducts] = useState(null);

    useEffect(() => {

    })

    return (
        <div className="best-selling-products mt-3 bg-white rounded-lg border border-gray-light">
            <div className="p-3 border-b border-gray-light">
                <h3 className="font-medium">
                    Best Selling Products
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="pl-4 py-3 text-sm font-medium text-slate-900">Product</th>
                            <th className="py-3 text-sm font-medium text-slate-900">Stock</th>
                            <th className="py-3 text-sm font-medium text-slate-900">Price</th>
                            <th className="py-3 text-sm font-medium text-slate-900">Monthly Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bestSellers.map((bestSeller) => <BestSellerTable {...bestSeller} />)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default BestSellingProducts;