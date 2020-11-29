export const ___PROD___ = process.env.NODE_ENV === "production";
export const API_HOST = ___PROD___
  ? "https://habits-tracker-be.herokuapp.com"
  : "http://localhost:4000";
