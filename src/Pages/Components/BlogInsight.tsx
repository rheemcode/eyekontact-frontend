import React, { useEffect, useState } from "react";
import { BlogCard, BlogCardPlaceholder } from "../../Components/BlogCard"
import { getBlogsAsync } from "../../features/blogs/blogSlice";
import { BlogInsightsSectionState } from "../../features/cms/cmsSlice";
import { BlogData, ResponseData } from "../../features/types";
import { useAppDispatch, useAppSelector, selectBlogsState } from "../../hooks";
import { AppStateMachine } from "../../Utils";

const BlogGridSection: React.FC<BlogInsightsSectionState> = (props) => {
    const dispatch = useAppDispatch();
    const blogState = useAppSelector(selectBlogsState);
    // const [blogsState, setBlogState] = useState<{ blogs: BlogData[] }>({ blogs: [] });

    useEffect(() => {
        (async () => {
            const response = await dispatch(getBlogsAsync());
            const responsePayload = response.payload as ResponseData;
            // setBlogState({ blogs: responsePayload.data as BlogData[] });
        })();

    }, []);

    return (
        <div className="blog-grid py-6 mb-6">
            <div className="text-center mb-12">
                <h3

                    id="insightsHeading"
                    className="text-e_blue font-medium uppercase"
                    dangerouslySetInnerHTML={{ __html: props.heading }}
                />

                <span id="insightsHeading2" className="text-6xl font-extrabold"
                    dangerouslySetInnerHTML={{ __html: props.heading2 }}
                />

                <span className='text-6xl font-extrabold text-red'>.</span>
            </div>
            <div className="grid grid-flow-row md:grid-flow-col gap-y-6 md:grid-cols-2 lg:grid-cols-3  lg:px-12">
                {
                    (blogState.getState === AppStateMachine.Pending || blogState.getState === AppStateMachine.Error || blogState.blogs.length < 3) ?
                        [1, 2, 3].map((el, index) => <div className="self-center" key={"blog" + index}><BlogCardPlaceholder key={index} /></div>) :
                        blogState.blogs.slice(0, 3).map((blog, index) => {
                            return (
                                <div className="mr-2 mt-6 self-center" key={"blog" + index}>
                                    <BlogCard index={index} path="blog" {...blog} key={index} />
                                </div>)
                        })
                }
            </div >
        </div >
    )
}

export default BlogGridSection;