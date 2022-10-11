import { ProductImg } from "../../images";
import { ShoppingCartIcon, SearchIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { selectUsersState, selectUserState, useAppDispatch, useAppSelector } from "../../hooks";
import { UserData, ResponseData } from "../../features/types";
import { AppStateMachine, HTTPCode } from '../../Utils';
import { addUserAsync, deleteUserAsync, getSubscribersAsync, getUsersAsync, updateUserAsync } from "../../features/users/usersSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast"
import moment from "moment"

const AddUser = () => {
    let [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch();
    const [error, setError] = useState({ errorCode: 200, message: "" });

    const usersState = useAppSelector(selectUsersState);

    const handleAddNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            if (usersState.state === AppStateMachine.Pending)
                return;

            const formElem = event.target as HTMLFormElement;

            const userData: UserData = {
                firstname: (formElem.querySelector("#first-name") as HTMLInputElement).value as string,
                lastname: (formElem.querySelector("#last-name") as HTMLInputElement).value as string,
                email: (formElem.querySelector("#email-address") as HTMLInputElement).value as string,
                phone: (formElem.querySelector("#phone-number") as HTMLInputElement).value as string,
                password: (formElem.querySelector("#password") as HTMLInputElement).value as string,
                role: "user"
            }

            const result = await dispatch(addUserAsync(userData));
            let responseData = result.payload as ResponseData;

            if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                toast.error(responseData.message)
                return setError({ errorCode: responseData.code, message: responseData.message });
            }

            toast.success("User created successfully")

            closeModal();
        } catch (error) {
            toast.error("Error in creating user");
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
            <div className="">
                <button className="bg-rose-600 px-4 py-2 text-white" onClick={openModal} >
                    <PlusIcon width={16} className="inline mr-2" />
                    Add User
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
                                    ADD NEW USER
                                </Dialog.Title>

                                <form className="mt-8 space-y-6" action="http://localhost:5000/register" method="post" onSubmit={handleAddNewUser} >
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="first-name" className="sr-only">
                                                First Name
                                            </label>
                                            <input
                                                id="first-name"
                                                name="firstname"
                                                type="text"
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
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                                Email address
                                            </label>
                                            <input
                                                id="phone-number"
                                                name="phone"
                                                type="number"
                                                autoComplete="phone"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                minLength={5}
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Password"
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <p className='error-msg my-2 text-red text-center'>
                                            {error.message}
                                        </p>
                                        <button type="submit"
                                            className={` ${usersState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""} group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >

                                            Add User
                                        </button>
                                        <div>
                                            <p onClick={closeModal} className="text-center mx-auto text-red mt-4 block cursor-pointer">
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

export const EditUser = (props: { userData: UserData }) => {
    let [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const userState = useAppSelector(selectUserState);
    const usersState = useAppSelector(selectUsersState);

    const dispatch = useAppDispatch();

    const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            if (usersState.state === AppStateMachine.Pending)
                return;

            const formElem = event.target as HTMLFormElement;

            let userData = { ...props.userData };
            userData.firstname = (formElem.querySelector("#first-name") as HTMLInputElement).value as string;
            userData.lastname = (formElem.querySelector("#last-name") as HTMLInputElement).value as string;
            userData.phone = (formElem.querySelector("#phone-number") as HTMLInputElement).value as string;
            userData.role = (formElem.querySelector("#role") as HTMLInputElement).value as string;

            const response = await dispatch(updateUserAsync(userData));
            let responseData = response.payload as ResponseData;

            if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                toast.error(responseData.message);
                return setError({ errorCode: responseData.code, message: responseData.message });
            }

            toast.success("User edited successfully");

            closeModal();
        } catch (error) {
            toast.error("Error in editing User");
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
                                    Edit User
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
                                            <label htmlFor="role" className="sr-only">
                                                role
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                defaultValue={"user"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="user">
                                                    User
                                                </option>
                                                <option value="contributor">
                                                    Contributor
                                                </option>
                                                <option value="Admin">
                                                    Admin
                                                </option>
                                            </select>
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
                                        <button type="submit"
                                            className={` ${usersState.state === AppStateMachine.Pending ? "cursor-wait opacity-40" : ""} group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >

                                            Continue
                                        </button>
                                        <div>
                                            <p onClick={closeModal} className="mx-auto text-center text-red mt-4 block cursor-pointer">
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

const DeleteUser = (props: { userData: UserData }) => {
    const [loading, setLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const usersState = useAppSelector(selectUsersState);

    const handleDeleteUser = async () => {
        try {
            if (loading)
                return;

            setLoading(true);

            const response = await dispatch(deleteUserAsync(props.userData));
            closeModal()
            setLoading(false);
            toast.success("User deleted successfully");

        } catch (error) {
            toast.error("Error in deleting User");
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
                                    Delete User
                                </Dialog.Title>

                                <Dialog.Description as="h3" className="text-center mt-8 mb-4">
                                    Are you sure?
                                </Dialog.Description>
                                <button onClick={handleDeleteUser}
                                    className={` ${loading ? "cursor-wait opacity-40" : ""} group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`} >

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


const UserTable = (props: { userData: UserData }) => {
    return (
        <tr>
            <td className="py-4 pr-3 pl-6">
                <div>
                    <div style={{ cursor: "pointer" }} className="">
                        <input type="checkbox" className="form-check-input" />
                    </div>
                </div>
            </td>
            <td className="px-3 py-4">
                <img className="avatar-img rounded-full inline mr-1" width={24} src={ProductImg} alt="Billboard" />
                <small>{`${props.userData.firstname}  ${props.userData.lastname} `} </small>
            </td>
            <td className="px-3 py-4">
                {props.userData.phone}
            </td>
            <td className="px-3 py-4">
                {props.userData.email}
            </td>
            <td className="px-3">
                {moment(props.userData.createddate).format("ddd MMM YYYY")}
            </td>
            <td className="px-3">
                <small className={`p-1 px-2 rounded-full ${props.userData.role?.toLocaleLowerCase() == "user" ? "text-emerald-400 bg-emerald-100" : "bg-amber-100 text-amber-400"} `} >
                    {props.userData.role?.toLocaleLowerCase()}
                </small>
            </td>
            <td className="px-3 text-end">
                <EditUser userData={props.userData} />
                <DeleteUser userData={props.userData} />
            </td>
        </tr>
    )
}

const DashboardUsers = () => {

    const dispatch = useAppDispatch();
    const usersState = useAppSelector(selectUsersState);
    const userState = useAppSelector(selectUserState);


    useEffect(() => {
        (async () => {
            const response = await dispatch(getUsersAsync());

        })();

    }, [])


    return (<>
        {
            userState.userData.role?.toLocaleLowerCase() == "admin" ?
                <div className="dashboard-orders py-4 px-6">
                    <div className="px-4">
                        <h1 className="font-medium text-xl">
                            Users
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
                                <AddUser />
                            </div>
                        </div>
                        <div className="py-6">

                            <table className="table-auto w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr role="row">
                                        <th colSpan={1} className="px-3 bg-slate-100 py-4 pl-6 border-t border-b border-gray-light">
                                            <div className="custom-control custom-checkbox">
                                                <input id="datatableCheckAll" type="checkbox" className="custom-control-input" />
                                                {/* <label className="custom-control-label" for="datatableCheckAll"></label> */}
                                            </div>
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3  font-medium border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">
                                            User
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 font-medium  border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">

                                            Phone
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3  font-medium border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">

                                            Email
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 font-medium  border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">

                                            Created Date
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 font-medium  border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">

                                            Role
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3  font-medium border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">

                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usersState.users && usersState.users.map((userData, index) => {
                                            return <UserTable key={index} userData={userData} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                :
                <>
                    {

                        < Navigate to="/dashboard/profile" replace={true} />
                    }
                </>

        }
    </>

    )
}


export const DashboardSubs = () => {

    const dispatch = useAppDispatch();
    const subs = useAppSelector(state => state.users.subscribers);
    const userState = useAppSelector(selectUserState);


    useEffect(() => {
        (async () => {
            const response = await dispatch(getSubscribersAsync());

        })();

    }, [])


    return (<>
        {
            userState.userData.role?.toLocaleLowerCase() == "admin" ?
                <div className="dashboard-orders py-4 px-6">
                    <div className="px-4">
                        <h1 className="font-medium text-xl">
                            Subscribers
                        </h1>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg border border-gray-light">
                        <div className="py-6">

                            <table className="table-auto w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr role="row">
                                        <th colSpan={1} className="px-3 bg-slate-100 py-4 pl-6 border-t border-b border-gray-light">
                                            <div className="custom-control custom-checkbox">
                                                <input id="datatableCheckAll" type="checkbox" className="custom-control-input" />
                                                {/* <label className="custom-control-label" for="datatableCheckAll"></label> */}
                                            </div>
                                        </th>
                                        <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3  font-medium border-t border-b border-gray-light bg-slate-100 py-4 b uppercase text-xs ">
                                            Email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subs && subs.map((sub, index) => {
                                            return <tr key={"i" + index}>
                                                <td className="py-4 pr-3 pl-6">
                                                    {sub.email}
                                                </td>

                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                :
                <>
                    {

                        < Navigate to="/dashboard/profile" replace={true} />
                    }
                </>

        }
    </>

    )
}

export default DashboardUsers;
