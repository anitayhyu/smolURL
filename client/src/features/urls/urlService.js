import axios from "axios";
const API_URL = "/api/urls/";

// Create authenticated user new short url
const createUrl = async (urlData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "authshort", urlData, config);
  return response.data;
};

// Get authenticated user short urls
const getShortUrls = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create new short url for non-authenticated users
const createPublicUrl = async (urlData) => {
  const response = await axios.post(API_URL + "short", urlData);
  return response.data;
};

// Get short url for non-authenticated users
const getPublicUrl = async (urlData) => {
  const response = await axios.get(API_URL, urlData);
  return response.data;
};

const urlService = {
  createUrl,
  getShortUrls,
  createPublicUrl,
  getPublicUrl,
};

export default urlService;
