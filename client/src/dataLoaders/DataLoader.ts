abstract class DataLoader {
	static selectCurrentUser = async (): Promise<any> => {
		const res = await fetch("http://127.0.0.1/@me");
		const data = await res.json();
		return data;
	};
	static selectBoats = async (): Promise<any> => {
		const res = await fetch("http://127.0.0.1/boats");
		const data = await res.json();
		return data;
	};
	static selectHarbours = async (): Promise<any> => {
		const res = await fetch("http://127.0.0.1/harbours");
		const data = await res.json();
		return data;
	};
}

export default DataLoader;
