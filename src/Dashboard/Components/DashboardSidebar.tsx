import { Link, NavLink } from "react-router-dom";
import { ChartBarIcon, DocumentTextIcon, MailIcon, RssIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon, UsersIcon } from "@heroicons/react/outline";
import AppLogo from "../../icons/eyekontact-logo.png"
import { useAppSelector, selectUserState } from "../../hooks";


const DashboardSidebar = () => {
    const userState = useAppSelector(selectUserState);

    return (
        <div className="dashboard-sidebar px-2 py-6">
            <div className="fixed">
                <Link to="/">
                    <img src={AppLogo} alt="" className="w-6/12" />
                </Link>
                <div className="flex flex-col mt-6">
                    {
                        (userState.userData.role?.toLocaleLowerCase() == "admin") && <div className="py-3 px-2 flex text-gray">
                            {
                                <>
                                    <ChartBarIcon width={24} />
                                    <NavLink to="/dashboard/overview" className={({ isActive }) => {
                                        return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                                    }} >
                                        Overview
                                    </NavLink>
                                </>
                            }

                        </div>
                    }

                    {
                        (userState.userData.role?.toLocaleLowerCase() == "admin") && <div className="py-3 px-2 flex text-gray">
                            {
                                <>
                                    <DocumentTextIcon width={24} />
                                    <NavLink to="/dashboard/cms" className={({ isActive }) => {
                                        return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                                    }} >
                                        CMS
                                    </NavLink>
                                </>
                            }

                        </div>
                    }

                    {
                        (userState.userData.role?.toLocaleLowerCase() == "admin") && <div className="py-3 px-2 flex text-gray">
                            {
                                (userState.userData.role?.toLocaleLowerCase() == "admin") && <>
                                    <ShoppingCartIcon width={24} />
                                    <NavLink to="/dashboard/orders" className={({ isActive }) => {
                                        return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                                    }} >
                                        Orders
                                    </NavLink>
                                </>
                            }
                        </div>
                    }

                    {
                        (userState.userData.role?.toLocaleLowerCase() == "admin") && <div className="py-3 px-2 flex text-gray">
                            {
                                <>

                                    <ShoppingBagIcon width={24} />
                                    <NavLink to="/dashboard/products" className={({ isActive }) => {
                                        return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                                    }} >
                                        Products
                                    </NavLink>
                                </>
                            }
                        </div>
                    }

                    {
                        (userState.userData.role?.toLocaleLowerCase() == "admin") && <div className="py-3 px-2 flex text-gray">
                            {
                                <>

                                    <MailIcon width={24} />
                                    <NavLink to="/dashboard/subscribers" className={({ isActive }) => {
                                        return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                                    }} >
                                        Subscribers
                                    </NavLink>
                                </>
                            }
                        </div>
                    }

                    <div className="py-3 px-2 flex text-gray">
                        <RssIcon width={24} />
                        <NavLink to="/dashboard/blogs" className={({ isActive }) => {
                            return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                        }} >
                            Blogs
                        </NavLink>
                    </div>
                    {
                        (userState.userData.role?.toLocaleLowerCase() == "admin") && <div className="py-3 px-2 flex text-gray">
                            <>
                                <UsersIcon width={24} />
                                <NavLink to="/dashboard/users" className={({ isActive }) => {
                                    return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                                }} >
                                    Users
                                </NavLink>
                            </>

                        </div>
                    }
                    <div className="py-3 px-2 flex text-gray">

                        <UserIcon width={24} />
                        <NavLink to="/dashboard/profile" className={({ isActive }) => {
                            return isActive ? "ml-3 font-medium text-slate-200" : "ml-3 font-medium text-gray"
                        }} >
                            Profile
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar;