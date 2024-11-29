import axiosInstance from "@/axios/httpClient";
import SortDirection from "@/utilities/SortDirection";
import queryString from 'query-string';

abstract class DataLoader {

	//HARBOURS

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

	//RESERVATIONS

	static selectUserReservations = async (userId: number): Promise<any> => {
		return await axiosInstance.get(`https://localhost:5000/api/reservation/user/${userId}`)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};

	//BOATS

	static selectAllSpecificBoats = async (
		pageNumber: number, 
		pageSize: number,
		sortBy: string,
		sortDirection: SortDirection,
		searchPhrase?: string
	): Promise<any> => {
		return await axiosInstance.get(`https://localhost:5000/api/boat?${queryString.stringify(searchPhrase ? {searchPhrase, pageNumber, pageSize, sortBy, sortDirection} : {pageNumber, pageSize, sortBy, sortDirection})}`)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};

	static selectAllBoats = async (): Promise<any> => {
		return await axiosInstance.get(`https://localhost:5000/api/boat/all`)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
}

export default DataLoader;
