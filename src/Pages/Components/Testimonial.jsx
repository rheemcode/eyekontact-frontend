// import Carousel, { CarouselItem } from "../../Components/Carousel";
import { Carousel } from "@fancyapps/ui"
import { useEffect, useRef } from "react";
import { TestimonialSectionState } from "../../features/cms/cmsSlice";
import { UserIcon } from "../../images";
import "./style.css"
// declare interface TestimonialCardProps {
//     userComment: string;
//     name: string;
//     clientRole: string;
//     userImg?: string;
// }

//TODO: move to file
export const TestimonialCard = (props) => {
    return (
        <div className="testimonial-card h-full" >
            <div className="flex flex-col justify-between h-full" style={{ minHeight: "200px" }}>
                <div>
                    <p className="text-black">
                        {props.userComment}
                    </p>
                </div>
                <div className="mt-4 flex">
                    <div className="mr-3">
                        < img src={props.userImg ? props.userImg : UserIcon} width="60" height="60" alt="" className='rounded-full' />
                    </div>
                    <div className="self-center">
                        <h1 className='text-black font-medium'>{props.name}</h1>
                        <h2 className="text-e_red font-medium">{props.clientRole}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ClientTestimonial = (props) => {

    const carousel = useRef()

    useEffect(() => {
        // Initialise Carousel
        if (carousel.current)
            return;
        carousel.current = new Carousel(document.querySelector("#cardSlider"), {
            infinite: true,
            Dots: false,
            friction: 0.9,
            center: false,
            slidesToSlide: 2,
            fill: false,
        });
    }, [])

    return (
        <div className="client-testimonial p-12 mt-16">
            <div className="px:3 md:px-8 lg:px-24 flex">
                <div className="bg-e_red inline-block py-2 md:py-8 pl-2 md:pl-6 pr-6 md:pr-24 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-24 h-24 lg:w-40 lg:h-40" viewBox="0 0 16 16">
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                    </svg>
                </div>
                <div className="mt-12">
                    <h1

                        id="testimonialHeading"
                        className="uppercase text-xl lg:text-6xl -left-6 md:-left-24 relative font-extrabold"
                        dangerouslySetInnerHTML={{ __html: props.heading }}
                    />

                    <h1

                        id="testimonialHeading2"
                        className="uppercase text-xl lg:text-6xl -left-6 md:-left-24 relative font-extrabold"
                        dangerouslySetInnerHTML={{ __html: props.heading2 }}
                    />
                </div>
            </div>

            <div className="px:3 md:px-8 lg:px-12  mt-12 ">
                <div id="cardSlider" className="mt-5 carousel">
                    <div className="carousel__viewport">
                        <div className="carousel__slide md:!w-4/12  !w-full">
                            <TestimonialCard
                                userComment='Your team is just terrific! From beginning to end, we appreciate the high level of professionalism and
                                    customer service that we experienced. We work with other outdoor advertising companies but the difference
                                    in your service stands far above the rest' name="Femi Ayeola" clientRole='MD, Malleable' />
                        </div>
                        <div className="carousel__slide md:!w-4/12 !w-full">

                            <TestimonialCard
                                userComment='Eyekontact outdoor has been a pleasure to do business with, it isn’t easy to find such outstanding customer
                                service. They are simply awesome!
                                ' name="Razaq Rubaik" clientRole='MD, Broadcontact' />
                        </div>
                        <div className="carousel__slide md:!w-4/12 !w-full">

                            <TestimonialCard
                                userComment='Eyekontact Outdoor has delivered on its promise of timely service. The design team is first rate and their
                                    rates are very competitive. They were easy to work with and quick to respond to changes in our media
                                    preference.
                                ' name=" Mr Mark Dawodu" clientRole='Insight Communications' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ClientTestimonial;