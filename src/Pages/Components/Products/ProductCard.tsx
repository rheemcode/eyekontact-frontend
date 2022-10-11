import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkoutProduct } from "../../../api/transaction";
import { ProductData } from "../../../features/types";
import { useAppSelector, selectUserState, selectUserData } from "../../../hooks";
import { HTTPCode } from "../../../Utils";
import { Fancybox } from "@fancyapps/ui";
import "./style.css";

declare interface CheckoutResponse {
    status: string | number, message: string, data: { link: string }
}

export const ProductCardPlaceholder = () => {

    return (
        <div className="product-card-placeholder shadow-lg cursor-wait" >
            <div className="flex flex-col">
                <div className="bg-slate-500 bg-" style={{ width: "280px", height: "280px" }}>

                </div>
                <div className="py-4 px-3">
                    <div className="text-center mb-3 placeholder-glow">
                        <span className="placeholder w-10/12 h-5 bg-red"></span>
                    </div>
                    <div>
                        <span className="placeholder-glow placeholder h-[1rem] mr-4 w-4/12 bg-slate-400"></span>
                        <span className="placeholder placeholder-glow h-[1rem] w-6/12 bg-slate-400"></span>
                    </div>

                    <div>
                        <span className="placeholder w-7/12 bg-slate-400 h-[1rem] placeholder-glow"></span>
                    </div>
                    <div>
                        <span className="placeholder w-4/12 h-[1rem] bg-slate-400 placeholder-glow"></span>
                    </div>
                    <div className="mt-4">
                        <div>
                            <button className="btn cursor-wait text-transparent h-10 bg-yellow py-2 rounded text-center w-full">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductCard: React.FC<ProductData> = (props) => {
    const userState = useAppSelector(selectUserState);
    const userData = useAppSelector(selectUserData);
    const productimages = useRef<string[]>([]);

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = () => {
        return async () => {
            try {
                if (isCheckingOut)
                    return;

                if (!userState.isLogin) {
                    navigate("/login");
                    return;
                }
                setIsCheckingOut(true);
                const response = await checkoutProduct(userData, { ...props });
                const responseData = response.data as CheckoutResponse;
                setIsCheckingOut(false);
                if (response.status == HTTPCode.OK) {
                    window.location.replace(responseData.data.link)
                }

            } catch (error) {
                console.log(error);
                setIsCheckingOut(false);
            }
        }
    }

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

    useEffect(() => {
        productimages.current = props.productimage?.split("\n") as string[];
    }, []);

    return (
        <div className="product-card shadow-lg">
            <div className="flex flex-col">
                <div className="">
                    <img onClick={handleViewImages} className="img product-img cursor-pointer w-full h-[280px]" src={props.productimage?.split("\n")[0]} alt="" />
                </div>
                <div className="py-4 px-3">
                    <div className="text-left mb-3">
                        <span className="text-lg font-bold text-red">{props.productname}</span>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id risus non ligula
                        </p>
                    </div>
                    <div>
                        <span className="font-medium text-sm text-gray-dark">

                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill={`${props.productstatus ? "green" : "orange"}`} className="mr-2 inline bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>  {props.productstatus ? "Available" : "Not Available"}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-sm" style={{ color: "gray" }}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="gray" className="inline mr-2 bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            {props.productlocation}
                        </span>
                    </div>
                    <div>
                        <CurrencyDollarIcon width={10} className="inline mr-2" />
                        <span className="font-medium text-sm " style={{ color: "gray" }}>
                            {props.productprice}
                        </span>
                    </div>
                    <div className="mt-4">
                        <Link to={`/checkout?productid=${props.productid}`} className={`block btn text-white bg-yellow py-2 rounded text-center w-full ${isCheckingOut ? "cursor-wait opacity-40" : ""}`}>
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;

