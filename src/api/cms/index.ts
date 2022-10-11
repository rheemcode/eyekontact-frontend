import axios from "axios";
import { PageContent } from "../../features/cms/cmsSlice";
import { APPURL } from "../../Utils";

export const getPage = async () => {
    return await axios.get(`${APPURL}/webpage`);
}

export const savePage = async (data: PageContent) => {
    return await axios.post(`${APPURL}/webpage`, { content: JSON.stringify(data) });
}
