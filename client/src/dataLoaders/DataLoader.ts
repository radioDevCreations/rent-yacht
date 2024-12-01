import axiosInstance from "@/axios/httpClient";
import { ApiURL } from "@/utilities/BaseUrl";
import SortDirection from "@/utilities/SortDirection";
import queryString from 'query-string';

const BoatifyApiURL= (source: string): string => {
	if (source[0] != '/') return `${ApiURL}/${source}`;
	else return `${ApiURL}${source}`;
}

abstract class DataLoader {

	//HARBOURS

	static selectAllHarbours = async (): Promise<any> => {
		return await axiosInstance.get(BoatifyApiURL("harbour"))
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
	static selectHarbour = async (id: number): Promise<any> => {
		return await axiosInstance.get(BoatifyApiURL(`harbour/${id}`))
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
	static deleteHarbour = async (id: number): Promise<any> => {
		return await axiosInstance.delete(BoatifyApiURL(`harbour/${id}`))
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};

	//RESERVATIONS

	static createReservation = async (data: {
		userId: number, 
		boatId: number,
		startDate: string,
  		endDate: string,
		totalPrice: number,
		reservationStatusId: number
	}): Promise<any> => {
		return await axiosInstance.post(BoatifyApiURL(`reservation`), data)
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			console.log(error)
			throw error;
		  });
	};

	static selectUserReservations = async (userId: number): Promise<any> => {
		return await axiosInstance.get(BoatifyApiURL(`reservation/user/${userId}`))
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
		return await axiosInstance.get(BoatifyApiURL(`boat?${queryString.stringify(searchPhrase ? {searchPhrase, pageNumber, pageSize, sortBy, sortDirection} : {pageNumber, pageSize, sortBy, sortDirection})}`))
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};

	static selectAllBoats = async (): Promise<any> => {
		return await axiosInstance.get(BoatifyApiURL(`boat/all`))
		  .then(response => {
			return response.data;
		  })
		  .catch(error => {
			throw error;
		  });
	};
}

export default DataLoader;
