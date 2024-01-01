import axios from 'axios';

const API_KEY = 'a4973244f0c34cb6b2dd4eab6ce4d494';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = async (country = 'us', searchText) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?country=${country}${
        searchText && `&q=${searchText}`
      }&apiKey=${API_KEY}`
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
