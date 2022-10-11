import { useEffect, useRef } from "react";
import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { useAppSelector } from "../../hooks";
import { APPURL } from "../../Utils";
import Footer from "../Components/Footer";
import ServicesSection from "../Components/Services/ServiceSection";
import ClientTestimonial from "../Components/Testimonial";
import Plyr from "plyr";
import "./style.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Client } from "@googlemaps/google-maps-services-js";
import { SearchCircleIcon, SearchIcon } from "@heroicons/react/solid";
import ProductsSection from "../Components/Products/ProductsSection";

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

const Products = () => {
    const homePageContent = useAppSelector((state) => state.pageContent.webPagesState.homeState);
    const servicePageContent = useAppSelector((state) => state.pageContent.webPagesState.servicesState);
    const searchLocation = useRef("");
    const searchInput = useRef(HTMLInputElement.prototype);
    const location = useLocation();

    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/products?product-location=${searchInput.current.value}`, { replace: true });
    }


    useEffect(() => {
        const loader = document.createElement("script");
        loader.innerHTML = `

        function initAutocomplete() {
          setTimeout(() => {
            autocomplete = new google.maps.places.Autocomplete(
              document.getElementById("autocomplete"), {
                types: ["address"],
                componentRestrictions: {
                  'country': ["NG"]
                },
                fields: ["place_id", "geometry", "name"]
              });
          }, [3000])
    
    
        }
        initAutocomplete();
        
        `;

        document.body.appendChild(loader);

        return () => {
            document.body.removeChild(loader);
        }

        // }
    }, [])


    return (
        <div className="services">
            <PageLoading />
            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${servicePageContent.landingBg})` }}>
                    <div className="flex relative">
                        <div className="mx-auto container my-12 text-yellow z-10 text-center">
                            <h1 className="font-extrabold text-4xl mb-4">{"Products"}</h1>
                            <h1 className="select-none">Home &nbsp; <span className="font-extrabold capitalize">{' > '} &nbsp;</span>  {location.pathname.split("/").join(" ")}</h1>
                            {/* <div className="mt-8 relative inline-block w-10/12">
                                <input ref={searchInput} onChange={(event) => searchLocation.current = event.target.value} id="autocomplete" type="text" placeholder="Search Products Location" className="p-4 text-lg w-full text-black outline-none rounded" />

                                <SearchIcon onClick={handleSearch} className="inline right-5 absolute h-full cursor-pointer" width={30} />
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
            <ProductsSection maxService={100} />

            <div className="mt-12 mb-12 lg:mb-36 lg:mt-24 lg:px-24 px-6">
                <div className="grid  gap-8 md:grid-flow-col grid-flow-row">
                    <div>
                        <video className="rounded shadow" id="player2" playsInline controls data-poster={`https://eyekontact.com.ng/uploads/images/lekki.jpg`}>
                            <source src={`https://eyekontact.com.ng/uploads/videos/lekki.mp4`} type="video/mp4" />
                        </video>
                    </div>
                    <div className="self-center">
                        <h1 className="border-b-4 inline-block pb-4 border-red text-3xl lg:text-6xl font-bold">
                            Iconic Bespoke Displays                        </h1>
                        <p className="mt-6 md:text-xl text-lg !leading-8">
                            Looking to create an outdoor display that is truly iconic and custom made to your brand?
                            Then reach out to us and we can help you achieve the virality that you seek.
                        </p>
                        <Link to="contact" className="py-3 px-6 bg-e_red mt-5 inline-block font-bold text-white">CONTACT US</Link>
                    </div>
                </div>
            </div>
            <ClientTestimonial {...homePageContent.testimonialSection} />
            <WorkWithUsSection />
        </div>
    );

}

export default Products;