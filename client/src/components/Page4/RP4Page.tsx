import "./RP4Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import PageContainerProps from "../Pages/PageContainerProps";

const Page4 = ({ isActive }: PageContainerProps) => {
	return <article className="rp-container">RP4Page: {"" + isActive}</article>;
};

export default Page4;
