const quickSortProducts = (array, key) => {
  if (!array.length) return array;

  let pivot = array[array.length - 1];
  let left = [];
  let right = [];

  for (const product of array.slice(0, array.length - 1)) {
    if (product[key] <= pivot[key]) {
      left.push(product);
    } else if (product[key] > pivot[key]) {
      right.push(product);
    }
  }

  if (left.length && right.length) {
    return [...quickSortProducts(left, key), pivot, ...quickSortProducts(right, key)];
  } else if (left.length) {
    return [...quickSortProducts(left, key), pivot];
  }

  return [pivot, ...quickSortProducts(right, key)];
}

export default quickSortProducts;
