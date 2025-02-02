import axios from 'axios';

const API_URL = 'http://localhost:3001/api/faqs';

export const getFaqs = async (lang = '') => {
    try {
        const response = await axios.get(`${API_URL}?lang=${lang}`);
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export const postFaq = async (question, answer) => {
    try {
        const response = await axios.post(API_URL, { question, answer }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};