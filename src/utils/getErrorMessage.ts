import axios from 'axios';

export const getErrorMessage = (error: unknown): string =>
  axios.isAxiosError(error) ? `Axios error: ${error.message}` : `Other error: ${new Error().message}`;