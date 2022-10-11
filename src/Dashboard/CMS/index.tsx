import { Menu, Transition } from "@headlessui/react";

import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/solid'
import { BillboardBG2, BillboardBG4, ExpertBG, LandingBG, LekkiImg, TeamBG, VictoriaIslandImg } from '../../images';
import { ProgressBar } from "../../Pages/Components/ExpertSection";
import Carousel, { CarouselItem } from "../../Components/Carousel";
import { TestimonialCard } from "../../Pages/Components/Testimonial";
import { BlogCardPlaceholder } from "../../Components/BlogCard";
import { Link } from "react-router-dom";
import React from "react";
import { SaveAsIcon, RewindIcon, PencilAltIcon } from "@heroicons/react/outline";
import { selectPageContentState, useAppDispatch, useAppSelector } from "../../hooks";
import { BlogInsightsSectionState, WorkWithUsState, BrandNoticeSectionState, ExpertSectionState, ServiceSectionState, TestimonialSectionState, WhoWeAreSectionState, HomeState, PageContent, updatePageAsync, AboutState, ContactState, ServiceState, ProductsState, getPageAsync } from "../../features/cms/cmsSlice";
import { AppStateMachine, APPURL } from "../../Utils";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "../Blog/editor";
import axios from "axios"
import toast from "react-hot-toast"

declare interface SelectPageProps {
    onChange: ({ page: string }) => void
}
const SelectPage: React.FC<SelectPageProps> = (props) => {
    return (
        <div className="w-56 text-right ml-auto">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Page
                        <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="z-20 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "home" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Home
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "about" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        About
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "contact" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Contact
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "services" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Services
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "products" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Products
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "blog" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Blog
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "tac" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Terms and Condition
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => props.onChange({ page: "privacyPolicy" })}
                                        className={`${active ? 'bg-rose-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Privacy Policy
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

declare interface PageSaveFn<T> {
    (): T;
}

declare interface ServiceSectionProps extends ServiceSectionState {
    onSave: React.MutableRefObject<PageSaveFn<ServiceSectionState> | undefined>
};

const ServiceSection = React.forwardRef<HTMLDivElement, ServiceSectionProps>((props, ref) => {

    const elRef = useRef(HTMLDivElement.prototype);

    props.onSave.current = () => {

        let pageState: ServiceSectionState = {
            heading: elRef.current.querySelector("#serviceHeading")?.innerHTML as string,
            heading2: elRef.current.querySelector("#serviceHeading2")?.innerHTML as string,
        }
        return pageState;
    }

    return (
        <div ref={elRef} className="service-section py-28 px-6 lg:px-24 mt-12 text-center">
            <div>
                <h3 id="serviceHeading" className="text-e_red font-medium" contentEditable
                    dangerouslySetInnerHTML={{ __html: props.heading }}
                />
                <h1 id="serviceHeading2" className="text-6xl font-extrabold" contentEditable
                    dangerouslySetInnerHTML={{ __html: props.heading2 }} />
            </div>
        </div>
    )
})

declare interface ExpertSectionProps extends ExpertSectionState {
    onSave: React.MutableRefObject<PageSaveFn<ExpertSectionState> | undefined>
};

const ExpertSection = React.forwardRef<HTMLDivElement, ExpertSectionProps>((props, ref) => {

    const elRef = useRef(HTMLDivElement.prototype);
    const imageInputRef = useRef(HTMLInputElement.prototype);
    const [rerender, setRerender] = useState(false);
    const imageSelected = useRef({ bg1: false, bg2: false });
    const homeBackgrounds = useRef({
        bgBase64_1: "",
        bgBase64_2: "",
        bg1FormData: new FormData(),
        bgUrl_1: "",
        bg2FormData: new FormData(),
        bgUrl_2: "",
    });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);

            reader.onload = function () {
                if (imageSelected.current.bg1) {
                    homeBackgrounds.current.bg1FormData.append("image", file, file.name);
                    homeBackgrounds.current.bgBase64_1 = reader.result as string;
                    setRerender(true);
                    setRerender(false);
                }
                else if (imageSelected.current.bg2) {
                    homeBackgrounds.current.bg2FormData.append("image", file, file.name);
                    homeBackgrounds.current.bgBase64_2 = reader.result as string;
                    setRerender(true);
                    setRerender(false);
                }
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleImageSelect = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {

        if (id == 1) {
            imageSelected.current.bg1 = true;
            imageSelected.current.bg2 = false;
        }
        else if (id == 2) {
            imageSelected.current.bg1 = false;
            imageSelected.current.bg2 = true;
        }

        imageInputRef.current.click();
    }

    props.onSave.current = () => {
        try {
            let bgUrl1 = "", bgUrl2 = "";
            (async () => {
                if (homeBackgrounds.current.bg1FormData.get("image")) {
                    const response = await axios({
                        url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                        method: "POST",
                        data: homeBackgrounds.current.bg1FormData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    });

                    bgUrl1 = response.data.default as string;
                }

                if (homeBackgrounds.current.bg2FormData.get("image")) {
                    const response = await axios({
                        url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                        method: "POST",
                        data: homeBackgrounds.current.bg2FormData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    });

                    bgUrl2 = response.data.default as string;
                }
            })()

            let pageState: ExpertSectionState = {
                heading: elRef.current.querySelector("#expertHeading")?.innerHTML as string,
                heading2: elRef.current.querySelector("#expertHeading2")?.innerHTML as string,
                description: elRef.current.querySelector("#expertDescription")?.innerHTML as string,
                design: elRef.current.querySelector("#design")?.innerHTML as string,
                strategy: elRef.current.querySelector("#strategy")?.innerHTML as string,
                planning: elRef.current.querySelector("#planning")?.innerHTML as string,
                image: bgUrl1 ? bgUrl1 : props.image,
                image2: bgUrl2 ? bgUrl2 : props.image2,
            }
            return pageState;
        }

        catch (error) {
            return {
                heading: props.heading,
                heading2: props.heading2,
                description: props.description,
                design: props.design,
                strategy: props.strategy,
                planning: props.planning,
                image: props.image,
                image2: props.image2
            }
        }

    }

    return (
        <div ref={elRef} className="expert-section">
            <div className="flex flex-col lg:flex-row">
                <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />
                <div className="lg:w-6/12 py-6 lg:py-16 left-section relative" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64_1 ? homeBackgrounds.current.bgBase64_1 : props.image})` }}>
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect(1)}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="absolute top-0 left-0 overlay"></div>
                    <div className="container py-24 relative">
                        <div className="px-12 z-10 ">
                            <h1
                                contentEditable
                                id="expertHeading"
                                className="shadow text-white text-right text-3xl lg:text-6xl font-extrabold pr-2 border-r-4"
                                dangerouslySetInnerHTML={{ __html: props.heading }}
                            />

                            <h1
                                contentEditable
                                id="expertHeading2"
                                className="text-e_red  text-right text-3xl lg:text-6xl font-extrabold pr-2 border-white border-r-4"
                                dangerouslySetInnerHTML={{ __html: props.heading2 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:w-6/12 py-16 lg:py-6 right-section relative" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64_2 ? homeBackgrounds.current.bgBase64_2 : props.image2})` }}>
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect(2)}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="absolute top-0 left-0 overlay"></div>
                    <div className="description z-10 relative container px-12 lg:px-32 py-24">
                        <div className="mb-8">
                            <h2
                                contentEditable
                                id="expertDescription"
                                className="text-2xl text-white font-medium pr-12"
                                dangerouslySetInnerHTML={{ __html: props.description }}
                            />
                        </div>

                        <div ref={null} className="grid grid-row-3 text-white">
                            <div className="col-12 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <span contentEditable id="design" className="font-medium"
                                        dangerouslySetInnerHTML={{ __html: props.design }}
                                    />
                                    <span className="font-medium">
                                        {100}%
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar percentage={30} color="" />
                                </div>
                            </div>
                            <div className="col-12 flex mt-3 flex-col justify-between">
                                <div className="flex justify-between">
                                    <span contentEditable id="strategy" className="font-medium"
                                        dangerouslySetInnerHTML={{ __html: props.strategy }}
                                    />

                                    <span className="font-medium">
                                        {60}%
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar percentage={40} color="" />
                                </div>
                            </div>
                            <div className="col-12 flex mt-3 flex-col justify-between">
                                <div className="flex justify-between">
                                    <span contentEditable id="planning" className="font-medium"
                                        dangerouslySetInnerHTML={{ __html: props.planning }}
                                    />

                                    <span className="font-medium">
                                        {78}%
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar percentage={43} color="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
})

