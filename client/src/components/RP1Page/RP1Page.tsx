import "./RP1Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

interface RPContainerProps {
	isActive: boolean;
}

const RP1Page = ({ isActive }: RPContainerProps) => {
	return <article className="rp-container">RP1Page: {"" + isActive}</article>;
};

export default RP1Page;
