import "./RPFinalize.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

interface RPContainerProps {
	isActive: boolean;
}

const RPFinalize = ({ isActive }: RPContainerProps) => {
	return <article className="rp-container">Finalize: {"" + isActive}</article>;
};

export default RPFinalize;
