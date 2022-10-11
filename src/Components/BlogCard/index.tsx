import { ExpertBG } from "../../images"
import { BookmarkIcon, UserIcon } from "@heroicons/react/outline"
import "./style.css"
import { BlogData } from "../../features/types"
import moment from "moment"
import { Link } from "react-router-dom"
declare interface BlogCardProps extends BlogData {
    path?: string
    isDashboard?: boolean
    index: number | string;
    creator?: string
}

export const BlogCardPlaceholder = () => {
    return (
        <div className="p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-300 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-300 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const BlogCard: React.FC<BlogCardProps> = (props) => {
    return (
        <>
            <div className="blog-card p-3">
                <Link to={`${props.path ? props.path : ""}?category=${props.category?.toLowerCase().split(" ").join("-")}&title=${props.title?.toLowerCase().split(" ").join("-")}`}>
                    <div className="flex">
                        <div className="pr-8">
                            <h1 className="text-3xl font-bold text-stone-400">
                                {
                                    props.index.toString().length < 2 ? "0" + (props.index as number + 1)
                                        : props.index as number + 1

                                }
                            </h1>
                        </div>
                        <div>
                            <div className="inline rounded-[50%] bg-slate-100 p-[3px]">
                                <UserIcon className="inline" width={16} height={16} />
                            </div>

                            <span className="text-xs font-medium text-stone-900 ca capitalize"> {props.firstname + " " + props.lastname} </span>

                            <h1 className="text-[1rem] font-bold text-stone-900">
                                {props.title}
                            </h1>
                            <p className="text-xs mt-3">
                                <span className="font-medium text-stone-400 ">  {moment(props.createddate).format("MMM d")} . {props.readtime}</span>
                            </p>
                        </div>
                    </div>
                </Link>
            </div >
        </>
    )
}