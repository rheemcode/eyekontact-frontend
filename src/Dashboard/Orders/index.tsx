import { ShoppingCartIcon, SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useRef, Fragment, useEffect } from "react";
import { addOrderAsync, deleteOrderAsync, getOrdersAsync, updateOrderAsync } from "../../features/orders/ordersSlice";
import { OrderData, ResponseData } from "../../features/types";
import { selectOrdersState, selectProductsState, selectUserState, useAppDispatch, useAppSelector } from "../../hooks";
import { AppStateMachine, HTTPCode, parseToCurrency } from "../../Utils";
import { RootState } from "../../store";
import { getProductsAsync } from "../../features/products/productsSlice";
import { Navigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

const AddOrder = () => {
    let [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const orderState = useAppSelector(selectOrdersState);
    const products = useAppSelector(selectProductsState);

    const handleAddNewOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading)
            return;
        try {
            setLoading(true);
            const formElem = event.target as HTMLFormElement;

            //FIXME: add super admin id
            const orderData: OrderData = {
                productid: (formElem.querySelector("#product-id") as HTMLInputElement).value as string,
                userid: "1",
                orderstatus: (formElem.querySelector("#order-status") as HTMLInputElement).value as string,
                paymentmethod: (formElem.querySelector("#payment-method") as HTMLInputElement).value as string
            }

            const result = await dispatch(addOrderAsync(orderData));
            let responseData = result.payload as ResponseData;

            if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                toast.error(responseData.message);
                setLoading(false);
                return setError({ errorCode: responseData.code, message: responseData.message });
            }
            toast.success("Order created successfully")
            await dispatch(getOrdersAsync());

            setError({ errorCode: 200, message: "" })
            closeModal();
            setLoading(false);
        } catch (err) {
            toast.error("Error in creating order")

            setLoading(false);
            closeModal();
        }
    }

    function closeModal() {
        setError({ errorCode: 200, message: "" })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    //TODO: insert product name on productid input
    return (
        <>
            <div className="">
                <button className="bg-rose-600 px-4 py-2 text-white" onClick={openModal} >
                    <PlusCircleIcon width={16} className="inline mr-2" />
                    Add Order
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment} >
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border border-slate-200 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900"  >
                                    ADD NEW ORDER
                                </Dialog.Title>

                                <form className="mt-8 space-y-6" action="http://localhost:5000/register" method="post" onSubmit={handleAddNewOrder} >
                                    <div className="rounded-md shadow-sm">
                                        <div>
                                            <label htmlFor="product-id" className="text-sm">
                                                Product
                                            </label>
                                            <select name="productid" id="product-id"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                                                {
                                                    products.products.map(product => {
                                                        return <option value={product.productid}>{product.productname}</option>
                                                    })
                                                }

                                            </select>

                                        </div>

                                        <div className="mt-2">

                                            <label htmlFor="order-status" className="text-sm">
                                                Order Status
                                            </label>
                                            <select
                                                id="order-status"
                                                name="order-status"
                                                defaultValue={"Pending"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="payment-method" className="text-sm">
                                                Payment Method
                                            </label>
                                            <input
                                                id="payment-method"
                                                name="paymentmethod"
                                                type="text"
                                                required
                                                defaultValue={"VISA"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <p className='error-msg my-2 text-red text-center'>
                                                {error.message}
                                            </p>
                                            <button
                                                type="submit"
                                                className={`${loading ? "cursor-wait opacity-40" : ""}  group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >
                                                Add Order
                                            </button>
                                            <div>
                                                <p onClick={closeModal} className="cursor-pointer text-center mx-auto text-red mt-4 block">
                                                    Cancel
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const EditOrder = (props: { orderData: OrderData }) => {
    const [loading, setLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });

    const orderState = useAppSelector(selectOrdersState);

    const dispatch = useAppDispatch();

    const handleEditOrder = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (loading)
            return;

        try {
            const formElem = event.target as HTMLFormElement;
            setLoading(true);
            const orderData: OrderData = {
                ...props.orderData,
                orderstatus: (formElem.querySelector("#order-status") as HTMLInputElement).value as string,
                paymentmethod: (formElem.querySelector("#payment-method") as HTMLInputElement).value as string
            }

            const result = await dispatch(updateOrderAsync(orderData));
            let responseData = result.payload as ResponseData;

            if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                toast.error(responseData.message)
                return setError({ errorCode: responseData.code, message: responseData.message });
            }
            toast.success("Order edited successfully")
            setError({ errorCode: 200, message: "" })
            closeModal();
            setLoading(false);
        }
        catch (err) {
            toast.error("Error in editing order")

            setLoading(false);
            closeModal();

        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        console.log("clicked")
        setIsOpen(true)
    }

    return (
        <>
            <button onClick={openModal} className="action-icon">
                <PencilIcon width={19} className="inline text-slate-600" />
            </button>

            <Transition appear show={isOpen} as={Fragment} >
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border border-slate-200 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900"  >
                                    EDIT PRODUCT ORDER
                                </Dialog.Title>

                                <form className="mt-8 space-y-6" action="http://localhost:5000/register" method="post" onSubmit={handleEditOrder} >
                                    <div className="rounded-md shadow-sm">
                                        <div className="mt-2">

                                            <label htmlFor="order-status" className="text-sm">
                                                Order Status
                                            </label>
                                            <select
                                                id="order-status"
                                                name="order-status"
                                                defaultValue={"Pending"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="payment-method" className="text-sm">
                                                Payment Method
                                            </label>
                                            <input
                                                id="payment-method"
                                                name="paymentmethod"
                                                type="text"
                                                required
                                                defaultValue={"VISA"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <p className='error-msg my-2 text-red text-center'>
                                                {error.message}
                                            </p>
                                            <button
                                                type="submit"
                                                className={`${loading ? "cursor-wait opacity-40" : ""}  group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >
                                                Process
                                            </button>
                                            <div>
                                                <p onClick={closeModal} className="text-center cursor-pointer mx-auto text-red mt-4 block">
                                                    Cancel
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const DeleteOrder = (props: { orderData: OrderData }) => {
    let [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const orderState = useAppSelector(selectOrdersState);

    const handleDeleteOrder = async () => {
        if (loading) return;
        try {
            setLoading(true)

            const response = await dispatch(deleteOrderAsync(props.orderData));
            toast.success("Order deleted successfully")
            closeModal();
            setLoading(false);
        } catch (error) {
            toast.error("Error in deleting order")
            setLoading(false);
        }

    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button onClick={openModal} className="action-icon">
                <TrashIcon width={19} className="inline text-slate-600" />
            </button>

            <Transition appear show={isOpen} as={Fragment} >
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal} >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span className="inline-block h-screen align-middle" aria-hidden="true" >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border border-slate-200 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900"  >
                                    Delete Product
                                </Dialog.Title>

                                <Dialog.Description as="h3" className="text-center mt-8 mb-4">
                                    Are you sure?
                                </Dialog.Description>
                                <button
                                    onClick={handleDeleteOrder}
                                    className={`${loading ? "cursor-wait opacity-40" : ""}  group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >
                                    Continue
                                </button>
                                <div>
                                    <button onClick={closeModal} className="mx-auto text-center text-red mt-4 block">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export const OrderTable = (props: { orderData: OrderData, editable: boolean }) => {

    const orderData = { ...props.orderData };

    const productsState = useAppSelector((state: RootState) => {
        return state.products.products.find((product) => product.productid == orderData.productid)
    })

    return (
        <tr>
            <td className="px-3 py-4 pl-6">
                #{props.orderData.orderid}
            </td>
            <td className="px-3 py-4">
                {
                    productsState && productsState.productname
                }
            </td>
            <td className="px-3 py-4">
                {
                    moment(props.orderData.orderdate).format("Do MMM YYYY")
                }
            </td>
            <td className="px-3 py-4">
                ₦{
                    productsState && parseToCurrency(productsState.productprice as string)
                }
            </td>
            <td className="px-3 py-4">
                <small className={`${props.orderData.orderstatus === "success" ? "text-emerald-400 bg-emerald-100" : "text-slate-400 bg-slate-100"} p-1 px-2 rounded-full`}>
                    {
                        props.orderData.orderstatus
                    }
                </small>
            </td>
            <td className="px-3 py-4">
                {
                    props.orderData.paymentmethod
                }
            </td>
            {
                props.editable ?
                    <td className="px-3 text-end">
                        <EditOrder orderData={props.orderData} />
                        <DeleteOrder orderData={props.orderData} />
                    </td> :
                    <></>
            }

        </tr>
    )
}

const DashboardOrders = () => {
    const dispatch = useAppDispatch();
    const ordersState = useAppSelector(selectOrdersState);
    const userState = useAppSelector(selectUserState);

    useEffect(() => {
        (async () => {
            const productResponse = await dispatch(getProductsAsync());
            const response = await dispatch(getOrdersAsync());

        })();
    }, [])


    return (
        <>{
            userState.userData.role?.toLowerCase() == "admin" ?
                <div className="dashboard-orders py-4 px-6">
                    <div className="px-4">
                        <h1 className="font-medium text-xl">
                            Orders
                        </h1>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg border border-gray-light">
                        <div className="flex justify-between p-4 flex-col lg:flex-row">
                            <div className="self-center">
                                <div className="ml-3 flex">
                                    <SearchIcon width={14} className="inline text-warmGray-400 mr-3" />
                                    <input type="search" className="w-full border-0 outline-none bg-transparent" placeholder="Search" />
                                </div>
                            </div>
                            <div>
                                <AddOrder />
                            </div>
                        </div>
                        <div className="py-6">

                            <table className="table-auto w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs font-normal">
                                            Order ID
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                            Order
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                            Date
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                            Total
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                            Status
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                            Payment method
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersState.orders.map((orderState, index) => {
                                        return <OrderTable key={index} editable={true} orderData={orderState} />
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : <Navigate to="/" replace />
        }
        </>
    )
}

export default DashboardOrders;