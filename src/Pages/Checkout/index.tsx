import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { checkoutProduct } from "../../api/transaction";
import ErrorModal from "../../Components/ErrorModal";
import PageBanner from "../../Components/PageBanner";
import SuccessModal from "../../Components/SuccessModal";
import { ProductData } from "../../features/types";
import { selectUserData, selectUserState, useAppDispatch, useAppSelector } from "../../hooks";
import { Fancybox } from "@fancyapps/ui";
import { getProductsAsync } from "../../features/products/productsSlice";


const Checkout = () => {
    const [params, setParams] = useSearchParams();
    const userState = useAppSelector(selectUserState);
    const userData = useAppSelector(selectUserData);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const productimages = useRef<string[]>([]);
    const dispatch = useAppDispatch();

    const ref = useRef(HTMLDivElement.prototype)
    const [productData, setProductData] = useState<ProductData | null>(null)

    useEffect(() => {
        (async () => {
            const res: any = await dispatch(getProductsAsync());
            const products = res.payload.data as ProductData[];
            const product = products.find((product) => product.productid == params.get("productid") as string) as ProductData | null;
            productimages.current = product?.productimage?.split("\n") as string[];
            setProductData(product)
        })()
    }, [])

    useEffect(() => {

    }, []);

    const handleViewImages = () => {
        let gallery = productimages.current.map((val) => { return { src: val, thumb: val } })

        Fancybox.show(gallery, {
            animated: false,
            showClass: false,
            hideClass: false,

            click: false,

            dragToClose: false,

            Image: {
                zoom: false,
            },

            Toolbar: {
                display: [{ id: "counter", position: "center" }, "close"],
            },
        })
    }


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isCheckingOut)
            return;

        const fullName = (ref.current.querySelector('[name="fullName"]') as HTMLInputElement).value;
        const email = (ref.current.querySelector('[name="email"]') as HTMLInputElement).value;
        const phoneNumber = (ref.current.querySelector('[name="phoneNumber"]') as HTMLInputElement).value;
        const message = (ref.current.querySelector('[name="message"]') as HTMLInputElement).value;

        const _userData = {
            userid: userData.userid,
            fullName,
            email,
            phoneNumber,
            message
        };

        if (productData) {
            const response = await checkoutProduct(_userData, productData as ProductData);
            if (response) {
                setIsCheckingOut(false);
                if (response.data.status === "success") {
                    setShowSuccessModal(true);
                    return;
                }

                setShowErrorModal(true);
            }

        }
    }


    return (

        <div className="checkout" ref={ref}>
            <SuccessModal show={showSuccessModal} message={"Order book successfully!"} onCloseFn={setShowSuccessModal} />
            <ErrorModal show={showErrorModal} message={"Couldn't book order right now!"} onCloseFn={setShowErrorModal} />
            <PageBanner title={"Booking"} path="Products" />
            <div className="lg:p-12 p-4">
                <h1 className="font-bold text-3xl text-center text-red">Book A Product</h1>
                <div className="flex mt-12 lg:px-12 px-6">
                    {/*<>
                        <div className="lg:w-6/12">
                            <div className="w-full mb-8">
                                <img onClick={handleViewImages} className="a aspect-video img product-img cursor-pointer w-full h-[auto]" src={productimages.current[0]} alt="" />
                            </div>
                            <span className="text-sm text-stone-9">
                                Name:
                            </span>
                            <h1 className="mb-4 text-xl font-bold">
                                {
                                    productData?.productname
                                }
                            </h1>
                            <span className="text-sm text-stone-9">
                                Location:
                            </span>
                            <h1 className="mb-4 text-xl font-bold">
                                {
                                    productData?.productlocation
                                }
                            </h1>
                            <span className="text-sm text-stone-9">
                                Category:
                            </span>
                            <h1 className="mb-4 text-xl font-bold">
                                {
                                    productData?.productcategory
                                }
                            </h1>
                            <span className="text-sm text-stone-9">
                                Description:
                            </span>
                           
                            </p>
                        </div>
                            </>*/}
                    <div className="lg:w-8/12 h-full mx-auto">
                        <div className="stic sticky top-0">
                            <form action="" >
                                <div>
                                    <span className="text-xl">
                                        Name
                                    </span>
                                    <input name="fullName" required type="text" className="w-full bg-slate-50 shadow-none rounded border border-slate-200 p-2" />
                                </div>
                                <div className="mt-4">
                                    <span className="text-xl">
                                        Email
                                    </span>
                                    <input name="email" required type="email" className="w-full bg-slate-50 shadow-none rounded border border-slate-200 p-2" />
                                </div>
                                <div className="mt-4">
                                    <span className="text-xl">
                                        Phone Number
                                    </span>
                                    <input name="phoneNumber" required type="text" className="w-full bg-slate-50 shadow-none rounded border border-slate-200 p-2" />
                                </div>
                                <div className="mt-4">
                                    <span className="text-xl">
                                        Message
                                    </span>
                                    <textarea name="message" rows={10} className="w-full bg-slate-50 shadow-none rounded border border-slate-200 p-2" />
                                </div>
                                <button onClick={handleSubmit} type="submit" className={`mt-8 block btn text-white bg-yellow py-3 rounded text-center w-full ${isCheckingOut ? "opacity-60 cursor-wait" : ""}`}>
                                    Book Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;