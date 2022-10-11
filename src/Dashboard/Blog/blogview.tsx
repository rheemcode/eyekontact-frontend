import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "./editor";
import { Transition, Dialog } from "@headlessui/react";
import { UserIcon, CalendarIcon, TagIcon, PencilIcon, PlusIcon, XIcon, TrashIcon } from "@heroicons/react/outline"
import moment from "moment";
import { useState, useRef, Fragment } from "react";
import { addBlogAsync, deleteBlogAsync, updateBlogAsync } from "../../features/blogs/blogSlice";
import { BlogData, ResponseData } from "../../features/types";
import { useAppSelector, selectUserState, useAppDispatch, selectBlogsState } from "../../hooks";
import { AppStateMachine, blogCategories, HTTPCode } from "../../Utils";
import { BlogPreviewProps } from "./addBlog"
import BlogPreview from "./blogPreview";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"


//TODO: add option for blog category

export const EditBlog: React.FC<BlogPreviewProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const [editor, setEditor] = useState({ current: ClassicEditor.prototype });

    const blogDataRef = useRef({ thumbnail: "", creatorid: "", firstname: "", lastname: "", title: "", creator: "", date: "", category: "", data: "", tags: "" });
    const blogElRef = useRef(HTMLDivElement.prototype);
    const thumbnailRef = useRef({ file: "" });

    const userState = useAppSelector(selectUserState);
    const blogState = useAppSelector(selectBlogsState);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file: Blob = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                thumbnailRef.current.file = reader.result as string;
            };

            reader.onerror = function () {
                console.log(reader.error);
            };
        }
    }

    const handlePreview = () => {
        setIsPreview((prev) => !prev);
        const blogTitleEl = blogElRef.current.querySelector("#blog-title") as HTMLInputElement;
        const blogCategoryEl = blogElRef.current.querySelector("#blog-category") as HTMLSelectElement;
        const blogData = editor.current.getData();
        const blogCreator = (props.firstname + " " + props.lastname) as string;
        const blogDate = (new Date()).toDateString();
        const blogTagsEl = blogElRef.current.querySelector("#blog-tags") as HTMLInputElement;

        blogDataRef.current = {
            thumbnail: thumbnailRef.current.file ? thumbnailRef.current.file : props.thumbnail as string,
            title: blogTitleEl.value ? blogTitleEl.value : props.title as string,
            creatorid: userState.userData.userid as string,
            creator: blogCreator,
            firstname: props.firstname as string,
            lastname: props.lastname as string,
            date: blogDate,
            category: blogCategoryEl.value,
            data: blogData,
            tags: blogTagsEl.value
        }
    }

    //TODO: remove userstate because admin can edit blog
    const handleEditBlog = async () => {
        try {
            if (loading)
                return;

            setLoading(true);
            const blogTitleEl = blogElRef.current.querySelector("#blog-title") as HTMLInputElement;
            const blogCategoryEl = blogElRef.current.querySelector("#blog-category") as HTMLInputElement;
            const blogContent = editor.current.getData();
            const blogCreator = userState.userData.firstname as string;
            const blogDate = (new Date()).toDateString();
            const blogTagsEl = blogElRef.current.querySelector("#blog-tags") as HTMLInputElement;
            const blogStatus = blogElRef.current.querySelector("#blog-status") as HTMLSelectElement;

            let blogData: BlogData = {
                blogid: props.blogid,
                creatorid: userState.userData.userid as string,
                thumbnail: thumbnailRef.current.file ? thumbnailRef.current.file : props.thumbnail,
                title: blogTitleEl.value,
                createddate: moment().format().toString(),
                category: blogCategoryEl.value,
                data: blogContent,
                status: blogStatus ? blogStatus.value : "review",
                tags: blogTagsEl.value,
                comments: "",
            }

            const response = await dispatch(updateBlogAsync(blogData));
            let responseData = response.payload as ResponseData;

            if (responseData.code == HTTPCode.OK) {
                navigate(`/dashboard/blogs`)
                closeModal();
                toast.success("Blog edited successfully")
            }

            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            toast.error("Error in editing blog")

        }

    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="mb-4 p-3 inline-block">
                <button className="bg-rose-600 px-4 py-2 text-white" onClick={openModal}>
                    <PencilIcon width={16} className="inline mr-2" />
                    Edit Blog
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => { }}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >

                            <div className="overflow-y-auto inline-block border border-slate-200 w-full max-w-7xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl" style={{ height: "89vh" }}>
                                <div className="flex justify-end ">
                                    <XIcon width={24} className="cursor-pointer" onClick={closeModal} />
                                </div>
                                <div>
                                    <div className="">
                                        <button onClick={handlePreview} className="bg-rose-600 px-4 py-2 text-white">
                                            Preview
                                        </button>

                                        <button className={`bg-rose-600 px-4 py-2 text-white ml-3 ${loading ? "cursor-wait opacity-40" : ""}`} onClick={handleEditBlog}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Dialog.Title as="h3" className="mb-4 text-lg font-bold text-center leading-6 text-gray-900"  >
                                        EDIT BLOG
                                    </Dialog.Title>
                                </div>
                                {
                                    <>
                                        <div className={`${isPreview ? "" : "hidden"}`}> <BlogPreview {...blogDataRef.current} /> </div>
                                        <div className={`blog-details ${isPreview ? "hidden" : ""} my-4`}>
                                            <div ref={blogElRef} >
                                                <div>
                                                    <label htmlFor="blog-title" className="text-sm">
                                                        Blog Title
                                                    </label>
                                                    <input
                                                        id="blog-title"
                                                        name="blogTitle"
                                                        type="text"
                                                        required
                                                        defaultValue={props.title}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Blog Title"
                                                    />
                                                </div>
                                                {userState.userData.role?.toLowerCase() == "admin" ? <div className="mt-2">
                                                    <label htmlFor="blog-category" className="text-sm">
                                                        Blog Status
                                                    </label>
                                                    <select
                                                        id="blog-status"
                                                        name="blog-status"
                                                        defaultValue={props.category}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    >
                                                        <option value="review">
                                                            Review
                                                        </option>
                                                        <option value="accepted">Accepted</option>
                                                    </select>
                                                </div> : <></>}
                                                <div className="mt-2">
                                                    <label htmlFor="blog-category" className="text-sm">
                                                        Blog Category
                                                    </label>
                                                    <input
                                                        id="blog-category"
                                                        name="blog-category"
                                                        placeholder={"Technology"}
                                                        required
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="blog-tags" className="text-sm">
                                                        Tags <small className="text-slate-700">(separate tags with ",")</small>
                                                    </label>
                                                    <input
                                                        id="blog-tags"
                                                        name="blogTags"
                                                        type="text"
                                                        required
                                                        // defaultValue={props.}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Billboard, Tech, Games..."
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="last-Name" className="text-sm">
                                                        Blog Thumbnail
                                                    </label>
                                                    <input
                                                        onChange={handleFileInput}
                                                        id="blog-thumbnail"
                                                        name="blogThumbnail"
                                                        type="file"
                                                        accept="image/*"
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Editor editor={setEditor} data={props.data} />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition >
        </>
    );
}

