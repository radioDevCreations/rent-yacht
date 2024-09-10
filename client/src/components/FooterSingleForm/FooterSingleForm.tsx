import Link from "next/link";
import "./FooterSingleForm.scss";

const FooterSingleForm = ({ problem, link } : any) => {
	return (
		<footer className="footer">
			<button className="footer-button"></button>
			{problem && (
				<div className="footer-label">
					{problem}
					{link && (
						<Link href={link.href} className="footer-link">
							{link.linkText}
						</Link>
					)}
					.
				</div>
			)}
		</footer>
	);
};

export default FooterSingleForm;
