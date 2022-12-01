import { useEffect } from 'react';
import HomeBanner from './HomeBanner';
import WhoWeAreSection from './WhoWeAre';
import ServicesSection from '../Components/Services/ServiceSection';
import ExpertSection from '../Components/ExpertSection';
import NoticeSection from '../Components/NoticeSection';
import Footer from '../Components/Footer';
import ClientTestimonial from '../Components/Testimonial';
import BlogGridSection from '../Components/BlogInsight';
import "./style.css"
import PageLoading from '../../Components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPageAsync } from '../../features/cms/cmsSlice';
import { getIcon, getImage } from '../../Utils';
import { Link } from 'react-router-dom';

const OutdoorDisplay = () => {
    return (
        <div className="outdoor-display-section">
            <div className="py-12 lg:p-36 px-6 lg:px-52 font-extrabold text-center">
                <h1 className="text-black text-2xl md:text-4xl">
                    <span className="text-red">OUTDOOR ADVERTISING</span> IS CONTINUOUSLY CHANGING WITH THE MODERN WORLD AND NOW
                </h1>
            </div>
        </div>
    )
}





const Home = () => {

    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.homeState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => await dispatch(getPageAsync()))()
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="home" >

            <HomeBanner />
            <div className="md:py-24 py-12 bg-slate-100">
                <div className="text-center md:px-20 ">
                    <h3 className="text-zinc-600 md:text-3xl text-xl">
                        We are a value driven organisation that helps you connect with your target audience by projecting your brand in memorable ways . Our goal is to exponentially increase the reach of awareness of your brand .
                    </h3>
                </div>
                <div className="py-12 md:w-10/12 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
                        <div className='text-center'>
                            <img className='w-24 mx-auto hue-rotate-15' src={getIcon("billboard.png")} alt="" />
                            <p className="font-medium">Billboard</p>
                        </div>
                        <div className='text-center'>
                            <img className='w-24 mx-auto' src={getIcon("bus-branding.png")} alt="" />
                            <p className="font-medium">Bus branding</p>

                        </div>
                        <div className='text-center'>
                            <img className='w-24 mx-auto' src={getIcon("bus-shelter.png")} alt="" />
                            <p className="font-medium">Bus shelter</p>

                        </div>
                        <div className='text-center'>
                            <img className='w-24 mx-auto' src={getIcon("digital.png")} alt="" />
                            <p className="font-medium">Digital</p>
                        </div>
                        <div className='text-center'>
                            <img className='w-24 mx-auto' src={getIcon("lamp-pole.png")} alt="" />
                            <p className="font-medium">Lamp pole</p>

                        </div>
                        <div className='text-center'>
                            <img className='w-24 mx-auto' src={getIcon("iconic-board.png")} alt="" />
                            <p className="font-medium">Iconic board</p>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div className="md:flex">
                    <div className='md:w-6/12 px-8 py-4 self-center'>
                        <h2 className="text-3xl font-bold">
                            WHY US?
                        </h2>
                        <div className="my-6 w-32 h-[0.15rem] bg-e_blue"></div>
                        <div className="mt-6">
                            <p className="">
                                We believe in the power of OOH advertising and we will serve you the most cost effective ways to reach your target audience in strategic locations. If you have an idea that needs to be seen , or a product that needs to be sold , we can and will help.
                            </p>
                            <p className="mt-2">
                                Plan your next campaign with us.
                            </p>
                            <div className="mt-4">
                                <button className="uppercase font-bold border rounded-3xl py-2 px-12 border-e_blue text-e_blue">
                                    Our Platform
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-6/12'>
                        <div className='h-[500px]'>
                            <img className='h-full w-full object-fill' src={getImage("img1.jpg")} alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col-reverse">
                    <div className='md:w-6/12'>
                        <div className='h-[500px]'>
                            <img className='h-full w-full object-cover' src={getImage("img3.jpg")} alt="" />
                        </div>
                    </div>
                    <div className='md:w-6/12 px-8 py-4 self-center'>
                        <h2 className="text-3xl font-bold">
                            360 ADVERTISING MARKETING STRATEGY
                        </h2>
                        <div className="my-6 w-32 h-[0.15rem] bg-e_blue"></div>
                        <div className="mt-6">
                            <p className="">
                                At Eyekontact we ensure that customers have a positive experience of communication regardless of their locations , we have an overall marketing strategy that focuses on reaching the target audience from multiple platforms and channels. Our type of strategy includes both traditional marketing and digital marketing channels infused within the entire customer journey . We also play into key content like ; Media planning , media buying , Pr activation , creative design and branding .
                            </p>

                            <div className="mt-4">
                                <Link to={"/about"} className="inline-block uppercase font-bold border rounded-3xl py-2 px-12 border-e_blue text-e_blue">
                                    Why Us?
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="md:flex">
                    <div className='md:w-6/12 px-8 py-4 self-center'>
                        <h2 className="text-3xl font-bold">
                            Our Company
                        </h2>
                        <div className="my-6 w-32 h-[0.15rem] bg-e_blue"></div>
                        <div className="mt-6">
                            <p className="">
                                Eyekontact limited is one of Nigeria’s leading advertising companies which was incorporated in December 2007. We are certified by Lagos State Signage Advertising Agency [LASAA], members of Advertising Practitioner Council of Nigeria [APCON] and Advertising Association of Nigeria [OAAN].
                                We specialize in out-of-home [OOH] advertising and marketing communication which provides solutions for our customers inform of out media platforms across Nigeria.
                                We have won several awards in recognition of our innovative ideas and disruptive concepts across the country.

                            </p>

                            <div className="mt-4">
                                <Link to={"/about"} className="inline-block uppercase font-bold border rounded-3xl py-2 px-12 border-e_blue text-e_blue">
                                    About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-6/12'>
                        <div className='h-[500px]'>
                            <img className='h-full w-full object-cover' src={getImage("img1.jpg")} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12 bg-e_blue">
                <div className="text-center md:px-20 ">
                    <h3 className="text-white md:text-3xl">
                        for over two decades, we have been performing top tier service pan African providing the best outdoor advertising experience
                    </h3>
                </div>
            </div>

            <div>
                <div className='py-8 px-12 bg-slate-100'>
                    <div>
                        <h1 className="text-4xl text-e_black font-bold text-center">
                            DISRUPTIVE INNOVATION
                        </h1>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-center">
                                The iconic innovation and top notch creativity of Eyekontact as yet again shown uniqueness showcasing our iconic acrylic lettering situated at Ozumba Mbadiwe, Victoria island Lagos.
                            </h4>
                            <div className="px-4 mt-6">
                                <ol className='list-decimal text-xl font-medium space-y-3'>

                                    <div className="font-semibold">
                                        Features of Led Lightening Pronouncing are:-
                                    </div>
                                    <li>
                                        Exposure
                                    </li>
                                    <li>
                                        Visibility
                                    </li>
                                    <li>
                                        Uniqueness
                                    </li>
                                    <li>
                                        Huge reach of massive audience daily. The iconic site is strategically situated for brands to reach thousands of people everyday also adding aesthetics pleasure to the community.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold uppercase">
                            Our Clients
                        </h3>
                    </div>
                    <div className="mt-8 mdpx-8 px-4">
                        <div className="flex justify-center flex-col gap-6">
                            <div className="grid md:grid-cols-7 grid-cols-3">
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("jameson.jpg")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("mtn.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("guinness.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("cocacola.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("martel.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("friesland.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[100px] md:w-[120px]' src={getImage("jumia.png")} alt="" />
                                </div>
                            </div>
                            <div className="grid grid-cols-5 md:mt">

                                <div>
                                    <img className='w-[120px]' src={getImage("brewery.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[120px]' src={getImage("kuda.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[120px]' src={getImage("stanbic.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[120px]' src={getImage("vento.png")} alt="" />
                                </div>
                                <div>
                                    <img className='w-[120px]' src={getImage("henry.png")} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="py-8 bg-e_red">
                        <div className="text-center md:px-20 ">
                            <h1 className="text-white text-3xl font-bold">
                                Explore our Nigerian network with our Mapping Tool.

                            </h1>
                            <h3 className="text-white mt-6">
                                Our premium media network, spanning from coast-to-coast, offers coverage in the most sought after Canadian markets and enables you to reach the audience you want.
                            </h3>
                        </div>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.724506287891!2d3.3426588478755295!3d6.609634025927371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922cab41d259%3A0xdf22ddcd7d2d5032!2s49%20Adeniyi%20Jones%2C%20Ikeja%20101233%2C%20Ikeja!5e0!3m2!1sen!2sng!4v1642367344563!5m2!1sen!2sng" width="100%" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy"></iframe>
                </div>
            </div>
            {/* <div className="py-8 bg-slate-100">
                <h2 className="text-3xl text-center font-medium">

                </h2>
            </div> */}
            <div className="py-12 bg-slate-700">
                <h1 className="text-3xl font-bold text-white text-center">
                    Client Testimonies
                </h1>
                <div className="flex justify-center mt-12">
                    <div className='flex gap-12'>
                        <div className="text-center">
                            <img className="w-24 md:w-36 inline" src={getImage("award1.jpeg")} alt="" />
                            <div className="font-semibold mt-4 text-white uppercase">
                                Outdoor Company of The Year EYEKONTACT
                            </div>
                        </div>
                        <div className="text-center">
                            <img className="w-24 md:w-36 inline" src={getImage("award2.jpeg")} alt="" />
                            <div className="font-semibold mt-4 text-white uppercase">
                                Outdoor Personality of The Year EYEKONTACT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="mx-auto w-11/12 md:w-6/12">
                    <h3 className="text-3xl font-semibold text-center">
                        +234 903 1462 108
                    </h3>
                    <div className="my-6 w-4/12 mx-auto h-1 bg-e_red"></div>
                    <p className="mb-6 text-center">
                        Getting a response is easy - you can call us at +234 802 381 7414 or simply fill out the form below and we'll get back to you as soon as possible.
                    </p>
                    <div className="w-full flex flex-col gap-3">
                        <input type="text" placeholder='Full Name' className="text-sm w-full px-3 py-2 border border-slate-300 rounded" />
                        <input type="text" placeholder='Company' className="text-sm w-full px-3 py-2 border border-slate-300 rounded" />
                        <input type="text" placeholder='Title' className="text-sm w-full px-3 py-2 border border-slate-300 rounded" />
                        <input type="text" placeholder='Email' className="text-sm w-full px-3 py-2 border border-slate-300 rounded" />
                        <textarea placeholder='Subject' rows={10} className="text-sm w-full px-3 py-2 border border-slate-300 rounded"></textarea>
                        <div className="py-2 text-center">
                            <button className="bg-e_red py-2 px-8 rounded-2xl text-white font-semibold">
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}



export default Home;
