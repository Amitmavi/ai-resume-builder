const { default: axios } = require("axios");

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY; // Ensure this is the correct environment variable

const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}` // Use API_KEY correctly
    }
});

// Function to create a new resume
const createNewResume = (data) => axiosClient.post('/user-resumes', data);

// Export the function
export default {
    createNewResume
};
