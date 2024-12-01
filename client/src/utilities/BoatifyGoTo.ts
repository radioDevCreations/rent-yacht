import {BaseURL} from "./BaseUrl";

const BoatifyGoTo = (to: string) => {
    if (to[0] != '/') return window.open(`${BaseURL}/${to}`);
    else return window.open(`${BaseURL}${to}`);
    }

export default BoatifyGoTo;