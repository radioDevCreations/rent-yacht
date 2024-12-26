import axiosInstance from '@/axios/httpClient';
import User from '@/models/User';
import { ApiURL } from '@/utilities/BaseUrl';
import SortDirection from '@/utilities/SortDirection';
import { SystemBoolean } from '@/utilities/System';
import queryString from 'query-string';

const BoatifyApiURL = (source: string): string => {
  if (source[0] != '/') return `${ApiURL}/${source}`;
  else return `${ApiURL}${source}`;
};

abstract class DataLoader {
  //HARBOURS

  /**
   * Fetch all harbours.
   * @returns Promise<any> - List of all harbours.
   */
  static selectAllHarbours = async (): Promise<any> => {
    return await axiosInstance
      .get(BoatifyApiURL('harbour'))
      .then((response) => response.data)
      .catch((error) => {
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
      .then((response) => response.data)
      .catch((error) => {
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
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  //RESERVATIONS

  /**
   * Create a new reservation.
   * @param token - logged user authenticated token.
   * @param data - Reservation data including, boatId, startDate, endDate, totalPrice, and reservationStatusId.
   * @returns Promise<any> - Created reservation details.
   */

  static createReservation = async (
    token: string | null,
    data: {
      boatId: number | null;
      startDate: string | null;
      endDate: string | null;
      totalPrice: number;
      reservationStatusId: number;
    }
  ): Promise<any> => {
    this.isTokenValid(token);
    return await axiosInstance
      .post(BoatifyApiURL(`reservation`), data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  /**
   * Fetch all reservations for a specific user.
   * @param token - logged user authenticated token.
   * @returns Promise<any> - List of reservations for the user.
   */

  static selectUserReservations = async (
    token: string | null
  ): Promise<any> => {
    this.isTokenValid(token);
    return await axiosInstance
      .get(BoatifyApiURL(`reservation/my-reservations`), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
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
  static selectAllSpecificBoats = async (props: {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: SortDirection;
    searchPhrase?: string;
  }): Promise<any> => {
    const { pageNumber, pageSize, sortBy, sortDirection, searchPhrase } = props;
    return await axiosInstance
      .get(
        BoatifyApiURL(
          `boat?${queryString.stringify(searchPhrase ? { searchPhrase, pageNumber, pageSize, sortBy, sortDirection } : { pageNumber, pageSize, sortBy, sortDirection })}`
        )
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  /**
   * Fetch all boats without filters.
   * @returns Promise<any> - List of all boats.
   */
  static selectAllBoats = async (): Promise<any> => {
    return await axiosInstance
      .get(BoatifyApiURL('boat/all'))
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  /**
   * Fetch all boats without filters.
   * @param token - logged user authenticated token.
   * @returns Promise<any> - List of all boats.
   */
  static selectUserBoats = async (token: string | null): Promise<any> => {
    this.isTokenValid(token);
    return await axiosInstance
      .get(BoatifyApiURL('boat/my-boats'), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  /**
   * Fetch all boats without filters.
   * @param token - logged user authenticated token.
   * @returns Promise<any> - List of all boats.
   */
  static createBoat = async (
    token: string | null,
    harbourId: number,
    data: FormData
  ): Promise<any> => {
    this.isTokenValid(token);
    const response = await axiosInstance.post(
      `/api/harbour/${harbourId}/boat`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  /**
   * Fetch boat by id.
   * @returns Promise<any> - Boat data.
   */
  static selectBoatById = async (boatId: number | undefined): Promise<any> => {
    if (boatId === undefined) return;
    return await axiosInstance
      .get(BoatifyApiURL(`boat/${boatId}`))
      .then((response) => response.data)
      .catch((error) => {
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
  static isBoatAvailable = async (
    boatId: number,
    checkedStartDate: string,
    checkedEndDate: string
  ): Promise<boolean> => {
    return await axiosInstance
      .get(
        BoatifyApiURL(
          `available/${boatId}?${queryString.stringify({ checkedStartDate, checkedEndDate })}`
        )
      )
      .then((response) => {
        return response.data; // Should be a boolean
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  /**
   * Get all reserved dates for a specific boat.
   * @param boatId - ID of the boat.
   * @returns Promise<string[]> - List of reserved dates (ISO strings).
   */
  static getAllReservedDatesForBoat = async (
    boatId: number
  ): Promise<string[]> => {
    return await axiosInstance
      .get(BoatifyApiURL(`available/${boatId}/dates`))
      .then((response) => {
        return response.data; // Should be an array of ISO date strings
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  //ACCOUNT

  /**
   * Logs in a user with their email and password.
   * @param data - Object containing email and password.
   * @returns Promise<any> - User token upon successful login.
   */
  static loginUser = async (data: {
    email: string;
    password: string;
  }): Promise<any> => {
    return await axiosInstance
      .post(BoatifyApiURL(`account/login`), data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  /**
   * Fetches the current user's data based on the provided token.
   * @param token - Bearer token for authorization.
   * @returns Promise<any> - Current user data.
   */
  static getCurrentUserData = async (token: string | null): Promise<any> => {
    this.isTokenValid(token);
    return await axiosInstance
      .get(BoatifyApiURL(`account/me`), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  static updateUserData = async (token: string | null, userData: Partial<User>): Promise<any> => {
    this.isTokenValid(token);
    return await axiosInstance
      .post(BoatifyApiURL(`account/edit`), userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };


  //TOKEN VALIDATION

  /**
   * Validates a given token to ensure it is not null, undefined, or empty.
   * @param token - Token to validate.
   * @throws TokenException - If the token is invalid.
   * @returns boolean - True if the token is valid.
   */
  static isTokenValid = (token: string | null): boolean => {
    if (token == null || token == undefined || token?.length == 0)
      throw new TokenException('Unauthorized user');
    return SystemBoolean.True;
  };
}

/**
 * Creates a new TokenException instance.
 * @param message - Error message.
 * @param statusCode - HTTP status code (default is 401).
 */
class TokenException extends Error {
  statusCode;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = 'TokenException';
    this.statusCode = statusCode;
  }
}
export default DataLoader;
