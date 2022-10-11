import { SearchIcon, PlusIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBlogsAsync } from "../../features/blogs/blogSlice";
import { BlogData, ResponseData } from "../../features/types";
import { useAppDispatch, useAppSelector, selectBlogsState, selectUserState } from "../../hooks";
import { AddBlog, DashboardBlogs } from "./addBlog";
import DashboardBlogView from "./blogview";


const DashboardBlog = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUserState);
    const blogsState = useAppSelector(selectBlogsState);
    const [singleBlog, setSingleBlog] = useState<{ blog: BlogData }>();
    const [params] = useSearchParams();

    useEffect(() => {
        setSingleBlog(undefined);
        (async () => {
            try {
                const response = await dispatch(getBlogsAsync());
                const responsePayload = response.payload as ResponseData;
                const blogData = responsePayload.data as BlogData[];
                const blogTitle = params.get("title")?.split("-").join(" ");
                if (blogTitle) {
                    let blogPost = blogData.find((blog) => {
                        return blog.title?.toLowerCase() == blogTitle.split("-").join(" ");
                    });
                    console.log(blogPost);

                    if (blogPost) {
                        setSingleBlog({ blog: blogPost });
                        console.log(blogPost);
                    }
                }
            } catch (err) {
                console.log(err)
            }

        })();



    }, [params])

    return (
        <div className="overflow-x-auto p-6">
            <div className="px-4 mb-6">
                <h1 className="font-medium text-xl">
                    Blogs
                </h1>
            </div>
            <div className=" bg-white rounded-lg border border-gray-light">
                {singleBlog?.blog ? <DashboardBlogView {...singleBlog.blog} />
                    : <>
                        <div className="flex justify-between p-4 flex-col lg:flex-row">
                            <div className="self-center">
                                <div className="ml-3 flex">
                                    <SearchIcon width={14} className="inline text-warmGray-400 mr-3" />
                                    <input type="search" className="w-full border-0 outline-none bg-transparent" placeholder="Search" />
                                </div>
                            </div>
                            <div>
                                {
                                    userState.userData.role?.toLowerCase() != "user" ? <AddBlog /> : <></>
                                }
                            </div>
                        </div>
                        <div className="py-6">
                            <DashboardBlogs />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default DashboardBlog;