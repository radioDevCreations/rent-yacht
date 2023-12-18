import "./LoadingSpinner.scss";
import Image from "next/image";

const LoadingSpinner = () => {
	return (
		<main className="spinner">
			<Image
				src="/sail-boat.svg"
				alt="Boat"
				className="spinner__image"
				width={48}
				height={48}
			/>
			<span className="spinner__label">Loading</span>
		</main>
	);
};

export default LoadingSpinner;
