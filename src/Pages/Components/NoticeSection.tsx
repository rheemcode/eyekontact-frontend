import { Link } from "react-router-dom";
import { BrandNoticeSectionState } from "../../features/cms/cmsSlice";
import { BillboardBG4 } from "../../images";


const NoticeSection: React.FC<BrandNoticeSectionState> = (props) => {
    return (
        <div className="py-40 notice-section relative" style={{ backgroundImage: `url(${BillboardBG4})` }}>
            <div className="overlay absolute top-0 left-0"></div>
            <div className="text-center text-white relative">
                <h1
                     id="noticeHeading"
                    className="font-extrabold text-5xl"
                    dangerouslySetInnerHTML={{ __html: props.heading }}
                />
                <h3
                    
                    id="noticeHeading2"
                    className="font-extrabold text-xl mt-4"
                    dangerouslySetInnerHTML={{ __html: props.heading2 }}
                />
                <Link to="contact" className="py-3 px-6 bg-red mt-5 inline-block font-bold text-white">CONTACT US</Link>
            </div>
        </div>
    )
}

export default NoticeSection;