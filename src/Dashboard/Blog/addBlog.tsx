import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Transition, Dialog } from "@headlessui/react";
import { EyeIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import { CalendarIcon, TagIcon, UserIcon } from "@heroicons/react/solid";
import axios from "axios";
import moment from "moment";
import { useState, Fragment, useDebugValue, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BlogCard } from "../../Components/BlogCard";
import { addBlogAsync, getBlogsAsync } from "../../features/blogs/blogSlice";
import { BlogData, ResponseData } from "../../features/types";
import { selectBlogsState, selectUserState, useAppDispatch, useAppSelector } from "../../hooks";
import { AppStateMachine, APPURL, blogCategories, HTTPCode } from "../../Utils";
import BlogPreview from "./blogPreview";
import { Editor } from "./editor";
import toast from "react-hot-toast"

export declare interface BlogPreviewProps extends BlogData {
    creator?: string;
}

export const DashboardBlogs = () => {
    const dispatch = useAppDispatch();
    const blogsState = useAppSelector(selectBlogsState);
    const userState = useAppSelector((state) => state.users);


    useEffect(() => {
        (async () => {
            const response = await dispatch(getBlogsAsync());
        })();

    }, []);

    return (
        <div>
            <div className="grid grid-flow-row md:grid-flow-col gap-y-6 md:grid-cols-2 lg:grid-cols-3  lg:px-12">
                {
                    blogsState.blogs ? blogsState.blogs.map((blog, index) => <div
                        className="mr-2 mt-6" key={index}>
                        <BlogCard index={index} {...blog} /></div>) : <></>
                }
            </div >
        </div>
    )
}


export const AddBlog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const [editor, setEditor] = useState({ current: ClassicEditor.prototype });
    const [loading, setLoading] = useState(false);
    const blogDataRef = useRef({ thumbnail: "", creatorid: "", title: "", creator: "", createddate: "", category: "", data: "", tags: "" });
    const blogElRef = useRef(HTMLDivElement.prototype);
    const thumbnailRef = useRef({ file: "" });
    const images = useRef({
        base64: "",
        formData: [] as FormData[]
    });

    const userState = useAppSelector(selectUserState);
    const blogState = useAppSelector(selectBlogsState)
    const dispatch = useAppDispatch();

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            images.current.formData = []

            const fileList = event.target.files;
            for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
                const file: File = fileList[i];
                const reader = new FileReader();
                reader.readAsDataURL(file as Blob);
                reader.onload = function () {
                    thumbnailRef.current.file = reader.result as string;
                    images.current.base64 += (reader.result as string) + "\n";
                    const fd = new FormData();
                    fd.append("image", file, (file as File).name)
                    images.current.formData.push(fd)
                };

                reader.onerror = function () {
                    console.log(reader.error);
                };
            }
        }
    }

    const handlePreview = () => {
        setIsPreview((prev) => !prev);
        const blogTitleEl = blogElRef.current.querySelector("#blog-title") as HTMLInputElement;
        const blogCategoryEl = blogElRef.current.querySelector("#blog-category") as HTMLSelectElement;
        const blogData = editor.current.getData();
        const blogCreator = userState.userData.firstname as string;
        const blogDate = moment().format().toString();
        const blogTagsEl = blogElRef.current.querySelector("#blog-tags") as HTMLInputElement;


        blogDataRef.current = {
            thumbnail: thumbnailRef.current.file,
            title: blogTitleEl.value,
            creatorid: userState.userData.userid as string,
            creator: blogCreator,
            createddate: blogDate,
            category: blogCategoryEl.value,
            data: blogData,
            tags: blogTagsEl.value
        }
    }

    const handleAddNewBlog = async () => {

        if (loading)
            return;

        try {
            setLoading(true);
            const blogTitleEl = blogElRef.current.querySelector("#blog-title") as HTMLInputElement;
            const blogCategoryEl = blogElRef.current.querySelector("#blog-category") as HTMLInputElement;
            const blogContent = editor.current.getData();
            const blogTagsEl = blogElRef.current.querySelector("#blog-tags") as HTMLInputElement;
            const blogStatusEl = blogElRef.current.querySelector("#blog-status") as HTMLSelectElement;


            const imgResponse = await axios({
                url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                method: "POST",
                data: images.current.formData[0],
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            //TODO: update for updating blog as well

            let blogData: BlogData = {
                creatorid: userState.userData.userid as string,
                thumbnail: imgResponse.data.default,
                title: blogTitleEl.value,
                createddate: moment().format().toString(),
                category: blogCategoryEl.value,
                data: blogContent,
                tags: blogTagsEl.value,
                status: blogStatusEl ? blogStatusEl.value : "review",
                comments: "",
            }

            const response = await dispatch(addBlogAsync(blogData));
            let responseData = response.payload as ResponseData;

            if (responseData.code == HTTPCode.OK) {
                toast.success("Blog Created Successfully")
                closeModal();
            }
            setLoading(false);

        } catch (error) {
            setLoading(false);
            closeModal();

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
            <div className="mb-4">
                <button className="bg-rose-600 px-4 py-2 text-white" onClick={openModal}>
                    <PlusIcon width={16} className="inline mr-2" />
                    Add Blog
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

                                        <button className={`bg-rose-600 px-4 py-2 text-white ml-3 ${loading ? "cursor-wait opacity-40" : ""}`} onClick={handleAddNewBlog}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Dialog.Title as="h3" className="mb-4 text-lg font-bold text-center leading-6 text-gray-900"  >
                                        ADD NEW BLOG
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
                                                        required
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Editor editor={setEditor} data="" />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