declare interface TestimonialSectionProps extends TestimonialSectionState {
    onSave: React.MutableRefObject<PageSaveFn<TestimonialSectionState> | undefined>
};

const TestimonialSection = React.forwardRef<HTMLDivElement, TestimonialSectionProps>((props, ref) => {

    const elRef = useRef(HTMLDivElement.prototype);

    props.onSave.current = () => {

        let pageState: TestimonialSectionState = {
            heading: elRef.current.querySelector("#testimonialHeading")?.innerHTML as string,
            heading2: elRef.current.querySelector("#testimonialHeading2")?.innerHTML as string,

        }
        return pageState;
    }

    return (
        <div ref={elRef} className="client-testimonial p-12 mt-16">
            <div className="px:3 md:px-8 lg:px-24 flex">
                <div className="bg-e_red inline-block py-2 md:py-8 pl-2 md:pl-6 pr-6 md:pr-24 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-24 h-24 lg:w-40 lg:h-40" viewBox="0 0 16 16">
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                    </svg>
                </div>
                <div className="mt-12">
                    <h1
                        contentEditable
                        id="testimonialHeading"
                        className="uppercase text-xl lg:text-6xl -left-6 md:-left-24 relative font-extrabold"
                        dangerouslySetInnerHTML={{ __html: props.heading }}
                    />

                    <h1
                        contentEditable
                        id="testimonialHeading2"
                        className="uppercase text-xl lg:text-6xl -left-6 md:-left-24 relative font-extrabold"
                        dangerouslySetInnerHTML={{ __html: props.heading2 }}
                    />
                </div>
            </div>


            <div className="px:3 md:px-8 lg:px-12  mt-12 ">
                <div className="mt-5">
                    <Carousel id="testimonial">
                        <CarouselItem className="active">
                            <TestimonialCard
                                userComment='Your team is just terrific! From beginning to end, we appreciate the high level of professionalism and
                            customer service that we experienced. We work with other outdoor advertising companies but the difference
                            in your service stands far above the rest' name="Femi Ayeola" clientRole='MD, Malleable' />
                        </CarouselItem>
                        <CarouselItem className="">
                            <TestimonialCard
                                userComment='Eyekontact outdoor has been a pleasure to do business with, it isn’t easy to find such outstanding customer
                        service. They are simply awesome!
                        ' name="Razaq Rubaik" clientRole='MD, Broadcontact' />
                        </CarouselItem>
                        <CarouselItem>
                            <TestimonialCard
                                userComment='Eyekontact Outdoor has delivered on its promise of timely service. The design team is first rate and their
                            rates are very competitive. They were easy to work with and quick to respond to changes in our media
                            preference.
                        ' name=" Mr Mark Dawodu" clientRole='Insight Communications' />
                        </CarouselItem>
                    </Carousel>

                </div>
            </div>
        </div>
    )
})
declare interface BlogInsightsSectionProps extends BlogInsightsSectionState {
    onSave: React.MutableRefObject<PageSaveFn<BlogInsightsSectionState> | undefined>
};

