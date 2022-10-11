import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector, selectUserState, useAppDispatch } from "../hooks";
import BestSellingProducts from "./Components/BestSellingProducts";
import DashboardNavbar from "./Components/DashboardNavbar";
import DashboardSidebar from "./Components/DashboardSidebar";
import OrdersOverview from "./Components/OrdersOverview";
import TrafficOverview from "./Components/TrafficOverview";
import "./style.css"


export const DashboardOverview = () => {
    const userState = useAppSelector(selectUserState);

    return (<>
        {
            userState.userData.role?.toLowerCase() == "admin" ?
                <div className="p-6 content" >
                    <TrafficOverview />
                    <OrdersOverview />
                    <BestSellingProducts />
                </div> : <Navigate to="/" replace={true} />
        }
    </>)
}

const Dashboard = () => {

    const userState = useAppSelector(selectUserState);
    let navigate = useNavigate()
    const dispatch = useAppDispatch();

    return (<>
        {
            userState.isLogin ?
                <div className="dashboard">
                    <DashboardSidebar />
                    <div className="main w-screen lg:w-full">
                        <DashboardNavbar />
                        <Outlet />
                    </div>
                </div>
                :
                <Navigate to="/login" replace={true} />
        }
    </>
    )
}

export default Dashboard;