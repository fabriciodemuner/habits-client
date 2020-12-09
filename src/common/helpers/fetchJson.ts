export default async function fetcher(input: RequestInfo, opts?: RequestInit) {
  try {
    const response = await fetch(input, opts);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    throw { ...error, response, data };
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
