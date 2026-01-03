import api from './api';

export const searchService = {
    // Search activities
    searchActivities: async (params) => {
        const response = await api.get('/search/activities', { params });
        return response.data;
    },

    // Search cities
    searchCities: async (params) => {
        const response = await api.get('/search/cities', { params });
        return response.data;
    }
};
