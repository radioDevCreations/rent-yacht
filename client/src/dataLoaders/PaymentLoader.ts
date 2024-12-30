import axiosInstance from '@/axios/httpClient';
import { ApiURL } from '@/utilities/BaseUrl';
import { SystemBoolean } from '@/utilities/System';

const BoatifyApiURL = (source: string): string => {
  if (source[0] != '/') return `${ApiURL}/${source}`;
  else return `${ApiURL}${source}`;
};

abstract class PaymentLoader {
    //PAYPAL

    static handleApprove = async (
        token: string | null,
        orderId: string
      ): Promise<any> => {
        this.isTokenValid(token);
        return await axiosInstance
          .post(
            BoatifyApiURL('paypal/capture'),
            { orderId },
            {
              headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            }
          )
          .then((response) => response.data)
          .catch((error) => {
            console.error('Error capturing payment:', error);
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
export default PaymentLoader;
