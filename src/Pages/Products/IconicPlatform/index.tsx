import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage, getPath } from "../../../Utils";

const IconicPlatorm = () => {
    const location = useLocation();

    return (
        <div>
            <PageLoading />

            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${getPath("/branding/branding1.jpg")})` }}>
                    <div className="flex relative">
                        <div className="mx-auto container my-12 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-7xl text-5xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase">ICONIC PLATFORM</h1>
                            {/* <div className="mt-8 relative inline-block w-10/12">
                                <input ref={searchInput} onChange={(event) => searchLocation.current = event.target.value} id="autocomplete" type="text" placeholder="Search Products Location" className="p-4 text-lg w-full text-black outline-none rounded" />

                                <SearchIcon onClick={handleSearch} className="inline right-5 absolute h-full cursor-pointer" width={30} />
                            </div> */}
                        </div>

                    </div>
                </div>


                <div className="py-24">
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                MEGA WRAP AROUND ICONIC
                            </h2>
                            <p className="mt-3">
                                The <b> ICONIC </b> platform is the <b> modern</b> form of advertising which has to do with the <b> digital </b> and <b> creativity</b>  form of advertising in ooh. This kind of platform are especially made for bigger brands that know the effectiveness on their BRANDS . The most important of the iconic platform is that it must be LIT to show the beauty of the brands and tell a story of the brands . This take creativity of outdoors to another level of thinking outside the box for your client so they can reach their consumer/audience perfection on what their brands is about and what they can derive .

                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("img1.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                ELIPTICAL DIGITAL
                            </h2>
                            <p className="mt-3">
                                This is the fist and last iconic digital  sites for ooh in African .and we have it in Digital and Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . The digital is a video board that can a accommodate more than 5 brands and many content .
                            </p>
                            <p className="mt-3">
                                It is called a iconic digital board because it is a round digital board and the visibility is for close and far range from the four locations that surround the roundabout .
                            </p>
                            <p className="mt-3">
                                This is a very innovative means  of ooh ads .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("eliptical.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                ICONIC PYLON
                            </h2>
                            <p className="mt-3">
                                This is a fist and last iconic digital  sites for ooh in African .and we have it In Static . The static is only visible for just one brand and cant accommodate much content
                            </p>
                            <p className="mt-3">
                                It is called a iconic static  board because it is creative and innovative as well lit board and the visibility is for close and far range.
                            </p>
                            <p className="mt-3">
                                This is a very innovative means  of ooh ads .
                            </p>


                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("iconic-pylon.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                ICONIC ODEKU MEGA DRAPE B

                            </h2>
                            <p className="mt-3">
                                The  iconic  board is situated in the prime area of Adeola Odeku  victorial island .

                            </p>
                            <p className="mt-3">
                                It is called a iconic static board because it is innovative and creative .the visibility is for close and far range.

                            </p>
                            <p className="mt-3">
                                This is a very innovative means  of ooh ads .

                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("iconic-odeku.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                OZUMBA MBADIWE LETTERING
                            </h2>
                            <p className="mt-3">
                                This iconic innovation and top notch creative eyekontact as yet shown uniqueness showcasing our iconic acrylic lettering situated at ozumba mbadiwe , vectorial Island Lagos .Features led lightening pronouncing ;
                            </p>
                            <div className="mt-3 px-6">
                                <ol className="list-item list-decimal">
                                    <li>Exposure</li>
                                    <li>Visibility</li>
                                    <li>Uniqueness</li>
                                    <li>Huge reach of massive audience daily. This iconic site is strategically situated for brands to reach thousands of people everyday also adding aesthetic pleasure to the environment.</li>

                                </ol>
                            </div>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("ozumba-mbadiwe.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                OCTOPUS LED
                            </h2>
                            <p className="mt-3">
                                This is the fist and last iconic digital  sites for ooh in African .and we have it in Digital and Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . The digital is a video board that can a accommodate more than 5 brands and many content .
                            </p>
                            <p className="mt-3">
                                It is called a iconic digital board because it is a round digital board and the visibility is for close and far range from the four locations that surround the roundabout .
                            </p>
                            <p className="mt-3">
                                This is a very innovative means  of ooh ads .
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("octopus-led.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
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
            </div>
        </div>
    )
}

export default IconicPlatorm;