abstract class DataLoader {
	static getAllHarbours = async (): Promise<any> => {
		const res = await fetch("http://localhost:5000/api/harbours");
		const data = await res.json();
		return data;
	};
}

export default DataLoader;
