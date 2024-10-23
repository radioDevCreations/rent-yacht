import "./RP4Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

interface RPContainerProps {
	isActive: boolean;
}

const RP4Page = ({ isActive }: RPContainerProps) => {
	return <article className="rp-container">RP4Page: {"" + isActive}</article>;
};

export default RP4Page;
