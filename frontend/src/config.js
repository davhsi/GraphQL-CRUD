// config.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Debug statement to check if the environment variable is loaded
if (!API_BASE_URL) {
    console.error('API_BASE_URL is not defined. Please check your .env file.');
} else {
    console.log('API_BASE_URL loaded:', API_BASE_URL);
}
