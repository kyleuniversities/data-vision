import axios from 'axios';

// Default host
const DEFAULT_HOST = `http://localhost:5000`;

/**
 * Utility function used for api requests to the backend including the api host
 */
export async function request(url, options) {
  return fullRequest(`${DEFAULT_HOST}${url}`, options);
}

/**
 * Utility function used for api requests to the backend including the api host
 */
export async function fullRequest(fullUrl, options) {
  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Set up API request parameters
  const fullOptions = {
    ...options,
    headers,
    mode: 'cors',
    url: fullUrl,
  };

  // Run API request
  return axios(fullOptions).then((data) => {
    // Return the data from the response if successful
    return data.data;
  });
}
