import "./WorkspaceLayout.scss";
import Provider from "@/redux/Provider";

const WorkspaceLayout = ({ children }) => {
	return (
		<Provider>
			<div className="workspace-layout">{children}</div>
		</Provider>
	);
};

export default WorkspaceLayout;
