import { Transition, Dialog } from "@headlessui/react";
import { PencilIcon, SearchIcon, UserIcon } from "@heroicons/react/outline"
import { useState, Fragment, useEffect } from "react";
import { UserData, ResponseData } from "../../features/types";
import { updateUserAsync } from "../../features/users/usersSlice";
import { useAppSelector, selectUserState, useAppDispatch, selectOrdersState } from "../../hooks";
import { HTTPCode, parseToCurrency } from "../../Utils";
import { OrderTable } from "../Orders";
import toast from "react-hot-toast"

const EditUser = (props: { userData: UserData }) => {
    let [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const userState = useAppSelector(selectUserState);
    const dispatch = useAppDispatch();

    const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return;
        try {
            setLoading(true);
            const formElem = event.target as HTMLFormElement;

            let userData = { ...props.userData };
            userData.firstname = (formElem.querySelector("#first-name") as HTMLInputElement).value as string;
            userData.lastname = (formElem.querySelector("#last-name") as HTMLInputElement).value as string;
            userData.phone = (formElem.querySelector("#phone-number") as HTMLInputElement).value as string;
            userData.role = (formElem.querySelector("#role") as HTMLInputElement).value as string;

            const response = await dispatch(updateUserAsync(userData));
            let responseData = response.payload as ResponseData;

            if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                toast.error(responseData.message)
                return setError({ errorCode: responseData.code, message: responseData.message });
            }
            toast.success("Profile edited successfully")
            closeModal();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            closeModal();

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
                <PencilIcon width={19} className="inline text-slate-600" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
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
                                    Edit Profile
                                </Dialog.Title>

                                <form onSubmit={handleEditUser} className="mt-8 space-y-6" action="http://localhost:5000/register" method="post">
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="first-name" className="sr-only">
                                                First Name
                                            </label>
                                            <input
                                                id="first-name"
                                                name="firstname"
                                                type="text"
                                                defaultValue={props.userData.firstname}
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="last-Name" className="sr-only">
                                                Last Name
                                            </label>
                                            <input
                                                id="last-name"
                                                name="lastname"
                                                type="text"
                                                required
                                                defaultValue={props.userData.lastname}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone-number" className="sr-only">
                                                Phone
                                            </label>
                                            <input
                                                id="phone-number"
                                                name="phone"
                                                type="number"
                                                required
                                                defaultValue={props.userData.phone}
                                                className="appearance-none rounded-b-md  rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Phone Number"
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className={`${loading ? "cursor-wait opacity-40" : ""}  group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >
                                            Continue
                                        </button>
                                        <div>
                                            <p onClick={closeModal} className="mx-auto text-center text-e_red mt-4 block cursor-pointer">
                                                Cancel
                                            </p>
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

const DashboardProfile = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUserState);
    const [totalExpense, setTotalExpense] = useState("0");
    const [totalOrders, setTotalOrders] = useState("0");

    const userOrders = useAppSelector((state) => {
        return state.orders.orders.filter((order) => {
            return order.userid == userState.userData.userid
        })
    });

    useEffect(() => {
        let _totalExpense = 0;
        let _totalOrders = 0;
        for (let order of userOrders) {
            let price = Number(order.productprice);
            _totalExpense += price;
            _totalOrders++;
        }

        setTotalExpense(_totalExpense.toString());
        setTotalOrders(_totalOrders.toString());

    }, []);

    return (
        <div className="dashboard-profile p- min-h-screen p-6">
            <h1 className="text-xl font-medium">Profile</h1>
            <div className="mt-4 flex flex-col md:flex-row p-6 justify-between border border-slate-200 rounded-md bg-white">
                <div className="flex flex-col lg:flex-row">
                    <div className="mr-4">
                        {/* <img src="" width={60} height={60} alt="" /> */}
                        <UserIcon width={60} height={60} className="bg-slate-100 rounded-full p-3 " />
                    </div>
                    <div className="md:self-center">
                        <div className="flex flex-col">
                            <div>
                                <span className="text-xl font-bold">
                                    {`${userState.userData.firstname} ${userState.userData.lastname}`}
                                </span>
                                <br />
                                {/* <span className={`text-xs px-2 py-1 rounded-md ${userState.userData.role?.toLocaleLowerCase() == "user" ? "text-emerald-400 bg-emerald-100" : "bg-amber-100 text-amber-400"}`}>
                                    {userState.userData.role}
                                </span> */}
                            </div>
                            <div className="flex">
                                <div className="mr-3 p-1 border border-slate-50  rounded-md mt-3">
                                    <span className="text-sm text-slate-800 font-bold">
                                        ₦{
                                            parseToCurrency(totalExpense)
                                        }
                                    </span>
                                    <br />
                                    <span className="text-xs text-slate-800 font-bold">Total Expenses</span>
                                </div>
                                <div className="p-1 border border-slate-50  rounded-md mt-3">
                                    <span className="text-sm text-slate-800  font-bold">
                                        {
                                            totalOrders
                                        }
                                    </span>
                                    <br />
                                    <span className="text-xs text-slate-800  font-bold">Total Orders</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:mt-0 mt-4 md:self-center">
                    <EditUser userData={userState.userData} />
                </div>
            </div>

            <h1 className=" mt-6 text-xl font-medium">Orders</h1>
            <div className=" overflow-x-auto bg-white rounded-lg border border-gray-light">
                <div className="flex justify-between p-4 flex-col lg:flex-row">
                    <div className="self-center">
                        <div className="ml-3 flex">
                            <SearchIcon width={14} className="inline text-warmGray-400 mr-3" />
                            <input type="search" className="w-full border-0 outline-none bg-transparent" placeholder="Search" />
                        </div>
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

                            </tr>
                        </thead>
                        <tbody>
                            {userOrders.map((orderData, index) => {
                                return <OrderTable key={index} orderData={orderData} editable={false} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashboardProfile;