import { getImage } from "../../Utils"

const Blogs = () => {
    return (
        <div className="services">
            <div className="pt-12">
                <div className="bg bg-cover pb-48 pt-24 h-screen relative" style={{ backgroundImage: `url(${getImage("background.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="text-right">
                            <img className="inline md:w-64 w-32" src={getImage("eyekontact-logo.png")} alt="" />
                        </div>
                        <div className="mx-auto container mt-36 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-7xl text-3xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase text-white">BLOG</h1>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover md:pb-48 md:pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="mx-auto container md:mt-36 text-yellow z-10 text-center">
                            <div className="text-center">
                                <img src={getImage("blog-landing.png")} alt="" className="inline" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover pb-48 pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="mx-auto container mt-36 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-3xl text-lg mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase ">
                                We Eyekontact staff are unique team , we work hand in hand together and understand the company goal and culture  , execute  , collaborate , solve  problems, communicate and trust our team in delivering the BEST.
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="bg bg-cover md:pb-48 md:pt-24  relative before:bg-[#00EAF6] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-60" style={{ backgroundImage: `url(${getImage("background2.jpg")})` }}>
                    <div className="flex flex-col relative">
                        <div className="mx-auto container md:mt-36 text-yellow z-10 text-center">
                            <div className="text-center">
                                <img src={getImage("blog-landing-2.png")} alt="" className="inline" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Blogs