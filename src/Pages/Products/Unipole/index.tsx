import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage } from "../../../Utils";

const Unipole = () => {
    const location = useLocation();

    return (
        <div>
            <PageLoading />

            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${getImage("unipole/unipole1.jpg")})` }}>
                    <div className="flex relative">
                        <div className="mx-auto container my-12 text-yellow z-10 text-center">
                            <h1 className="font-extrabold text-5xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)]">Unipole</h1>
                            {/* <div className="mt-8 relative inline-block w-10/12">
                                <input ref={searchInput} onChange={(event) => searchLocation.current = event.target.value} id="autocomplete" type="text" placeholder="Search Products Location" className="p-4 text-lg w-full text-black outline-none rounded" />

                                <SearchIcon onClick={handleSearch} className="inline right-5 absolute h-full cursor-pointer" width={30} />
                            </div> */}
                        </div>

                    </div>
                </div>

            </div>

            <div className="text-center mt-12 mb-12 md:mb-36 md:mt-24 md:px-24 px-6">
                <h1 className="text-center font-bold text-4xl">
                    Unipole
                </h1>
                <p className="mt-8 text-lg">
                    The Mega Wrap is undoubtedly the biggest wrap around board in the entire west Africa Sub-region.

                    It is located in one of the most prime spot in Lagos (Ozumba Mbadiwe Victoria Island) with an enormous visibility for brands.

                    Illumination of the board at night is second to none. Over one million traffic (human & vehicular) pass this axis weekly.

                </p>

                <div className="mt-16">
                    <Link to="/checkout" className="b bg-e_red text-white px-12 py-2 rounded">
                        Book Now
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3">
                <div className="border border-yellow relative">
                    <img src={getImage("unipole/unipole1.jpg")} alt="" className="w-full h-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-yellow bg-opacity-60">
                        <h1 className="text-lg font-bold text-white text-center">
                            Unipole

                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="border border-yellow relative">
                    <img src={getImage("unipole/unipole2.jpg")} alt="" className="w-full h-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-yellow bg-opacity-60">
                        <h1 className="text-lg font-bold text-white text-center">
                            Unipole

                        </h1>
                        <Link to="/checkout" className="px-6 py-2 rounded mt-2 bg-e_red text-white">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="border border-yellow relative">
                    <img src={getImage("unipole/unipole3.jpg")} alt="" className="w-full" />
                    <div className="transition-opacity cursor-pointer opacity-0  hover:opacity-100  flex w-full  flex-col justify-center items-center h-full absolute top-0 left-0 bg-yellow bg-opacity-60">
                        <h1 className="text-lg font-bold text-white text-center">
                            unipole

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

export default Unipole;