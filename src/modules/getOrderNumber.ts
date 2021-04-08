const getOrderNumber = (orderId: string): any => {
  // copy of slice until first hyphen => return copy
  let orderNumber: string = '';

  for (let i = 0; i < orderId.length; i++) {
    if (orderId[i] === '-') break;

    orderNumber += orderId[i];
  }

  return orderNumber;
}

export default getOrderNumber;
