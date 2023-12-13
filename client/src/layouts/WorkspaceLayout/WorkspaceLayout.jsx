import "../../styles/styles.scss";
import "./WorkspaceLayout.scss";
import Provider from "@/redux/Provider";

const WorkspaceLayout = ({ children }) => {
	return (
		<Provider>
			<main className="workspace-layout">{children}</main>
		</Provider>
	);
};

export default WorkspaceLayout;