const DeleteBlog: React.FC<BlogData> = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const blogState = useAppSelector(selectBlogsState);

    const handleDeleteBlog = async () => {
        if (loading)
            return;
        try {
            setLoading(true)
            const response = await dispatch(deleteBlogAsync(props));
            navigate(`/dashboard/blogs`)
            closeModal()
            setLoading(false);
        } catch (error) {
            closeModal()
            setLoading(false);
        }

    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="mb-4 p-3 inline-block   ">
                <button className="bg-rose-600 px-4 py-2 text-white" onClick={openModal}>
                    <TrashIcon width={16} className="inline mr-2" />
                    Delete Blog
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span className="inline-block h-screen align-middle" aria-hidden="true" >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border border-slate-200 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900"  >
                                    Delete Blog
                                </Dialog.Title>

                                <Dialog.Description as="h3" className="text-center mt-8 mb-4">
                                    Are you sure?
                                </Dialog.Description>
                                <button onClick={handleDeleteBlog} className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none ${loading ? "cursor-wait opacity-40" : ""}`}>
                                    Continue
                                </button>
                                <div>
                                    <button onClick={closeModal} className="mx-auto text-center text-e_red mt-4 block">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export const DashboardBlogView: React.FC<BlogPreviewProps> = (props) => {
    const userState = useAppSelector(selectUserState);

    return (
        <div className="dashboard-blog-view p-6">
            {
                (() => console.log(props))()

            }
            {

                userState.userData.role?.toLowerCase() == "admin" ? <>
                    <EditBlog {...props} />
                    <DeleteBlog {...props} />
                </>
                    : <></>
            }
            <>
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

                        <span className="text-sm font-medium text-stone-900 ca capitalize"> {props.firstname + " " + props.lastname} </span>
                        <span className="text-sm mt-3 font-medium text-stone-400 ">  {moment(props.createddate).format("MMM d")} . {props.readtime}</span>
                    </div>
                    <div className="mt-8">
                        <img src={props.thumbnail} alt="" />
                    </div>
                    <div className="mt-6 !text-lg  text-stone-800 blog-post" dangerouslySetInnerHTML={{ __html: props.data as string }} />
                </div>
            </>
        </div>
    )
}

export default DashboardBlogView;