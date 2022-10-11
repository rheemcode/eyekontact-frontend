import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLoading from "../../Components/Loader";
import PageBanner from "../../Components/PageBanner";
import { getProductsAsync } from "../../features/products/productsSlice";
import { ProductData, ResponseData } from "../../features/types";
import { selectProductsState, useAppDispatch, useAppSelector } from "../../hooks";
import { BillboardBG, BillboardBG3, ProductImg, ProductImg1, ProductImg2 } from "../../images";
import { AppStateMachine, HTTPCode } from "../../Utils";
import Footer from "../Components/Footer";
import ProductCard, { ProductCardPlaceholder } from "../Components/Products/ProductCard";
import ServicesSection from "../Components/Services/ServiceSection";
import ClientTestimonial from "../Components/Testimonial";
import "./style.css"

const WorkWithUsSection = () => {
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.productsState);

    return (
        <div className="work-with-us py-24">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-6/12 px-20">
                    <h1
                        id="heading"
                        className="text-white text-3xl lg:text-7xl font-extrabold text-center lg:text-left"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.heading }}
                    />
                </div>
                <div className="lg:w-6/12 px-20 ml text-white text-center mt-24 lg-mt-0">
                    <div className="mb-8">
                        <h1

                            id="heading2"
                            className="font-bold text-white"
                            dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.heading2 }}
                        />
                    </div>
                    <h1 id="phone" className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.phone }}
                    />
                    <h1

                        id="email"
                        className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.email }}
                    />
                    <h1

                        id="address"
                        className="text-lg mb-3"
                        dangerouslySetInnerHTML={{ __html: pageContent.workWithUsSectionState.address }}
                    />
                </div>
            </div>
        </div>
    )
}

const FilterSection = () => {

}

declare interface FilterNavProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
}

const FilterNav: React.FC<FilterNavProps> = (props) => {
    return (
        <div onClick={props.onClick} className="ml-2 px-3 py-1 bg-gray-light border border-gray-dark inline">
            <span>{props.title}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-1 inline bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </span>
        </div>
    )
}


const AppliedFilter = (props: { count: number }) => {
    return (
        <div className="applied-filter">
            <span className="font-bold mr-2">{props.count ? `Showing all ${props.count} result` : "No products found"}</span>
            {/* <div className="mt-3 flex">
                <FilterNav title="Lagos" />
                <FilterNav title="Available" />
            </div> */}
        </div>
    )
}


const ProductListSection = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const filters = useRef({ location: "", price: { min: "", max: "" } });
    // const [productcategory, setProductCategory] = useState({ category: "" });
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    let productsState = useAppSelector(selectProductsState);


    const dispatch = useAppDispatch();
    useEffect(() => {
        const loader = document.createElement("script");
        loader.innerHTML = `

        function initAutocomplete() {
          setTimeout(() => {
         console.log('document.getElementById("location")')
         console.log(document.getElementById("location"))
            autocomplete = new google.maps.places.Autocomplete(
              document.getElementById("location"), {
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
    }, [])

    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])


    useEffect(() => {
        (async () => {
            let productcategory = searchParams.get("product-category");
            let productlocation: any = searchParams.get("product-location");

            productcategory = productcategory?.split(/-|_/).join(" ") as string;
            productcategory = productcategory?.toLocaleUpperCase();
            // setProductCategory({ category: productcategory });

            const responseData = await dispatch(getProductsAsync());
            let responsePayload = responseData.payload as ResponseData;
            let responsePayloadData = responsePayload.data as ProductData[];

            responsePayloadData = responsePayloadData.filter((product) => {
                if (productcategory == "all") {
                    productlocation = productlocation?.split(" ") as string[];
                    for (let sub of productlocation) {
                        if (product.productlocation?.includes(sub)) return true;
                    }
                }
                return product.productcategory?.toLocaleLowerCase() == productcategory?.toLocaleLowerCase()
            })

            // productsState.current = responsePayloadData;

            if (responsePayload.code == HTTPCode.OK) {
                setFilteredProducts(responsePayloadData as ProductData[]);
            }
        }
        )()
    }, [])

    const sortProduct = () => {

    }

    // FIXME: not even to close
    const applyFilter = () => {

        setFilteredProducts(productsState.products.filter(
            (product) => {
                let productlocation = filters.current.location?.split(" ") as string[];
                for (let sub of productlocation) {
                    if (product.productlocation?.includes(sub)) return true;
                }
                return ((product.productprice as string) <= filters.current.price.max && (product.productprice as string) >= filters.current.price.min)
            }
        ));
    }


    return (
        <div className="product-list">
            <div className="p-6 lg:p-12  border-b bg-slate-0 border-b-slate-100">
                <AppliedFilter count={filteredProducts.length} />
            </div>
            <div className="flex flex-col-reverse lg:flex-row">
                <div className="p-6 lg:p-12 lg:w-9/12 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                        {
                            (productsState.state === AppStateMachine.Pending || productsState.state === AppStateMachine.Error || !filteredProducts.length) ?
                                [1, 2, 3].map((product, index) => <ProductCardPlaceholder key={index} />) :
                                filteredProducts.map((product, index) => <ProductCard key={index} {...product} />)
                        }
                    </div>
                </div>
                <div className="lg:w-3/12 p-8 border-b bg-slate-0 border-b-slate-100 border-l border-l-slate-100">
                    <div>
                        <h1 className="font-bold text-lg mb-6">
                            Filter Products
                        </h1>
                        <div>
                            <h1 className="text-lg mb-2 font-medium">Location</h1>
                            <input id="location" onChange={(e) => filters.current.location = e.target.value} type="text" className="px-3 border-none bg-zinc-50 rounded w-full py-3" />
                        </div>
                        <div className="mt-6">
                            <h1 className="font-medium text-lg mb-2">
                                Price
                            </h1>
                            <div className="flex justify-between flex-col">
                                <div className="">
                                    <span className="mr-2 text-sm font-bold">MIN</span>
                                    <input onChange={(e) => filters.current.price.min = e.target.value} type="text" min={0} max={10000000} defaultValue={1000} className="px-2 border-none bg-zinc-50 rounded py-1" name="" id="" />
                                </div>
                                <div className="mt-2">
                                    <span className="mr-2 text-sm font-bold">MAX</span>
                                    <input onChange={(e) => filters.current.price.max = e.target.value} type="text" min={0} max={10000000} defaultValue={5000} className="px-2 border-none bg-zinc-50 rounded py-1" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button onClick={applyFilter} className="bg-gray-dark text-white px-4 font-medium py-2">Apply Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Products = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [productType, setProductType] = useState({ productType: "" });

    //TODO: add to products page
    const homePageContent = useAppSelector((state) => state.pageContent.webPagesState.homeState);
    const pageContent = useAppSelector((state) => state.pageContent.webPagesState.productsState);


    useEffect(() => {
        let productType = searchParams.get("product-type");
        productType = productType?.split(/-|_/).join(" ") as string;
        productType = productType?.toLocaleUpperCase();
        productType = productType ? productType : "All Products";
        setProductType({ productType: productType });
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="services">
            <PageLoading />
            <PageBanner title={productType.productType} path="Products" image={pageContent.landingBg} />
            <ProductListSection />
            <ClientTestimonial {...homePageContent.testimonialSection} />
            <WorkWithUsSection />
        </div>
    );

}

export default Products;