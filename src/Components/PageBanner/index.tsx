import { useLocation } from "react-router-dom";
import { LandingBG } from "../../images";
import "./style.css"

declare interface PageBannerProps {
    title: string;
    path: string;
    image?: string;
}

const PageBanner: React.FC<PageBannerProps> = (props) => {
    const location = useLocation();
    return (
        <div className="">
            <div className="banner-bg" style={{ backgroundImage: `url(${props.image})` }}>
                <div className="flex relative">
                    <div className="mx-auto container my-12 text-yellow z-10 text-center">
                        <h1 className="font-extrabold text-4xl mb-4">{props.title}</h1>
                        <h1 className="select-none capitalize">Home &nbsp; <span className="font-extrabold capitalize">{' > '} &nbsp;</span>  {location.pathname.split("/").join(" ")}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageBanner;