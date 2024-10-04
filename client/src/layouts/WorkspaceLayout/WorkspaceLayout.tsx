import "../../styles/globals.css";
import "../../styles/styles.scss";
import "./WorkspaceLayout.scss";
import Provider from "@/redux/Provider";
import Children from "@/utilities/Children";

const WorkspaceLayout = ({ children }: Children) => {
	return (
		<Provider>
			<main className="workspace-layout">{children}</main>
		</Provider>
	);
};

export default WorkspaceLayout;
