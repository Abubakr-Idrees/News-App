import axios from 'axios';

const API_KEY = '168f914b56144bb4a0d10dca6e167bde';
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
