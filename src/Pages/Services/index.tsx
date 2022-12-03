import { useEffect, useRef } from "react";
import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { useAppSelector } from "../../hooks";
import { APPURL, getImage } from "../../Utils";
import Footer from "../Components/Footer";
import ServicesSection from "../Components/Services/ServiceSection";
import ClientTestimonial from "../Components/Testimonial";
import Plyr from "plyr";
import "./style.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Client } from "@googlemaps/google-maps-services-js";
import { initAutoComplete } from "./autocomplete";
import { SearchCircleIcon, SearchIcon } from "@heroicons/react/solid";

//FIXME: Move to component `see products page`
const WorkWithUsSection = () => {
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.servicesState);

    return (
        <div className="work-with-us py-24 mt-12 lg:mt-24">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-6/12 px-20">
                    <h1
                        id="heading"
                        className="text-white text-3xl lg:text-7xl font-extrabold text-center lg:text-left"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.heading }}
                    />
                </div>
                <div className="lg:w-6/12 px-20 ml text-white text-center mt-0 lg-mt-24">
                    <div className="mb-8">
                        <h1

                            id="heading2"
                            className="font-bold text-white"
                            dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.heading2 }}
                        />
                    </div>
                    <h1 id="phone" className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.phone }}
                    />
                    <h1

                        id="email"
                        className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.email }}
                    />
                    <h1

                        id="address"
                        className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.address }}
                    />
                </div>
            </div>
        </div>
    )
}

const Services = () => {
    return (
        <div className="services">
            <div className="pt-12">
                <div className="bg bg-cover pb-48 pt-24 h-screen relative" style={{ backgroundImage: `url(${getImage("background.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="text-right">
                            <img className="inline md:w-64 w-32" src={getImage("eyekontact-logo.png")} alt="" />
                        </div>
                        <div className="mx-auto container mt-36 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-7xl text-3xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase text-white">OUR SERVICES</h1>
                        </div>
                    </div>
                    <div className="absolute bottom-0 p-2  md:p-4">
                        <h1 className="font-extrabold md:text-lg  mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase text-white">OUTDOOR ADVERTISING SOLUTIONS</h1>
                    </div>
                </div>
                <div className="bg bg-cover md:pb-48 md:pt-24  relative before:bg-[#000] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="mx-auto container md:mt-36 text-yellow z-10 text-center">
                            <div className="text-center">
                                <img src={getImage("360image.png")} alt="" className="inline" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#000] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="mx-auto container mt-36 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-3xl text-lg mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase ">
                                We can create custom display that convey your brand messages and also help your company display
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#000] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                ICONIC STRUCTURE
                            </h2>
                            <p className="mt-3">
                                The iconic platforms is the modern form of advertising which has to do with the digital and creative forms of advertising in OOH. This kind of platform are especially made for bigger brands that know the effectiveness on their
                                BRANDS . The most important of the iconic platform is that it must be LIT to show the beauty of the brands and tell a story of the brands. This takes creativity of outdoors to another level of thinking outside the box for your clients so they can reach their consumer audience perfection what their brands is about and what they can derive.


                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("ozumba-mbadiwe.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#000] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                MEDIA PLANNING MP

                            </h2>
                            <p className="mt-3">
                                At Eyekontact our approach to media planning is to understand our client brands’ marketing, adevertising and media goals. We incorporate the four core steps in media planning; market analysis, establishment of media objectives, media strategy development and implementation and evaluation and follow up.
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("media.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#000] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                BRANDING BR

                            </h2>
                            <p className="mt-3">
                                Our strategy towards branding is developing brand recognition, customers loyalty and builds lasting relationships with our amiable clients.

                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("branding-text.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                MEDIA BUYING MB
                            </h2>
                            <p className="mt-3">
                                We put media planning into action, focusing on buying the right mix of media to deliver on the campaign goals effectively.
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("media-buying.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                DIGITAL MARKETING DM
                            </h2>
                            <p className="mt-3">
                                We put media planning into action, focusing on buying the right mix of media to deliver on the campaign goals effectively.
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("digital-marketing.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                CREATIVE DESIGN CD
                            </h2>
                            <p className="mt-3">
                                Eyekontact creative design produces iconic, unique and memorable design that stand out to our customers for easy identification of their brand and products.
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("creative-design.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8 relative z-10">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                PR ACTIVATION PRA
                            </h2>
                            <p className="mt-3">
                                We do PR activation through campaigns, events and interact which your brand generates awareness and builds lasting connections with target audience.

                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("pr-activation.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                </div>




            </div>


        </div >
    );

}

export default Services;