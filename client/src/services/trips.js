import api from './api';

export const tripService = {
    // Get all trips
    getAllTrips: async () => {
        const response = await api.get('/trips');
        return response.data.trips;
    },

    // Get single trip
    getTrip: async (id) => {
        const response = await api.get(`/trips/${id}`);
        return response.data.trip;
    },

    // Create new trip
    createTrip: async (tripData) => {
        const response = await api.post('/trips', tripData);
        return response.data.trip;
    },

    // Update trip
    updateTrip: async (id, tripData) => {
        const response = await api.put(`/trips/${id}`, tripData);
        return response.data.trip;
    },

    // Delete trip
    deleteTrip: async (id) => {
        const response = await api.delete(`/trips/${id}`);
        return response.data;
    },
};

export default tripService;
