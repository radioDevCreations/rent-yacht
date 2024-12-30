import PaymentLoader from '@/dataLoaders/PaymentLoader';
import DataLoader from '@/dataLoaders/DataLoader'; // Import DataLoader for updating reservation status
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import ReservationStatus from '@/utilities/ReservationStatus';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';

interface PayPalButtonProps {
  reservationId: number | undefined;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ reservationId }) => {
  const onApprove = async (orderId: string) => {
    try {
      const token = sessionStorage.getItem('token');
      
      await PaymentLoader.handleApprove(token, orderId);
      
      await DataLoader.updateReservationStatus(token, {
        reservationId: reservationId,
        reservationStatus: ReservationStatus.Payed,
      });

      BoatifyGoTo('/my-reservations');
    } catch (error) {
      console.error('Error during payment approval or status update:', error);
      alert('An error occurred while processing the payment.');
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: '10.00',
                },
              },
            ],
          });
        }}
        onApprove={(data) => {
          if (data.orderID) {
            return onApprove(data.orderID);
          }
          console.error('Order ID not available');
          alert('Payment could not be completed.');
          return Promise.resolve();
        }}
        onError={(err) => {
          console.error('PayPal Checkout Error:', err);
          alert('Payment could not be completed.');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;