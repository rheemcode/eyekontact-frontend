import { HTTPCode } from "../../Utils";


export interface UserData {
    userid?: string;
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
    role?: string;
    createddate?: string;
    password: string;
}


export declare interface OrderData {
    orderid?: string;
    userid?: string;
    productid?: string;
    productname?: string;
    orderdate?: string;
    productprice?: string;
    orderstatus?: string;
    paymentmethod?: string;
}


export declare interface ProductData {
    productid?: string;
    productname?: string;
    productimage?: string;
    productcategory?: string;
    productprice?: string;
    productlocation?: string;
    productstatus?: string;
    addeddate?: string;
}

export declare interface BlogData {
    blogid?: string;
    creatorid?: string;
    firstname?: string;
    lastname?: string;
    thumbnail?: string;
    title?: string;
    creator?: string;
    category?: string;
    createddate?: string;
    data?: string;
    tags?: string;
    status?: string;
    comments?: string;
    readtime?: string;
}

export declare interface PageResponse {
    version: string;
    content: string;
}

export declare interface ResponseData {
    code: HTTPCode;
    message: string;
    data?: PageResponse | string | UserData | UserData[] | BlogData | BlogData[] | ProductData | ProductData[]
    dataOld?: UserData | UserData[] | ProductData | ProductData[]

}