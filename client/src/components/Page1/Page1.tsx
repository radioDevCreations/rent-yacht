import "./RP1Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import PageContainerProps from "../Pages/PageContainerProps";

const Page1 = ({ isActive }: PageContainerProps) => {
	return <article className="rp-container">RP1Page: {"" + isActive}</article>;
};

export default Page1;
