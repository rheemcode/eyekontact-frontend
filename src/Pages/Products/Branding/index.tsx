import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage } from "../../../Utils";

const Branding = () => {
    const location = useLocation();

    return (
        <div>
            <PageLoading />

            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${getImage("drape/drape1.jpg")})` }}>
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

                <div className="md:px-12 px-6">
                    <div className="md:flex md:mt-0 mt-8 items-center md:flex-row ">
                        <div className="md:w-6/12 ">
                            <h2 className="md:text-7xl text-e_red text-3xl font-bold">
                                Bus Branding
                            </h2>
                            <div className="md:mt-6 mt-2">
                                <Link to="/checkout" className="mt-6 bg-e_red text-white md:text-xl text-sm md:px-12 px-6 py-2 md:py-3 rounded">
                                    Book Now
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-6/12 md:mt-0 mt-6">
                            <div>
                                <img src={getImage("branding/branding1.jpg")} alt="" className=" object-fill shadow-lg  w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:px-12 px-6 md:mt-0 mt-6">
                    <div className="flex items-center md:flex-row flex-col-reverse md:gap-0 gap-8">
                        <div className="md:w-6/12">
                            <div>
                                <img src={getImage("branding/branding2.jpg")} alt="" className="shadow-lg w-full" />
                            </div>
                        </div>

                        <div className="md:w-6/12 md:ml-8 md:mt-0 mt-4">
                            <h2 className="md:text-7xl text-e_red text-3xl font-bold">
                                Bus Shelter Branding
                            </h2>
                            <div className="md:mt-6 mt-2">
                                <Link to="/checkout" className="mt-6 bg-e_red text-white md:text-xl text-sm md:px-12 px-6 py-2 md:py-3 rounded">
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:px-12 mb-12 px-6 md:mt-0 mt-6">
                    <div className="flex items-center md:flex-row-reverse flex-col-reverse md:gap-2 gap-8">
                        <div className="md:w-6/12">
                            <div>
                                <img src={getImage("branding/branding3.jpg")} alt="" className="shadow-lg w-full" />
                            </div>
                        </div>

                        <div className="md:w-6/12 md:ml-8 md:mt-0 mt-">
                            <h2 className="md:text-7xl text-e_red text-3xl font-bold">
                                Tricycle Branding
                            </h2>
                            <div className="md:mt-6 mt-2">
                                <Link to="/checkout" className="mt-6 bg-e_red text-white md:text-xl text-sm md:px-12 px-6 py-2 md:py-3 rounded">
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Branding;