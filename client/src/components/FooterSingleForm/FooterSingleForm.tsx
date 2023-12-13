import Link from "next/link";
import "./FooterSingleForm.scss";

const FooterSingleForm = ({ problem }) => {
	return (
		<footer className="footer">
			<button className="footer-button"></button>
			<div className="footer-label">
				{problem} Contact{" "}
				<Link href="/email" className="footer-link">
					support
				</Link>
				.
			</div>
		</footer>
	);
};

export default FooterSingleForm;
