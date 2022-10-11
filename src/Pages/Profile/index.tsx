import { Navigate } from "react-router";
import PageLoading from "../../Components/Loader"
import PageBanner from "../../Components/PageBanner"
import DashboardProfile from "../../Dashboard/Profile"
import { useAppSelector, selectUserState } from "../../hooks";

const Profile = () => {
    const userState = useAppSelector(selectUserState);

    return (<>
        {
            userState.isLogin ?

                <div className="profile-page" >
                    <PageLoading />
                    <PageBanner title="Profile" path="Profile" />
                    {/* <div className="py-12"></div> */}
                    <div className="lg:px-12 px-6">
                        <DashboardProfile />
                    </div>
                </div>
                : <Navigate to="/login" replace={true} />

        }
    </>
    )
}

export default Profile;