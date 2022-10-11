import { UserIcon, CalendarIcon, TagIcon } from "@heroicons/react/outline"
import { ArrowRightIcon } from "@heroicons/react/solid"
import moment from "moment"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import PageLoading from "../../Components/Loader"
import PageBanner from "../../Components/PageBanner"
import { getBlogsAsync, updateBlogAsync } from "../../features/blogs/blogSlice"
import { BlogData, ResponseData } from "../../features/types"
import { selectBlogsState, useAppDispatch, useAppSelector } from "../../hooks"
import { blogCategories } from "../../Utils"

declare interface Comment {
    id: string;
    user: string;
    date: string;
    comment: string;
    replies: Comment[]
}
declare interface BlogProps extends BlogData {
    // blogid: string;
    // thumbnail: string;
    // title: string;
    // creator: string;
    // creatorid: string;
    // category: string;
    // date: string;
    // data: string;
    // comments: string
}

const SingleBlog: React.FC<BlogProps> = (props) => {
    const dispatch = useAppDispatch();
    const commentContainerRef = useRef(HTMLDivElement.prototype);
    const ref = useRef(HTMLDivElement.prototype);
    const commentsData: Comment[] = props.comments != "undefined" ? JSON.parse(props.comments as string) as Comment[] : [] as Comment[]

    const [inputError, setInputError] = useState({ name: "", comment: "" });

    const createCommentEl = (_comment: Comment, child?: JSX.Element) => {
        const el = (
            <div>
                <div className="comment ml-6 gap-x-2 py-8 border-b border-slate-200">
                    <div className="flex">
                        <div>
                            <UserIcon width={64} className="p-2 bg-slate-200 rounded-full mr-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold capitalize">
                                {
                                    _comment.user
                                }
                            </h3>
                            <p className="mt-1 text-sm text-slate-300">
                                {
                                    moment(_comment.date).format("MMMM dd, YYYY")
                                }
                            </p>
                            <p className="mt-6 text-slate-400">
                                {
                                    _comment.comment
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>)

        return el;

    }

    const getCommentElements = () => {
        let comments = commentsData
        let commentContainer = <div></div>;
        let commentsEl: JSX.Element[] = []

        const traverseComments = (_comment?: Comment[], _commentEl?: JSX.Element, container?: []) => {
            if (_comment) {
                for (let _c of _comment) {
                    let _subComment = createCommentEl(_c);
                    if (_commentEl)
                        // _commentEl.props.children.push(_subComment);
                        // _commentEl?.appendChild(_subComment);
                        if (_c.replies.length) {
                            traverseComments(_c.replies, _subComment);
                        }
                    return;
                }
            }
            for (let comment of comments) {
                let commentEl = createCommentEl(comment);

                commentsEl.push(commentEl)
                if (comment.replies.length) {
                    traverseComments(comment.replies, commentEl);
                }
            }
        }

        traverseComments()

        return (
            <div>
                {[commentsEl]}
            </div>)
    }

    const handlePostComment = async () => {
        let userName = (ref.current.querySelector("#name") as HTMLInputElement).value;
        let userEmail = (ref.current.querySelector("#email") as HTMLInputElement).value;
        let userComment = (ref.current.querySelector("#comment") as HTMLTextAreaElement).value;

        setInputError((state) => { return { ...state, comment: "" } });
        setInputError((state) => { return { ...state, name: "" } });


        if (!userName) {
            setInputError((state) => { return { ...state, name: "Name field required" } });
        }

        if (!userComment) {
            setInputError((state) => { return { ...state, comment: "Comment field required" } });
        }

        if (inputError.name || inputError.comment) {
            return;
        }


        const commentData: Comment = {
            id: (commentsData.length + 1).toString(),
            user: userName,
            date: moment().format(),
            comment: userComment,
            replies: []
        };

        commentsData.push(commentData);
        (ref.current.querySelector("#name") as HTMLInputElement).value = "";
        (ref.current.querySelector("#email") as HTMLInputElement).value = "";
        (ref.current.querySelector("#comment") as HTMLTextAreaElement).value = "";

        const blogData: BlogData = {
            blogid: props.blogid,
            creatorid: props.creatorid,
            createddate: props.createddate,
            title: props.title,
            category: props.category,
            data: props.data,
            thumbnail: props.thumbnail,
            tags: props.tags,
            status: props.status,
            comments: JSON.stringify(commentsData)
        }

        await dispatch(updateBlogAsync(blogData))
    }

    useEffect(() => {
        // console.log(getCommentElements());
    })

    return (
        <>
            <div className="single-blog-preview">
                <div>
                    <h3 className="capitalize text-stone-500 text-sm">
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

                        <span className="text-sm font-medium text-stone-900 ca capitalize"> {props.firstname + " " + props.lastname} </span>
                        <span className="text-sm mt-3 font-medium text-stone-400 ">  {moment(props.createddate).format("MMM d")} . {props.readtime}</span>
                    </div>
                    <div className="mt-8">
                        <img src={props.thumbnail} alt="" />
                    </div>
                    <div className="mt-6 !text-lg  text-stone-800 blog-post" dangerouslySetInnerHTML={{ __html: props.data as string }} />
                </div>
            </div >
            {/* <div className="single-blog pb-6" ref={ref}>
                <div className="mb-4">
                    <img src={props.thumbnail} alt="" />
                </div>
                <div className="flex flex-col lg:flex-row gap-1 px-6">
                    <div className="inline-flex p-1 px-3 text-white bg-red mr-2 rounded-[17px]  ">
                        <UserIcon width={14} className="mr-2" />
                        <span className="text-sm font-bold self-center">
                            {
                                props.creator ? props.creator : "CP Compass"
                            }
                        </span>
                    </div>

                    <div className="inline-flex p-2 text-coolGray-900 mr-2 rounded-lg">

                        <CalendarIcon width={14} className="text-red mr-2" />
                        <span className="text-sm font-bold">
                            {
                                moment(props.date).format("dddd, MMMM YYYY")
                            }
                        </span>
                    </div>

                    <div className="inline-flex p-2 text-coolGray-900 mr-2 rounded-lg">
                        <TagIcon width={14} className="text-red mr-2" />
                        <Link to={`/blog?category=${props.category?.toLowerCase().split(" ").join("-")}`}>
                            <span className="text-sm font-bold">
                                {
                                    props.category
                                }
                            </span>
                        </Link>
                    </div>

                </div>
                <div className="px-6 mt-6">
                    <h1 className="text-xl font-bold text-zinc-900">
                        {props.title.toUpperCase()}
                    </h1>
                </div>
                <div className="pb-6 px-6 blog-post">
                    <div className="mt-6 text-slate-500" dangerouslySetInnerHTML={{ __html: props.data }} />
                </div>
                <div className="mt-12 blog-comments">
                    <h3 className="text-3xl font-bold">
                        Comments
                    </h3>
                    <div ref={commentContainerRef}>
                        {getCommentElements()}
                    </div>;
                </div>
                <div className="mt-12">
                    <h1 className="text-4xl font-bold">
                        Leave a comment
                    </h1>
                    <p className="mt-4 text-zinc-300">
                        <i>   Your email address will not be published. Required fields are marked*</i>
                    </p>
                    <div className="mt-12 flex flex-col">
                        <div className="flex w-full gap-2">
                            <div className="w-full">
                                <input className="w-full outline-none focus-within:border-rose-400 border-slate-300 p-3 border" type="text" placeholder="Enter Name*" required name="name" id="name" />
                                {inputError.name ? <p className="text-red">{inputError.name}</p> : <></>}
                            </div>
                            <div className="w-full">
                                <input className="w-full outline-none focus-within:border-rose-400 p-3  border-slate-300 border" type="email" placeholder="Enter Email" name="email" id="email" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <textarea name="" className="w-full p-3 border outline-none focus-within:border-rose-400  border-slate-300" rows={10} id="comment" placeholder="Comment*">
                            </textarea>
                            {inputError.comment ? <p className="text-red">{inputError.comment}</p> : <></>}

                        </div>
                        <div className="mt-6">
                            <button onClick={handlePostComment} className="bg-rose-600 text-white py-3 px-6">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div > */}
        </>
    )
}

const BlogPreview: React.FC<BlogProps> = (props) => {
    return (
        <>
            <div className="blog-preview lg:p-12">
                <div className="flex">
                    <div className="f flex-1">
                        <p className="text-xs">
                            <span className="font-medium ca capitalize"> {props.firstname + " " + props.lastname} </span> <span className="text-slate-400">. {moment(props.createddate).format("MMM d")}</span>
                        </p>
                        <Link replace to={`/blog?category=${props.category?.toLowerCase().split(" ").join("-")}&title=${props.title?.toLowerCase().split(" ").join("-")}`}>
                            <h1 className="mt-4 text-stone-800 font-bold text-xl">
                                {props.title}
                            </h1>
                            <div className="text-stone-800 text-sm" dangerouslySetInnerHTML={{ __html: (props.data as string).substring(0, 260) + "..." }} />
                        </Link>
                    </div>
                    <div>
                        <Link replace to={`/blog?category=${props.category?.toLowerCase().split(" ").join("-")}&title=${props.title?.toLowerCase().split(" ").join("-")}`}>
                            <img src={props.thumbnail} className={"w-[200px] h-[134px] aspect-[200/134]"} alt="" />
                        </Link>
                    </div>
                </div>

                <div className="mt-6">
                    <Link replace to={`/blog?category=${props.category?.toLowerCase().split(" ").join("-")}`}>

                        <span className="text-xs bg-slate-100 capitalize p-1 px-2 rounded-2xl" >
                            {
                                props.category
                            }
                        </span>
                    </Link>
                    <span className="ml-4 text-stone-800 text-xs">
                        {props.readtime}
                    </span>
                </div>
            </div>

            {/* <div className="blog-preview pb-6">
                <div className="mb-4">
                    <img src={props.thumbnail} alt="" />
                </div>
                <div className="flex flex-col lg:flex-row gap-1 px-6">
                    <div className="inline-flex p-1 px-3 text-white bg-red mr-2 rounded-[17px]  ">
                        <UserIcon width={14} className="mr-2 self-center" />
                        <span className="text-sm font-bold">

                            {
                                props.creator ? props.creator : "CP Compass"
                            }
                        </span>
                    </div>

                    <div className="inline-flex p-2 text-coolGray-900 mr-2 rounded-lg">

                        <CalendarIcon width={14} className="text-red mr-2" />
                        <span className="text-sm font-bold">
                            {
                                moment(props.date).format("dddd, MMMM YYYY")
                            }
                        </span>
                    </div>

                    <div className="inline-flex p-2 text-coolGray-900 mr-2 rounded-lg">
                        <TagIcon width={14} className="text-red mr-2" />
                        <span className="text-sm font-bold">
                            {
                                props.category
                            }
                        </span>
                    </div>

                </div>
                <div className="px-6 mt-6">
                    <h1 className="text-xl font-bold text-zinc-900">
                        {props.title.toUpperCase()}
                    </h1>
                </div>
                <div className="pb-6 px-6">
                    <div className="mt-6 text-slate-500" dangerouslySetInnerHTML={{ __html: (props.data as string).substring(0, 260) + "..." }} />
                    <div className="mt-4">
                        <Link replace to={`/blog?category=${props.category?.toLowerCase().split(" ").join("-")}&title=${props.title?.toLowerCase().split(" ").join("-")}`} className="text-red font-bold">
                            READ MORE <ArrowRightIcon className="ml-2 inline" width={14} />
                        </Link>
                    </div>
                </div>
            </div > */}
        </>
    )
}

const RecentPosts = () => {
    const blogsState = useAppSelector((state) => {
        return state.blogs.blogs.filter((el) => {
            return el.status != "review"
        })
    })

    return (
        <div className="recent-posts p-3 border border-zinc-300">
            <div className="">
                <h2 className="text-lg py-3 font-medium text-zinc-900">
                    RECENT POST
                </h2>
                <hr className="border-red border-[1.2px] w-3/12" />
            </div>
            <div className="mt-6">
                {

                    blogsState.slice(0, 5).map((blog, index) => {
                        return <>
                            <div className="my-1 py-4" key={index + (blog.category as string)}>
                                <Link to={`/blog?category=${blog.category?.toLowerCase().split(" ").join("-")}&title=${blog.title?.toLowerCase().split(" ").join("-")}`} className="hover:text-red">
                                    <h4>{blog.title}</h4>
                                </Link>
                            </div>
                            <hr key={(index + 1) * 10} className="border-dashed border-zinc-300" />
                        </>
                    })
                }
            </div>
        </div>
    )

}

const Categories = () => {
    return (
        <div className="blog-categories p-3 border border-zinc-300">
            <div className="">
                <h2 className="text-lg py-3 font-medium text-zinc-900">
                    CATEGORIES
                </h2>
                <hr className="border-red border-[1.2px] w-3/12" />
            </div>
            <div className="mt-6">
                {
                    blogCategories.slice(0, 5).map((category, index) => {
                        return <div key={(index) * 1 << index}>
                            <div className="my-1 py-4" key={index}>
                                <Link key={index + category.name} to={`/blog?category=${category.name.toLowerCase().split(" ").join("-")}`} className="hover:text-red">
                                    <h4>{category.name.toUpperCase()}</h4>
                                </Link>
                            </div>
                            <hr key={(index + 1) * 10} className="border-dashed border-zinc-300" />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

const Tags = () => {

}

const Blogs = () => {
    const dispatch = useAppDispatch();
    // const blogsState = useAppSelector(selectBlogsState)
    const [params] = useSearchParams();
    const blogCategory = useRef<string | null>();
    const blogTitle = useRef<string | null>();

    const appBlogState = useAppSelector(selectBlogsState);
    const [blogsState, setBlogState] = useState<{ blogs: BlogData[] }>({ blogs: [] });
    const [filteredBlog, setFilteredBlog] = useState<{ blogs: BlogData[] }>({ blogs: [] });

    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.blogState);
    const userState = useAppSelector((state) => state.users);

    useEffect(() => {
        // console.log("rerender")
        let tempBlog = appBlogState.blogs;

        tempBlog = tempBlog.filter((blog) => {
            return blog.status != "review";
        });

        setFilteredBlog({ blogs: tempBlog });

        blogCategory.current = params.get("category")?.split("-").join(" ");
        blogTitle.current = params.get("title")?.split("-").join(" ");

        if (blogCategory.current) {
            let blogData = tempBlog;
            tempBlog = blogData.filter((blog) => {
                return blog.category?.toLowerCase() == (blogCategory.current as string);
            });

            setFilteredBlog({ blogs: tempBlog });
        }


        if (blogTitle.current) {
            let blogData = tempBlog as BlogData[];
            let singleBlog = blogData.find((blog) => {
                return blog.title?.toLowerCase() == blogTitle.current?.split("-").join(" ");
            });

            if (singleBlog) {
                setFilteredBlog({ blogs: tempBlog });
            }
        }

        // setBlogState({ blogs: appBlogState.blogs as BlogData[] });
    }, [appBlogState.blogs])

    useEffect(() => {
        (async () => {

            // let _ = appBlogState;
            const response = await dispatch(getBlogsAsync());
            const responsePayload = response.payload as ResponseData;

            let tempBlog = appBlogState.blogs;

            tempBlog = tempBlog.filter((blog) => {
                return blog.status != "review";
            });

            setFilteredBlog({ blogs: tempBlog });

            blogCategory.current = params.get("category")?.split("-").join(" ");
            blogTitle.current = params.get("title")?.split("-").join(" ");

            if (blogCategory.current) {
                let blogData = tempBlog;
                tempBlog = blogData.filter((blog) => {
                    return blog.category?.toLowerCase() == (blogCategory.current as string);
                });

                setFilteredBlog({ blogs: tempBlog });
            }


            if (blogTitle.current) {
                let blogData = tempBlog as BlogData[];
                let singleBlog = blogData.find((blog) => {
                    return blog.title?.toLowerCase() == blogTitle.current?.split("-").join(" ");
                });

                if (singleBlog) {
                    setFilteredBlog({ blogs: tempBlog });
                }
            }

            setBlogState({ blogs: responsePayload.data as BlogData[] });
        })();

    }, [params, appBlogState.blogs.length]);

    return (
        <div className="blogs">
            <PageLoading />
            <PageBanner title="Blog Posts" path="blogs" image={pageContent.landingBg} />

            <div className="flex py-6 flex-col lg:flex-row justify-evenly mt-6 px-8">
                <div className="blogs-section w-full lg:w-8/12">
                    {

                        (blogTitle.current && filteredBlog.blogs) ?
                            <SingleBlog
                                {
                                ...filteredBlog.blogs[0]
                                }

                            />
                            :

                            filteredBlog.blogs.length ? filteredBlog.blogs.map((blog, index) => {
                                console.log(blog)
                                return <div className="my-3 border-b border-slate-300" key={"prev" + index}>
                                    <BlogPreview
                                        key={"blog" + index}
                                        {...blog}
                                    />
                                </div>
                            }) :
                                <>
                                    <div className="mt-12">
                                        <h1 className="text-2xl lg:text-4xl font-bold text-center">
                                            No blog posts yet
                                        </h1>
                                    </div>
                                </>
                    }
                </div>

                <div className="blog-menus w-full lg:w-3/12 mt-6">
                    <RecentPosts />

                </div>
            </div>
        </div>
    )
}

export default Blogs