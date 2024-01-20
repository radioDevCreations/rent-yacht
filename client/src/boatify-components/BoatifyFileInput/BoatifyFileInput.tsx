interface BoatifyFileInputProps {
	label: string;
}

const BoatifyFileInput = ({}: BoatifyFileInputProps) => {
	return (
		<div className="file-input">
			<span className="input__label">Email</span>
			<input className="input__field" type="email" placeholder="Login" />
		</div>
	);
};

export default BoatifyFileInput;
