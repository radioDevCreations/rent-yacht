import "./RPFinalize.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import PageContainerProps from "../Pages/PageContainerProps";

const PageFinalize = ({ isActive }: PageContainerProps) => {
	return <article className="rp-container">Finalize: {"" + isActive}</article>;
};

export default PageFinalize;
