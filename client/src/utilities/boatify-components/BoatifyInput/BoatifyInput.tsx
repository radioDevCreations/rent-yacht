interface BoatifyInputProps {
	label: string;
}

const BoatifyInput = ({}: BoatifyInputProps) => {
	return (
		<div className="input">
			<span className="input__label">Email</span>
			<input className="input__field" type="email" placeholder="Login" />
		</div>
	);
};

export default BoatifyInput;