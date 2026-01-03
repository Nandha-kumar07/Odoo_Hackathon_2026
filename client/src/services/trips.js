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

    // Toggle public status
    shareTrip: async (id, is_public) => {
        const response = await api.put(`/trips/${id}/share`, { is_public });
        return response.data.trip;
    },

    // Get public trip (no auth required)
    getPublicTrip: async (id) => {
        const response = await api.get(`/trips/public/${id}`);
        return response.data; // Returns { trip, itinerary, activities }
    },

    // Generate smart itinerary
    generateItinerary: async (tripId) => {
        const response = await api.post(`/itinerary/generate/${tripId}`);
        return response.data;
    },
};

export default tripService;
