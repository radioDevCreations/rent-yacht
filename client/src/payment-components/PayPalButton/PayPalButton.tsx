import PaymentLoader from '@/dataLoaders/PaymentLoader';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

const PayPalButton: React.FC = () => {
    const onApprove = async (orderId: string) => {
        const token = sessionStorage.getItem('token');
        await PaymentLoader.handleApprove(token, orderId);
    };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: "10.00",
                },
              },
            ],
          });
        }}
        onApprove={(data) => {
            console.log('order id: ' + data.orderID);
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