const BlogInsightSection = React.forwardRef<HTMLDivElement, BlogInsightsSectionProps>((props, ref) => {

    const elRef = useRef(HTMLDivElement.prototype);

    props.onSave.current = () => {

        let pageState: BlogInsightsSectionState = {
            heading: elRef.current.querySelector("#insightsHeading")?.innerHTML as string,
            heading2: elRef.current.querySelector("#insightsHeading2")?.innerHTML as string,

        }
        return pageState;
    }


    return (
        <div ref={elRef} className="blog-grid py-6 mb-6">
            <div className="text-center mb-12">
                <h3
                    contentEditable
                    id="insightsHeading"
                    className="text-e_red font-medium uppercase"
                    dangerouslySetInnerHTML={{ __html: props.heading }}
                />

                <span contentEditable id="insightsHeading2" className="text-6xl font-extrabold"
                    dangerouslySetInnerHTML={{ __html: props.heading2 }}
                />

                <span className='text-6xl font-extrabold text-red'>.</span>
            </div>
            <div className="flex justify-evenly flex-col lg:flex-row px-6 lg:px-12">
                {
                    [1, 2, 3].map((el, index) => <BlogCardPlaceholder key={index} />)
                }
            </div >
        </div >
    )
})

declare interface WhoWeAreSectionProps extends WhoWeAreSectionState {
    onSave: React.MutableRefObject<PageSaveFn<WhoWeAreSectionState> | undefined>
};

const WhoWeAreSection = React.forwardRef<HTMLDivElement, WhoWeAreSectionProps>((props, ref) => {

    const elRef = useRef(HTMLDivElement.prototype);

    props.onSave.current = () => {

        let pageState: WhoWeAreSectionState = {
            heading: elRef.current.querySelector("#whoWeAreHeading")?.innerHTML as string,
            attention: elRef.current.querySelector("#whoWeAreAttention")?.innerHTML as string,
            description: elRef.current.querySelector("#whoWeAreDescription")?.innerHTML as string,
            adsPlaced: elRef.current.querySelector("#adsPlaced")?.innerHTML as string,
            monthlyReach: elRef.current.querySelector("#monthlyReach")?.innerHTML as string,
            citiesCovered: elRef.current.querySelector("#citiesCovered")?.innerHTML as string,
        }
        return pageState;
    }

    return (
        <div ref={elRef} className="who-we-are-section w-full">
            <div className="flex justify-center">
                <div className="grid md:grid-flow-row lg:grid-flow-column  drop-shadow lg:grid-cols-2 lg:w-10/12 md: sm:w-full bg-white py-12">
                    <div className="lg:px-12 md:px-3 px-3 sm:px-4 flex flex-col">
                        <h1 contentEditable id="whoWeAreHeading"
                            className="lg:text-4xl mr-4 md:text-3xl sm:text-4xl text-3xl py-6 font-extrabold mb-4"
                            dangerouslySetInnerHTML={{ __html: props.heading }}
                        />


                        <h1
                            contentEditable
                            id="whoWeAreAttention"
                            className="text-e_red lg:text-4xl mr-4 md:text-3xl sm:text-4xl text-3xl py-6 font-extrabold mb-4"
                            dangerouslySetInnerHTML={{ __html: props.attention }}
                        />

                        <div>
                            <span className="font-medium text-xl pb-1 border-b-2 border-yellow">WHO WE ARE</span>
                        </div>
                    </div>
                    <div className="lg:px-12 md:px-3 sm:px-4 px-4 flex flex-col mt-5">
                        <p
                            contentEditable
                            id="whoWeAreDescription"
                            className="py-6 text-gray"
                            dangerouslySetInnerHTML={{ __html: props.description }} />

                        <div className="flex gap-12 lg:flex-row md:flex-row sm:flex-col flex-col justify-between">
                            <div>
                                <span ref={null} className="text-4xl lg:text-3xl text-e_red font-bold">{100}K</span>
                                <p
                                    id="adsPlaced"
                                    contentEditable
                                    className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: props.adsPlaced }}
                                />
                            </div>
                            <div>
                                <span ref={null} className="text-4xl lg:text-3xl text-e_red font-bold">{100}M</span>
                                <p contentEditable id="monthlyReach" className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: props.monthlyReach }}
                                />
                            </div>
                            <div>
                                <span ref={null} className="text-4xl lg:text-3xl text-e_red font-bold">{100}+</span>
                                <p contentEditable id="citiesCovered" className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: props.citiesCovered }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
})

declare interface BrandNoticeSectionProps extends BrandNoticeSectionState {
    onSave: React.MutableRefObject<PageSaveFn<BrandNoticeSectionState> | undefined>
};

const BrandNoticeSection = React.forwardRef<HTMLDivElement, BrandNoticeSectionProps>((props, ref) => {
    const elRef = useRef(HTMLDivElement.prototype);

    props.onSave.current = () => {

        let pageState: BrandNoticeSectionState = {
            heading: elRef.current.querySelector("#noticeHeading")?.innerHTML as string,
            heading2: elRef.current.querySelector("#noticeHeading2")?.innerHTML as string,
            imageBg: "",
        }
        return pageState;
    }

    return (
        <div ref={elRef} className="py-40 notice-section relative" style={{ backgroundImage: `url(${BillboardBG4})` }}>
            <div className="overlay absolute top-0 left-0"></div>
            <div className="text-center text-white relative">
                <h1
                    contentEditable id="noticeHeading"
                    className="font-extrabold text-5xl"
                    dangerouslySetInnerHTML={{ __html: props.heading }}
                />
                <h3
                    contentEditable
                    id="noticeHeading2"
                    className="font-extrabold text-xl mt-4"
                    dangerouslySetInnerHTML={{ __html: props.heading2 }}
                />
                <Link to="#" className="py-3 px-6 bg-e_red mt-5 inline-block font-bold text-white">CONTACT US</Link>
            </div>
        </div>
    )
});

declare interface WorkWithUsSectionProps extends WorkWithUsState {
    onSave: React.MutableRefObject<PageSaveFn<WorkWithUsState> | undefined>
};

