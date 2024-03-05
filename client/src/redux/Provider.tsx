"use client";

import Children from "@/utilities/Children";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

const Provider = ({ children }: Children) => {
	return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Provider;
