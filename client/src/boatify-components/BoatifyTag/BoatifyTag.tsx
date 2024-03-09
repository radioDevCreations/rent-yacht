import TagType from "@/utilities/TagType";
import { ChangeEventHandler } from "react";
import "./BoatifyTag.scss";

interface BoatifyTagProps {
	label?: string;
	type?: TagType;
}

const BoatifyTag = ({ label, type }: BoatifyTagProps) => {
	const tagClass = "tag";
	return (
		<div className={tagClass}>
			{type == TagType.days && (
				<>
					<span>{label}</span>
				</>
			)}
		</div>
	);
};

export default BoatifyTag;
