import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage, getPath } from "../../../Utils";

const Branding = () => {
    const location = useLocation();

    return (
        <div>
            <PageLoading />

            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${getPath("/branding/branding1.jpg")})` }}>
                    <div className="flex relative">
                        <div className="mx-auto container my-12 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-7xl text-5xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase">Branding</h1>
                            {/* <div className="mt-8 relative inline-block w-10/12">
                                <input ref={searchInput} onChange={(event) => searchLocation.current = event.target.value} id="autocomplete" type="text" placeholder="Search Products Location" className="p-4 text-lg w-full text-black outline-none rounded" />

                                <SearchIcon onClick={handleSearch} className="inline right-5 absolute h-full cursor-pointer" width={30} />
                            </div> */}
                        </div>

                    </div>
                </div>

                <div className="md:px-12 px-6 bg-slate-100">
                    <div className="md:pt-24 py-12">
                        <h1 className="text-e_red font-semibold uppercase md:text-4xl text-xl text-center">
                            BRANDING IS BRINGING LIGHT AND RECOGNITION TO AN ORDINARY MATERIAL TO GIVE IT A UNIQUE AND ICONIC APPEARANCE .
                        </h1>
                    </div>
                </div>
                <div className="py-6  text-center bg-slate-100">
                    <div className="text-slate-600 text-xl font-semibold">
                        BUS BRANDING • BUILDING BRANDING  • MALL BRANDING • BUS SHELTER  •  WALL MURAL
                    </div>
                </div>

                <div className="py-24">
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                HOUSE / BUILDING BRANDING
                            </h2>
                            <p className="mt-3">
                                Building/house branding can span from repainting an entire building to adding your brand name using a painting
                            </p>
                            <p className="mt-3">
                                This house branding sites for ooh . The static is only visible for just one brand and can accommodate much content .the material to be used is painting  .

                            </p>
                            <p className="mt-3">
                                It is called an iconic because it’s a branded large format ooh brand  and the visibility is for close and far range and its mainly in the market area .
                            </p>
                            <p className="mt-3">
                                This is a very innovative means  of ooh ads .
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("building-branding.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                HOUSE / BUILDING BRANDING
                            </h2>
                            <p className="mt-3">
                                Building/house branding can span from repainting an entire building to adding your brand name using a painting
                            </p>
                            <p className="mt-3">
                                This house branding sites for ooh . The static is only visible for just one brand and can accommodate much content .the material to be used is painting  .

                            </p>
                            <p className="mt-3">
                                It is called an iconic because it’s a branded large format ooh brand  and the visibility is for close and far range and its mainly in the market area .
                            </p>
                            <p className="mt-3">
                                This is a very innovative means  of ooh ads .
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("building-branding-2.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                BUS BRANDING
                            </h2>
                            <p className="mt-3">
                                Bus branding is a moving versatile outdoor channel, which gives room for a plethora of customers to engage with your brand.

                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("bus-branding.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                BUS SHELTER
                            </h2>
                            <p className="mt-3">
                                Bus shelter branding offers a unique opportunity to brands to convey their message to their customers as they begin or end their day.


                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("bus-shelter.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                MALL BRANDING
                            </h2>
                            <p className="mt-3">
                                Mall branding and static light boards are great to drive consumers to choosing your product as they shop.
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("mall-branding.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
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

export default Branding;