import { useEffect, useRef, useState } from "react";
import { ExpertSectionState } from "../../features/cms/cmsSlice";
import { ExpertBG, TeamBG } from "../../images";
import { isInViewport, EventHandler } from "../../Utils";

declare interface ExpertSectionProps {
    className?: string
    backgroundImage?: string;

}

declare interface ProgressBarProps {
    percentage: string | number;
    color: string;
}


//TODO move to file
export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    return (
        <div className="progress w-full bg-white" style={{ height: "6px" }}>
            <div className="proress-bar bg-e_blue h-full" style={{ transition: "width 0.3s ease-out", width: `${props.percentage}%`, backgroundColor: props.color }}></div>
        </div>
    )
}

const ExpertSection: React.FC<ExpertSectionState> = (props) => {

    const [designMax, strategyMax, planningMax] = [100, 100, 100];
    const [percentages, setPercentages] = useState({ design: 99, strategy: 99, planning: 99 });
    const ref = useRef(HTMLDivElement.prototype);
    let start = 0;
    let frame = 0;
    let previousTimeStep = 0;

    const onscroll = () => {
        if (!start) {
            if (isInViewport(ref.current)) {
                requestAnimationFrame(((e) => animate)());
            }
        }
    }
    const animate = (timestep: number) => {
        if (!start) {
            start = timestep;
        }

        const elaspsedTime = timestep - start;
        let delta = timestep - frame;

        if (delta > 60) {
            frame = timestep;
            if (previousTimeStep !== timestep) {
                setPercentages((initialState) => {
                    return {
                        ...initialState,
                        design: Math.min(++initialState.design + Math.floor((Math.random() * 4)), designMax),
                        strategy: Math.min(++initialState.strategy + Math.floor((Math.random() * 4)), strategyMax),
                        planning: Math.min(++initialState.planning + Math.floor((Math.random() * 4)), planningMax)
                    }
                });
            }

        }

        if (elaspsedTime < 8000) {
            requestAnimationFrame(animate)
        }
    }


    useEffect(() => {
        start = 0;
        previousTimeStep = 0;
        EventHandler.subscribe({ name: "animateProgress", fn: onscroll, type: "scroll" })

        return () => {
            EventHandler.unsubscribe({ name: "animateProgress", fn: onscroll, type: "scroll" })
        }
    }, []);

    return (
        <div className="expert-section">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-6/12 py-6 lg:py-16 left-section relative" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/led_billboard.jpg)` }}>
                    <div className="absolute top-0 left-0 overlay"></div>
                    <div className="container py-24 relative">
                        <div className="px-12 z-10 ">
                            <h1

                                id="expertHeading"
                                className="shadow text-white text-right text-3xl lg:text-6xl font-extrabold pr-2 border-r-4"
                            >
                                WE ARE EXPERTS IN OUT OF HOME
                            </h1>

                            <h1

                                id="expertHeading2"
                                className="text-e_blue  text-right text-3xl lg:text-6xl font-extrabold pr-2 border-white border-r-4"

                            >
                                ADVERTISING
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="lg:w-6/12 py-16 lg:py-6 right-section relative" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/walldrape.jpg)` }}>
                    <div className="absolute top-0 left-0 overlay"></div>
                    <div className="description z-10 relative container px-12 lg:px-32 py-24">
                        <div className="mb-8">
                            <h2

                                id="expertDescription"
                                className="text-2xl text-white font-medium pr-12"
                            >
                                Providing expert assistance with outdoor advertising for over two decades. We can assist your brand with:
                            </h2>
                        </div>

                        <div ref={ref} className="grid grid-row-3 text-white">
                            <div className="col-12 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <span id="design" className="font-medium"
                                    >
                                        Design
                                    </span>
                                    <span className="font-medium">
                                        {percentages.design}%
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar percentage={percentages.design} color="" />
                                </div>
                            </div>
                            <div className="col-12 flex mt-3 flex-col justify-between">
                                <div className="flex justify-between">
                                    <span id="strategy" className="font-medium"
                                        dangerouslySetInnerHTML={{ __html: props.strategy }}
                                    />
                                    <span className="font-medium">
                                        {percentages.strategy}%
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar percentage={percentages.strategy} color="" />
                                </div>
                            </div>
                            <div className="col-12 flex mt-3 flex-col justify-between">
                                <div className="flex justify-between">
                                    <span id="strategy" className="font-medium"
                                        dangerouslySetInnerHTML={{ __html: props.planning }}
                                    />
                                    <span className="font-medium">
                                        {percentages.planning}%
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar percentage={percentages.planning} color="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default ExpertSection