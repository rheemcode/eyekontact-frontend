import { ProductImg } from "../../images";
import { ShoppingCartIcon, SearchIcon, PlusIcon } from "@heroicons/react/outline";
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { Transition, Dialog } from "@headlessui/react";
import React, { useState, Fragment, useRef, useEffect } from "react";
import { UserData, ResponseData, ProductData } from "../../features/types";
import { addUserAsync, updateUserAsync } from "../../features/users/usersSlice";
import { selectProductsState, selectUserState, useAppDispatch, useAppSelector } from "../../hooks";
import { AppStateMachine, APPURL, HTTPCode, parseToCurrency } from "../../Utils";
import { addProductAsync, deleteProductAsync, getProductsAsync, updateProductAsync } from "../../features/products/productsSlice";
import { Navigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast"

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const dispatch = useAppDispatch();
    const images = useRef({
        base64: "",
        formData: new FormData(),
    });

    const productState = useAppSelector(selectProductsState);

    let fileRef = useRef({ file: "" });

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        images.current.formData = new FormData();
        if (event.target.files) {
            const fileList = event.target.files;
            for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
                const file: File = fileList[i];
                const reader = new FileReader();
                reader.readAsDataURL(file as Blob);
                reader.onload = function () {
                    fileRef.current.file += (reader.result as string) + "\n";
                    images.current.base64 += (reader.result as string) + "\n";
                    images.current.formData.append("image", file, (file as File).name)
                };

                reader.onerror = function () {
                    console.log(reader.error);
                };
            }

        }
    }

    const handleAddNewProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading)
            return;

        setLoading(true);
        const formElem = event.target as HTMLFormElement;

        try {
            let response: any = "";
            if (images.current.formData.get("image")) {
                for (let entry of images.current.formData.entries()) {
                    const fd = new FormData();
                    console.log(entry)
                    fd.append("image", entry[1], (entry[1] as File).name)
                    response = await axios({
                        url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                        method: "POST",
                        data: fd,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    });

                }

                images.current.formData = new FormData();

                const productData: ProductData = {
                    productname: (formElem.querySelector("#product-name") as HTMLInputElement).value as string,
                    productimage: response.data.default as string,
                    productcategory: (formElem.querySelector("#product-category") as HTMLInputElement).value as string,
                    productprice: (formElem.querySelector("#product-price") as HTMLInputElement).value as string,
                    productstatus: (formElem.querySelector("#product-status") as HTMLInputElement).value as string,
                    productlocation: (formElem.querySelector("#product-location") as HTMLInputElement).value as string,
                }

                const result = await dispatch(addProductAsync(productData));
                let responseData = result.payload as ResponseData;

                if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                    toast.error(responseData.message)
                    setLoading(false);
                    return setError({ errorCode: responseData.code, message: responseData.message });
                }

                setLoading(false);
                toast.success("Product created successfully")
                setError({ errorCode: 200, message: "" })
                closeModal();
            }


        } catch (error) {
            toast.success("Error in creating product")
            images.current.formData = new FormData();
            closeModal();
            setLoading(false);

        }
    }

    function closeModal() {
        setError({ errorCode: 200, message: "" })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        const loader = document.createElement("script");
        loader.innerHTML = `

        function initAutocomplete() {
          setTimeout(() => {
         console.log('document.getElementById("product-location")')
         console.log(document.getElementById("product-location"))
            autocomplete = new google.maps.places.Autocomplete(
              document.getElementById("product-location"), {
                types: ["address"],
                componentRestrictions: {
                  'country': ["NG"]
                },
                fields: ["place_id", "geometry", "name"]
              });
          }, [3000])
    
    
        }
        initAutocomplete();
        
        `;

        document.body.appendChild(loader);

        return () => {
            document.body.removeChild(loader);
        }

        // }
    }, [isOpen])

    return (
        <>
            <div className="">
                <button className="bg-rose-600 px-4 py-2 text-white" onClick={openModal}>
                    <PlusCircleIcon width={16} className="inline mr-2" />
                    Add Product
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => 0}
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
                            <div className="inline-block border border-slate-200 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900"  >
                                    ADD NEW PRODUCT
                                </Dialog.Title>

                                <form className="mt-8 space-y-6" onSubmit={handleAddNewProduct}>
                                    <div className="rounded-md shadow-sm">
                                        <div>
                                            <label htmlFor="product-name" className="text-sm">
                                                Product Name
                                            </label>
                                            <input
                                                id="product-name"
                                                name="productname"
                                                type="text"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Product Name"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="last-Name" className="text-sm">
                                                Product Image
                                            </label>
                                            <input
                                                onChange={handleFileInput}
                                                id="product-image"
                                                name="productimage"
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-2">

                                            <label htmlFor="product-category" className="text-sm">
                                                Product Category
                                            </label>
                                            <select
                                                id="product-category"
                                                name="product-category"
                                                defaultValue={"Digital Led Board"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="Digital Led Board">
                                                    Digital Led Board
                                                </option>
                                                <option value="Gantries">Gantries</option>
                                                <option value="Wall drape">Wall drape</option>
                                                <option value="Unipole">Unipole</option>
                                                <option value="Roof Top Boars">Roof Top Boards</option>
                                                <option value="Lamp Poles">Lamp Poles</option>
                                                <option value="Bus Branding">Bus Branding</option>
                                                <option value="Bus Shelter Branding">Bus Shelter Branding</option>
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="product-price" className="text-sm">
                                                Product Price
                                            </label>
                                            <input
                                                id="product-price"
                                                name="productprice"
                                                type="text"
                                                required
                                                defaultValue={"10000"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="product-location" className="text-sm">
                                                Product Location
                                            </label>
                                            <input
                                                id="product-location"
                                                name="productlocation"
                                                type="text"
                                                required
                                                defaultValue={"Lagos"}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="product-status" className="text-sm">
                                                Product Status
                                            </label>
                                            <select
                                                id="product-status"
                                                name="productstatus"
                                                defaultValue={"Available"}
                                                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="Available">
                                                    Available
                                                </option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div>
                                        <p className='error-msg my-2 text-e_red text-center'>
                                            {error.message}
                                        </p>
                                        <button
                                            type="submit"
                                            className={` ${loading ? "cursor-wait opacity-40" : ""}group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`}>

                                            Add Product
                                        </button>
                                        <div>
                                            <p onClick={closeModal} className="text-center mx-auto text-e_red mt-4 block cursor-pointer">
                                                Cancel
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const EditProduct = (props: { productData: ProductData }) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const [fileRef, setFileRef] = useState({ file: "" });
    const images = useRef({
        base64: "",
        formData: new FormData(),
    });
    const productState = useAppSelector(selectProductsState);


    useEffect(() => {
        setFileRef({ file: props.productData.productimage as string })
    }, [])

    const dispatch = useAppDispatch();

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            images.current.formData = new FormData();
            const fileList = event.target.files;
            for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
                const file: File = fileList[i];
                const reader = new FileReader();
                reader.readAsDataURL(file as Blob);
                reader.onload = function () {
                    setFileRef({ file: reader.result as string })
                    images.current.base64 += (reader.result as string) + "\n";
                    images.current.formData.append("image", file, (file as File).name)
                };

                reader.onerror = function () {
                    console.log(reader.error);
                };
            }

        }
    }


    const handleEditProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        if (loading) return;
        setLoading(true);
        event.preventDefault();

        const formElem = event.target as HTMLFormElement;
        try {
            if (images.current.formData.get("image")) {

                let imgResponse: any = ""
                for (let entry of images.current.formData.entries()) {
                    const fd = new FormData();
                    console.log(entry)
                    fd.append("image", entry[1], (entry[1] as File).name)
                    imgResponse = await axios({
                        url: `https://eyekontact-server.herokuapp.com/uploads/images`,
                        method: "POST",
                        data: fd,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    });

                }

                images.current.formData = new FormData();

                const productData: ProductData = {
                    productname: (formElem.querySelector("#product-name") as HTMLInputElement).value as string,
                    productimage: imgResponse.data.default,
                    productcategory: (formElem.querySelector("#product-category") as HTMLInputElement).value as string,
                    productprice: (formElem.querySelector("#product-price") as HTMLInputElement).value as string,
                    productstatus: (formElem.querySelector("#product-status") as HTMLInputElement).value as string,
                    productlocation: (formElem.querySelector("#product-location") as HTMLInputElement).value as string,

                }
                const response = await dispatch(updateProductAsync({ product: productData, productOld: props.productData }));
                let responseData = response.payload as ResponseData;

                if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                    setLoading(false);
                    toast.error(responseData.message)
                    return setError({ errorCode: responseData.code, message: responseData.message });
                }

                toast.success("Product edited successfully")
                closeModal();
            }

            setLoading(false);
        } catch (error) {
            toast.error("Error in editing product")

            closeModal();
            setLoading(false);
            images.current.formData = new FormData();

        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        console.log("clicked")
        setIsOpen(true)
    }


    useEffect(() => {
        const loader = document.createElement("script");
        loader.innerHTML = `

        function initAutocomplete() {
          setTimeout(() => {
         console.log('document.getElementById("product-location")')
         console.log(document.getElementById("product-location"))
            autocomplete = new google.maps.places.Autocomplete(
              document.getElementById("product-location"), {
                types: ["address"],
                componentRestrictions: {
                  'country': ["NG"]
                },
                fields: ["place_id", "geometry", "name"]
              });
          }, [3000])
    
    
        }
        initAutocomplete();
        
        `;

        document.body.appendChild(loader);

        return () => {
            document.body.removeChild(loader);
        }

        // }
    }, [isOpen])


    return (
        <>
            <button onClick={openModal} className="action-icon">
                <PencilIcon width={19} className="inline text-slate-600" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => 0}
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
                            <div className="inline-block border border-slate-200 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-center leading-6 text-gray-900"  >
                                    EDIT PRODUCT
                                </Dialog.Title>

                                <form className="mt-8 space-y-6" action="http://localhost:5000/register" method="post" onSubmit={handleEditProduct}>
                                    <div className="rounded-md shadow-sm">
                                        <div>
                                            <label htmlFor="product-name" className="text-sm">
                                                Product Name
                                            </label>
                                            <input
                                                id="product-name"
                                                name="productname"
                                                type="text"
                                                defaultValue={props.productData.productname}
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Product Name"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="last-Name" className="text-sm">
                                                Product Image
                                            </label>
                                            <div className="flex">
                                                <input
                                                    onChange={handleFileInput}
                                                    id="product-image"
                                                    name="productimage"
                                                    type="file"
                                                    accept="image/*"
                                                    required
                                                    multiple
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                />

                                                <img className="rounded-md img ml-4 border" src={fileRef.file?.split("\n")[0]} style={{ width: "60px", height: "24px" }} alt="" />
                                            </div>
                                        </div>
                                        <div className="mt-2">

                                            <label htmlFor="product-category" className="text-sm">
                                                Product Category
                                            </label>
                                            <select
                                                id="product-category"
                                                name="product-category"
                                                defaultValue={props.productData.productcategory}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="Digital Led Board">
                                                    Digital Led Board
                                                </option>
                                                <option value="Gantries">Gantries</option>
                                                <option value="Wall drape">Wall drape</option>
                                                <option value="Unipole">Unipole</option>
                                                <option value="Roof Top Boars">Roof Top Boards</option>
                                                <option value="Lamp Poles">Lamp Poles</option>
                                                <option value="Bus Branding">Bus Branding</option>
                                                <option value="Bus Shelter Branding">Bus Shelter Branding</option>
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="product-price" className="text-sm">
                                                Product Price
                                            </label>
                                            <input
                                                id="product-price"
                                                name="productprice"
                                                type="text"
                                                required
                                                defaultValue={props.productData.productprice}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="product-location" className="text-sm">
                                                Product Location
                                            </label>
                                            <input
                                                id="product-location"
                                                name="productlocation"
                                                type="text"
                                                required
                                                defaultValue={props.productData.productlocation}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="product-status" className="text-sm">
                                                Product Status
                                            </label>
                                            <select
                                                id="product-status"
                                                name="productstatus"
                                                defaultValue={props.productData.productstatus}
                                                className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            >
                                                <option value="Available">
                                                    Available
                                                </option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div>
                                        <p className='error-msg my-2 text-e_red text-center'>
                                            {error.message}
                                        </p>
                                        <button
                                            type="submit"
                                            className={` ${loading ? "cursor-wait opacity-40" : ""}group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`}>
                                            Continue
                                        </button>
                                        <div>
                                            <p onClick={closeModal} className="text-center mx-auto text-e_red mt-4 block cursor-pointer">
                                                Cancel
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const DeleteProduct = (props: { productData: ProductData }) => {
    let [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const productState = useAppSelector(selectProductsState);

    const handleDeleteProduct = async () => {
        if (loading)
            return
        try {
            setLoading(true);

            const response = await dispatch(deleteProductAsync(props.productData));
            toast.success("Product deleted successfully")

            closeModal()
            setLoading(false);

        } catch (error) {
            toast.error("Error in deleting product")

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
            <button onClick={openModal} className="action-icon">
                <TrashIcon width={19} className="inline text-slate-600" />
            </button>

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
                                    Delete Product
                                </Dialog.Title>

                                <Dialog.Description as="h3" className="text-center mt-8 mb-4">
                                    Are you sure?
                                </Dialog.Description>
                                <button
                                    onClick={handleDeleteProduct}
                                    className={` ${loading ? "cursor-wait opacity-40" : ""}group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`}>
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

const ProductTable = (props: { productData: ProductData }) => {
    const productData = { ...props.productData };

    return (
        <tr>
            <td className="pl-6 px-3 py-4">
                <img className="avatar-img rounded-full inline mr-1" style={{ width: "24px", height: "24px" }} src={productData.productimage?.split("\n")[0]} alt="Billboard" />
                <small>{productData.productname}</small>
            </td>
            <td className="px-3 py-4">
                {productData.productcategory}
            </td>
            <td className="px-3 py-4">
                {moment(productData.addeddate).format("DD/MM/YYYY")}
            </td>
            <td className="px-3 py-4">
                ₦{parseToCurrency(productData.productprice as string)}
            </td>
            <td className="px-3 py-4">
                <small className={`${productData.productstatus == "Available" ? "text-emerald-400 bg-emerald-100" : "bg-slate-100 text-slate-400"} p-1 px-2 rounded-full`}>
                    {productData.productstatus}
                </small>
            </td>
            <td className="px-3 text-end">
                <EditProduct productData={productData} />
                <DeleteProduct productData={productData} />
            </td>
        </tr>
    )
}

const DashboardProducts = () => {

    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUserState);
    const productsState = useAppSelector(selectProductsState);

    useEffect(() => {
        (async () => {
            const response = await dispatch(getProductsAsync());
        })();
    }, [])

    return (
        <>
            {
                userState.userData.role?.toLowerCase() == "admin" ?
                    <div className="dashboard-orders py-4 px-6">
                        <div className="px-4">
                            <h1 className="font-medium text-xl">
                                Products
                            </h1>
                        </div>

                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-light">
                            <div className="flex justify-between p-4 flex-col lg:flex-row">
                                <div className="self-center">
                                    <div className="ml-3 flex">
                                        <SearchIcon width={14} className="inline text-warmGray-400 mr-3" />
                                        <input type="search" className="w-full border-0 outline-none bg-transparent" placeholder="Search" />
                                    </div>
                                </div>
                                <div>
                                    <AddProduct />
                                </div>
                            </div>
                            <div className="py-6">

                                <table className="table-auto w-full text-left whitespace-nowrap">
                                    <thead>
                                        <tr>

                                            <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 pl-6 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">
                                                Product
                                            </th>
                                            <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">
                                                Category
                                            </th>
                                            <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                                Added Date
                                            </th>
                                            <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                                Price
                                            </th>
                                            <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">

                                                Status
                                            </th>
                                            <th colSpan={1} title="Toggle SortBy" style={{ cursor: "pointer" }} className="px-3 border-t border-b border-gray-light bg-slate-100 py-4 uppercase text-xs font-normal">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsState.products && productsState.products.map((productState, index) => {
                                            return <ProductTable key={index} productData={productState} />
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <Navigate to="/" replace={true} />
            }
        </>
    )
}

export default DashboardProducts;