import { UserIcon, CalendarIcon, TagIcon } from "@heroicons/react/outline"
import moment from "moment";
import { BlogData } from "../../features/types";
import { BlogPreviewProps } from "./addBlog"


const BlogPreview: React.FC<BlogData> = (props) => {
    return (
        <div className="blog-preview">
            <div>
                <h3 className="text-stone-500 text-sm">
                    {
                        props.category
                    }
                </h3>
                <h1 className="mt-2 text-stone-900 text-5xl font-bold">
                    {
                        props.title
                    }
                </h1>
                <div className="mt-4">
                    <div className="inline rounded-[50%] bg-slate-100 p-[3px]">
                        <UserIcon className="inline-block" width={24} height={24} />
                    </div>

                    <span className="text-sm font-medium text-stone-900 ca capitalize"> {props.creator} </span>
                    <span className="text-sm mt-3 font-medium text-stone-400 ">  {moment(props.createddate).format("MMM d")} . {props.readtime}</span>
                </div>
                <div className="mt-8">
                    <img src={props.thumbnail} alt="" />
                </div>
                <div className="mt-6 !text-lg  text-stone-800 blog-post" dangerouslySetInnerHTML={{ __html: props.data as string }} />
            </div>
        </div >
    )
}


export default BlogPreview;