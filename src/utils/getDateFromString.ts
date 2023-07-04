export const getDateFromString = (dateString: string) => {
  const [month, year]: number[] = dateString
    .split('/')
    .map((item) => Number(item));
  return new Date(year, month - 1).getTime();
};
