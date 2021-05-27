import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PayPalButton } from 'react-paypal-button-v2';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as userServices from '../../../services/userServices';
import * as interfaces from '../../../modules/interfaces';

interface PayPalProps {
  modalDisplay: {
    show: boolean;
    error: boolean;
  };
  setModalDisplay: React.Dispatch<React.SetStateAction<{
      show: boolean;
      error: boolean;
  }>>;
  handleOrderCompletion: (completeCart: interfaces.CompleteCart) => any;
  handleOrderDate: (date: Date) => any; 
  handleProductSalesUpdate: () => any;
}

const PayPalContainer: React.FC<PayPalProps> = ({ 
  handleOrderCompletion, 
  handleOrderDate, 
  handleProductSalesUpdate, 
  modalDisplay,
  setModalDisplay,
}) => {

  const { cart, user } = useContext(GlobalContext);

  const { changeOrderStatus } = useContext(RouteContext);

  const content: string = 'Please input your payment information via PayPal\'s secure input';

  const createOrder = (data: any, actions: any) => {
    if (!user.isAuthorized || modalDisplay.show) {
      return setModalDisplay({ ...modalDisplay, error: true });
    }

    console.log('creating order...')
    console.log('data', data);
    console.log('actions', actions);

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: "0.01"
        }
      }],
    });
  }
  
  const onApprove = async (data: any, actions: any): Promise<any> => {
    if (!user.isAuthorized || modalDisplay.show) {
      return setModalDisplay({ ...modalDisplay, error: true });
    }

    console.log('approving order...')
    console.log('data', data);
    console.log('actions', actions);

    return actions.order.capture()
      .then(async function(details: any) {
        console.log('details', details);
        console.log(`Transaction completed by ${details.payer.name.given_name}`);

        const userId: string = user._id;
        const accessToken: string = user.accessToken;

        const paymentObj = {
          name: details.payer.name,
          email: details.payer.email_address,
          address: details.payer.address,
          phone: details.payer.phone.phone_number,
          id: data.orderID,
          amount: details.purchase_units.payments.captures[0].amount.value,
          currency: details.purchase_units.payments.captures[0].amount.currency_code,
          create_time: details.purchase_units.payments.captures[0].create_time,
        };

        return;
      
        const response: any = await userServices.postPayment(userId, paymentObj, accessToken);

        return;

        if (response.success) {
          console.log('Successful payment');

          // for routing purposes:
          changeOrderStatus('complete');

          // update products sales
          const updateResult: boolean = await handleProductSalesUpdate();

          if (updateResult === false) {
            console.log('Error updating product sales');
            return false;
          }

          // add date to cart
          await handleOrderDate(response.date);

          // add date to cart object (state doesn't update for next context method call)
          const completeCartObj: interfaces.CompleteCart = {
            products: cart.products,
            totalItemCount: cart.totalItemCount,
            date: response.date,
            taxes: cart.taxes,
            subtotal: cart.subtotal,
            total: cart.total,
            id: uuidv4()
          };

          // adds order to history
          handleOrderCompletion(completeCartObj);
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Payment Info | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      <PayPalButton
        // amount="0.01"
        createOrder={createOrder}
        onApprove={onApprove}
        // options={{
        //   clientId: "PRODUCTION_CLIENT_ID"
        // }}
      />
    </>
  )
}

export default PayPalContainer;
