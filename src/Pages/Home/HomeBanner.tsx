import { useRef } from 'react';
import Carousel, { CarouselItem } from '../../Components/Carousel';
import { LandingBG, LekkiImg, VictoriaIslandImg } from '../../images';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useAppSelector } from '../../hooks';
import { APPURL } from '../../Utils';

// TODO: carousel
const HomeBanner = () => {

    const ref = useRef(HTMLDivElement.prototype);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.homeState);


    return (
        <div ref={ref} className="home-landing">
            {/* <CarouselProvider interval={15000} isPlaying={true} naturalSlideHeight={1080} infinite={true} naturalSlideWidth={1920} totalSlides={4}>
                <Slider>
                    <Slide index={0}> */}
            <Carousel>
                <CarouselItem className='active'>
                    <div className="banner-bg relative px-2 lg:px-24" style={{ backgroundImage: `url(${pageContent.landingBg1})` }}>
                        <div className="flex relative">
                            <div className="pt-24 pb-32 container pl-3 lg:pl-10 text-white z-10">
                                <div className="relative lg:w-11/12 overflow-hidden">
                                    <h1 id="landingHeader1" className="text-5xl lg:text-7xl font-extrabold landing-header"

                                        dangerouslySetInnerHTML={{ __html: pageContent.landingHeader1 }} />
                                    {/* Eyekontact Outdoor Advertising
                            </h1> */}
                                </div>
                                <div className="mt-12 inline-flex rounded-md shadow">
                                    <a href="/services"
                                        id="serviceLink"

                                        dangerouslySetInnerHTML={{ __html: pageContent.landingServiceLink1 }}
                                        className="inline-flex items-center justify-center px-12 py-3 text-white bg-red text-base font-medium"
                                    />
                                    {/* View Our Services
                        </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="banner-bg relative px-2 lg:px-24" style={{ backgroundImage: `url(${pageContent.landingBg2})` }}>

                        <div className="flex relative">
                            <div className="pt-24 pb-32 container pl-3 lg:pl-10 text-white z-10">
                                <div className="relative lg:w-11/12 overflow-hidden">
                                    <h1 className="text-5xl lg:text-7xl font-extrabold landing-header" id="landing-header-2"

                                        dangerouslySetInnerHTML={{ __html: pageContent.landingHeader2 }}
                                    />

                                </div>
                                <div className="mt-12 inline-flex rounded-md shadow">
                                    <a href="#"
                                        id="landing-service-link2"
                                        className="inline-flex items-center justify-center px-12 py-3 text-white bg-red text-base font-medium"
                                        dangerouslySetInnerHTML={{ __html: pageContent.landingServiceLink2 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            </Carousel>
        </div >
    )
}

export default HomeBanner;