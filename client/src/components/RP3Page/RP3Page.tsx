import "./RP3Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

interface RPContainerProps {
	isActive: boolean;
}

const RP3Page = ({ isActive }: RPContainerProps) => {
	return <article className="rp-container">RP3Page: {"" + isActive}</article>;
};

export default RP3Page;
