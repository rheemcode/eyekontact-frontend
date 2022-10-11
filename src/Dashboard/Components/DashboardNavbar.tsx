import { MenuIcon, UserIcon } from "@heroicons/react/outline";
import { selectUserState, useAppSelector } from "../../hooks";




const DashboardNavbar = () => {
    const userState = useAppSelector(selectUserState)

    const toggleSidebar = () => {
        const dashboardSidebar = document.querySelector(".dashboard-sidebar") as HTMLElement | null;
        if (dashboardSidebar) {
            if (dashboardSidebar.classList.contains("visible")) {
                dashboardSidebar.classList.remove("visible");
                dashboardSidebar.style.marginLeft = "0";
                return;
            }

            dashboardSidebar.classList.add("visible");
            dashboardSidebar.style.marginLeft = `-${dashboardSidebar.getBoundingClientRect().width}px`;
        }
    }

    return (
        <div className="dashboard-navbar shadow-md bg-white">
            <div>
                <MenuIcon width={36} cursor="pointer" onClick={toggleSidebar} />
            </div>
            <div className="user-container">
                <div className="inline-block" style={{ padding: "3px", backgroundColor: "#dadada", borderRadius: "50%" }}>
                    <UserIcon width={28} />
                </div>
                <span className="text-sm ml-3 self-center divide-x-0 ">{`${userState.userData.firstname} ${userState.userData.lastname}`}</span>
            </div>
        </div>
    )
}

export default DashboardNavbar;