import { BEER_TABLE_ID, BEER_TABLE_CAPTION_ID } from '../const';

export const getInitialFetchQuantity = () => {
  const beerTableDimensions = (
    document.getElementById(BEER_TABLE_ID) as HTMLElement
  ).getBoundingClientRect();
  const tableCaptionDimensions = (
    document.getElementById(BEER_TABLE_CAPTION_ID) as HTMLElement
  ).getBoundingClientRect();
  const tableHeight = beerTableDimensions.top - tableCaptionDimensions.height;

  return Math.floor(
    (window.innerHeight - tableHeight) / beerTableDimensions.height
  );
};
