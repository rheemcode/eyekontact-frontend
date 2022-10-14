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
        <div ref={ref} className="home-landing pt-12">
            {/* <CarouselProvider interval={15000} isPlaying={true} naturalSlideHeight={1080} infinite={true} naturalSlideWidth={1920} totalSlides={4}>
                <Slider>
                    <Slide index={0}> */}
            <Carousel>
                <CarouselItem className='active'>
                    <div className="relative flex h-screen items-center justify-center">
                        <div className='absolute h-screen'>
                            <img className='w-full md:h-auto h-full object-cover' src={process.env.PUBLIC_URL + "/images/01.jpg"} alt="" />
                            <div className="absolute top-0 w-full h-full bg bg-opacity-80">
                            </div>
                        </div>
                        <div className='relative z-10'>
                            <div className="text-center">
                                <h1 className="md:text-6xl text-5xl text-white font-extrabold drop-shadow-lg">Eyekontact <span className='text-e_red '> Limited </span></h1>
                                <h3 className="text-6xl font-medium drop-shadow-xl mt-12 text-white ">Think Iconic</h3>
                                <h3 className="text-6xl drop-shadow-xl mt-6 text-white font-bold">Think Eyekontact</h3>

                                <hr className='w-4/12 block mx-auto my-12 border-t-[2px]' />

                                <div className="mt-4">
                                    <button className="px-8 py-3 uppercase font-bold text-white b bg-e_dark rounded-3xl">
                                        overview video
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="relative flex h-screen items-end  justify-end">
                        <div className='absolute h-screen'>
                            <img className='w-full md:h-auto h-full object-cover' src={process.env.PUBLIC_URL + "/images/02.jpg"} alt="" />
                            <div className="absolute top-0 w-full h-full bg bg-opacity-80">
                            </div>
                        </div>
                        <div className='relative z-10'>
                            <div className="text-right mb-20 mr-20">
                                <button className="px-8 py-3 uppercase font-bold text-white bg-e_red  rounded-3xl">
                                    overview video
                                </button>
                            </div>

                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="relative flex h-screen items-end  justify-end">
                        <div className='absolute h-screen'>
                            <img className='w-full md:h-auto h-full object-cover' src={process.env.PUBLIC_URL + "/images/03.jpg"} alt="" />
                            <div className="absolute top-0 w-full h-full bg bg-opacity-80">
                            </div>
                        </div>
                        <div className='relative z-10'>
                            <div className="text-right mb-20 mr-20">
                                <button className="px-8 py-3 uppercase font-bold text-white bg-e_red  rounded-3xl">
                                    overview video
                                </button>
                            </div>

                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="relative flex h-screen items-end  justify-end">
                        <div className='absolute h-screen'>
                            <img className='w-full md:h-auto h-full object-cover' src={process.env.PUBLIC_URL + "/images/04.jpg"} alt="" />
                            <div className="absolute top-0 w-full h-full bg bg-opacity-80">
                            </div>
                        </div>
                        <div className='relative z-10'>
                            <div className="text-right mb-20 mr-20">
                                <button className="px-8 py-3 uppercase font-bold text-white bg-e_red  rounded-3xl">
                                    overview video
                                </button>
                            </div>

                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="relative flex h-screen items-end  justify-end">
                        <div className='absolute h-screen'>
                            <img className='w-full md:h-auto h-full object-cover' src={process.env.PUBLIC_URL + "/images/05.jpg"} alt="" />
                            <div className="absolute top-0 w-full h-full bg bg-opacity-80">
                            </div>
                        </div>
                        <div className='relative z-10'>
                            <div className="text-right mb-20 mr-20">
                                <button className="px-8 py-3 uppercase font-bold text-white bg-e_red  rounded-3xl">
                                    overview video
                                </button>
                            </div>

                        </div>
                    </div>
                </CarouselItem>
            </Carousel>
        </div >
    )
}

export default HomeBanner;