const WorkWithUsSection = React.forwardRef<HTMLDivElement, WorkWithUsSectionProps>((props, ref) => {

    const elRef = useRef(HTMLDivElement.prototype);

    props.onSave.current = () => {

        let pageState: WorkWithUsState = {
            heading: elRef.current.querySelector("#noticeHeading")?.innerHTML as string,
            heading2: elRef.current.querySelector("#noticeHeading2")?.innerHTML as string,
            phone: elRef.current.querySelector("#phone")?.innerHTML as string,
            email: elRef.current.querySelector("#email")?.innerHTML as string,
            address: elRef.current.querySelector("#address")?.innerHTML as string,
        }
        return pageState;
    }

    return (
        <div ref={elRef} className="work-with-us py-24">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-6/12 px-20">
                    <h1 contentEditable
                        id="heading"
                        className="text-white text-3xl lg:text-7xl font-extrabold text-center lg:text-left"
                        dangerouslySetInnerHTML={{ __html: props.heading }}
                    />
                </div>
                <div className="lg:w-6/12 px-20 ml text-white text-center mt-24 lg-mt-0">
                    <div className="mb-8">
                        <h1
                            contentEditable
                            id="heading2"
                            className="font-bold text-white"
                            dangerouslySetInnerHTML={{ __html: props.heading2 }}
                        />
                    </div>
                    <h1 contentEditable id="phone" className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: props.phone }}
                    />
                    <h1
                        contentEditable
                        id="email"
                        className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: props.email }}
                    />
                    <h1
                        contentEditable
                        id="address"
                        className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: props.address }}
                    />
                </div>
            </div>
        </div >
    )
});

const Home = () => {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const cmsState = useAppSelector((state) => state.pageContent);
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.homeState);
    const serviceSectionSaveFn = useRef<PageSaveFn<ServiceSectionState>>(() => pageContent.servicesSection);
    const whoWeAreSectionSaveFn = useRef<PageSaveFn<WhoWeAreSectionState>>(() => pageContent.whoWeAreSection);
    const expertSectionSaveFn = useRef<PageSaveFn<ExpertSectionState>>(() => pageContent.expertSection);
    const testimonialSectionSaveFn = useRef<PageSaveFn<TestimonialSectionState>>(() => pageContent.testimonialSection);
    const blogInsightsSectionSaveFn = useRef<PageSaveFn<BlogInsightsSectionState>>(() => pageContent.blogInsightsSection);
    const brandNoticeSectionSaveFn = useRef<PageSaveFn<BrandNoticeSectionState>>(() => pageContent.brandNoticeSection);

    const imageInputRef = useRef(HTMLInputElement.prototype);
    const imageSelected = useRef({ bg1: false, bg2: false });
    const homeBackgrounds = useRef({
        bgBase64_1: "",
        bgBase64_2: "",
        bg1FormData: new FormData(),
        bgUrl_1: "",
        bg2FormData: new FormData(),
        bgUrl_2: "",

    });

    const elRef = useRef(HTMLDivElement.prototype);

    const [rerender, setRerender] = useState(false);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);
            console.log(imageSelected.current);
            reader.onload = function () {
                if (imageSelected.current.bg1) {
                    homeBackgrounds.current.bg1FormData.append("image", file, file.name);
                    homeBackgrounds.current.bgBase64_1 = reader.result as string;
                    setRerender(true);
                    setRerender(false);
                }
                else if (imageSelected.current.bg2) {
                    homeBackgrounds.current.bg2FormData.append("image", file, file.name);
                    homeBackgrounds.current.bgBase64_2 = reader.result as string;
                    setRerender(true);
                    setRerender(false);
                }
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleSave = async () => {

        if (loading)
            return;

        try {
            setLoading(true);
            let bgUrl1 = "", bgUrl2 = "";
            if (homeBackgrounds.current.bg1FormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bg1FormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl1 = response.data.default as string;
            }

            if (homeBackgrounds.current.bg2FormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bg2FormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl2 = response.data.default as string;
            }

            const homePageContent: HomeState = {
                landingBg1: bgUrl1 ? bgUrl1 : pageContent.landingBg1,
                landingBg2: bgUrl1 ? bgUrl2 : pageContent.landingBg2,
                landingHeader1: elRef.current.querySelector("#landingHeader1")?.innerHTML as string,
                landingHeader2: elRef.current.querySelector("#landingHeader2")?.innerHTML as string,
                landingServiceLink1: elRef.current.querySelector("#serviceLink")?.innerHTML as string,
                landingServiceLink2: elRef.current.querySelector("#serviceLink2")?.innerHTML as string,
                whoWeAreSection: whoWeAreSectionSaveFn.current(),
                servicesSection: serviceSectionSaveFn.current(),
                testimonialSection: testimonialSectionSaveFn.current(),
                blogInsightsSection: blogInsightsSectionSaveFn.current(),
                expertSection: expertSectionSaveFn.current(),
                brandNoticeSection: brandNoticeSectionSaveFn.current(),
            }


            const data: PageContent = { ...webPageContent, homeState: homePageContent };
            await dispatch(updatePageAsync(data));
            toast.success("CMS edited successfully")
            setLoading(false);


        } catch (error) {
            toast.error("Error in editing CMS")
            setLoading(false);
            console.log(error)
        }
    }

    const handleImageSelect = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {

        if (id == 1) {
            imageSelected.current.bg1 = true;
            imageSelected.current.bg2 = false;
        }
        else if (id == 2) {
            imageSelected.current.bg1 = false;
            imageSelected.current.bg2 = true;
        }

        imageInputRef.current.click();
    }

    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${loading ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>
            <div className="dashboard-home" ref={elRef}>
                {/* Home Landing 1 */}
                <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />
                <div className="relative banner-bg px-2 lg:px-24" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64_1 ? homeBackgrounds.current.bgBase64_1 : pageContent.landingBg1})` }}>
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect(1)}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="flex relative">
                        <div className="pt-24 pb-32 container pl-3 lg:pl-10 text-white z-10">
                            <div className="relative lg:w-11/12 overflow-hidden">
                                <h1 id="landingHeader1" className="text-5xl lg:text-7xl font-extrabold landing-header"
                                    contentEditable
                                    dangerouslySetInnerHTML={{ __html: pageContent.landingHeader1 }} />
                                {/* Eyekontact Outdoor Advertising
                            </h1> */}
                            </div>
                            <div className="mt-12 inline-flex rounded-md shadow">
                                <a href="/services"
                                    id="serviceLink"
                                    contentEditable
                                    dangerouslySetInnerHTML={{ __html: pageContent.landingServiceLink1 }}
                                    className="inline-flex items-center justify-center px-12 py-3 text-white bg-e_red text-base font-medium"
                                />
                                {/* View Our Services
                        </a> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Home Landing 2 */}
                <div className="relative banner-bg px-2 lg:px-24 mt-6" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64_2 ? homeBackgrounds.current.bgBase64_2 : pageContent.landingBg2})` }}>
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect(2)}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="flex relative">
                        <div className="pt-24 pb-32 container pl-3 lg:pl-10 text-white z-10">
                            <div className="relative lg:w-11/12 overflow-hidden">
                                <h1 className="text-5xl lg:text-7xl font-extrabold landing-header"
                                    contentEditable
                                    id="landingHeader2"
                                    dangerouslySetInnerHTML={{ __html: pageContent.landingHeader2 }}
                                />
                                {/* We Project Exceptional Brands
                            </h1> */}
                            </div>
                            <div className="mt-12 inline-flex rounded-md shadow">
                                <a href="#"
                                    id="serviceLink2"
                                    className="inline-flex items-center justify-center px-12 py-3 text-white bg-e_red text-base font-medium"
                                    dangerouslySetInnerHTML={{ __html: pageContent.landingServiceLink2 }}
                                />
                                {/* View Our Services
                            </a> */}
                            </div>
                        </div>
                    </div>
                </div>


                <WhoWeAreSection {...pageContent.whoWeAreSection} onSave={whoWeAreSectionSaveFn} />

                {/* Service Section */}
                <ServiceSection {...pageContent.servicesSection} onSave={serviceSectionSaveFn} />

                {/* Expert Section */}
                <ExpertSection {...pageContent.expertSection} onSave={expertSectionSaveFn} />

                {/* Testimonial Section */}
                <TestimonialSection {...pageContent.testimonialSection} onSave={testimonialSectionSaveFn} />

                {/* Blog Insight Section */}
                <BlogInsightSection {...pageContent.blogInsightsSection} onSave={blogInsightsSectionSaveFn} />

                {/* Brand Notice Section */}
                <BrandNoticeSection {...pageContent.brandNoticeSection} onSave={brandNoticeSectionSaveFn} />

            </div >
        </>
    )
};

