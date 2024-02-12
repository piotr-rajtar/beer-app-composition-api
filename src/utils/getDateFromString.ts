export const getDateFromString = (dateString: string) => {
  let parsedDateString = dateString;

  // SOME DATE STRINGS ARE IN YYYY FORMAT, WHAT RESULTS IN SORTTNG ISSUE
  // THAT'S WHY THIS KIND OF CONVERSION IS NEEDED
  if (Number(dateString)) {
    parsedDateString = `01/${dateString}`;
  }

  const [month, year]: number[] = parsedDateString
    .split('/')
    .map((item) => Number(item));
  return new Date(year, month).getTime();
};
