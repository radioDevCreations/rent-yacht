import PaymentLoader from '@/dataLoaders/PaymentLoader';
import DataLoader from '@/dataLoaders/DataLoader';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useState, useEffect } from 'react';
import ReservationStatus from '@/utilities/ReservationStatus';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Reservation from '@/models/Reservation';
import Captions from '@/captions/captions';

interface PayPalButtonProps {
  reservationId?: number | null;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ reservationId }) => {
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      if (!reservationId) {
        console.error('Reservation ID is not provided.');
        return;
      }

      try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('User token not found.');

        const response = await DataLoader.selectReservationById(token, reservationId);
        setReservation(response);
      } catch (error) {
        console.error('Error fetching reservation details:', error);
      }
    };

    fetchReservation();
  }, [reservationId]);

  const onApprove = async (orderId: string) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('User token not found.');

      if (!reservationId) throw new Error('Invalid reservation ID.');

      await PaymentLoader.handleApprove(token, orderId);

      await DataLoader.updateReservationStatus(token, {
        reservationId,
        reservationStatus: ReservationStatus.Payed,
      });

      BoatifyGoTo('/my-reservations');
    } catch (error) {
      console.error('Error during payment approval or status update:', error);
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', currency: 'PLN' }}>
      {reservation ? (
        <PayPalButtons
          createOrder={(data, actions) => {
            if (!reservation?.totalPrice) {
              console.error('Total price not available for the reservation.');
              return Promise.reject();
            }

            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: Captions.PLN,
                    value: reservation.totalPrice.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={(data) => {
            if (data.orderID) {
              return onApprove(data.orderID);
            }
            console.error('Order ID not available.');
            return Promise.reject();
          }}
          onError={(err) => {
            console.error('PayPal Checkout Error:', err);
          }}
        />
      ) : (
        <div>Loading reservation details...</div>
      )}
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