const About = () => {

    const dispatch = useAppDispatch();

    const elRef = useRef(HTMLDivElement.prototype);
    const imageInputRef = useRef(HTMLInputElement.prototype);

    const cmsState = useAppSelector((state) => state.pageContent);
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.aboutState);

    const expertSectionSaveFn = useRef<PageSaveFn<ExpertSectionState>>(() => pageContent.expertSection);
    const testimonialSectionSaveFn = useRef<PageSaveFn<TestimonialSectionState>>(() => pageContent.testimonialSection);
    const brandNoticeSectionSaveFn = useRef<PageSaveFn<BrandNoticeSectionState>>(() => pageContent.brandNoticeSection);

    const [rerender, setRerender] = useState(false);
    const imageSelected = useRef({ bg1: false, bg2: false });
    const homeBackgrounds = useRef({
        bgBase64_1: "",
        bgBase64_2: "",
        bg1FormData: new FormData(),
        bgUrl_1: "",
        bg2FormData: new FormData(),
        bgUrl_2: "",
    });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);

            reader.onload = function () {
                if (imageSelected.current.bg1) {
                    homeBackgrounds.current.bg1FormData.append("image", file, file.name);
                    homeBackgrounds.current.bgBase64_1 = reader.result as string;
                    setRerender(true);
                    setRerender(false);
                }
                else if (imageSelected.current.bg2) {
                    homeBackgrounds.current.bg2FormData.append("image", file, file.name);
                    homeBackgrounds.current.bgBase64_2 = reader.result as string;
                    setRerender(true);
                    setRerender(false);
                }
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleImageSelect = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {

        if (id == 1) {
            imageSelected.current.bg1 = true;
            imageSelected.current.bg2 = false;
        }
        else if (id == 2) {
            imageSelected.current.bg1 = false;
            imageSelected.current.bg2 = true;
        }

        imageInputRef.current.click();
    }

    const handleSave = async () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;
        try {
            let bgUrl1 = "", bgUrl2 = "";
            if (homeBackgrounds.current.bg1FormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bg1FormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl1 = response.data.default as string;
            }

            if (homeBackgrounds.current.bg2FormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bg2FormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl2 = response.data.default as string;
            }

            const aboutPageContent: AboutState = {
                whoWeAreSection: {
                    landingBg: bgUrl1 ? bgUrl1 : pageContent.whoWeAreSection.landingBg,
                    heading: elRef.current.querySelector("#aboutHeading")?.innerHTML as string,
                    description: elRef.current.querySelector("#aboutDescription")?.innerHTML as string,
                    description2: elRef.current.querySelector("#aboutDescription2")?.innerHTML as string,
                    description3: elRef.current.querySelector("#aboutDescription3")?.innerHTML as string,
                    missionHeading: elRef.current.querySelector("#missionHeading")?.innerHTML as string,
                    missionDescription: elRef.current.querySelector("#missionDescription")?.innerHTML as string,
                    coreValuesHeading: elRef.current.querySelector("#coreValuesHeading")?.innerHTML as string,
                    coreValuesDescription: elRef.current.querySelector("#coreValuesDescription")?.innerHTML as string,
                    image: bgUrl2 ? bgUrl2 : pageContent.whoWeAreSection.image
                },
                expertSection: expertSectionSaveFn.current(),
                testimonialSection: testimonialSectionSaveFn.current(),
                brandNoticeSection: brandNoticeSectionSaveFn.current(),
            }

            const data: PageContent = { ...webPageContent, aboutState: aboutPageContent };
            dispatch(updatePageAsync(data));


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>

            <div className="cms-about">
                <div className="about-landing">
                    <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />

                    <div className="banner-bg relative" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64_1 ? homeBackgrounds.current.bgBase64_1 : pageContent.whoWeAreSection.landingBg})` }}>
                        <div className="absolute top-0 left-0 z-20 p-3">
                            <button onClick={handleImageSelect(1)}>
                                <PencilAltIcon width={32} className="inline mr-2 text-white" />
                            </button>
                        </div>
                        <div className="flex relative">
                            <div className="mx-auto container my-12 text-yellow z-10 text-center">
                                <h1 className="font-extrabold text-4xl mb-4">About</h1>
                                <h1>Home &nbsp; <span className="font-extrabold">{' > '} &nbsp;</span>  About</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Us  */}
                <div ref={elRef} className="who-we-are py-12 px-6 lg:px-12">
                    <div className="flex flex-  col lg:flex-row">
                        <div className="lg:w-7/12 mb-12 lg:px-12">
                            <h1
                                contentEditable
                                id="aboutHeading"
                                className="text-e_red font-bold text-3xl mb-6"
                                dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.heading }}
                            />
                            <p contentEditable id="aboutDescription" className="text-gray mb-4"
                                dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.description }}
                            />

                            <p contentEditable id="aboutDescription2" className="text-gray mb-6"
                                dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.description2 }}
                            />

                            <p contentEditable id="aboutDescription3" className="text-gray"
                                dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.description3 }}
                            />

                            <a href="#" className="py-2 px-6 bg-e_red mt-5 inline-block font-bold text-white">GET IN TOUCH</a>
                            <div className="flex mt-12 flex-col lg:flex-row">
                                <div className="mission pr-4">
                                    <h2 contentEditable id="missionHeading" className="font-bold text-xl mb-3"
                                        dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.missionHeading }}
                                    />

                                    <p contentEditable id="missionDescription" className="text-gray"
                                        dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.missionDescription }}
                                    />

                                </div>
                                <div className="core-values pr-4">
                                    <h2 contentEditable id="coreValuesHeading" className="font-bold text-xl mb-3"
                                        dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.coreValuesHeading }}
                                    />

                                    <p contentEditable id="coreValuesDescription" className="text-gray"
                                        dangerouslySetInnerHTML={{ __html: pageContent.whoWeAreSection.coreValuesDescription }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="lg:w-5/12">
                            <div className="h-full relative">
                                <div className="absolute top-0 left-0 z-20 p-3">
                                    <button onClick={handleImageSelect(2)}>
                                        <PencilAltIcon width={32} className="inline mr-2 text-white" />
                                    </button>
                                </div>
                                <img id="aboutImage" src={`${homeBackgrounds.current.bgBase64_2 ? homeBackgrounds.current.bgBase64_2 : pageContent.whoWeAreSection.image}`} className="h-full" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expert Section */}
                <ExpertSection {...pageContent.expertSection} onSave={expertSectionSaveFn} />

                {/* Testimonial Section */}
                <TestimonialSection {...pageContent.testimonialSection} onSave={testimonialSectionSaveFn} />

                {/* Brand Notice Section */}
                <BrandNoticeSection {...pageContent.brandNoticeSection} onSave={brandNoticeSectionSaveFn} />
            </div >
        </>
    )
}

const Contact = () => {

    const dispatch = useAppDispatch();

    const cmsState = useAppSelector((state) => state.pageContent);
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.contactState);

    const elRef = useRef(HTMLDivElement.prototype);
    const imageInputRef = useRef(HTMLInputElement.prototype);
    const [rerender, setRerender] = useState(false);
    const homeBackgrounds = useRef({
        bgBase64: "",
        bgFormData: new FormData(),
    });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);

            reader.onload = function () {
                homeBackgrounds.current.bgFormData.append("image", file, file.name);
                homeBackgrounds.current.bgBase64 = reader.result as string;
                setRerender(true);
                setRerender(false);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleImageSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        imageInputRef.current.click();
    }

    const handleSave = async () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;
        try {
            let bgUrl = "";
            if (homeBackgrounds.current.bgFormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bgFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl = response.data.default as string;
            };

            const contactPageContent: ContactState = {
                landingBg: bgUrl ? bgUrl : pageContent.landingBg,
                contactFormState: {
                    heading: elRef.current.querySelector("#contactHeading")?.innerHTML as string,
                    addressHeading: elRef.current.querySelector("#addressHeading")?.innerHTML as string,
                    phoneHeading: elRef.current.querySelector("#phoneHeading")?.innerHTML as string,
                    officeHeading: elRef.current.querySelector("#officeHeading")?.innerHTML as string,
                    emailHeading: elRef.current.querySelector("#emailHeading")?.innerHTML as string,
                    addressDescription: elRef.current.querySelector("#addressDescription")?.innerHTML as string,
                    phoneDescription: elRef.current.querySelector("#phoneDescription")?.innerHTML as string,
                    officeDescription: elRef.current.querySelector("#officeDescription")?.innerHTML as string,
                    emailDescription: elRef.current.querySelector("#emailDescription")?.innerHTML as string,
                }
            }

            const data: PageContent = { ...webPageContent, contactState: contactPageContent };
            dispatch(updatePageAsync(data));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>

            <div className="cms-contact">
                <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />

                <div className="contact-landing relative">
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="banner-bg" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64 ? homeBackgrounds.current.bgBase64 : pageContent.landingBg})` }}>
                        <div className="flex relative">
                            <div className="mx-auto container my-12 text-yellow z-10 text-center">
                                <h1 className="font-extrabold text-4xl mb-4">Contact</h1>
                                <h1>Home &nbsp; <span className="font-extrabold">{' > '} &nbsp;</span>  Contact</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <div className="py-24 lg:px-12 px-2">
                        <div className="flex px-6 lg:px-16 flex-col lg:flex-row">
                            <div className="w-full lg:w-6/12">
                                <div>
                                    <h1
                                        contentEditable
                                        id="contactHeading"
                                        className="text-5xl font-bold border-r-4 border-red"
                                        dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.heading }}
                                    />
                                </div>
                                <div className=" grid grid-flow-row lg:grid-flow-col grid-cols-2 grid-rows-2 gap-12 mt-12">
                                    <div>
                                        <h1 contentEditable id="addressHeading" className="mb-4 font-medium"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.addressHeading }}
                                        />
                                        <p contentEditable id="addressDescription" className="text-gray"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.addressDescription }}
                                        />

                                    </div>
                                    <div>
                                        <h1
                                            contentEditable
                                            id="phoneHeading"
                                            className="mb-4 font-medium"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.phoneHeading }}
                                        />

                                        <p
                                            contentEditable id="phoneDescription" className="text-gray"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.phoneDescription }}
                                        />
                                    </div>
                                    <div>
                                        <h1
                                            contentEditable
                                            id="officeHeading"
                                            className="mb-4 font-medium"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.officeHeading }}
                                        />
                                        <p contentEditable id="officeDescription"
                                            className="text-gray"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.officeDescription }}
                                        />
                                    </div>
                                    <div>
                                        <h1
                                            contentEditable
                                            id="emailHeading"
                                            className="mb-4 font-medium"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.emailHeading }}
                                        />
                                        <p contentEditable id="emailDescription" className="text-gray"
                                            dangerouslySetInnerHTML={{ __html: pageContent.contactFormState.emailDescription }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 lg:p-6">
                                <div className="contact-form-container">
                                    <form action="#" method="post">
                                        <div className="">
                                            <div className="flex flex-col lg:flex-row">
                                                <div className="w-full lg:w-6/12">
                                                    <input type="text" name="name" placeholder="Full Name" className="w-full lg:w-11/12 py-6 border-0 outline-none border-b border-x-gray-dark" />
                                                </div>
                                                <div className="w-full lg:w-6/12">
                                                    <input type="email" name="email" placeholder="Email" className="w-full py-6 border-0 outline-none border-b border-x-gray-dark" />
                                                </div>
                                            </div>
                                            <div className="flex mt-6 flex-col lg:flex-row">
                                                <div className="w-full lg:w-6/12">
                                                    < input type="phone" name="phone" placeholder="Phone" className="w-full lg:w-11/12 py-6 border-0 outline-none border-b border-x-gray-dark" />
                                                </div>
                                                <div className="w-full lg:w-6/12">
                                                    <input type="text" name="name" placeholder="" className="w-full py-6 border-0 outline-none border-b border-x-gray-dark" />
                                                </div>
                                            </div>
                                            <div className="flex mt-6">
                                                <div className="w-full">
                                                    <textarea cols={2} rows={2} name="message" placeholder="Message" className="w-full py-6 border-0 outline-none border-b border-x-gray-dark" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

const Services = () => {

    const dispatch = useAppDispatch();

    const cmsState = useAppSelector((state) => state.pageContent);
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.servicesState)
    const workWithUsSectionSaveFn = useRef<PageSaveFn<WorkWithUsState>>(() => pageContent.workWithUsSectionState);

    const elRef = useRef(HTMLDivElement.prototype);
    const imageInputRef = useRef(HTMLInputElement.prototype);
    const [rerender, setRerender] = useState(false);
    const homeBackgrounds = useRef({
        bgBase64: "",
        bgFormData: new FormData(),
    });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);

            reader.onload = function () {
                homeBackgrounds.current.bgFormData.append("image", file, file.name);
                homeBackgrounds.current.bgBase64 = reader.result as string;
                setRerender(true);
                setRerender(false);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleImageSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        imageInputRef.current.click();
    }

    const handleSave = async () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;
        try {
            let bgUrl = "";
            if (homeBackgrounds.current.bgFormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bgFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl = response.data.default as string;
            };

            const servicePageContent: ServiceState = {
                landingBg: bgUrl ? bgUrl : pageContent.landingBg,
                workWithUsSectionState: workWithUsSectionSaveFn.current()
            }

            const data: PageContent = { ...webPageContent, servicesState: servicePageContent };
            dispatch(updatePageAsync(data));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>
            <div className="cms-services">
                <div className="services-landing relative">
                    <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="banner-bg" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64 ? homeBackgrounds.current.bgBase64 : pageContent.landingBg})` }}>
                        <div className="flex relative">
                            <div className="mx-auto container my-12 text-yellow z-10 text-center">
                                <h1 className="font-extrabold text-4xl mb-4">Services</h1>
                                <h1>Home &nbsp; <span className="font-extrabold">{' > '} &nbsp;</span>  Services</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <WorkWithUsSection {...pageContent.workWithUsSectionState} onSave={workWithUsSectionSaveFn} />
            </div>
        </>
    )
}

const Products = () => {

    const dispatch = useAppDispatch();

    const cmsState = useAppSelector((state) => state.pageContent);
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.productsState)
    const workWithUsSectionSaveFn = useRef<PageSaveFn<WorkWithUsState>>(() => pageContent.workWithUsSectionState);

    const elRef = useRef(HTMLDivElement.prototype);
    const imageInputRef = useRef(HTMLInputElement.prototype);
    const [rerender, setRerender] = useState(false);
    const homeBackgrounds = useRef({
        bgBase64: "",
        bgFormData: new FormData(),
    });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);

            reader.onload = function () {
                homeBackgrounds.current.bgFormData.append("image", file, file.name);
                homeBackgrounds.current.bgBase64 = reader.result as string;
                setRerender(true);
                setRerender(false);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleImageSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        imageInputRef.current.click();
    }

    const handleSave = async () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;
        try {
            let bgUrl = "";
            if (homeBackgrounds.current.bgFormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bgFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl = response.data.default as string;
            };

            const productsPageContent: ProductsState = {
                landingBg: bgUrl ? bgUrl : pageContent.landingBg,
                workWithUsSectionState: workWithUsSectionSaveFn.current()
            }

            const data: PageContent = { ...webPageContent, productsState: productsPageContent };
            dispatch(updatePageAsync(data));

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>
            <div className="cms-services">
                <div className="services-landing relative">
                    <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="banner-bg" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64 ? homeBackgrounds.current.bgBase64 : pageContent.landingBg})` }}>
                        <div className="flex relative">
                            <div className="mx-auto container my-12 text-yellow z-10 text-center">
                                <h1 className="font-extrabold text-4xl mb-4">Products</h1>
                                <h1>Home &nbsp; <span className="font-extrabold">{' > '} &nbsp;</span>  Products</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <WorkWithUsSection {...pageContent.workWithUsSectionState} onSave={workWithUsSectionSaveFn} />
            </div>
        </>
    )
}

