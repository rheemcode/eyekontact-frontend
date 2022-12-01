import { useEffect, useRef } from 'react';
import { Carousel as BsCarousel } from "bootstrap";
import "./style.css"


declare interface CarouselProps {
    id?: string;
    slideCount?: number;
}


export const CarouselItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div className={`carousel-item ${props.className}`}>
            {
                props.children
            }
        </div>
    )
}

const Carousel: React.FC<CarouselProps> = (props) => {
    const index = useRef({ index: 0, max: 0, width: 0 })
    const carouselRef = useRef(HTMLDivElement.prototype);
    const carouselHolderRef = useRef(HTMLDivElement.prototype);
    const carousel = useRef<BsCarousel>(BsCarousel.prototype);

    const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.type === "mouseenter") {
            carousel.current.pause();
            return;
        }

        carousel.current.cycle();

    }

    useEffect(() => {
        carousel.current = new BsCarousel(carouselRef.current, {
            interval: 5000,
            wrap: true,
        })
        carousel.current.cycle();
        return () => {
            carousel.current.dispose()
        }
    }, [])

    return (
        <div ref={carouselRef} id={`carousel-${props.id}`} onMouseEnter={handleHover} onMouseLeave={handleHover} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {
                    new Array(props.slideCount).fill(0).map((val, index) => <button key={index} type="button" data-bs-target={`#carousel-${props.id}`} data-bs-slide-to={`${index}`} className="active" aria-current="true" aria-label={`Slide ${index + 1}`}></button>)
                }
            </div>
            <div className="carousel-inner">
                <div ref={carouselHolderRef} className="carousel-holder">
                    {props.children}
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${props.id}`} data-bs-slide="prev" style={{ zIndex: 999 }}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${props.id}`} data-bs-slide="next" style={{ zIndex: 999 }}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel;

// <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img src="..." class="d-block w-100" alt="...">
//     </div>
//     <div class="carousel-item">
//       <img src="..." class="d-block w-100" alt="...">
//     </div>
//     <div class="carousel-item">
//       <img src="..." class="d-block w-100" alt="...">
//     </div>
//   </div>
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>