import { useEffect } from "react";
import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { WhoWeAreSectionState, AboutUsState } from "../../features/cms/cmsSlice";
import { useAppSelector } from "../../hooks";
import { BillboardBG2, ClientsImg } from "../../images";
import { APPURL, getImage } from "../../Utils";
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
                            className="text-e_blue font-bold text-3xl mb-6"
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

                        <a href="#" className="py-2 px-6 bg-e_blue mt-5 inline-block font-bold text-white">GET IN TOUCH</a>
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
            <div className="pt-12">
                <div className="bg bg-cover pb-48 pt-24 h-screen relative" style={{ backgroundImage: `url(${getImage("background.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="text-right">
                            <img className="inline md:w-64 w-32" src={getImage("eyekontact-logo.png")} alt="" />
                        </div>
                        <div className="mx-auto container mt-36 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-7xl text-3xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase text-white">ABOUT US</h1>
                        </div>
                    </div>
                    <div className="absolute bottom-0 p-2  md:p-4">
                        <h1 className="font-extrabold md:text-lg  mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase text-white">OUTDOOR ADVERTISING SOLUTIONS</h1>
                    </div>
                </div>
                <div className="bg bg-cover md:pb-48 md:pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="mx-auto container md:mt-36 text-yellow z-10 text-center">
                            <div className="text-center">
                                <img src={getImage("landing.png")} alt="" className="inline" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="text-right relative z-10">
                        <img className="inline md:w-64 w-32" src={getImage("eyekontact-logo.png")} alt="" />
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                OUR COMPANY
                            </h2>
                            <p className="mt-3">
                                Eyekontact Limited is one of Nigeria leading advertising companies, was incorporated in December 2007 with the corporate affair commission of Nigeria with the registration NO: RC 722750. We are certified by LASAA (Lagos state signage and advertising agency) and also member of APCON (Advertising practitioner council of Nigeria)
                            </p>
                            <p className="mt-1">
                                We specialize in out of homes advertising and marketing communication and provide solutions for our customers in form of our media platform across Nigeria. We also provide our client with strategic board awareness insight, creative support and channel to deliver with their brand message from start to finish.
                            </p>
                            <p className="mt-1">
                                We have won several awards in recognition of our innovative ideas and disruptive concept delivered across the country.
                            </p>
                            <p className="mt-1">

                                With our vast experience , we intend to expand your market visibility to creating bond and affinity for your brand through provision of excellent innovative and environmentally friendly integrated marketing communication advertising services
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("company-man.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="text-right relative z-10">
                        <img className="inline md:w-64 w-32" src={getImage("eyekontact-logo.png")} alt="" />
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                ABOUT US
                            </h2>
                            <p className="mt-3">
                                We are an OOH advertising agency , known for iconic creativity and innovations. We create , manage and execute high-impact campaigns for clients who wants to get their ads campaign in front of the right audience .

                            </p>
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                OUR MISSION
                            </h2>
                            <p className="mt-3">
                                Our mission at Eyekontact Outdoor Limited is to provide brands and organisations with our iconic innovations and help communicate your organisations message in the most effective visible way.
                            </p>
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                OUR VISION

                            </h2>
                            <p className="mt-3">
                                Our vision at Eyekontact Outdoor Limited is to be West Africa's leading and most impactful outdoor advertising company and to create a sense of connection and loyalty for brands through the provision of excellent and innovative OOH services.
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("about-us.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <img className="inline w-full" src={getImage("eyekontact-logo.png")} alt="" />
                            <h3 className="text-center text-lg md:text-2xl font-bold uppercase mt-4">
                                THINK ICONIC… THINK EYEKONTACT.
                            </h3>

                        </div>
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                WHY US
                            </h2>
                            <p className="mt-3">
                                We believe in the power of OOH advertising and we will serve you the most cost effective ways to reach your target audience in strategic locations. If you have an idea that needs to be seen , or a product that needs to be sold , we can and will help.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default About;