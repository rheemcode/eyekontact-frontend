import axios from "axios"
import { UserData, ProductData } from "../../features/types"
import { APPURL } from "../../Utils";

export const checkoutProduct = async (userData: any, productData: ProductData) => {
    return await axios.post(`${APPURL}/checkout`, { userData, productData });
}

declare interface TransctionData {
    tx_ref: string,
    transactionId: string | number;
    status: string;
}

// /tx_ref=ref&transaction_id=30490&status=successful.
export const verifTransaction = async (data: TransctionData) => {
    return await axios.post(`${APPURL}/transaction?tx_ref=${data.tx_ref}&transaction_id=${data.transactionId}&status=${data.status}`);
}