export const getETA = (): any => {
  const today = new Date();

  const date = new Date(today);

  date.setDate(date.getDate() + 7);

  return date;
}
