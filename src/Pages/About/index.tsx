import { useEffect } from "react";
import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { WhoWeAreSectionState, AboutUsState } from "../../features/cms/cmsSlice";
import { useAppSelector } from "../../hooks";
import { BillboardBG2, ClientsImg } from "../../images";
import { APPURL } from "../../Utils";
import ExpertSection from "../Components/ExpertSection";
import Footer from "../Components/Footer";
import NoticeSection from "../Components/NoticeSection";
import ClientTestimonial from "../Components/Testimonial";
import Plyr from "plyr"

const WhoWeAreSection: React.FC<AboutUsState> = (props) => {


    return (
        <div className="who-we-are py-12 px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-7/12 mb-12 lg:px-12 flex justify-between flex-col">
                    <div className="">
                        <h1

                            id="aboutHeading"
                            className="text-red font-bold text-3xl mb-6"
                            dangerouslySetInnerHTML={{ __html: props.heading }}
                        />
                        <p id="aboutDescription" className="text-gray mb-4"
                            dangerouslySetInnerHTML={{ __html: props.description }}
                        />

                        <p id="aboutDescription2" className="text-gray mb-6"
                            dangerouslySetInnerHTML={{ __html: props.description2 }}
                        />

                        <p id="aboutDescription3" className="text-gray"
                            dangerouslySetInnerHTML={{ __html: props.description3 }}
                        />

                        <a href="#" className="py-2 px-6 bg-red mt-5 inline-block font-bold text-white">GET IN TOUCH</a>
                    </div>
                    <div className="flex mt-12 flex-col lg:flex-row">
                        <div className="mission pr-4">
                            <h2 id="missionHeading" className="font-bold text-xl mb-3"
                                dangerouslySetInnerHTML={{ __html: props.missionHeading }}
                            />

                            <p id="missionDescription" className="text-gray"
                                dangerouslySetInnerHTML={{ __html: props.missionDescription }}
                            />

                        </div>
                        <div className="core-values pr-4">
                            <h2 id="coreValuesHeading" className="font-bold text-xl mb-3"
                                dangerouslySetInnerHTML={{ __html: props.coreValuesHeading }}
                            />

                            <p id="coreValuesDescription" className="text-gray"
                                dangerouslySetInnerHTML={{ __html: props.coreValuesDescription }}
                            />

                        </div>
                    </div>
                </div>
                <div className="lg:w-5/12">
                    <div className="h-full max-h-[700px]">
                        <img src={process.env.PUBLIC_URL + "/bg2.jpg"} className="h-full" alt="" />
                    </div>
                </div>
            </div>


        </div>
    )
}

const HappClientsSection = () => {
    return (
        <div className="happy-clients text-center pt-6 mt-12 mb-4">
            <h1 className="lg:text-6xl text-3xl font-bold">
                HAPPY CLIENTS
            </h1>
            <div className="clients text-centers py-3">
                <img className="mx-auto w- w-5/6" src={ClientsImg} alt="happy clients" />
            </div>
        </div>
    )
}

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.aboutState);


    return (
        <div className="about">
            <PageLoading />
            <PageBanner title="About" path="About" image={pageContent.whoWeAreSection.landingBg} />
            <WhoWeAreSection  {...pageContent.whoWeAreSection} />
            <ExpertSection {...pageContent.expertSection} />
            <HappClientsSection />
            <ClientTestimonial {...pageContent.testimonialSection} />
            <NoticeSection  {...pageContent.brandNoticeSection} />
        </div>
    )
}


export default About;