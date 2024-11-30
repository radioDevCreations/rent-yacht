import "./RP3Page.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import PageContainerProps from "../Pages/PageContainerProps";

const Page3 = ({ isActive }: PageContainerProps) => {
	return <article className="rp-container">RP3Page: {"" + isActive}</article>;
};

export default Page3;
