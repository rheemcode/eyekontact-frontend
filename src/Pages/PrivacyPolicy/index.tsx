import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { useAppSelector } from "../../hooks";
import ExpertSection from "../Components/ExpertSection";
import NoticeSection from "../Components/NoticeSection";
import ClientTestimonial from "../Components/Testimonial";
import WhoWeAreSection from "../Home/WhoWeAre";

const PrivacyPolicySection = () => {
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.privacyPolicy)

    return (
        <div className="tac py-12 px-8" dangerouslySetInnerHTML={{ __html: pageContent}} />
    )
}

const PrivacyPolicy = () => {
    return (
        <div>
            <PageLoading />
            <PageBanner title="Terms and Condition" path="Terms and Condition" image={""} />
            <PrivacyPolicySection />
        </div >
    )
}

export default PrivacyPolicy;