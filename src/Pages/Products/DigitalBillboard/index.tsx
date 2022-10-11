import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage } from "../../../Utils";

const DigitalBillboard = () => {
    const location = useLocation();

    return (
        <div>
            <PageLoading />

            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${getImage("led_billboard.jpg")})` }}>
                    <div className="flex relative">
                        <div className="mx-auto container my-12 text-yellow z-10 text-center">
                            <h1 className="font-extrabold text-5xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)]">Digital Billboard</h1>
                            {/* <div className="mt-8 relative inline-block w-10/12">
                                <input ref={searchInput} onChange={(event) => searchLocation.current = event.target.value} id="autocomplete" type="text" placeholder="Search Products Location" className="p-4 text-lg w-full text-black outline-none rounded" />

                                <SearchIcon onClick={handleSearch} className="inline right-5 absolute h-full cursor-pointer" width={30} />
                            </div> */}
                        </div>

                    </div>
                </div>


                <div className="text-center mt-12 mb-12 lg:mb-36 lg:mt-24 lg:px-24 px-6">
                    <h1 className="text-center font-bold text-4xl">
                        Digital Led Billboard
                    </h1>
                    <p className="mt-8 text-lg">
                        The Digital LED board is situated in a prime area of  Lekki –Ikoyi Corridor opposite he Admiralty Roundabout facing traffic from Lekki phase one,  Admiralty, Lekki Cable bridge and more.
                    </p>
                    <p className="mt-4 text-lg">
                        The LED board is is sized at 20m(W) x 4cm (H)
                    </p>

                    <div className="mt-8">
                        <h6 className="font-bold text-2xl text-left">
                            VALUE PROPOSITION
                        </h6>
                        <div className="mt-6 text-left">
                            <ul>
                                <li className="list-inside list-disc">
                                    Over 8.5% of premium captive audiences are reached.

                                </li>
                                <li className="list-inside list-disc">
                                    These platforms guarantees day and night visibility
                                    of your  campaign with high resolution.
                                </li>
                                <li className="list-inside list-disc">
                                    Flexibility in usage, rate, and immensely effective.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16">
                        <Link to="/checkout" className="b bg-e_red text-white px-12 py-2 rounded">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>


            <div className="mt-8 grid md:grid-cols-3">
                <div className="border border-yellow relative">
                    <img src={getImage("billboard/lekki1.jpg")} alt="" className="w-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-e_red bg-opacity-30">
                        <h1 className="text-lg font-bold text-white text-center">
                            DIGITAL LED BILLBOARD BY LEKKI/IKOYI LINK BRIDGE, LEKKI
                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="border border-yellow relative">
                    <img src={getImage("billboard/lekki2.jpg")} alt="" className="w-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-e_red bg-opacity-30">
                        <h1 className="text-lg font-bold text-white text-center">
                            DIGITAL LED BILLBOARD BY LEKKI/IKOYI LINK BRIDGE, LEKKI
                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="border border-yellow relative">
                    <img src={getImage("billboard/lekki3.jpg")} alt="" className="w-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-e_red bg-opacity-30">
                        <h1 className="text-lg font-bold text-white text-center">
                            DIGITAL LED BILLBOARD BY LEKKI/IKOYI LINK BRIDGE, LEKKI
                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2">
                <div className="border border-yellow relative">
                    <img src={getImage("billboard/lekki4.jpg")} alt="" className="w-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-e_red bg-opacity-30">
                        <h1 className="text-lg font-bold text-white text-center">
                            DIGITAL LED BILLBOARD BY LEKKI/IKOYI LINK BRIDGE, LEKKI
                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="border border-yellow relative">
                    <img src={getImage("billboard/lekki5.jpg")} alt="" className="w-full h-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-e_red bg-opacity-30">
                        <h1 className="text-lg font-bold text-white text-center">
                            DIGITAL LED BILLBOARD BY LEKKI/IKOYI LINK BRIDGE, LEKKI
                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DigitalBillboard;