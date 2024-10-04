import "../../styles/styles.scss";
import "./PageSection.scss";

import Children from "@/utilities/Children";
import PageVariant from "./PageVariant";

interface PageSectionProps extends Children {
	variant: PageVariant;
}

const PageSection = ({ children, variant }: PageSectionProps) => {
	return (
		<section className={`page-section page-section--${variant}`}>
			{children}
		</section>
	);
};

export default PageSection;
