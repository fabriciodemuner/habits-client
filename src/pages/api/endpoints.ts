export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:4000/api';

const BASE_ENDPOINTS = {
  AUTH: '/auth',
  USER: '/user',
  HABIT: '/habit',
};

export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_ENDPOINTS.AUTH}/register`,
    LOGIN: `${BASE_ENDPOINTS.AUTH}/login`,
    REFRESH_TOKEN: `${BASE_ENDPOINTS.AUTH}/refresh-token`,
    CHANGE_PASSWORD: `${BASE_ENDPOINTS.AUTH}/change-password`,
    PROFILE: `${BASE_ENDPOINTS.AUTH}/profile`,
  },
  HABITS: {
    CREATE: `${BASE_ENDPOINTS.HABIT}`,
    LIST: `${BASE_ENDPOINTS.HABIT}`,
    update: (habitId: number) => `${BASE_ENDPOINTS.HABIT}/${habitId}`,
    days: (habitId: number) => `${BASE_ENDPOINTS.HABIT}/${habitId}/days`,
    delete: (habitId: number) => `${BASE_ENDPOINTS.HABIT}/${habitId}`,
  },
  USER: {
    LIST: `${BASE_ENDPOINTS.USER}`,
  },
};

export const withBashURL = (endpoint: string) => {
  return BASE_URL + endpoint;
};
