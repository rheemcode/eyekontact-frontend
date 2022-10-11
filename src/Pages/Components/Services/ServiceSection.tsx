
import { BillboardBG, BillboardBG2, BillboardBG3, BillboardBG4 } from "../../../images";
import Icon from "../../../icons/billboard.png";
import "./style.css";
import { Link } from "react-router-dom";

declare interface ServicesCardProps {
    backgroundImage: string;
    icon: string;
    title: string;
    url: string;
    description: string;
}


//TODO: make service navigable
const ServiceCard: React.FC<ServicesCardProps> = (props) => {
    return (
        <Link to={`/products?product-type=${props.url}&product-category=${props.title}`}>
            <div className='service-card shadow-lg rounded-md w-[320px] h-[440px]  lg:w-[360px] lg:h-[480px]'>
                <div className="relative">
                    <div className="service-img">
                        <img src={props.backgroundImage} className="object-cover  aspect-[320/440] lg:aspect-[360/480] service-card-img" />
                    </div>
                    <div className="service-content h h-2/5 absolute bottom-0 w-9/12 text-left right-0 bg-white shadow-lg p-5 pb-8">
                        <div>
                            <img src={props.icon} className='service-icon' alt="" />
                            <h2 className="font-bold text-red mt-4">{props.title}</h2>
                            {/* <p className=' text-gray text-lg mt-6'>{props.description}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

declare interface ServiceSectionProps {
    maxService: number
};

const ServicesSection: React.FC<ServiceSectionProps> = (props) => {
    const servicesList = [
        { title: "Digital Led Board", url: "digital_led_board", image: process.env.PUBLIC_URL + "led_billboard.jpg" },
        { title: "Gantries", url: "gantries", image: process.env.PUBLIC_URL + "gantry.jpg" },
        { title: "Wall drape", url: "wall_drape", image: process.env.PUBLIC_URL + "walldrape.jpg" },
        { title: "Unipole", url: "unipole" },
        { title: "Roof Top Boards", url: "roof_top_boards" },
        { title: "Lamp Poles", url: "lamp_poles" },
        { title: "Bus Branding", url: "bus_branding", image: process.env.PUBLIC_URL + "branding.jpg" },
        { title: "Bus Shelter Branding", url: "bus_shelter_branding", image: process.env.PUBLIC_URL + "bus-shelter.jpg" }
    ];

    // FIXME: temp
    const billboardImgs = [BillboardBG, BillboardBG2, BillboardBG3, BillboardBG4]
    return (
        <div className="service-section py-12 px-6 lg:px-24 mt-12 text-center">
            <div>
                <h3 className="text-red font-medium">WHAT WE DO</h3>
                <h1 className="text-6xl font-extrabold">
                    OUR SERVICES <span className='text-red'>.</span>
                </h1>
            </div>
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-9 justify-center">
                {servicesList.map((service, index) => {
                    if (index < props.maxService) {
                        return <ServiceCard key={index} url={service.url} icon={Icon} backgroundImage={service.image ? service.image : billboardImgs[index % 4]} title={service.title.toUpperCase()} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet " />
                    }
                })
                }
            </div>
        </div >
    );
};


export default ServicesSection