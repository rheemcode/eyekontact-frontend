import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage, getPath } from "../../../Utils";

const LampPoles = () => {
    const location = useLocation();

    return (
        <div>
            <PageLoading />

            <div className="">
                <div className="banner-bg" style={{ backgroundImage: `url(${getPath("/branding/branding1.jpg")})` }}>
                    <div className="flex relative">
                        <div className="mx-auto container my-12 text-yellow z-10 text-center">
                            <h1 className="font-extrabold md:text-7xl text-5xl mb-4 drop-shadow-[0_0_1px_rgba(0,0,0,1)] uppercase">Billboards</h1>
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
                            LAMP POLES ARE UNIQUE CHANNEL THAT PUT YOUR BRAND DIRECTLY IN THE FACE OF CUSTOMERS AS THEY GO ABOUT THEIR DAY.  

                        </h1>
                    </div>
                </div>

                <div className="py-24">
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                LAMP POST AT ALLEN



                            </h2>
                            <p className="mt-3">
                                LAMPPOLES ARE THE STREET POLES THAT EASILY CATCHES YOUR TARGET AUDIENCE ON THE CLEAR CONTENT OF YOUR BRAND .
                                We have these poles on both digital and static format .
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("lamppost.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                LAMP POST AT Ahmadu bello way 
                            </h2>
                            <p className="mt-3">
                                LAMPPOLES ARE THE STREET POLES THAT EASILY CATCHES YOUR TARGET AUDIENCE ON THE CLEAR CONTENT OF YOUR BRAND .
                                We have these poles on both digital and static format . The lamppoles is creative in such that you can have the material in dicut .

                            </p>
                            
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("lamppost2.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                LAMP POST AT international airport   

                            </h2>
                            <p className="mt-3">
                                LAMPPOLES ARE THE STREET POLES THAT EASILY CATCHES YOUR TARGET AUDIENCE ON THE CLEAR CONTENT OF YOUR BRAND .
                                We have these poles on both digital and static format . The lamppoles is creative in such that you can have the material in dicut .

                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("lamppost3.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                LAMP POST AT ikeja gra
                            </h2>
                            <p className="mt-3">
                                LAMPPOLES ARE THE STREET POLES THAT EASILY CATCHES YOUR TARGET AUDIENCE ON THE CLEAR CONTENT OF YOUR BRAND .
                                We have these poles on both digital and static format . The lamppoles is creative in such that you can have the material in dicut .
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("lamppost4.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                LAMP POST AT Ikorodu services lane
                            </h2>
                            <p className="mt-3">
                                LAMPPOLES ARE THE STREET POLES THAT EASILY CATCHES YOUR TARGET AUDIENCE ON THE CLEAR CONTENT OF YOUR BRAND .
                                We have these poles on both digital and static format . The lamppoles is creative in such that you can have the material in dicut .

                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("lamppost5.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                LAMP POST AT Festac
                            </h2>
                            <p className="mt-3">
                                LAMPPOLES ARE THE STREET POLES THAT EASILY CATCHES YOUR TARGET AUDIENCE ON THE CLEAR CONTENT OF YOUR BRAND .
                                We have these poles on both digital and static format . The lamppoles is creative in such that you can have the material in dicut .
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("lamppost6.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
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

export default LampPoles;