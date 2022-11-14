import { Link, useLocation } from "react-router-dom";
import PageLoading from "../../../Components/Loader"
import { getImage, getPath } from "../../../Utils";

const DigitalBillboard = () => {
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
                            WE DEPLOY CAMPAIGNS ON ALL TYPES OF BILLBOARDS CHANNEL ACROSS 25 CITES IN NIGERIA
                        </h1>
                    </div>
                </div>

                <div className="py-24">
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                GANTRY STATIC  BILLBOARD  at allen avenue intersection
                            </h2>
                            <p className="mt-3">
                                This is a Gantry board and we have it in Digital and Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . The digital is a video board that can a accommodate more than 5 brands and many content .
                            </p>
                            <p className="mt-3">
                                It is called a gantry board because is across the road of more than a lane .which shows visibility to every cars coming across the lanes .
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
                                <img src={getImage("gantry-static.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                FENCE MOUNT BILLBOARD at admadu bello way v.i
                            </h2>
                            <p className="mt-3">
                                This is a FENCE MOUNT  board and we have it in Digital and Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . The digital is a video board that can  accommodate more than 5 brands and many content .
                            </p>
                            <p className="mt-3">
                                It is called a Wall/Fence  mount  board because is attached to the wall/fence and the visibility spread across more than one location.
                            </p>
                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("fence.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                BACKLIT/LIGHT BOX BILLBOARD at Mobolaji Bank Anthony way ,ikeja .

                            </h2>
                            <p className="mt-3">
                                This is Backlit/Light box  board and we have it in Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . We don’t  have it in digital because it has to be lit and it is small in sizes .
                            </p>
                            <p className="mt-3">
                                It is called Backlit/Light box  because it is construct in a box form and it has light inside . This platform was in the era of traditional means of ooh when they do ‘sheet ‘ of billboards platform before some creative people start giving ideas of the regular platform we have now .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("backlit.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                UNIPOLE
                            </h2>
                            <p className="mt-3">
                                This is a UNIPOLE board and we have it in Digital and Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . The digital is a video board that can a accommodate more than 5 brands and many content .
                            </p>
                            <p className="mt-3">
                                It is called a Unipole board because it has a pole and is landscape and the visibility is at both close and far range across more than two locations/road and as well on bridges . It is tall and can be visible to audience that are very far away from the board .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("unipole.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                BRIDGE PANEL BRANDING
                            </h2>
                            <p className="mt-3">
                                This is a Bridge panel board and we have it in Static only . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . This is visible for audience that are closer and audience that view from far range .it is called bridge panel because its attached to the bridge . Assumption; We only have static for this platform because of the electrical risk . The LASAA has not approved for digital on this platform .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("mall-branding.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                ROOFTOP
                            </h2>
                            <p className="mt-3">
                                This is a ROOFTOP board and we have it in Digital and Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . The digital is a video board that can a accommodate more than 5 brands and many content .
                            </p>
                            <p className="mt-3">
                                It is called a Rooftop board because it on a roof  and the visibility is at both close and far range across more than two locations/road and as well on bridges . It is tall and can be visible to audience that are very far away from the board .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("rooftop.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                WALL DRAPE BOARD
                            </h2>
                            <p className="mt-3">
                                This is a Wall drape  board and we have it in Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . We don’t have it in digital due to the electrical risk.

                            </p>
                            <p className="mt-3">
                                It is called a Wallldrape because it attached to the wall and the visibility is at both close and far range across two lane . It is always in a big sizes .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("walldrape-board.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                EYECATCHER BOARD
                            </h2>
                            <p className="mt-3">
                                This is an Eyecatcher board and we have it in Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . We don’t have it in digital because it only small sizes because it is limited to one lane and majority of it is for government to describe an axis's.
                            </p>
                            <p className="mt-3">
                                It is called an Eyecatcher  because it catches straight to the audience  eyes  at both close and far range across one or two lane  lane . It is always  small sizes .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("eyecatcher.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                EYECATCHER BOARD
                            </h2>
                            <p className="mt-3">
                                This is an Eyecatcher board and we have it in Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . We don’t have it in digital because it only small sizes because it is limited to one lane and majority of it is for government to describe an axis's.
                            </p>
                            <p className="mt-3">
                                It is called an Eyecatcher  because it catches straight to the audience  eyes  at both close and far range across one or two lane  lane . It is always  small sizes .
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("eyecatcher.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row-reverse flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                96 SHEET
                            </h2>
                            <p className="mt-3">
                                This is 96 Sheet  board and we have it in Static and digital/Ultra wave  . The static is only visible for just one brand and the digital and ultrawave  can accommodate more than one brand . We don’t have it in digital because it is big in sizes .people came up with a creative idea to invent it and turn it from tradition to modern.
                            </p>
                            <p className="mt-3">
                                It is called  96 Sheet because it is the largest sheet of ooh platform. This platform was in the era of traditional means of ooh when they do ‘sheet ‘ of billboards platform before some creative people start giving ideas of the regular platform we have now . The 48 sheet and 96 sheet is the surviving  platform of  the era.
                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("sheet.jpg")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col gap-8">
                        <div className="md:w-6/12 px-4">
                            <h2 className="md:text-3xl text-lg md:font-bold">
                                48 SHEET
                            </h2>
                            <p className="mt-3">
                                This is 48 Sheet  board and we have it in Static . The static is only visible for just one brand and cant accommodate much content .the material to be used is flex . We don’t have it in digital because it only small sizes because it is limited to one lane visibility

                            </p>
                            <p className="mt-3">
                                It is called 48 Sheet because it is the smallest sheet of ooh platform. This platform was in the era of traditional means of ooh when they do ‘sheet ‘ of billboards platform before some creative people start giving ideas of the regular platform we have now . The 48 sheet and 96 sheet is the surviving  platform of  the era.

                            </p>

                        </div>
                        <div className="md:w-6/12">
                            <div className="w-full h-full max-h-[450px] overflow-y-hidden">
                                <img src={getImage("sheet-2.png")} alt="" className="shadow-lg rounded-lg w-full h-full object-fill" />
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

export default DigitalBillboard;