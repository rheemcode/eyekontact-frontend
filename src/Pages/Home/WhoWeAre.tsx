import React, { useEffect, useRef, useState } from "react";
import { WhoWeAreSectionState } from "../../features/cms/cmsSlice";
import { EventHandler, isInViewport } from "../../Utils";


window.addEventListener("scroll", EventHandler.callEvents)

const WhoWeAreSection: React.FC<WhoWeAreSectionState> = (props) => {
    const adsPlacedRef = useRef(HTMLSpanElement.prototype);
    const monthlyReachRef = useRef(HTMLSpanElement.prototype);
    const citiesCoveredRef = useRef(HTMLSpanElement.prototype);

    let start = 0;
    let frame = 0;
    const [adsPlacedMax, monthlyReachMax, citiesCoveredMax] = [450, 85, 25];
    let previousTimeStep = 0;

    const onscroll = () => {
        if (!start) {
            if (isInViewport(adsPlacedRef.current)) {
                requestAnimationFrame(((e) => animate)());
            }
        }
    }


    const [count, setCount] = useState({ adsPlaced: 150, monthlyReach: 0, citiesCovered: 0 })

    const animate = (timestep: number) => {
        if (!start) {
            start = timestep;
        }

        const elaspsedTime = timestep - start;

        let delta = timestep - frame;

        if (delta > 60) {
            frame = timestep;

            if (previousTimeStep !== timestep) {
                setCount((initialState) => {
                    var newState = {
                        ...initialState,
                        adsPlaced: Math.min((initialState.adsPlaced += 10), adsPlacedMax),
                        monthlyReach: Math.min((++initialState.monthlyReach), monthlyReachMax),
                        citiesCovered: Math.min((++initialState.citiesCovered), citiesCoveredMax)
                    }
                    return newState;
                });


            }
        }



        if (elaspsedTime < 10000) {
            previousTimeStep = timestep;
            requestAnimationFrame(animate)
        }
    }


    useEffect(() => {
        start = 0;
        previousTimeStep = 0;
        EventHandler.subscribe({ name: "animateOnScroll", fn: onscroll, type: "scroll" })

        return () => {
            EventHandler.unsubscribe({ name: "animateOnScroll", fn: onscroll, type: "scroll" })
        }
    }, []);


    return (
        <div className="who-we-are-section w-full">
            <div className="flex justify-center">
                <div className="grid md:grid-flow-row lg:grid-flow-column  drop-shadow lg:grid-cols-2 lg:w-10/12 md: sm:w-full bg-white py-12">
                    <div className="lg:px-12 md:px-3 px-3 sm:px-4 flex flex-col">
                        <h1 id="whoWeAreHeading"
                            className="lg:text-4xl mr-4 md:text-3xl sm:text-4xl text-3xl py-6 font-extrabold"
                            dangerouslySetInnerHTML={{ __html: props.heading }}
                        />
                        <h1

                            id="whoWeAreAttention"
                            className="text-red lg:text-4xl mr-4 md:text-3xl sm:text-4xl text-3xl pb-4 font-extrabold mb-4"
                            dangerouslySetInnerHTML={{ __html: props.attention }}
                        />
                        <div>
                            <span className="font-medium text-xl pb-1 border-b-2 border-yellow">WHO WE ARE</span>
                        </div>
                    </div>
                    <div className="lg:px-12 md:px-3 sm:px-4 px-4 flex flex-col mt-5">
                        <p

                            id="whoWeAreDescription"
                            className="py-6 text-gray"
                            dangerouslySetInnerHTML={{ __html: props.description }} />
                        <div className="flex gap-12 lg:flex-row md:flex-row sm:flex-col flex-col justify-between">
                            <div>
                                <span ref={adsPlacedRef} className="text-4xl lg:text-3xl text-red font-bold">{count.adsPlaced}K</span>
                                <p
                                    id="adsPlaced"

                                    className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: props.adsPlaced }}
                                />
                            </div>
                            <div>
                                <span ref={monthlyReachRef} className="text-4xl lg:text-3xl text-red font-bold">{count.monthlyReach}M</span>
                                <p id="monthlyReach" className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: props.monthlyReach }}
                                />
                            </div>
                            <div>
                                <span ref={citiesCoveredRef} className="text-4xl lg:text-3xl text-red font-bold">{count.citiesCovered}+</span>
                                <p id="citiesCovered" className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: props.citiesCovered }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default WhoWeAreSection;