import "./RP2Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

interface RPContainerProps {
	isActive: boolean;
}

const RP2Page = ({ isActive }: RPContainerProps) => {
	return <article className="rp-container">RP2Page: {"" + isActive}</article>;
};

export default RP2Page;
