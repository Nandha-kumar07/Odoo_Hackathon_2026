import api from './api';

export const activityService = {
    // Activities
    getAllActivities: async () => {
        const response = await api.get('/activities');
        return response.data;
    },

    getTripActivities: async (tripId) => {
        const response = await api.get(`/trips/${tripId}/activities`);
        return response.data;
    },

    addActivity: async (tripId, activityData) => {
        const response = await api.post(`/trips/${tripId}/activities`, activityData);
        return response.data;
    },

    updateActivity: async (id, activityData) => {
        const response = await api.put(`/activities/${id}`, activityData);
        return response.data;
    },

    deleteActivity: async (id) => {
        const response = await api.delete(`/activities/${id}`);
        return response.data;
    },

    // Itinerary Days
    getTripItinerary: async (tripId) => {
        const response = await api.get(`/trips/${tripId}/itinerary`);
        return response.data;
    },

    addItineraryDay: async (tripId, dayData) => {
        const response = await api.post(`/trips/${tripId}/itinerary`, dayData);
        return response.data;
    },

    updateItineraryDay: async (id, dayData) => {
        const response = await api.put(`/itinerary/${id}`, dayData);
        return response.data;
    },

    deleteItineraryDay: async (id) => {
        const response = await api.delete(`/itinerary/${id}`);
        return response.data;
    }
};
