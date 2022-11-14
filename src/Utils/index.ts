import moment from "moment";
import { OrderData, ProductData, UserData } from "../features/types";


export const APPURL = process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://eyekontact-server.herokuapp.com";
export declare interface IEvent {
    name: string;
    type: string;
    fn: Function;
}

export class EventHandler {
    static events: IEvent[] = []

    static subscribe(event: IEvent) {
        if (!EventHandler.events.find(value => value.name == event.name))
            EventHandler.events.push(event);
    }

    static unsubscribe(event: IEvent) {
        EventHandler.events = EventHandler.events.filter((value) => value.name != event.name);
        console.log(EventHandler.events)
    }

    static callEvents(e: Event) {
        for (let event of EventHandler.events) {
            if (e.type == event.type)
                event.fn(e)
        }
    }
}

export const isInViewport = (element: HTMLElement | null) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


export const parseToCurrency = (amount: string | number) => {
    amount = amount.toString()
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, "$&,");
    return amount;
}

export const parseFromCurrency = (amount: string) => {
    return amount.split(",").join("");
}

export const abbreviateAmount = (amount: string | number) => {
    let abbvr = "";
    let amountStr = amount.toString();
    if (amountStr.includes(",")) {
        amountStr = parseFromCurrency(amountStr);
    }

    let chunks: string[] = [];
    for (let i = amountStr.length; i > 0; i -= 3) {
        chunks.push(amountStr.substring(i, i - 3));
    }

    chunks = chunks.reverse();

    if (chunks.length == 2) {
        abbvr = "K";
    }

    else if (chunks.length == 3) {
        abbvr = "M";
    }

    else if (chunks.length == 4) {
        abbvr = "B";
    }

    return chunks[0] + abbvr
}

export enum AppStateMachine {
    Start,
    Pending,
    Completed,
    Error
}

export enum HTTPCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    FOUND = 302,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    CONFLICT = 409,
    SERVER_ERROR = 500
}

export const blogCategories = [
    { name: "Food", value: "food" },
    { name: "Travel", value: "travel" },
    { name: "Health and Fitness", value: "health and fitness" },
    { name: "Lifestyle", value: "lifestyle" },
    { name: "Fashion and Beauty", value: "fashion and beauty" },
    { name: "Photography", value: "Photography" },
    { name: "DIY Craft", value: "DIY craft" },
    { name: "Music", value: "music" },
    { name: "Education", value: "education" },
    { name: "Finance", value: "finance" },
    { name: "Interior Design", value: "interior design" },
    { name: "Sports", value: "sports" },
    { name: "News", value: "news" },
    { name: "Movie", value: "movie" },
    { name: "Politics", value: "politics" }
]




declare interface IMonthlyOrders {
    Jan: string[],
    Feb: string[],
    Mar: string[],
    Apr: string[],
    May: string[],
    Jun: string[],
    Jul: string[],
    Aug: string[],
    Sep: string[],
    Oct: string[],
    Nov: string[],
    Dec: string[]
}

export const calculateMonthlyOrderCount = (ordersData: OrderData[], productsData: ProductData[], month?: number) => {
    const monthlyOrderCount = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0
    };

    let monthlyTotal: number[] = [];

    ordersData.forEach((orderData) => {
        switch (moment(orderData.orderdate).month()) {
            case 0: {

                monthlyOrderCount.Jan++;
                break
            }
            case 1: {

                monthlyOrderCount.Feb++;
                break
            } case 0: {

                monthlyOrderCount.Mar++;
                break
            } case 0: {

                monthlyOrderCount.Apr++;
                break
            } case 0: {

                monthlyOrderCount.May++;
                break
            } case 0: {

                monthlyOrderCount.Jun++;
                break
            } case 0: {

                monthlyOrderCount.Jul++;
                break
            } case 0: {

                monthlyOrderCount.Aug++;
                break
            } case 0: {

                monthlyOrderCount.Sep++;
                break
            } case 0: {

                monthlyOrderCount.Oct++;
                break
            } case 0: {

                monthlyOrderCount.Nov++;
                break
            } case 0: {

                monthlyOrderCount.Dec++;
                break
            }
        }
    });

    for (let month in monthlyOrderCount) {
        monthlyTotal.push(monthlyOrderCount[month]);
    }

    return monthlyTotal;
}

export const calculateMonthlyOrderAmount = (ordersData: OrderData[], productsData: ProductData[], month?: number) => {
    const monthlyOrderAmount: IMonthlyOrders = {
        Jan: [],
        Feb: [],
        Mar: [],
        Apr: [],
        May: [],
        Jun: [],
        Jul: [],
        Aug: [],
        Sep: [],
        Oct: [],
        Nov: [],
        Dec: []
    };

    let monthlyTotal: number[] = [];

    if (month) {
        const monthOrders = ordersData.filter((orderData) => {
            return moment(orderData.orderdate as string).month() === month;
        });
        return monthOrders;
    }

    ordersData.forEach((orderData) => {
        switch (moment(orderData.orderdate).month()) {
            case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Jan.push(product?.productprice as string);
                break
            }
            case 1: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Feb.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Mar.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Apr.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.May.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Jun.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Jul.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Aug.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Sep.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Oct.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Nov.push(product?.productprice as string);
                break
            } case 0: {
                const product = productsData.find((product) => product.productid == orderData.productid)
                monthlyOrderAmount.Dec.push(product?.productprice as string);
                break
            }
        }
    });

    for (let month in monthlyOrderAmount) {
        let monthTotal = 0;

        for (let monthOrder of monthlyOrderAmount[month]) {
            let amount = Number(monthOrder);
            monthTotal += amount;
        }

        monthlyTotal.push(monthTotal);
    }

    return monthlyTotal;
}

export const getImage = (name: string) => {
    return process.env.PUBLIC_URL + "/images/" + name;
}

export const getPath = (name: string) => {
    return process.env.PUBLIC_URL + name;
}


export const getIcon = (name: string) => {
    return process.env.PUBLIC_URL + "/icons/" + name;
} 