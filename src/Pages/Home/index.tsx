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
            <PageLoading />
            <HomeBanner />
            <WhoWeAreSection {...pageContent.whoWeAreSection} />
            <ServicesSection maxService={3} />
            <ExpertSection {...pageContent.expertSection} />
            <ClientTestimonial {...pageContent.testimonialSection} />
            <BlogGridSection {...pageContent.blogInsightsSection} />
            <NoticeSection {...pageContent.brandNoticeSection} />
        </div >
    );
}



export default Home;
