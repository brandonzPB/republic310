import React from 'react';
import { Helmet } from 'react-helmet';
import { PayPalButton } from 'react-paypal-button-v2';

const PayPalContainer: React.FC = () => {
  const content: string = 'Please input your payment information via PayPal\'s secure input';

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: "0.01"
        }
      }],
    });
  }
  
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture()
      .then(function(details: any) {
        console.log(`Transaction completed by ${details.payer.name.given_name}`);
      
        // server call
      });
  }

  return (
    <>
      <Helmet>
        <title>Payment Info | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      <PayPalButton
        amount="0.01"
        onApprove={onApprove}
        // options={{
        //   clientId: "PRODUCTION_CLIENT_ID"
        // }}
      />
    </>
  )
}

export default PayPalContainer;
