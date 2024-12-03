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

	 /**
     * Fetch all harbours.
     * @returns Promise<any> - List of all harbours.
     */
	 static selectAllHarbours = async (): Promise<any> => {
        return await axiosInstance
            .get(BoatifyApiURL("harbour"))
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

    /**
     * Fetch a specific harbour by ID.
     * @param id - The ID of the harbour to fetch.
     * @returns Promise<any> - Harbour data.
     */
    static selectHarbour = async (id: number): Promise<any> => {
        return await axiosInstance
            .get(BoatifyApiURL(`harbour/${id}`))
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

    /**
     * Delete a specific harbour by ID.
     * @param id - The ID of the harbour to delete.
     * @returns Promise<any> - Response data.
     */
    static deleteHarbour = async (id: number): Promise<any> => {
        return await axiosInstance
            .delete(BoatifyApiURL(`harbour/${id}`))
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

	//RESERVATIONS

	/**
     * Create a new reservation.
     * @param data - Reservation data including userId, boatId, startDate, endDate, totalPrice, and reservationStatusId.
     * @returns Promise<any> - Created reservation details.
     */
    static createReservation = async (data: {
        userId: number;
        boatId: number;
        startDate: string;
        endDate: string;
        totalPrice: number;
        reservationStatusId: number;
    }): Promise<any> => {
        return await axiosInstance
            .post(BoatifyApiURL(`reservation`), data)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

    /**
     * Fetch all reservations for a specific user.
     * @param userId - The ID of the user.
     * @returns Promise<any> - List of reservations for the user.
     */
    static selectUserReservations = async (userId: number): Promise<any> => {
        return await axiosInstance
            .get(BoatifyApiURL(`reservation/user/${userId}`))
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

	//BOATS

	/**
     * Fetch all boats with specific filters and pagination.
     * @property {number} pageNumber - The current page number for pagination (1-based index).
     * @property {number} pageSize - The number of items to display per page.
     * @property {string} sortBy - The field by which to sort the results (e.g., "name", "model").
     * @property {SortDirection} sortDirection - The direction of sorting: "ASC" for ascending or "DESC" for descending.
     * @property {string} [searchPhrase] - (Optional) A keyword or phrase to filter results by a search term.
     * @returns Promise<any> - Paginated list of boats.
     */
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

    /**
     * Fetch all boats without filters.
     * @returns Promise<any> - List of all boats.
     */
    static selectAllBoats = async (): Promise<any> => {
        return await axiosInstance
            .get(BoatifyApiURL("boat/all"))
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

	//BOAT AVAILABILITY

	/**
	 * Check if a boat is available for a specific period.
	 * @param boatId - ID of the boat to check.
	 * @param checkedStartDate - Start date of the desired period (ISO string).
	 * @param checkedEndDate - End date of the desired period (ISO string).
	 * @returns Promise<boolean> - True if available, false otherwise.
	 */
	 static isBoatAvailable = async (boatId: number, checkedStartDate: string, checkedEndDate: string): Promise<boolean> => {
        return await axiosInstance
            .get(BoatifyApiURL(`available/${boatId}?${queryString.stringify({ checkedStartDate, checkedEndDate })}`))
            .then(response => {
                return response.data; // Should be a boolean
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
    };

    /**
     * Get all reserved dates for a specific boat.
     * @param boatId - ID of the boat.
     * @returns Promise<string[]> - List of reserved dates (ISO strings).
     */
    static getAllReservedDatesForBoat = async (boatId: number): Promise<string[]> => {
        return await axiosInstance
            .get(BoatifyApiURL(`available/${boatId}/dates`))
            .then(response => {
                return response.data; // Should be an array of ISO date strings
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
    };
}

export default DataLoader;
