import "./RP2Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import PageContainerProps from "../Pages/PageContainerProps";

const Page2 = ({ isActive }: PageContainerProps) => {
	return <article className="rp-container">RP2Page: {"" + isActive}</article>;
};

export default Page2;
