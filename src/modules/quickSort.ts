import * as interfaces from './interfaces';

const quickSort = (array: interfaces.DisplayProduct[]): any => {
  if (!array.length) return array;

  let pivot: interfaces.DisplayProduct = array[array.length - 1];
  let left: interfaces.DisplayProduct[] = [];
  let right: interfaces.DisplayProduct[] = [];

  for (const product of array.slice(0, array.length - 1)) {
    if (product.price <= pivot.price) {
      left.push(product);
    } else if (product.price > pivot.price) {
      right.push(product);
    }
  }

  if (left.length && right.length) {
    return [...quickSort(left), pivot, ...quickSort(right)];
  } else if (left.length) {
    return [...quickSort(left), pivot];
  }

  return [pivot, ...quickSort(right)];
}

export default quickSort;