const TAC = () => {
    const dispatch = useAppDispatch();
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.tac)
    const cmsState = useAppSelector((state) => state.pageContent);
    const [editor, setEditor] = useState({ current: ClassicEditor.prototype });

    const handleSave = () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;

        try {
            const data: PageContent = { ...webPageContent, tac: editor.current.getData() };
            dispatch(updatePageAsync(data));
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>
            <div className="p-">
                <Editor editor={setEditor} data={pageContent} />
            </div>
        </>
    )
}

const PrivacyPolicy = () => {
    const dispatch = useAppDispatch();
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.privacyPolicy)
    const cmsState = useAppSelector((state) => state.pageContent);
    const [editor, setEditor] = useState({ current: ClassicEditor.prototype });

    const handleSave = () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;

        try {
            const data: PageContent = { ...webPageContent, privacyPolicy: editor.current.getData() };
            dispatch(updatePageAsync(data));
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>
            <div className="p-">
                <Editor editor={setEditor} data={pageContent} />
            </div>
        </>
    )
}


const Blog = () => {
    const dispatch = useAppDispatch();

    const cmsState = useAppSelector((state) => state.pageContent);
    const webPageContent = useAppSelector(selectPageContentState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.blogState)
    const workWithUsSectionSaveFn = useRef<PageSaveFn<WorkWithUsState>>(() => pageContent.workWithUsSectionState);

    const elRef = useRef(HTMLDivElement.prototype);
    const imageInputRef = useRef(HTMLInputElement.prototype);
    const [rerender, setRerender] = useState(false);
    const homeBackgrounds = useRef({
        bgBase64: "",
        bgFormData: new FormData(),
    });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);

            reader.onload = function () {
                homeBackgrounds.current.bgFormData.append("image", file, file.name);
                homeBackgrounds.current.bgBase64 = reader.result as string;
                setRerender(true);
                setRerender(false);
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handleImageSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        imageInputRef.current.click();
    }

    const handleSave = async () => {
        if (cmsState.state === AppStateMachine.Pending)
            return;
        try {
            let bgUrl = "";
            if (homeBackgrounds.current.bgFormData.get("image")) {
                const response = await axios({
                    url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                    method: "POST",
                    data: homeBackgrounds.current.bgFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                bgUrl = response.data.default as string;
            };

            const blogPageContent: ServiceState = {
                landingBg: bgUrl ? bgUrl : pageContent.landingBg,
                workWithUsSectionState: workWithUsSectionSaveFn.current()
            }

            const data: PageContent = { ...webPageContent, blogState: blogPageContent };
            dispatch(updatePageAsync(data));

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="mb-4">
                <button onClick={handleSave} className={`bg-rose-600 px-4 py-2 mr-4 text-white ${cmsState.state == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>

                    <SaveAsIcon width={16} className="inline mr-2" />
                    Save
                </button>
                {/* <button className="bg-rose-600 px-4 py-2 text-white" >
                    <RewindIcon width={16} className="inline mr-2" />
                    Reset
                </button> */}
            </div>
            <div className="cms-services">
                <div className="services-landing relative">
                    <input className="hidden" ref={imageInputRef} type="file" name="imageInput" id="" accept="image/*" onChange={handleFileInput} />
                    <div className="absolute top-0 left-0 z-20 p-3">
                        <button onClick={handleImageSelect}>
                            <PencilAltIcon width={32} className="inline mr-2 text-white" />
                        </button>
                    </div>
                    <div className="banner-bg" style={{ backgroundImage: `url(${homeBackgrounds.current.bgBase64 ? homeBackgrounds.current.bgBase64 : pageContent.landingBg})` }}>
                        <div className="flex relative">
                            <div className="mx-auto container my-12 text-yellow z-10 text-center">
                                <h1 className="font-extrabold text-4xl mb-4">Blog</h1>
                                <h1>Home &nbsp; <span className="font-extrabold">{' > '} &nbsp;</span>  Blog</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <WorkWithUsSection {...pageContent.workWithUsSectionState} onSave={workWithUsSectionSaveFn} />
            </div>
        </>
    )
}




const DashboardCMS = () => {

    const [activePage, setActivePage] = useState({ page: "home" });
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => await dispatch(getPageAsync()))()
    })

    return (
        <div className="dashboard-cms py-4 px-6">
            <div className="px-4">
                <h1 className="font-medium text-xl">
                    CMS
                </h1>
            </div>

            <div className="bg-white rounded-lg border border-gray-light p-4">
                <div className="mb-4 z-50">
                    <SelectPage onChange={setActivePage} />
                </div>

                {activePage.page === "home" && <Home />}
                {activePage.page === "about" && <About />}
                {activePage.page === "contact" && <Contact />}
                {activePage.page === "services" && <Services />}
                {activePage.page === "products" && <Products />}
                {activePage.page === "blog" && <Blog />}
                {activePage.page === "tac" && <TAC />}
                {activePage.page === "privaryPolicy" && <PrivacyPolicy />}

            </div>
        </div>
    )
}

export default DashboardCMS;