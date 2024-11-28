import axiosInstance from "@/axios/httpClient";

abstract class DataLoader {
	static selectAllHarbours = async (): Promise<any> => {
		return await axiosInstance.get("https://localhost:5000/api/harbour")
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
	static selectHarbour = async (id: number): Promise<any> => {
		return await axiosInstance.get(`https://localhost:5000/api/harbour/${id}`)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
	static deleteHarbour = async (id: number): Promise<any> => {
		return await axiosInstance.delete(`https://localhost:5000/api/harbour/${id}`)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
	static selectUserReservations = async (userId: number): Promise<any> => {
		return await axiosInstance.get(`https://localhost:5000/api/reservation/user/${userId}`)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};

}

export default DataLoader;
